import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { getContract } from "viem";
import { getContractAddress } from "../config/contracts";

// Expanded VAI Token ABI
const VAI_ABI = [
  {
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf", 
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "inputs": [{"name": "to", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "name": "transfer",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "inputs": [{"name": "from", "type": "address"}, {"name": "to", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "name": "transferFrom",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "inputs": [{"name": "owner", "type": "address"}, {"name": "spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "type": "function"
  }
] as const;

// Expanded Membership ABI
const MEMBERSHIP_ABI = [
  {
    "inputs": [],
    "name": "join",
    "outputs": [],
    "type": "function"
  },
  {
    "inputs": [{"name": "refId", "type": "address"}],
    "name": "join",
    "outputs": [],
    "type": "function"
  },
  {
    "inputs": [{"name": "memberAddr", "type": "address"}],
    "name": "isMember",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "inputs": [{"name": "memberAddr", "type": "address"}],
    "name": "getMemberInfo",
    "outputs": [{
      "name": "",
      "type": "tuple",
      "components": [
        {"name": "adaptation", "type": "uint256"},
        {"name": "referrer", "type": "address"},
        {"name": "totalEarnings", "type": "uint256"},
        {"name": "referralEarnings", "type": "uint256"},
        {"name": "referralCount", "type": "uint256"},
        {"name": "isActive", "type": "bool"},
        {"name": "joinedAt", "type": "uint256"}
      ]
    }],
    "type": "function"
  },
  {
    "inputs": [{"name": "member", "type": "address"}],
    "name": "getClaimableCommissions",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  },
  {
    "inputs": [{"name": "member", "type": "address"}],
    "name": "getReferralEarnings",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimCommissions",
    "outputs": [],
    "type": "function"
  }
] as const;

// Expanded Bootstrap Bay ABI
const BOOTSTRAP_BAY_ABI = [
  {
    "inputs": [],
    "name": "contribute",
    "outputs": [],
    "payable": true,
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentRound",
    "outputs": [{
      "name": "",
      "type": "tuple",
      "components": [
        {"name": "entry", "type": "uint256"},
        {"name": "pool", "type": "uint256"},
        {"name": "slots", "type": "uint256"},
        {"name": "reserve", "type": "uint256"},
        {"name": "deadline", "type": "uint256"},
        {"name": "isActive", "type": "bool"}
      ]
    }],
    "type": "function"
  },
  {
    "inputs": [{"name": "contributor", "type": "address"}],
    "name": "getContributorInfo",
    "outputs": [{
      "name": "",
      "type": "tuple",
      "components": [
        {"name": "contribution", "type": "uint256"},
        {"name": "referralBonus", "type": "uint256"},
        {"name": "hasWithdrawn", "type": "bool"},
        {"name": "referrer", "type": "address"},
        {"name": "contributedAt", "type": "uint256"}
      ]
    }],
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRoundStatistics",
    "outputs": [
      {"name": "contributions", "type": "uint256"},
      {"name": "contributors_count", "type": "uint256"},
      {"name": "referralBonuses", "type": "uint256"},
      {"name": "availableSlots", "type": "uint256"},
      {"name": "isActive", "type": "bool"},
      {"name": "rewardsCalculated", "type": "bool"}
    ],
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimRewards",
    "outputs": [],
    "type": "function"
  }
] as const;

export class ContractService {
  private chainId: number;
  private publicClient: any;
  private walletClient?: any;

  constructor(chainId: number, publicClient: any, walletClient?: any) {
    this.chainId = chainId;
    this.publicClient = publicClient;
    this.walletClient = walletClient;
  }

  // VAI Token Contract
  getVAIContract(withSigner = false) {
    const address = getContractAddress(
      this.chainId,
      "VAI_TOKEN"
    ) as `0x${string}`;
    return getContract({
      address,
      abi: VAI_ABI,
      client:
        withSigner && this.walletClient ? this.walletClient : this.publicClient,
    });
  }

  // Membership Contract
  getMembershipContract(withSigner = false) {
    const address = getContractAddress(
      this.chainId,
      "MEMBERSHIP"
    ) as `0x${string}`;
    return getContract({
      address,
      abi: MEMBERSHIP_ABI,
      client:
        withSigner && this.walletClient ? this.walletClient : this.publicClient,
    });
  }

  // Bootstrap Bay Contract
  getBootstrapBayContract(withSigner = false) {
    const address = getContractAddress(
      this.chainId,
      "BOOTSTRAP_BAY"
    ) as `0x${string}`;
    return getContract({
      address,
      abi: BOOTSTRAP_BAY_ABI,
      client:
        withSigner && this.walletClient ? this.walletClient : this.publicClient,
    });
  }
}

// Hook to get contract service instance
export const useContractService = () => {
  const { chain } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  if (!chain || !publicClient) {
    throw new Error("Chain or public client not available");
  }

  return new ContractService(chain.id, publicClient, walletClient);
};
