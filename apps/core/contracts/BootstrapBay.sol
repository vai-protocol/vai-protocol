// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./interfaces/IBootstrapBay.sol";
import "./interfaces/IMembership.sol";
import "./VAI.sol";

contract BootstrapBay is IBootstrapBay, Ownable, ReentrancyGuard, Pausable {
    // Round information
    Round public _currentRound;
    
    // Membership contract reference
    IMembership public membershipContract;
    
    // VAI Token contract reference
    VAI public vaiToken;
    
    // Mappings
    mapping(address => ContributorInfo) public contributors;
    address[] public contributorList;
    
    // Round statistics
    uint256 public totalContributions;
    uint256 public totalContributors;
    uint256 public totalReferralBonuses;
    
    // Reward distribution
    bool public rewardsDistributed = false;
    uint256 public rewardPerContributor;
    uint256 public vaiRewardPerContributor;
    
    // Additional events not in interface
    event MembershipContractUpdated(address indexed oldContract, address indexed newContract);
    event VAIContractUpdated(address indexed oldContract, address indexed newContract);

    modifier onlyWhenRoundActive() {
        require(_currentRound.isActive, "BootstrapBay: Round is not active");
        require(block.timestamp <= _currentRound.deadline, "BootstrapBay: Round has ended");
        _;
    }

    modifier onlyAfterRoundEnded() {
        require(block.timestamp > _currentRound.deadline || !_currentRound.isActive, "BootstrapBay: Round is still active");
        _;
    }

    constructor(Round memory round) Ownable(msg.sender) {
        _currentRound = round;
    }

    /**
     * @dev Set membership contract address (only owner)
     */
    function setMembershipContract(address membershipAddress) external onlyOwner {
        require(membershipAddress != address(0), "BootstrapBay: Invalid membership contract address");
        
        address oldContract = address(membershipContract);
        membershipContract = IMembership(membershipAddress);
        
        emit MembershipContractUpdated(oldContract, membershipAddress);
    }

    /**
     * @dev Set VAI token contract address (only owner)
     */
    function setVAIContract(address payable vaiAddress) external onlyOwner {
        require(vaiAddress != address(0), "BootstrapBay: Invalid VAI contract address");
        
        address oldContract = address(vaiToken);
        vaiToken = VAI(vaiAddress);
        
        emit VAIContractUpdated(oldContract, vaiAddress);
    }

    /**
     * @dev Contribute to the bootstrap round
     */
    function contribute() external payable nonReentrant whenNotPaused onlyWhenRoundActive {
        require(msg.value >= _currentRound.entry, "BootstrapBay: Contribution below minimum entry");
        require(totalContributors < _currentRound.slots, "BootstrapBay: Round is full");
        require(contributors[msg.sender].contribution == 0, "BootstrapBay: Already contributed");
        
        address referrer = address(0);
        
        // Check if contributor is a member and get referrer
        if (address(membershipContract) != address(0)) {
            if (membershipContract.isMember(msg.sender)) {
                IMembership.Member memory memberInfo = membershipContract.getMemberInfo(msg.sender);
                referrer = memberInfo.referrer;
            } else {
                // Auto-join as member if not already
                membershipContract.join();
            }
        }
        
        // Record contribution
        contributors[msg.sender] = ContributorInfo({
            contribution: msg.value,
            referralBonus: 0,
            hasWithdrawn: false,
            referrer: referrer,
            contributedAt: block.timestamp
        });
        
        contributorList.push(msg.sender);
        totalContributions += msg.value;
        totalContributors++;
        
        emit ContributionMade(msg.sender, msg.value, referrer);
        
        // Calculate and distribute referral bonus
        if (referrer != address(0) && address(membershipContract) != address(0)) {
            uint256 referralBonus = (msg.value * 1000) / 10000; // 10% referral bonus
            contributors[msg.sender].referralBonus = referralBonus;
            totalReferralBonuses += referralBonus;
            
            // Distribute commission through membership contract
            membershipContract.distributeCommission(msg.sender, msg.value);
            
            emit ReferralBonusEarned(referrer, msg.sender, referralBonus);
        }
    }

    /**
     * @dev Get current round information
     */
    function getCurrentRound() external view returns (Round memory) {
        return _currentRound;
    }

    /**
     * @dev Get contributor information
     */
    function getContributorInfo(address contributor) external view returns (ContributorInfo memory) {
        return contributors[contributor];
    }

    /**
     * @dev Calculate rewards (only after round ends)
     */
    function calculateRewards() external onlyOwner onlyAfterRoundEnded {
        require(!rewardsDistributed, "BootstrapBay: Rewards already calculated");
        require(totalContributors > 0, "BootstrapBay: No contributors");
        
        // Calculate BNB reward per contributor (after referral bonuses)
        uint256 availableBNB = address(this).balance - totalReferralBonuses;
        rewardPerContributor = availableBNB / totalContributors;
        
        // Calculate VAI reward per contributor
        if (address(vaiToken) != address(0) && _currentRound.reserve > 0) {
            vaiRewardPerContributor = _currentRound.reserve / totalContributors;
        }
        
        rewardsDistributed = true;
        
        emit RewardsCalculated(rewardPerContributor, vaiRewardPerContributor);
    }

    /**
     * @dev Claim rewards (only after rewards are calculated)
     */
    function claimRewards() external nonReentrant whenNotPaused onlyAfterRoundEnded {
        require(rewardsDistributed, "BootstrapBay: Rewards not yet calculated");
        require(contributors[msg.sender].contribution > 0, "BootstrapBay: Not a contributor");
        require(!contributors[msg.sender].hasWithdrawn, "BootstrapBay: Already withdrawn");
        
        contributors[msg.sender].hasWithdrawn = true;
        
        uint256 bnbReward = rewardPerContributor;
        uint256 vaiReward = vaiRewardPerContributor;
        
        // Transfer BNB reward
        if (bnbReward > 0) {
            (bool success, ) = payable(msg.sender).call{value: bnbReward}("");
            require(success, "BootstrapBay: BNB transfer failed");
        }
        
        // Transfer VAI reward
        if (vaiReward > 0 && address(vaiToken) != address(0)) {
            require(vaiToken.transfer(msg.sender, vaiReward), "BootstrapBay: VAI transfer failed");
        }
        
        emit RewardClaimed(msg.sender, bnbReward, vaiReward);
    }

    /**
     * @dev Close the round manually (only owner)
     */
    function closeRound() external onlyOwner {
        require(_currentRound.isActive, "BootstrapBay: Round already closed");
        
        _currentRound.isActive = false;
        
        emit RoundClosed(totalContributions, totalContributors);
    }

    /**
     * @dev Update round configuration (only owner, before round starts)
     */
    function updateRound(Round memory newRound) external onlyOwner {
        require(totalContributors == 0, "BootstrapBay: Cannot update after contributions started");
        
        _currentRound = newRound;
    }

    /**
     * @dev Deposit VAI tokens for rewards (only owner)
     */
    function depositVAIRewards(uint256 amount) external onlyOwner {
        require(address(vaiToken) != address(0), "BootstrapBay: VAI contract not set");
        require(amount > 0, "BootstrapBay: Invalid amount");
        
        require(vaiToken.transferFrom(msg.sender, address(this), amount), "BootstrapBay: VAI transfer failed");
        _currentRound.reserve += amount;
    }

    /**
     * @dev Emergency withdrawal (only owner)
     */
    function emergencyWithdraw() external onlyOwner nonReentrant {
        require(block.timestamp > _currentRound.deadline + 30 days, "BootstrapBay: Emergency period not reached");
        
        uint256 balance = address(this).balance;
        if (balance > 0) {
            (bool success, ) = payable(owner()).call{value: balance}("");
            require(success, "BootstrapBay: Withdrawal failed");
        }
        
        if (address(vaiToken) != address(0)) {
            uint256 vaiBalance = vaiToken.balanceOf(address(this));
            if (vaiBalance > 0) {
                require(vaiToken.transfer(owner(), vaiBalance), "BootstrapBay: VAI withdrawal failed");
            }
        }
    }

    /**
     * @dev Get round statistics
     */
    function getRoundStatistics() external view returns (
        uint256 contributions,
        uint256 contributors_count,
        uint256 referralBonuses,
        uint256 availableSlots,
        bool isActive,
        bool rewardsCalculated
    ) {
        return (
            totalContributions,
            totalContributors,
            totalReferralBonuses,
            _currentRound.slots - totalContributors,
            _currentRound.isActive && block.timestamp <= _currentRound.deadline,
            rewardsDistributed
        );
    }

    /**
     * @dev Get all contributors
     */
    function getAllContributors() external view returns (address[] memory) {
        return contributorList;
    }

    /**
     * @dev Pause the contract (only owner)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause the contract (only owner)
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Receive function to accept direct deposits
     */
    receive() external payable {}
}
