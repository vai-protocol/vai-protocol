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

    // // Events
    // event RoundStarted(uint256 roundId, uint256 entryFee, uint256 bnbPool, uint256 deadline, uint256 vaiReserve);
    // event RoundClosed(uint256 roundId, uint256[] winners);
    // event ContributionMade(address indexed contributor, uint256 roundId, uint256 amount);
    // event Qualified(address indexed contributor, uint256 roundId);
    // event VAIReserveBurned(uint256 amount);

    // // State view functions
    // function getCurrentRound() external view returns (Round memory);
    // function getContribution(address contributor) external view returns (uint256);
    // function getReferralCount(address contributor) external view returns (uint256);

    // // Core functions
    // function contribute() external payable;
    // function closeRound(uint256 roundId) external;
    // function initRound(uint256 entryFee, uint256 bnbPool, uint256 specialSlots, uint256 duration, uint256 vaiReserve) external;

    // // Admin functions
    // function setCurrentRoundId(uint256 roundId) external;
    // function setCurrentRoundEntryFee(uint256 entryFee) external;
    // function setCurrentRoundBNBPool(uint256 bnbPool) external;
    // function setCurrentRoundSpecialSlots(uint256 specialSlots) external;
    // function setCurrentRoundDeadline(uint256 deadline) external;
    // function setCurrentRoundVAIReserve(uint256 vaiReserve) external;
}
