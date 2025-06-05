// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./interfaces/IMembership.sol";

contract Membership is IMembership, Pausable, Ownable {
    // Default adaptation score, range from 0 to 10000
    uint256 public constant DEFAULT_ADAPTATION = 5000;

    // Members mapping
    mapping(address => Member) public _members;

    constructor() Ownable(msg.sender) {}

    function isMember(address memberAddr) external view returns (bool) {
        return _members[memberAddr].adaptation > 0;
    }

    function join() external {
        // Add the member to the mapping
        _members[msg.sender] = Member({
            adaptation: DEFAULT_ADAPTATION,
            referrer: address(0)
        });

        // Emit the event
        emit MemberJoined(_members[msg.sender]);
    }

    function join(address referrerAddr) external {
        require(
            // Check if the member is already a member
            this.isMember(msg.sender),
            "Membership: ALREADY_JOINED"
        );

        // If found the referrer, set the referrer
        if (_members[referrerAddr].adaptation > 0) {
            _members[msg.sender] = Member({
                adaptation: DEFAULT_ADAPTATION,
                referrer: referrerAddr
            });
        } else {
            _members[msg.sender] = Member({
                adaptation: DEFAULT_ADAPTATION,
                referrer: address(0)
            });
        }

        // Emit the event
        emit MemberJoined(_members[msg.sender]);
    }

    function ban(address memberAddr) external onlyOwner {
        delete _members[memberAddr];

        // Emit the event
        emit MemberBanned(_members[memberAddr]);
    }
}
