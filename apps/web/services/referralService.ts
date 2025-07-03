"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useWalletClient } from "wagmi";
import { useContractService } from "./contractService";

const REFERRAL_STORAGE_KEY = "vai_referral_code";

// Hook to handle referral code from URL and localStorage
export const useReferralCode = () => {
  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState<string>("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only run on client side after hydration
    if (!isHydrated || typeof window === "undefined") return;

    // Check for referral code in URL
    const refFromUrl = searchParams.get("ref");

    if (refFromUrl) {
      // Validate the referral code format (should be an Ethereum address)
      if (refFromUrl.length === 42 && refFromUrl.startsWith("0x")) {
        // Save to localStorage
        localStorage.setItem(REFERRAL_STORAGE_KEY, refFromUrl);
        setReferralCode(refFromUrl);

        // Optional: Remove ref from URL to clean it up
        const url = new URL(window.location.href);
        url.searchParams.delete("ref");
        window.history.replaceState({}, "", url.toString());
      }
    } else {
      // Check localStorage for existing referral code
      const storedRef = localStorage.getItem(REFERRAL_STORAGE_KEY);
      if (storedRef) {
        setReferralCode(storedRef);
      }
    }
  }, [searchParams, isHydrated]);

  const getReferralCode = () => {
    if (typeof window === "undefined") return "";
    return referralCode || localStorage.getItem(REFERRAL_STORAGE_KEY) || "";
  };

  const clearReferralCode = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(REFERRAL_STORAGE_KEY);
    setReferralCode("");
  };

  const setManualReferralCode = (code: string) => {
    if (typeof window === "undefined") return false;
    if (code.length === 42 && code.startsWith("0x")) {
      localStorage.setItem(REFERRAL_STORAGE_KEY, code);
      setReferralCode(code);
      return true;
    }
    return false;
  };

  return {
    referralCode: getReferralCode(),
    clearReferralCode,
    setManualReferralCode,
  };
};

// Hook to join membership with referral code
export const useMembershipJoin = () => {
  const { referralCode } = useReferralCode();
  const { data: walletClient } = useWalletClient();
  const contractService = useContractService();

  const joinMembership = async (customReferralCode?: string) => {
    const finalReferralCode = customReferralCode || referralCode;

    try {
      if (!walletClient) {
        throw new Error(
          "Wallet client not available. Please connect your wallet."
        );
      }

      const membershipContract = contractService.getMembershipContract();

      let hash;
      if (
        finalReferralCode &&
        finalReferralCode !== "0x0000000000000000000000000000000000000000"
      ) {
        // Join with referrer
        console.log(`Joining membership with referrer: ${finalReferralCode}`);
        hash = await walletClient.writeContract({
          address: membershipContract.address,
          abi: membershipContract.abi,
          functionName: "join",
          args: [finalReferralCode as `0x${string}`],
        });
      } else {
        // Join without referrer
        console.log("Joining membership without referrer");
        hash = await walletClient.writeContract({
          address: membershipContract.address,
          abi: membershipContract.abi,
          functionName: "join",
          args: [],
        });
      }

      return { hash };
    } catch (error) {
      console.error("Error joining membership:", error);
      throw error;
    }
  };

  return {
    joinMembership,
    currentReferralCode: referralCode,
  };
};
