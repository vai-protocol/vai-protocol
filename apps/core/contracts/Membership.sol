// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IMembership.sol";

contract Membership is IMembership, Pausable, Ownable, ReentrancyGuard {
    // Default adaptation score, range from 0 to 10000
    uint256 public constant DEFAULT_ADAPTATION = 5000;
    
    // Commission rate: 10% = 1000 basis points (out of 10000)
    uint256 public constant REFERRAL_COMMISSION_RATE = 1000;

    // Members mapping
    mapping(address => Member) public _members;
    
    // Referral commission tracking: referrer => referred => amount
    mapping(address => mapping(address => uint256)) public referralCommissions;
    
    // Claimable commissions for each member
    mapping(address => uint256) public claimableCommissions;
    
    // Total commission distributed
    uint256 public totalCommissionDistributed;

    constructor() Ownable(msg.sender) {}

    function isMember(address memberAddr) external view returns (bool) {
        return _members[memberAddr].adaptation > 0 && _members[memberAddr].isActive;
    }

    function join() external whenNotPaused {
        require(!this.isMember(msg.sender), "Membership: ALREADY_JOINED");
        
        // Add the member to the mapping
        _members[msg.sender] = Member({
            adaptation: DEFAULT_ADAPTATION,
            referrer: address(0),
            totalEarnings: 0,
            referralEarnings: 0,
            referralCount: 0,
            isActive: true,
            joinedAt: block.timestamp
        });

        // Emit the event
        emit MemberJoined(_members[msg.sender]);
    }

    function join(address referrerAddr) external whenNotPaused {
        require(!this.isMember(msg.sender), "Membership: ALREADY_JOINED");
        require(referrerAddr != msg.sender, "Membership: CANNOT_REFER_SELF");

        address finalReferrer = address(0);
        
        // If found the referrer, set the referrer
        if (_members[referrerAddr].adaptation > 0 && _members[referrerAddr].isActive) {
            finalReferrer = referrerAddr;
            // Increment referrer's referral count
            _members[referrerAddr].referralCount++;
        }

        _members[msg.sender] = Member({
            adaptation: DEFAULT_ADAPTATION,
            referrer: finalReferrer,
            totalEarnings: 0,
            referralEarnings: 0,
            referralCount: 0,
            isActive: true,
            joinedAt: block.timestamp
        });

        // Emit the event
        emit MemberJoined(_members[msg.sender]);
    }

    /**
     * @dev Distribute commission to referrer when a member earns profit
     * @param member The member who earned profit
     * @param amount The amount of profit earned
     */
    function distributeCommission(address member, uint256 amount) external nonReentrant {
        require(this.isMember(member), "Membership: NOT_A_MEMBER");
        require(amount > 0, "Membership: INVALID_AMOUNT");
        
        // Update member's total earnings
        _members[member].totalEarnings += amount;
        emit EarningsUpdated(member, amount, _members[member].totalEarnings);
        
        // Check if member has a referrer
        address referrer = _members[member].referrer;
        if (referrer != address(0) && this.isMember(referrer)) {
            // Calculate commission (10%)
            uint256 commission = (amount * REFERRAL_COMMISSION_RATE) / 10000;
            
            // Add to claimable commissions
            claimableCommissions[referrer] += commission;
            referralCommissions[referrer][member] += commission;
            _members[referrer].referralEarnings += commission;
            totalCommissionDistributed += commission;
            
            emit CommissionDistributed(referrer, member, commission);
        }
    }

    /**
     * @dev Claim available referral commissions
     */
    function claimCommissions() external nonReentrant whenNotPaused {
        require(this.isMember(msg.sender), "Membership: NOT_A_MEMBER");
        
        uint256 claimableAmount = claimableCommissions[msg.sender];
        require(claimableAmount > 0, "Membership: NO_COMMISSIONS_TO_CLAIM");
        require(address(this).balance >= claimableAmount, "Membership: INSUFFICIENT_CONTRACT_BALANCE");
        
        // Reset claimable commissions
        claimableCommissions[msg.sender] = 0;
        
        // Transfer commission to member
        (bool success, ) = payable(msg.sender).call{value: claimableAmount}("");
        require(success, "Membership: COMMISSION_TRANSFER_FAILED");
        
        emit CommissionClaimed(msg.sender, claimableAmount);
    }

    /**
     * @dev Get referral earnings for a member
     */
    function getReferralEarnings(address member) external view returns (uint256) {
        return _members[member].referralEarnings;
    }

    /**
     * @dev Get claimable commission amount for a member
     */
    function getClaimableCommissions(address member) external view returns (uint256) {
        return claimableCommissions[member];
    }

    /**
     * @dev Get member information
     */
    function getMemberInfo(address memberAddr) external view returns (Member memory) {
        return _members[memberAddr];
    }

    /**
     * @dev Get commission earned from a specific referred member
     */
    function getCommissionFromReferred(address referrer, address referred) external view returns (uint256) {
        return referralCommissions[referrer][referred];
    }

    /**
     * @dev Ban a member (only owner)
     */
    function ban(address memberAddr) external onlyOwner {
        require(this.isMember(memberAddr), "Membership: NOT_A_MEMBER");
        
        _members[memberAddr].isActive = false;
        
        // Emit the event
        emit MemberBanned(_members[memberAddr]);
    }

    /**
     * @dev Reactivate a banned member (only owner)
     */
    function reactivate(address memberAddr) external onlyOwner {
        require(_members[memberAddr].adaptation > 0, "Membership: MEMBER_NOT_FOUND");
        require(!_members[memberAddr].isActive, "Membership: MEMBER_ALREADY_ACTIVE");
        
        _members[memberAddr].isActive = true;
        
        emit MemberJoined(_members[memberAddr]);
    }

    /**
     * @dev Emergency pause function
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause function
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Deposit funds for commission payments
     */
    function depositFunds() external payable onlyOwner {
        require(msg.value > 0, "Membership: INVALID_DEPOSIT_AMOUNT");
    }

    /**
     * @dev Withdraw excess funds (only owner)
     */
    function withdrawFunds(uint256 amount) external onlyOwner nonReentrant {
        require(amount <= address(this).balance, "Membership: INSUFFICIENT_BALANCE");
        
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Membership: WITHDRAWAL_FAILED");
    }

    /**
     * @dev Get contract balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Receive function to accept direct deposits
     */
    receive() external payable {}
}
