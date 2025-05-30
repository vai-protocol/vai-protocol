// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IBootstrapBay.sol";

contract BootstrapBay is IBootstrapBay, Ownable {
    constructor() Ownable(msg.sender) {}
}
