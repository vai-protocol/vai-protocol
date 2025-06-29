"use client";

import React from "react";
import { useAccount } from "wagmi";
import { usePortfolio, usePortfolioActions } from "../../services/portfolioService";

const PortfolioOverview: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: portfolio, isLoading, error } = usePortfolio();
  const { claimCommissions, transferVAI } = usePortfolioActions();

  if (!isConnected) {
    return (
      <div className="card p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Portfolio Overview</h2>
        <p className="text-gray-600">Please connect your wallet to view your portfolio</p>
        <appkit-button />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6 border-red-200 bg-red-50">
        <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Portfolio</h2>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  const handleClaimCommissions = async () => {
    try {
      const result = await claimCommissions();
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
            <h1 className="text-2xl font-bold mb-2">Portfolio Overview</h1>
            <p className="text-gray-600">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className={`px-3 py-1 rounded-full text-sm ${
              portfolio?.membershipStatus 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {portfolio?.membershipStatus ? "Member" : "Not Member"}
            </span>
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">VAI Balance</div>
          <div className="text-2xl font-bold text-blue-600">
            {parseFloat(portfolio?.vaiBalance || "0").toLocaleString()} VAI
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">BNB Balance</div>
          <div className="text-2xl font-bold text-yellow-600">
            {parseFloat(portfolio?.bnbBalance || "0").toFixed(4)} BNB
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Total Earnings</div>
          <div className="text-2xl font-bold text-green-600">
            ${parseFloat(portfolio?.totalEarnings || "0").toLocaleString()}
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Referral Earnings</div>
          <div className="text-2xl font-bold text-purple-600">
            ${parseFloat(portfolio?.referralEarnings || "0").toLocaleString()}
          </div>
        </div>
      </div>

      {/* Claimable Commissions */}
      {portfolio && parseFloat(portfolio.claimableCommissions) > 0 && (
        <div className="card p-6 border-green-200 bg-green-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-1">
                Claimable Commissions
              </h3>
              <p className="text-green-600">
                You have ${parseFloat(portfolio.claimableCommissions).toLocaleString()} available to claim
              </p>
            </div>
            <button
              onClick={handleClaimCommissions}
              className="btn-primary mt-4 md:mt-0"
            >
              Claim Now
            </button>
          </div>
        </div>
      )}

      {/* Membership Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Membership Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Adaptation Score</span>
              <span className="font-semibold">{portfolio?.adaptationScore || 0}/10000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Referral Count</span>
              <span className="font-semibold">{portfolio?.referralCount || 0}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((portfolio?.adaptationScore || 0) / 10000) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              className="btn-secondary w-full"
              onClick={() => {/* TODO: Implement transfer modal */}}
            >
              Transfer VAI
            </button>
            <button 
              className="btn-secondary w-full"
              onClick={() => {/* TODO: Navigate to affiliate page */}}
            >
              View Referrals
            </button>
            <button 
              className="btn-secondary w-full"
              onClick={() => {/* TODO: Navigate to bootstrap page */}}
            >
              Join Bootstrap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview; 