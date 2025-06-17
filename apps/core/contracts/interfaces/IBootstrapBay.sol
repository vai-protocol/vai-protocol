// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IBootstrapBay {
    // Structs
    struct Round {
        uint256 entry; // Entry amount required to contribute
        uint256 pool; // Total BNB pool
        uint256 slots; // Number of special slots
        uint256 reserve; // VAI reserve
        uint256 deadline; // Round end timestamp (6 months from the start of the round)
        bool isActive; // Whether round is still accepting contributions
    }

    struct ContributorInfo {
        uint256 contribution;
        uint256 referralBonus;
        bool hasWithdrawn;
        address referrer;
        uint256 contributedAt;
    }

    // Events
    event ContributionMade(address indexed contributor, uint256 amount, address indexed referrer);
    event ReferralBonusEarned(address indexed referrer, address indexed contributor, uint256 bonus);
    event RewardsCalculated(uint256 bnbRewardPerContributor, uint256 vaiRewardPerContributor);
    event RewardClaimed(address indexed contributor, uint256 bnbAmount, uint256 vaiAmount);
    event RoundClosed(uint256 totalContributions, uint256 totalContributors);

    // Core functions
    function contribute() external payable;
    function claimRewards() external;
    function getCurrentRound() external view returns (Round memory);
    function getContributorInfo(address contributor) external view returns (ContributorInfo memory);

    // Round management
    function calculateRewards() external;
    function closeRound() external;
    function updateRound(Round memory newRound) external;

    // Contract integration
    function setMembershipContract(address membershipAddress) external;
    function setVAIContract(address payable vaiAddress) external;
    function depositVAIRewards(uint256 amount) external;

    // Statistics
    function getRoundStatistics() external view returns (
        uint256 contributions,
        uint256 contributors_count,
        uint256 referralBonuses,
        uint256 availableSlots,
        bool isActive,
        bool rewardsCalculated
    );
    function getAllContributors() external view returns (address[] memory);

    // Emergency functions
    function emergencyWithdraw() external;
}
