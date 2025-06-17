// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract VAI is ERC20, Ownable, Pausable, ReentrancyGuard {
    // Token Information (BEP20 Compatible)
    uint8 private constant DECIMALS = 9;
    uint256 public constant MAX_SUPPLY = 391_000_000_000 * 10**DECIMALS; // 391 billion VAI
    
    // Fee Configuration
    uint256 public transferFeeRate = 0; // Transfer fee in basis points (0 = no fee)
    uint256 public constant MAX_TRANSFER_FEE = 500; // Maximum 5% transfer fee
    address public feeCollector;

    // Burn tracking
    uint256 public totalBurned;
    
    // Blacklist functionality
    mapping(address => bool) public blacklisted;
    
    // Events
    event TokensBurned(address indexed from, uint256 amount);
    event TransferFeeUpdated(uint256 oldFee, uint256 newFee);
    event FeeCollectorUpdated(address indexed oldCollector, address indexed newCollector);
    event BlacklistUpdated(address indexed account, bool status);
    
    modifier notBlacklisted(address account) {
        require(!blacklisted[account], "VAI: Account is blacklisted");
        _;
    }

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        require(initialSupply <= MAX_SUPPLY, "VAI: Initial supply exceeds max supply");
        
        feeCollector = msg.sender;
        
        if (initialSupply > 0) {
            _mint(owner(), initialSupply);
        }
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * BEP20 standard uses 18 decimals, but VAI uses 9 for lower gas costs.
     */
    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }

    /**
     * @dev Mint new tokens (only owner)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) public onlyOwner whenNotPaused notBlacklisted(to) {
        require(to != address(0), "VAI: Cannot mint to zero address");
        require(totalSupply() + amount <= MAX_SUPPLY, "VAI: Minting would exceed max supply");
        
        _mint(to, amount);
    }

    /**
     * @dev Burn tokens from caller's account
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) public whenNotPaused {
        require(amount > 0, "VAI: Burn amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "VAI: Insufficient balance to burn");
        
        _burn(msg.sender, amount);
        totalBurned += amount;
        
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * @dev Burn tokens from specified account (requires allowance)
     * @param from Address to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burnFrom(address from, uint256 amount) public whenNotPaused {
        require(amount > 0, "VAI: Burn amount must be greater than 0");
        require(balanceOf(from) >= amount, "VAI: Insufficient balance to burn");
        
        uint256 currentAllowance = allowance(from, msg.sender);
        require(currentAllowance >= amount, "VAI: Burn amount exceeds allowance");
        
        _approve(from, msg.sender, currentAllowance - amount);
        _burn(from, amount);
        totalBurned += amount;
        
        emit TokensBurned(from, amount);
    }

    /**
     * @dev Override transfer to add fee mechanism and blacklist check
     */
    function transfer(address to, uint256 amount) public override whenNotPaused notBlacklisted(msg.sender) notBlacklisted(to) returns (bool) {
        return _transferWithFee(msg.sender, to, amount);
    }

    /**
     * @dev Override transferFrom to add fee mechanism and blacklist check
     */
    function transferFrom(address from, address to, uint256 amount) public override whenNotPaused notBlacklisted(from) notBlacklisted(to) returns (bool) {
        address spender = msg.sender;
        uint256 currentAllowance = allowance(from, spender);
        require(currentAllowance >= amount, "VAI: Transfer amount exceeds allowance");
        
        _approve(from, spender, currentAllowance - amount);
        return _transferWithFee(from, to, amount);
    }

    /**
     * @dev Internal function to handle transfers with fees
     */
    function _transferWithFee(address from, address to, uint256 amount) internal returns (bool) {
        require(from != address(0), "VAI: Transfer from zero address");
        require(to != address(0), "VAI: Transfer to zero address");
        require(amount > 0, "VAI: Transfer amount must be greater than 0");
        
        uint256 fee = 0;
        uint256 transferAmount = amount;
        
        // Calculate transfer fee (exclude owner and fee collector from fees)
        if (transferFeeRate > 0 && from != owner() && to != owner() && from != feeCollector && to != feeCollector) {
            fee = (amount * transferFeeRate) / 10000;
            transferAmount = amount - fee;
        }
        
        // Execute transfer
        _transfer(from, to, transferAmount);
        
        // Transfer fee to fee collector
        if (fee > 0) {
            _transfer(from, feeCollector, fee);
        }
        
        return true;
    }

    /**
     * @dev Set transfer fee rate (only owner)
     * @param newFeeRate New fee rate in basis points (10000 = 100%)
     */
    function setTransferFeeRate(uint256 newFeeRate) external onlyOwner {
        require(newFeeRate <= MAX_TRANSFER_FEE, "VAI: Fee rate exceeds maximum");
        
        uint256 oldFeeRate = transferFeeRate;
        transferFeeRate = newFeeRate;
        
        emit TransferFeeUpdated(oldFeeRate, newFeeRate);
    }

    /**
     * @dev Set fee collector address (only owner)
     * @param newFeeCollector New fee collector address
     */
    function setFeeCollector(address newFeeCollector) external onlyOwner {
        require(newFeeCollector != address(0), "VAI: Fee collector cannot be zero address");
        
        address oldFeeCollector = feeCollector;
        feeCollector = newFeeCollector;
        
        emit FeeCollectorUpdated(oldFeeCollector, newFeeCollector);
    }

    /**
     * @dev Add or remove account from blacklist (only owner)
     * @param account Account to update
     * @param status True to blacklist, false to remove from blacklist
     */
    function setBlacklistStatus(address account, bool status) external onlyOwner {
        require(account != address(0), "VAI: Cannot blacklist zero address");
        require(account != owner(), "VAI: Cannot blacklist owner");
        
        blacklisted[account] = status;
        emit BlacklistUpdated(account, status);
    }

    /**
     * @dev Batch blacklist update (only owner)
     * @param accounts Array of accounts to update
     * @param status True to blacklist, false to remove from blacklist
     */
    function batchSetBlacklistStatus(address[] calldata accounts, bool status) external onlyOwner {
        for (uint256 i = 0; i < accounts.length; i++) {
            address account = accounts[i];
            require(account != address(0), "VAI: Cannot blacklist zero address");
            require(account != owner(), "VAI: Cannot blacklist owner");
            
            blacklisted[account] = status;
            emit BlacklistUpdated(account, status);
        }
    }

    /**
     * @dev Get circulating supply (total supply - burned tokens)
     */
    function circulatingSupply() external view returns (uint256) {
        return totalSupply();
    }

    /**
     * @dev Get remaining mintable supply
     */
    function remainingMintableSupply() external view returns (uint256) {
        return MAX_SUPPLY - totalSupply();
    }

    /**
     * @dev Emergency pause function (only owner)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause function (only owner)
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Emergency withdrawal function for accidentally sent tokens (only owner)
     * @param token Token contract address (use address(0) for ETH/BNB)
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner nonReentrant {
        if (token == address(0)) {
            // Withdraw ETH/BNB
            require(address(this).balance >= amount, "VAI: Insufficient ETH/BNB balance");
            (bool success, ) = payable(owner()).call{value: amount}("");
            require(success, "VAI: ETH/BNB withdrawal failed");
        } else {
            // Withdraw ERC20 token
            IERC20 tokenContract = IERC20(token);
            require(tokenContract.balanceOf(address(this)) >= amount, "VAI: Insufficient token balance");
            require(tokenContract.transfer(owner(), amount), "VAI: Token withdrawal failed");
        }
    }

    /**
     * @dev Approve with additional checks
     */
    function approve(address spender, uint256 amount) public override whenNotPaused notBlacklisted(msg.sender) notBlacklisted(spender) returns (bool) {
        return super.approve(spender, amount);
    }

    /**
     * @dev Increase allowance with additional checks
     */
    function increaseAllowance(address spender, uint256 addedValue) public whenNotPaused notBlacklisted(msg.sender) notBlacklisted(spender) returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    /**
     * @dev Decrease allowance with additional checks
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public whenNotPaused notBlacklisted(msg.sender) notBlacklisted(spender) returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        _approve(owner, spender, currentAllowance - subtractedValue);
        return true;
    }

    /**
     * @dev Receive function to accept direct BNB deposits
     */
    receive() external payable {}
}
