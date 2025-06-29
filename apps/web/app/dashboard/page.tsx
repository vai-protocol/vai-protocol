"use client";

import React from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { usePortfolio } from "../../services/portfolioService";
import { useAffiliate } from "../../services/affiliateService";
import {
  useBootstrapRound,
  useRoundStatistics,
} from "../../services/bootstrapService";

const DashboardPage: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio();
  const { data: affiliate, isLoading: affiliateLoading } = useAffiliate();
  const { data: bootstrapRound } = useBootstrapRound();
  const { data: roundStats } = useRoundStatistics();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-8 text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4">Welcome to VAI Protocol</h1>
          <p className="text-gray-600 mb-6">
            Connect your wallet to access your dashboard and start earning with
            VAI Protocol
          </p>
          <appkit-button />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-gray-600">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                portfolio?.membershipStatus
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {portfolio?.membershipStatus ? "VAI Member" : "Join Membership"}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">VAI Balance</div>
          <div className="text-2xl font-bold text-blue-600">
            {portfolioLoading ? (
              <div className="animate-pulse h-8 bg-gray-300 rounded w-24"></div>
            ) : (
              `${parseFloat(portfolio?.vaiBalance || "0").toLocaleString()} VAI`
            )}
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Total Earnings</div>
          <div className="text-2xl font-bold text-green-600">
            {portfolioLoading ? (
              <div className="animate-pulse h-8 bg-gray-300 rounded w-24"></div>
            ) : (
              `$${parseFloat(portfolio?.totalEarnings || "0").toLocaleString()}`
            )}
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Referrals</div>
          <div className="text-2xl font-bold text-purple-600">
            {affiliateLoading ? (
              <div className="animate-pulse h-8 bg-gray-300 rounded w-16"></div>
            ) : (
              affiliate?.totalReferrals || 0
            )}
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Bootstrap Status</div>
          <div className="text-lg font-bold text-orange-600">
            {bootstrapRound?.isActive ? "Active Round" : "No Active Round"}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Portfolio Card */}
        <Link href="/dashboard/portfolio">
          <div className="card p-6 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Portfolio</h3>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Manage your VAI tokens, view earnings, and track your portfolio
              performance.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>VAI Balance:</span>
                <span className="font-semibold">
                  {parseFloat(portfolio?.vaiBalance || "0").toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Claimable:</span>
                <span className="font-semibold text-green-600">
                  $
                  {parseFloat(
                    portfolio?.claimableCommissions || "0"
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Affiliate Card */}
        <Link href="/dashboard/affiliate">
          <div className="card p-6 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Affiliate</h3>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Refer friends and earn commissions. Share your referral link and
              track performance.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Referrals:</span>
                <span className="font-semibold">
                  {affiliate?.totalReferrals || 0}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Commission Rate:</span>
                <span className="font-semibold text-purple-600">
                  {affiliate?.referralRate || 10}%
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Bootstrap Card */}
        <Link href="/dashboard/bootstrap">
          <div className="card p-6 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Bootstrap Bay</h3>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Participate in bootstrap rounds to earn VAI tokens and support the
              ecosystem.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current Round:</span>
                <span
                  className={`font-semibold ${
                    bootstrapRound?.isActive
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {bootstrapRound?.isActive
                    ? `#${bootstrapRound.id}`
                    : "Inactive"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Participants:</span>
                <span className="font-semibold">
                  {roundStats?.contributorsCount || 0} /{" "}
                  {bootstrapRound?.slots || 0}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="btn-secondary p-4 text-center">
            <div className="text-sm font-medium">Claim Rewards</div>
            <div className="text-xs text-gray-500 mt-1">
              {portfolio?.claimableCommissions
                ? `$${parseFloat(portfolio.claimableCommissions).toLocaleString()} available`
                : "No rewards available"}
            </div>
          </button>

          <button className="btn-secondary p-4 text-center">
            <div className="text-sm font-medium">Join Membership</div>
            <div className="text-xs text-gray-500 mt-1">
              {portfolio?.membershipStatus
                ? "Already a member"
                : "Start earning commissions"}
            </div>
          </button>

          <button className="btn-secondary p-4 text-center">
            <div className="text-sm font-medium">Share Referral</div>
            <div className="text-xs text-gray-500 mt-1">
              Earn {affiliate?.referralRate || 10}% commission
            </div>
          </button>

          <button className="btn-secondary p-4 text-center">
            <div className="text-sm font-medium">Bootstrap Round</div>
            <div className="text-xs text-gray-500 mt-1">
              {bootstrapRound?.isActive
                ? `${bootstrapRound.entry} BNB to join`
                : "No active round"}
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="text-center py-8 text-gray-500">
          <p>No recent activity to display.</p>
          <p className="text-sm mt-1">
            Start using VAI Protocol features to see your activity here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
