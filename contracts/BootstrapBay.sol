// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IBootstrapBay.sol";

contract BootstrapBay is IBootstrapBay, Ownable {
    Round public _currentRound;

    constructor(Round memory round) Ownable(msg.sender) {
        _currentRound = round;
    }

    function getCurrentRound() external view returns (Round memory) {
        return _currentRound;
    }
}
