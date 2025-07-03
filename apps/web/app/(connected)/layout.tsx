"use client";

import { ReactNode, useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { usePortfolio } from "../../services/portfolioService";
import {
  useReferralCode,
  useMembershipJoin,
} from "../../services/referralService";

interface ConnectedLayoutProps {
  children: ReactNode;
}

export default function ConnectedLayout({ children }: ConnectedLayoutProps) {
  const { address, isConnected, isConnecting } = useAccount();
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio();
  const { referralCode } = useReferralCode();
  const { joinMembership } = useMembershipJoin();
  const router = useRouter();

  // Redirect to home if not connected
  useEffect(() => {
    if (!isConnecting && !isConnected) {
      router.push("/");
    }
  }, [isConnected, isConnecting, router]);

  // Show loading while checking connection and portfolio
  if (isConnecting || portfolioLoading || !address) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show membership required if user is connected but not a member
  if (isConnected && portfolio && !portfolio.membershipStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Membership Required
          </h2>

          <p className="text-gray-600 mb-6">
            You need to join VAI Protocol membership to access this area.
          </p>

          {referralCode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                <span className="font-semibold">Referral Code Detected:</span>
                <br />
                {referralCode.slice(0, 6)}...{referralCode.slice(-4)}
              </p>
              <p className="text-xs text-green-600 mt-1">
                You&apos;ll earn bonus rewards when joining!
              </p>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={async () => {
                try {
                  await joinMembership();
                  // Refresh the page after successful membership join
                  window.location.reload();
                } catch (error) {
                  console.error("Failed to join membership:", error);
                  alert("Failed to join membership. Please try again.");
                }
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Join Membership
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Go Back to Home
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Membership Benefits:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✅ Access to all platform features</li>
              <li>✅ Earn referral commissions</li>
              <li>✅ Participate in Bootstrap Bay</li>
              <li>✅ Vote in governance proposals</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // If user is connected and is a member, show the protected content
  return <>{children}</>;
}
