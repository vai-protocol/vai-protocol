// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IMembership {
    // Structs
    struct Member {
        uint256 adaptation; // The adaptation score of the member
        address referrer; // The referrer of the member
    }

    // Events
    event MemberJoined(Member member);
    event MemberBanned(Member member);

    // Member functions
    function join() external;
    function join(address refId) external;

    // Admin functions
    function ban(address member) external;
}
