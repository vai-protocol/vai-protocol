// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IMembership {
    // Enhanced Member structure
    struct Member {
        uint256 adaptation;      // The adaptation score of the member
        address referrer;        // The referrer of the member
        uint256 totalEarnings;   // Total earnings by this member
        uint256 referralEarnings; // Total earnings from referrals
        uint256 referralCount;   // Number of successful referrals
        bool isActive;           // Whether the member is active
        uint256 joinedAt;        // Timestamp when member joined
    }

    // Events
    event MemberJoined(Member member);
    event MemberBanned(Member member);
    event CommissionDistributed(address indexed referrer, address indexed referred, uint256 amount);
    event CommissionClaimed(address indexed member, uint256 amount);
    event EarningsUpdated(address indexed member, uint256 amount, uint256 totalEarnings);

    // Member functions
    function join() external;
    function join(address refId) external;
    function isMember(address memberAddr) external view returns (bool);

    // Commission functions
    function distributeCommission(address member, uint256 amount) external;
    function claimCommissions() external;
    function getReferralEarnings(address member) external view returns (uint256);
    function getClaimableCommissions(address member) external view returns (uint256);
    function getMemberInfo(address memberAddr) external view returns (Member memory);

    // Admin functions
    function ban(address member) external;
}
