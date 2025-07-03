import { useContractService } from "./contractService";
import { useAccount } from "wagmi";
import { formatUnits, parseUnits, formatEther } from "viem";
import { useQuery } from "@tanstack/react-query";

export interface BootstrapRound {
  id: number;
  entry: string; // BNB amount required to participate
  pool: string; // Total BNB pool
  slots: number; // Total participation slots
  reserve: string; // VAI token reserve
  deadline: number; // Unix timestamp
  isActive: boolean;
}

export interface RoundStatistics {
  contributions: string;
  contributorsCount: number;
  referralBonuses: string;
  availableSlots: number;
  isActive: boolean;
  rewardsCalculated: boolean;
}

export interface ContributorInfo {
  contribution: string;
  referralBonus: string;
  hasWithdrawn: boolean;
  referrer: string;
  contributedAt: number;
  expectedReward: string;
}

export const useBootstrapRound = () => {
  const contractService = useContractService();

  return useQuery({
    queryKey: ["bootstrapRound"],
    queryFn: async (): Promise<BootstrapRound> => {
      // TODO: Implement actual contract call
      const now = Math.floor(Date.now() / 1000);
      const deadline = now + (180 * 24 * 60 * 60); // 180 days from now

      return {
        id: 1,
        entry: "0.1", // 0.1 BNB
        pool: "100", // 100 BNB total pool
        slots: 1000,
        reserve: "1000000", // 1M VAI tokens
        deadline,
        isActive: true,
      };
    },
    refetchInterval: 30000,
  });
};

export const useRoundStatistics = () => {
  const contractService = useContractService();

  return useQuery({
    queryKey: ["roundStatistics"],
    queryFn: async (): Promise<RoundStatistics> => {
      // TODO: Implement actual contract call
      return {
        contributions: "50.5", // Current total contributions
        contributorsCount: 505,
        referralBonuses: "5.05", // Total referral bonuses paid
        availableSlots: 495, // Remaining slots
        isActive: true,
        rewardsCalculated: false,
      };
    },
    refetchInterval: 15000, // More frequent updates for active round
  });
};

export const useContributorInfo = () => {
  const { address } = useAccount();
  const contractService = useContractService();

  return useQuery({
    queryKey: ["contributorInfo", address],
    queryFn: async (): Promise<ContributorInfo | null> => {
      if (!address) return null;

      // TODO: Implement actual contract call
      return {
        contribution: "0.1",
        referralBonus: "0.01",
        hasWithdrawn: false,
        referrer: "0x0000000000000000000000000000000000000000",
        contributedAt: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
        expectedReward: "1000", // Expected VAI reward
      };
    },
    enabled: !!address,
    refetchInterval: 30000,
  });
};

// Bootstrap management functions
export const useBootstrapActions = () => {
  const contractService = useContractService();
  const { address } = useAccount();

  const contribute = async (referrerAddress?: string) => {
    // TODO: Implement actual contract interaction
    console.log(`Contributing to bootstrap bay with referrer: ${referrerAddress || "none"}`);
    return { hash: "0x..." };
  };

  const claimRewards = async () => {
    // TODO: Implement actual contract interaction
    console.log("Claiming bootstrap rewards...");
    return { hash: "0x..." };
  };

  const calculateExpectedRewards = (roundData: BootstrapRound, contribution: string): string => {
    // Simple calculation: (contribution / total_pool) * reserve
    const contributionNum = parseFloat(contribution);
    const poolNum = parseFloat(roundData.pool);
    const reserveNum = parseFloat(roundData.reserve);
    
    if (poolNum === 0) return "0";
    
    const reward = (contributionNum / poolNum) * reserveNum;
    return reward.toFixed(2);
  };

  const getTimeRemaining = (deadline: number) => {
    const now = Math.floor(Date.now() / 1000);
    const remaining = deadline - now;
    
    if (remaining <= 0) return { days: 0, hours: 0, minutes: 0 };
    
    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    
    return { days, hours, minutes };
  };

  const canParticipate = (roundData: BootstrapRound, statistics: RoundStatistics): boolean => {
    const now = Math.floor(Date.now() / 1000);
    return roundData.isActive && 
           now < roundData.deadline && 
           statistics.availableSlots > 0 &&
           !statistics.rewardsCalculated;
  };

  return {
    contribute,
    claimRewards,
    calculateExpectedRewards,
    getTimeRemaining,
    canParticipate,
  };
};

// Hook for bootstrap bay history
export const useBootstrapHistory = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["bootstrapHistory", address],
    queryFn: async () => {
      if (!address) return [];

      // TODO: Implement actual event fetching
      return [
        {
          round: 1,
          action: "contribute",
          amount: "0.1",
          timestamp: Date.now() - 86400000,
          txHash: "0x...",
        },
      ];
    },
    enabled: !!address,
  });
}; 