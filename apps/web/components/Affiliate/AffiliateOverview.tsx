"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import {
  useAffiliate,
  useAffiliateActions,
  useReferralStats,
} from "../../services/affiliateService";

const AffiliateOverview: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: affiliate, isLoading, error } = useAffiliate();
  const { data: stats } = useReferralStats();
  const { generateReferralLink, claimReferralCommissions } =
    useAffiliateActions();
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isConnected) {
    return (
      <div className="card p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Affiliate Program</h2>
        <p className="text-gray-600">
          Connect your wallet to access the affiliate program
        </p>
        <appkit-button />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6 border-red-200 bg-red-50">
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          Error Loading Affiliate Data
        </h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  const referralLink = generateReferralLink();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleClaimCommissions = async () => {
    try {
      const result = await claimReferralCommissions();
      console.log("Commissions claimed:", result);
      // TODO: Show success notification
    } catch (error) {
      console.error("Error claiming commissions:", error);
      // TODO: Show error notification
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Affiliate Program</h1>
            <p className="text-gray-600">
              Earn {affiliate?.referralRate}% commission on every referral
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              Code: {affiliate?.referralCode}
            </span>
          </div>
        </div>
      </div>

      {/* Commission Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Total Referrals</div>
          <div className="text-2xl font-bold text-blue-600">
            {affiliate?.totalReferrals || 0}
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Total Commissions</div>
          <div className="text-2xl font-bold text-green-600">
            ${parseFloat(affiliate?.totalCommissions || "0").toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Monthly Earnings</div>
          <div className="text-2xl font-bold text-purple-600">
            ${parseFloat(affiliate?.monthlyEarnings || "0").toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Claimable</div>
          <div className="text-2xl font-bold text-orange-600">
            $
            {parseFloat(
              affiliate?.claimableCommissions || "0"
            ).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Claimable Commissions */}
      {affiliate && parseFloat(affiliate.claimableCommissions) > 0 && (
        <div className="card p-6 border-green-200 bg-green-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-1">
                Commission Ready to Claim
              </h3>
              <p className="text-green-600">
                You have $
                {parseFloat(affiliate.claimableCommissions).toLocaleString()} in
                commissions available
              </p>
            </div>
            <button
              onClick={handleClaimCommissions}
              className="btn-primary mt-4 md:mt-0"
            >
              Claim Commissions
            </button>
          </div>
        </div>
      )}

      {/* Referral Link */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Your Referral Link</h3>
          <div className="space-y-4">
            <div className="flex rounded-lg border border-gray-300">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-l-lg focus:outline-none text-sm"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-r-lg text-sm font-medium transition-colors ${
                  copiedLink
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {copiedLink ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="flex gap-2">
              <button className="btn-secondary flex-1 text-sm">
                Share on Twitter
              </button>
              <button className="btn-secondary flex-1 text-sm">
                Share on Telegram
              </button>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Volume</span>
              <span className="font-semibold">
                ${stats?.totalVolume || "0"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">This Month</span>
              <span className="font-semibold">
                ${stats?.thisMonthVolume || "0"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Referrals</span>
              <span className="font-semibold">
                {stats?.activeReferrals || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="font-semibold">
                {stats?.conversionRate || "0"}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Referrals</h3>
        {affiliate?.referredUsers && affiliate.referredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">User</th>
                  <th className="text-left py-2">Date Joined</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-right py-2">Commission Earned</th>
                </tr>
              </thead>
              <tbody>
                {affiliate.referredUsers.slice(0, 5).map((user, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3">
                      {user.slice(0, 6)}...{user.slice(-4)}
                    </td>
                    <td className="py-3">{new Date().toLocaleDateString()}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="py-3 text-right">$0.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No referrals yet. Share your link to start earning!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliateOverview;
