"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import {
  usePortfolio,
  usePortfolioActions,
} from "../../services/portfolioService";
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
  const { claimCommissions } = usePortfolioActions();

  // Time-based greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  // Performance metrics
  const performanceMetrics = useMemo(() => {
    const vaiBalance = parseFloat(portfolio?.vaiBalance || "0");
    const totalEarnings = parseFloat(portfolio?.totalEarnings || "0");
    const claimable = parseFloat(portfolio?.claimableCommissions || "0");
    const referrals = affiliate?.totalReferrals || 0;

    return {
      vaiBalance,
      totalEarnings,
      claimable,
      referrals,
      performanceScore: Math.min(
        100,
        totalEarnings * 10 + referrals * 5 + vaiBalance * 0.1
      ),
    };
  }, [portfolio, affiliate]);

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="card p-10 text-center max-w-lg shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Welcome to VAI Protocol
          </h1>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Connect your wallet to access your personalized dashboard and start
            your journey in the decentralized AI economy.
          </p>
          <appkit-button />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Enhanced Welcome Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8 shadow-xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-100 text-sm font-medium">
                    Connected
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-3">
                  {greeting}! 👋
                </h1>
                <p className="text-blue-100 text-lg">
                  Welcome back to your VAI Protocol dashboard
                </p>
                <p className="text-blue-200/80 text-sm mt-2 font-mono">
                  {address?.slice(0, 8)}...{address?.slice(-6)}
                </p>
              </div>

              <div className="mt-6 lg:mt-0 lg:text-right">
                <div className="inline-flex items-center space-x-4">
                  {/* Performance Score */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div className="text-white/90 text-sm font-medium mb-1">
                      Performance Score
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {Math.round(performanceMetrics.performanceScore)}
                    </div>
                    <div className="w-20 h-2 bg-white/20 rounded-full mt-2">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, performanceMetrics.performanceScore)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Membership Status */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                        portfolio?.membershipStatus
                          ? "bg-green-400/20 text-green-100 border border-green-400/30"
                          : "bg-yellow-400/20 text-yellow-100 border border-yellow-400/30"
                      }`}
                    >
                      {portfolio?.membershipStatus
                        ? "✅ VAI Member"
                        : "⏳ Join Membership"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-full"></div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* VAI Balance Card */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
                  VAI Balance
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {portfolioLoading ? (
                  <div className="animate-pulse h-8 bg-gray-200 rounded-lg w-28"></div>
                ) : (
                  `${performanceMetrics.vaiBalance.toLocaleString()}`
                )}
              </div>
              <div className="text-blue-600 text-sm font-medium">
                VAI Tokens
              </div>
            </div>
          </div>

          {/* Total Earnings Card */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="text-green-600 text-xs font-semibold uppercase tracking-wider">
                  Total Earnings
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {portfolioLoading ? (
                  <div className="animate-pulse h-8 bg-gray-200 rounded-lg w-24"></div>
                ) : (
                  `$${performanceMetrics.totalEarnings.toLocaleString()}`
                )}
              </div>
              <div className="text-green-600 text-sm font-medium">All Time</div>
            </div>
          </div>

          {/* Claimable Rewards Card */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
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
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <div className="text-purple-600 text-xs font-semibold uppercase tracking-wider">
                  Claimable
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {portfolioLoading ? (
                  <div className="animate-pulse h-8 bg-gray-200 rounded-lg w-20"></div>
                ) : (
                  `$${performanceMetrics.claimable.toLocaleString()}`
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-purple-600 text-sm font-medium">
                  Ready to claim
                </div>
                {performanceMetrics.claimable > 0 && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </div>

          {/* Referrals Card */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 opacity-50"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-orange-600"
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
                <div className="text-orange-600 text-xs font-semibold uppercase tracking-wider">
                  Referrals
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {affiliateLoading ? (
                  <div className="animate-pulse h-8 bg-gray-200 rounded-lg w-16"></div>
                ) : (
                  performanceMetrics.referrals
                )}
              </div>
              <div className="text-orange-600 text-sm font-medium">
                Active Members
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Card */}
          <Link href="/dashboard/portfolio">
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Portfolio
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Manage your VAI tokens, view earnings history, and track your
                  portfolio performance with detailed analytics.
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">VAI Balance</span>
                    <span className="font-bold text-gray-900">
                      {performanceMetrics.vaiBalance.toLocaleString()} VAI
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Claimable Rewards</span>
                    <span className="font-bold text-green-600">
                      ${performanceMetrics.claimable.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Affiliate Card */}
          <Link href="/dashboard/affiliate">
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-purple-600 group-hover:translate-x-1 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Affiliate Program
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Share your referral link and earn commissions. Build your
                  network and grow your passive income.
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Referrals</span>
                    <span className="font-bold text-gray-900">
                      {performanceMetrics.referrals}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Commission Rate</span>
                    <span className="font-bold text-purple-600">
                      {affiliate?.referralRate || 10}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Bootstrap Card */}
          <Link href="/bootstrap">
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-green-600 group-hover:translate-x-1 transition-transform">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Bootstrap Bay
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Participate in bootstrap rounds to earn VAI tokens and help
                  fund innovative AI projects.
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Current Round</span>
                    <span
                      className={`font-bold ${bootstrapRound?.isActive ? "text-green-600" : "text-gray-400"}`}
                    >
                      {bootstrapRound?.isActive
                        ? `Round #${bootstrapRound.id}`
                        : "Inactive"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Participants</span>
                    <span className="font-bold text-gray-900">
                      {roundStats?.contributorsCount || 0} /{" "}
                      {bootstrapRound?.slots || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-0">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Quick Actions</h3>
            <div className="text-gray-400">
              <svg
                className="w-6 h-6"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Claim Rewards Action */}
            <button
              onClick={() =>
                performanceMetrics.claimable > 0 && claimCommissions()
              }
              disabled={performanceMetrics.claimable === 0}
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                performanceMetrics.claimable > 0
                  ? "border-green-200 hover:border-green-300 bg-green-50 hover:bg-green-100 text-green-700"
                  : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  performanceMetrics.claimable > 0
                    ? "bg-green-100"
                    : "bg-gray-100"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <div className="text-lg font-semibold mb-2">Claim Rewards</div>
              <div className="text-sm opacity-75">
                {performanceMetrics.claimable > 0
                  ? `$${performanceMetrics.claimable.toLocaleString()} available`
                  : "No rewards available"}
              </div>
              {performanceMetrics.claimable > 0 && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </button>

            {/* Share Referral Action */}
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}?ref=${address}`
                )
              }
              className="group relative p-6 rounded-2xl border-2 border-purple-200 hover:border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-700 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </div>
              <div className="text-lg font-semibold mb-2">Share Referral</div>
              <div className="text-sm opacity-75">
                Earn {affiliate?.referralRate || 10}% commission
              </div>
            </button>

            {/* Join Bootstrap Action */}
            <Link href="/bootstrap">
              <button
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 w-full ${
                  bootstrapRound?.isActive
                    ? "border-blue-200 hover:border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700"
                    : "border-gray-200 bg-gray-50 text-gray-400"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    bootstrapRound?.isActive ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
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
                <div className="text-lg font-semibold mb-2">
                  Bootstrap Round
                </div>
                <div className="text-sm opacity-75">
                  {bootstrapRound?.isActive
                    ? `${bootstrapRound.entry} BNB to join`
                    : "No active round"}
                </div>
                {bootstrapRound?.isActive && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </button>
            </Link>

            {/* Portfolio Action */}
            <Link href="/dashboard/portfolio">
              <button className="group relative p-6 rounded-2xl border-2 border-indigo-200 hover:border-indigo-300 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-all duration-300 w-full">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6"
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
                <div className="text-lg font-semibold mb-2">View Portfolio</div>
                <div className="text-sm opacity-75">
                  Detailed analytics & history
                </div>
              </button>
            </Link>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border-0">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Performance Insights
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Achievement Progress */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-800">
                Achievement Progress
              </h4>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm">🎯</span>
                    </div>
                    <span className="text-gray-700">First 1000 VAI</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.min(
                      100,
                      (performanceMetrics.vaiBalance / 1000) * 100
                    ).toFixed(0)}
                    %
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (performanceMetrics.vaiBalance / 1000) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 text-sm">👥</span>
                    </div>
                    <span className="text-gray-700">Refer 10 Members</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.min(
                      100,
                      (performanceMetrics.referrals / 10) * 100
                    ).toFixed(0)}
                    %
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (performanceMetrics.referrals / 10) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-800">
                Quick Statistics
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {portfolio?.adaptationScore || 5000}
                  </div>
                  <div className="text-sm text-green-700">Adaptation Score</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {portfolio?.referralCount || 0}
                  </div>
                  <div className="text-sm text-blue-700">Active Referrals</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(performanceMetrics.performanceScore)}
                  </div>
                  <div className="text-sm text-purple-700">
                    Performance Score
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">
                    {portfolio?.membershipStatus ? "✓" : "○"}
                  </div>
                  <div className="text-sm text-orange-700">Membership</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
