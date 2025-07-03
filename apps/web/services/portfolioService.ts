/* eslint-disable @typescript-eslint/no-explicit-any */
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
        // Get contracts with error handling for missing addresses
        let vaiContract, membershipContract;

        try {
          vaiContract = contractService.getVAIContract();
          membershipContract = contractService.getMembershipContract();
        } catch (configError) {
          console.warn("Contract addresses not configured:", configError);
          console.info(
            "To fix this, set the following environment variables in .env.local:"
          );
          console.info("NEXT_PUBLIC_VAI_TOKEN=0x...");
          console.info("NEXT_PUBLIC_MEMBERSHIP=0x...");
          console.info("NEXT_PUBLIC_BOOTSTRAP_BAY=0x...");

          return {
            vaiBalance: "0",
            bnbBalance: "0",
            totalEarnings: "0",
            referralEarnings: "0",
            claimableCommissions: "0",
            membershipStatus: false,
            adaptationScore: 0,
            referralCount: 0,
            joinedAt: 0,
            referrerAddress: "",
          };
        }

        // Double check contract addresses are available
        if (!vaiContract.address || !membershipContract.address) {
          console.warn(
            "Contract addresses not configured, using fallback values"
          );
          return {
            vaiBalance: "0",
            bnbBalance: "0",
            totalEarnings: "0",
            referralEarnings: "0",
            claimableCommissions: "0",
            membershipStatus: false,
            adaptationScore: 0,
            referralCount: 0,
            joinedAt: 0,
            referrerAddress: "",
          };
        }

        // Fetch BNB balance
        const bnbBalance = await publicClient
          .getBalance({ address })
          .catch(() => BigInt(0));

        // Fetch VAI balance
        const vaiBalance = await publicClient
          .readContract({
            address: vaiContract.address,
            abi: vaiContract.abi,
            functionName: "balanceOf",
            args: [address],
          })
          .catch((error) => {
            console.warn("Failed to fetch VAI balance:", error);
            return BigInt(0);
          });

        // Check membership status
        const isMember = await publicClient
          .readContract({
            address: membershipContract.address,
            abi: membershipContract.abi,
            functionName: "isMember",
            args: [address],
          })
          .catch((error) => {
            console.warn("Failed to check membership status:", error);
            return false;
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

            if (
              memberData &&
              Array.isArray(memberData) &&
              memberData.length >= 7
            ) {
              memberInfo = {
                adaptation: memberData[0] || BigInt(0),
                referrer:
                  memberData[1] || "0x0000000000000000000000000000000000000000",
                totalEarnings: memberData[2] || BigInt(0),
                referralEarnings: memberData[3] || BigInt(0),
                referralCount: memberData[4] || BigInt(0),
                isActive: memberData[5] || false,
                joinedAt: memberData[6] || BigInt(0),
              };
            }

            claimableCommissions = (await publicClient
              .readContract({
                address: membershipContract.address,
                abi: membershipContract.abi,
                functionName: "getClaimableCommissions",
                args: [address],
              })
              .catch((error) => {
                console.warn("Failed to fetch claimable commissions:", error);
                return BigInt(0);
              })) as bigint;
          } catch (error) {
            console.warn("Error fetching member info:", error);
          }
        }

        return {
          vaiBalance: vaiBalance ? formatUnits(vaiBalance as bigint, 9) : "0", // VAI has 9 decimals
          bnbBalance: bnbBalance ? formatEther(bnbBalance) : "0",
          totalEarnings: memberInfo.totalEarnings
            ? formatEther(memberInfo.totalEarnings)
            : "0",
          referralEarnings: memberInfo.referralEarnings
            ? formatEther(memberInfo.referralEarnings)
            : "0",
          claimableCommissions: claimableCommissions
            ? formatEther(claimableCommissions)
            : "0",
          membershipStatus: isMember as boolean,
          adaptationScore: memberInfo.adaptation
            ? Number(memberInfo.adaptation)
            : 0,
          referralCount: memberInfo.referralCount
            ? Number(memberInfo.referralCount)
            : 0,
          joinedAt: memberInfo.joinedAt ? Number(memberInfo.joinedAt) : 0,
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

        // Get contract addresses with error handling
        let vaiAddress, membershipAddress, bootstrapAddress;

        try {
          vaiAddress = contractService.getVAIContract().address;
          membershipAddress = contractService.getMembershipContract().address;
          bootstrapAddress = contractService.getBootstrapBayContract().address;
        } catch (configError) {
          console.warn(
            "Contract addresses not configured for transaction history:",
            configError
          );
          return [];
        }

        // Get recent blocks to scan for transactions
        const latestBlock = await publicClient.getBlockNumber();
        const fromBlock = latestBlock - BigInt(10000); // Scan last ~10000 blocks

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

      let membershipContract;
      try {
        membershipContract = contractService.getMembershipContract();
      } catch (configError) {
        throw new Error(
          "Membership contract not configured. Please set NEXT_PUBLIC_MEMBERSHIP in .env.local"
        );
      }

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

      let vaiContract;
      try {
        vaiContract = contractService.getVAIContract();
      } catch (configError) {
        throw new Error(
          "VAI contract not configured. Please set NEXT_PUBLIC_VAI_TOKEN in .env.local"
        );
      }

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

      let vaiContract;
      try {
        vaiContract = contractService.getVAIContract();
      } catch (configError) {
        throw new Error(
          "VAI contract not configured. Please set NEXT_PUBLIC_VAI_TOKEN in .env.local"
        );
      }

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
