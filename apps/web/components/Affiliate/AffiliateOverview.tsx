"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import {
  useAffiliate,
  useAffiliateActions,
  useReferralStats,
  useVAIBalance,
  // type ReferredUser,
} from "../../services/affiliateService";

const AffiliateOverview: React.FC = () => {
  const { isConnected } = useAccount();
  const { data: affiliate, isLoading, error } = useAffiliate();
  const { data: stats } = useReferralStats();
  const { data: vaiBalance } = useVAIBalance();
  const { generateReferralLink, claimReferralCommissions } =
    useAffiliateActions();
  const [copiedLink, setCopiedLink] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
      // TODO: Show success notification and refresh data
    } catch (error) {
      console.error("Error claiming commissions:", error);
      // TODO: Show error notification
    }
  };

  const handleRefreshData = async () => {
    setRefreshing(true);
    try {
      // Force refetch all queries
      window.location.reload(); // Simple refresh for now
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Source Notice */}
      {affiliate && (
        <div
          className={`border rounded-lg p-4 ${
            affiliate.totalReferrals > 0
              ? "bg-green-50 border-green-200"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className={`h-5 w-5 ${
                  affiliate.totalReferrals > 0
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p
                className={`text-sm ${
                  affiliate.totalReferrals > 0
                    ? "text-green-800"
                    : "text-yellow-800"
                }`}
              >
                {affiliate.totalReferrals > 0 ? (
                  <>
                    <span className="font-semibold">Live Data:</span> Displaying
                    real referral data from membership contract. All commissions
                    are paid in VAI tokens.
                  </>
                ) : (
                  <>
                    <span className="font-semibold">No Referrals:</span> No
                    referrals found for this address. Share your referral link
                    to start earning VAI commissions!
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contract Integration Info */}
      {/* {address && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Current Address:</span>
                <code className="ml-1 bg-white px-2 py-1 rounded font-mono text-xs">
                  {address}
                </code>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                <span className="font-semibold">Data Source:</span>
              </p>
              <div className="mt-1 space-y-1 text-xs text-gray-500">
                <div>
                  <span className="font-medium">Live Contract Data</span> - Real
                  referral data from membership contract
                </div>
                <div>
                  <span className="font-medium">Empty State</span> - When no
                  referrals exist or contracts not available
                </div>
              </div>

              {affiliate && affiliate.totalReferrals === 0 && (
                <div className="mt-2 p-2 bg-yellow-100 rounded text-xs">
                  <p className="text-yellow-800">
                    <span className="font-semibold">No referrals found.</span>{" "}
                    Possible reasons:
                  </p>
                  <ul className="list-disc list-inside mt-1 text-yellow-700">
                    <li>You haven&apos;t referred anyone yet</li>
                    <li>You&apos;re not a member of the protocol</li>
                    <li>Membership contract not deployed/configured</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-4 md:mt-0 md:ml-4">
              <p className="text-xs text-gray-500 mb-2">Contract Status:</p>
              <div className="space-y-2">
                <div className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                  Reading from Membership Contract
                </div>
                <div className="px-3 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">
                  VAI Token Integration (9 decimals)
                </div>
                <div className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded">
                  Real-time Data Updates
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Affiliate Program</h1>
            <p className="text-gray-600">
              Earn {affiliate?.referralRate}% commission on every referral
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={handleRefreshData}
              disabled={refreshing}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
            >
              <svg
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
            <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              Code: {affiliate?.referralCode}
            </span>
          </div>
        </div>
      </div>

      {/* Commission Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">VAI Balance</div>
          <div className="text-2xl font-bold text-indigo-600">
            {parseFloat(vaiBalance || "0").toLocaleString()} VAI
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Total Referrals</div>
          <div className="text-2xl font-bold text-blue-600">
            {affiliate?.totalReferrals || 0}
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Total Commissions</div>
          <div className="text-2xl font-bold text-green-600">
            {parseFloat(affiliate?.totalCommissions || "0").toLocaleString()}{" "}
            VAI
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Monthly Earnings</div>
          <div className="text-2xl font-bold text-purple-600">
            {parseFloat(affiliate?.monthlyEarnings || "0").toLocaleString()} VAI
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Claimable</div>
          <div className="text-2xl font-bold text-orange-600">
            {parseFloat(
              affiliate?.claimableCommissions || "0"
            ).toLocaleString()}{" "}
            VAI
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
                You have{" "}
                {parseFloat(affiliate.claimableCommissions).toLocaleString()}{" "}
                VAI in commissions available
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
                {stats?.totalVolume || "0"} VAI
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">This Month</span>
              <span className="font-semibold">
                {stats?.thisMonthVolume || "0"} VAI
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
                    <td className="py-3 font-mono text-sm">{user.address}</td>
                    <td className="py-3">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3 text-right font-semibold">
                      {parseFloat(user.commissionEarned).toLocaleString()} VAI
                    </td>
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
