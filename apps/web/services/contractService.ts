import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { getContract } from "viem";
import { getContractAddress } from "../config/contracts";

// Simple ABI definitions (minimal for now, will be replaced with full ABIs)
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
  }
] as const;

const MEMBERSHIP_ABI = [
  {
    "inputs": [],
    "name": "join",
    "outputs": [],
    "type": "function"
  },
  {
    "inputs": [{"name": "memberAddr", "type": "address"}],
    "name": "isMember",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  }
] as const;

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
    "outputs": [{"name": "", "type": "tuple"}],
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
