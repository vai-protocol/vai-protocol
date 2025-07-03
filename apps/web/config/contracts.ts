// Contract addresses - using simple environment variables
// Network is determined by NEXT_PUBLIC_NETWORK
export const CONTRACT_ADDRESSES = {
  VAI_TOKEN: process.env.NEXT_PUBLIC_VAI_TOKEN || "",
  MEMBERSHIP: process.env.NEXT_PUBLIC_MEMBERSHIP || "",
  BOOTSTRAP_BAY: process.env.NEXT_PUBLIC_BOOTSTRAP_BAY || "",
} as const;

// Contract names type
export type ContractName = keyof typeof CONTRACT_ADDRESSES;

// Helper function to get contract address
export const getContractAddress = (
  chainId: number,
  contractName: ContractName
): string => {
  const address = CONTRACT_ADDRESSES[contractName];
  
  if (!address) {
    throw new Error(
      `Contract ${contractName} not configured. Please set NEXT_PUBLIC_${contractName} in .env.local`
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
