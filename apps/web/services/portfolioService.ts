import { useContractService } from "./contractService";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { formatUnits, parseUnits, formatEther } from "viem";
import { useQuery } from "@tanstack/react-query";

export interface PortfolioData {
  vaiBalance: string;
  bnbBalance: string;
  totalEarnings: string;
  referralEarnings: string;
  claimableCommissions: string;
  membershipStatus: boolean;
  adaptationScore: number;
  referralCount: number;
  joinedAt: number;
  referrerAddress: string;
}

export interface TransactionHistory {
  hash: string;
  type:
    | "VAI_TRANSFER"
    | "VAI_RECEIVE"
    | "COMMISSION_CLAIM"
    | "BOOTSTRAP_CONTRIBUTE"
    | "BOOTSTRAP_CLAIM";
  amount: string;
  token: "VAI" | "BNB";
  timestamp: number;
  from?: string;
  to?: string;
  status: "confirmed" | "pending" | "failed";
}

export const usePortfolio = () => {
  const { address } = useAccount();
  const contractService = useContractService();
  const publicClient = usePublicClient();

  return useQuery({
    queryKey: ["portfolio", address],
    queryFn: async (): Promise<PortfolioData> => {
      if (!address || !publicClient)
        throw new Error("No wallet connected or client unavailable");

      try {
        // Get contracts
        const vaiContract = contractService.getVAIContract();
        const membershipContract = contractService.getMembershipContract();

        // Fetch BNB balance
        const bnbBalance = await publicClient.getBalance({ address });

        // Fetch VAI balance
        const vaiBalance = await publicClient.readContract({
          address: vaiContract.address,
          abi: vaiContract.abi,
          functionName: "balanceOf",
          args: [address],
        });

        // Check membership status
        const isMember = await publicClient.readContract({
          address: membershipContract.address,
          abi: membershipContract.abi,
          functionName: "isMember",
          args: [address],
        });

        // Initialize default member data
        let memberInfo = {
          adaptation: BigInt(0),
          referrer:
            "0x0000000000000000000000000000000000000000" as `0x${string}`,
          totalEarnings: BigInt(0),
          referralEarnings: BigInt(0),
          referralCount: BigInt(0),
          isActive: false,
          joinedAt: BigInt(0),
        };

        let claimableCommissions = BigInt(0);

        // If user is a member, fetch detailed info
        if (isMember) {
          try {
            const memberData = (await publicClient.readContract({
              address: membershipContract.address,
              abi: membershipContract.abi,
              functionName: "getMemberInfo",
              args: [address],
            })) as any[];

            memberInfo = {
              adaptation: memberData[0],
              referrer: memberData[1],
              totalEarnings: memberData[2],
              referralEarnings: memberData[3],
              referralCount: memberData[4],
              isActive: memberData[5],
              joinedAt: memberData[6],
            };

            claimableCommissions = (await publicClient.readContract({
              address: membershipContract.address,
              abi: membershipContract.abi,
              functionName: "getClaimableCommissions",
              args: [address],
            })) as bigint;
          } catch (error) {
            console.warn("Error fetching member info:", error);
          }
        }

        return {
          vaiBalance: formatUnits(vaiBalance as bigint, 9), // VAI has 9 decimals
          bnbBalance: formatEther(bnbBalance),
          totalEarnings: formatEther(memberInfo.totalEarnings),
          referralEarnings: formatEther(memberInfo.referralEarnings),
          claimableCommissions: formatEther(claimableCommissions),
          membershipStatus: isMember as boolean,
          adaptationScore: Number(memberInfo.adaptation),
          referralCount: Number(memberInfo.referralCount),
          joinedAt: Number(memberInfo.joinedAt),
          referrerAddress:
            memberInfo.referrer === "0x0000000000000000000000000000000000000000"
              ? ""
              : memberInfo.referrer,
        };
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        throw error;
      }
    },
    enabled: !!address && !!publicClient,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useTransactionHistory = (limit: number = 20) => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const contractService = useContractService();

  return useQuery({
    queryKey: ["transactionHistory", address, limit],
    queryFn: async (): Promise<TransactionHistory[]> => {
      if (!address || !publicClient)
        throw new Error("No wallet connected or client unavailable");

      try {
        const transactions: TransactionHistory[] = [];

        // Get recent blocks to scan for transactions
        const latestBlock = await publicClient.getBlockNumber();
        const fromBlock = latestBlock - BigInt(10000); // Scan last ~10000 blocks

        // Get contract addresses
        const vaiAddress = contractService.getVAIContract().address;
        const membershipAddress =
          contractService.getMembershipContract().address;
        const bootstrapAddress =
          contractService.getBootstrapBayContract().address;

        // Get transaction logs for various contract interactions
        const vaiLogs = await publicClient.getLogs({
          address: vaiAddress,
          fromBlock,
          toBlock: latestBlock,
          events: [
            {
              type: "event",
              name: "Transfer",
              inputs: [
                { name: "from", type: "address", indexed: true },
                { name: "to", type: "address", indexed: true },
                { name: "value", type: "uint256", indexed: false },
              ],
            },
          ],
        });

        const membershipLogs = await publicClient.getLogs({
          address: membershipAddress,
          fromBlock,
          toBlock: latestBlock,
          events: [
            {
              type: "event",
              name: "CommissionClaimed",
              inputs: [
                { name: "member", type: "address", indexed: true },
                { name: "amount", type: "uint256", indexed: false },
              ],
            },
          ],
        });

        const bootstrapLogs = await publicClient.getLogs({
          address: bootstrapAddress,
          fromBlock,
          toBlock: latestBlock,
          events: [
            {
              type: "event",
              name: "ContributionMade",
              inputs: [
                { name: "contributor", type: "address", indexed: true },
                { name: "amount", type: "uint256", indexed: false },
                { name: "referrer", type: "address", indexed: true },
              ],
            },
            {
              type: "event",
              name: "RewardClaimed",
              inputs: [
                { name: "contributor", type: "address", indexed: true },
                { name: "bnbAmount", type: "uint256", indexed: false },
                { name: "vaiAmount", type: "uint256", indexed: false },
              ],
            },
          ],
        });

        // Process VAI transfers
        for (const log of vaiLogs) {
          const { from, to, value } = log.args as {
            from: string;
            to: string;
            value: bigint;
          };

          if (
            from.toLowerCase() === address.toLowerCase() ||
            to.toLowerCase() === address.toLowerCase()
          ) {
            const block = await publicClient.getBlock({
              blockHash: log.blockHash,
            });

            transactions.push({
              hash: log.transactionHash || "",
              type:
                from.toLowerCase() === address.toLowerCase()
                  ? "VAI_TRANSFER"
                  : "VAI_RECEIVE",
              amount: formatUnits(value, 9),
              token: "VAI",
              timestamp: Number(block.timestamp),
              from,
              to,
              status: "confirmed",
            });
          }
        }

        // Process commission claims
        for (const log of membershipLogs) {
          const { member, amount } = log.args as {
            member: string;
            amount: bigint;
          };

          if (member.toLowerCase() === address.toLowerCase()) {
            const block = await publicClient.getBlock({
              blockHash: log.blockHash,
            });

            transactions.push({
              hash: log.transactionHash || "",
              type: "COMMISSION_CLAIM",
              amount: formatEther(amount),
              token: "BNB",
              timestamp: Number(block.timestamp),
              status: "confirmed",
            });
          }
        }

        // Process bootstrap contributions and claims
        for (const log of bootstrapLogs) {
          if (log.eventName === "ContributionMade") {
            const { contributor, amount } = log.args as {
              contributor: string;
              amount: bigint;
            };

            if (contributor.toLowerCase() === address.toLowerCase()) {
              const block = await publicClient.getBlock({
                blockHash: log.blockHash,
              });

              transactions.push({
                hash: log.transactionHash || "",
                type: "BOOTSTRAP_CONTRIBUTE",
                amount: formatEther(amount),
                token: "BNB",
                timestamp: Number(block.timestamp),
                status: "confirmed",
              });
            }
          } else if (log.eventName === "RewardClaimed") {
            const { contributor, bnbAmount, vaiAmount } = log.args as {
              contributor: string;
              bnbAmount: bigint;
              vaiAmount: bigint;
            };

            if (contributor.toLowerCase() === address.toLowerCase()) {
              const block = await publicClient.getBlock({
                blockHash: log.blockHash,
              });

              // Add BNB reward claim
              if (bnbAmount > 0) {
                transactions.push({
                  hash: log.transactionHash || "",
                  type: "BOOTSTRAP_CLAIM",
                  amount: formatEther(bnbAmount),
                  token: "BNB",
                  timestamp: Number(block.timestamp),
                  status: "confirmed",
                });
              }

              // Add VAI reward claim
              if (vaiAmount > 0) {
                transactions.push({
                  hash: log.transactionHash || "",
                  type: "BOOTSTRAP_CLAIM",
                  amount: formatUnits(vaiAmount, 9),
                  token: "VAI",
                  timestamp: Number(block.timestamp),
                  status: "confirmed",
                });
              }
            }
          }
        }

        // Sort by timestamp (newest first) and limit
        return transactions
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, limit);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        return [];
      }
    },
    enabled: !!address && !!publicClient,
    refetchInterval: 60000, // Refetch every minute
  });
};

// Portfolio management functions
export const usePortfolioActions = () => {
  const contractService = useContractService();
  const { data: walletClient } = useWalletClient();

  const claimCommissions = async () => {
    try {
      if (!walletClient) throw new Error("Wallet client not available");

      const membershipContract = contractService.getMembershipContract();
      const hash = await walletClient.writeContract({
        address: membershipContract.address,
        abi: membershipContract.abi,
        functionName: "claimCommissions",
        args: [],
      });
      return { hash };
    } catch (error) {
      console.error("Error claiming commissions:", error);
      throw error;
    }
  };

  const transferVAI = async (to: string, amount: string) => {
    try {
      if (!walletClient) throw new Error("Wallet client not available");

      const vaiContract = contractService.getVAIContract();
      const parsedAmount = parseUnits(amount, 9); // VAI has 9 decimals
      const hash = await walletClient.writeContract({
        address: vaiContract.address,
        abi: vaiContract.abi,
        functionName: "transfer",
        args: [to as `0x${string}`, parsedAmount],
      });
      return { hash };
    } catch (error) {
      console.error("Error transferring VAI:", error);
      throw error;
    }
  };

  const approveVAI = async (spender: string, amount: string) => {
    try {
      if (!walletClient) throw new Error("Wallet client not available");

      const vaiContract = contractService.getVAIContract();
      const parsedAmount = parseUnits(amount, 9); // VAI has 9 decimals
      const hash = await walletClient.writeContract({
        address: vaiContract.address,
        abi: vaiContract.abi,
        functionName: "approve",
        args: [spender as `0x${string}`, parsedAmount],
      });
      return { hash };
    } catch (error) {
      console.error("Error approving VAI:", error);
      throw error;
    }
  };

  return {
    claimCommissions,
    transferVAI,
    approveVAI,
  };
};
