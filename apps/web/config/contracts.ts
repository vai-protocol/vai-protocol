// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  bsc: {
    VAI_TOKEN: process.env.NEXT_PUBLIC_VAI_TOKEN_BSC || "",
    MEMBERSHIP: process.env.NEXT_PUBLIC_MEMBERSHIP_BSC || "",
    BOOTSTRAP_BAY: process.env.NEXT_PUBLIC_BOOTSTRAP_BAY_BSC || "",
  },
  bscTestnet: {
    VAI_TOKEN: process.env.NEXT_PUBLIC_VAI_TOKEN_BSC_TESTNET || "",
    MEMBERSHIP: process.env.NEXT_PUBLIC_MEMBERSHIP_BSC_TESTNET || "",
    BOOTSTRAP_BAY: process.env.NEXT_PUBLIC_BOOTSTRAP_BAY_BSC_TESTNET || "",
  },
} as const;

// Network mapping
export const NETWORK_NAMES = {
  56: "bsc",
  97: "bscTestnet",
} as const;

export type NetworkName = keyof typeof CONTRACT_ADDRESSES;
export type ContractName = keyof typeof CONTRACT_ADDRESSES.bsc;

// Helper function to get contract address
export const getContractAddress = (
  chainId: number,
  contractName: ContractName
): string => {
  const networkName = NETWORK_NAMES[chainId as keyof typeof NETWORK_NAMES];
  if (!networkName) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }

  const address = CONTRACT_ADDRESSES[networkName][contractName];
  if (!address) {
    throw new Error(
      `Contract ${contractName} not configured for network ${networkName}`
    );
  }

  return address;
};

// Contract ABIs (imported from typechain)
export {
  VAI__factory,
  Membership__factory,
  BootstrapBay__factory,
} from "../../core/typechain-types";
