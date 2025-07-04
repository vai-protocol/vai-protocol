import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const { BSC_RPC_URL, BSC_TESTNET_RPC_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    bsc: {
      url: BSC_RPC_URL || "https://bsc-dataseed.binance.org",
      chainId: 56,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    bscTestnet: {
      url: BSC_TESTNET_RPC_URL || "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
};

export default config;
