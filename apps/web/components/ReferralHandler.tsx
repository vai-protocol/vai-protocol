"use client";

import { useReferralCode } from "../services/referralService";
import { useEffect, useState } from "react";

export default function ReferralHandler() {
  const [mounted, setMounted] = useState(false);
  const { referralCode } = useReferralCode();

  // Ensure this only runs on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // This hook will automatically handle referral codes from URL
    // and store them in localStorage
    if (mounted && referralCode) {
      console.log("Referral code detected:", referralCode);
    }
  }, [referralCode, mounted]);

  // This component doesn't render anything visible
  return null;
}
