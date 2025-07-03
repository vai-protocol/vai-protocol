"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import {
  usePortfolio,
  usePortfolioActions,
  useTransactionHistory,
  type TransactionHistory,
} from "../../services/portfolioService";

const PortfolioOverview: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: portfolio, isLoading, error } = usePortfolio();
  const { data: transactionHistory, isLoading: historyLoading } =
    useTransactionHistory(20);
  const { claimCommissions, transferVAI } = usePortfolioActions();

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);

  if (!isConnected) {
    return (
      <div className="card p-6 text-center">
        <div className="text-6xl mb-4">👛</div>
        <h2 className="text-xl font-semibold mb-2">Portfolio Overview</h2>
        <p className="text-gray-600 mb-4">
          Connect your wallet to view your portfolio and transaction history
        </p>
        <appkit-button />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-300 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6 border-red-200 bg-red-50">
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          Error Loading Portfolio
        </h2>
        <p className="text-red-600">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-secondary mt-4"
        >
          Retry
        </button>
      </div>
    );
  }

  const handleClaimCommissions = async () => {
    try {
      const result = await claimCommissions();
      console.log("Commissions claimed:", result);
      // TODO: Show success notification and refresh data
    } catch (error) {
      console.error("Error claiming commissions:", error);
      // TODO: Show error notification
    }
  };

  const handleTransferVAI = async () => {
    if (!transferTo || !transferAmount) return;

    setIsTransferring(true);
    try {
      const result = await transferVAI(transferTo, transferAmount);
      console.log("VAI transferred:", result);
      setShowTransferModal(false);
      setTransferTo("");
      setTransferAmount("");
      // TODO: Show success notification and refresh data
    } catch (error) {
      console.error("Error transferring VAI:", error);
      // TODO: Show error notification
    } finally {
      setIsTransferring(false);
    }
  };

  const getTransactionIcon = (type: TransactionHistory["type"]) => {
    switch (type) {
      case "VAI_TRANSFER":
        return "📤";
      case "VAI_RECEIVE":
        return "📥";
      case "COMMISSION_CLAIM":
        return "💰";
      case "BOOTSTRAP_CONTRIBUTE":
        return "🚀";
      case "BOOTSTRAP_CLAIM":
        return "🎁";
      default:
        return "📊";
    }
  };

  const getTransactionLabel = (type: TransactionHistory["type"]) => {
    switch (type) {
      case "VAI_TRANSFER":
        return "VAI Sent";
      case "VAI_RECEIVE":
        return "VAI Received";
      case "COMMISSION_CLAIM":
        return "Commission Claimed";
      case "BOOTSTRAP_CONTRIBUTE":
        return "Bootstrap Contribution";
      case "BOOTSTRAP_CLAIM":
        return "Bootstrap Reward";
      default:
        return "Transaction";
    }
  };

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Portfolio Overview</h1>
            <p className="text-gray-600">
              Connected: {formatAddress(address!)}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                portfolio?.membershipStatus
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {portfolio?.membershipStatus ? "👤 Member" : "❌ Not Member"}
            </span>
            {portfolio?.membershipStatus && (
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Score: {portfolio.adaptationScore}/10000
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-blue-600 font-medium">VAI Balance</div>
            <div className="text-2xl">🪙</div>
          </div>
          <div className="text-2xl font-bold text-blue-700">
            {parseFloat(portfolio?.vaiBalance || "0").toLocaleString()} VAI
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-yellow-600 font-medium">
              BNB Balance
            </div>
            <div className="text-2xl">💎</div>
          </div>
          <div className="text-2xl font-bold text-yellow-700">
            {parseFloat(portfolio?.bnbBalance || "0").toFixed(4)} BNB
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-green-600 font-medium">
              Total Earnings
            </div>
            <div className="text-2xl">📈</div>
          </div>
          <div className="text-2xl font-bold text-green-700">
            {parseFloat(portfolio?.totalEarnings || "0").toFixed(4)} BNB
          </div>
        </div>

        <div className="stat-card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-purple-600 font-medium">
              Referral Earnings
            </div>
            <div className="text-2xl">👥</div>
          </div>
          <div className="text-2xl font-bold text-purple-700">
            {parseFloat(portfolio?.referralEarnings || "0").toFixed(4)} BNB
          </div>
        </div>
      </div>

      {/* Claimable Commissions */}
      {portfolio && parseFloat(portfolio.claimableCommissions) > 0 && (
        <div className="card p-6 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="text-3xl mr-3">💰</div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                  Commission Ready to Claim
                </h3>
                <p className="text-green-600">
                  You have{" "}
                  {parseFloat(portfolio.claimableCommissions).toFixed(4)} BNB
                  available to claim
                </p>
              </div>
            </div>
            <button
              onClick={handleClaimCommissions}
              className="btn-primary mt-4 md:mt-0"
            >
              💎 Claim Now
            </button>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Membership & Actions */}
        <div className="space-y-6">
          {/* Membership Details */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">👤</span>
              Membership Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span
                  className={`font-semibold ${portfolio?.membershipStatus ? "text-green-600" : "text-yellow-600"}`}
                >
                  {portfolio?.membershipStatus ? "Active Member" : "Not Member"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Adaptation Score</span>
                <span className="font-semibold">
                  {portfolio?.adaptationScore || 0}/10000
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Referral Count</span>
                <span className="font-semibold">
                  {portfolio?.referralCount || 0}
                </span>
              </div>
              {portfolio?.referrerAddress && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Referrer</span>
                  <span className="font-semibold text-purple-600">
                    {formatAddress(portfolio.referrerAddress)}
                  </span>
                </div>
              )}
              {portfolio?.joinedAt && portfolio.joinedAt > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold">
                    {new Date(portfolio.joinedAt * 1000).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((portfolio?.adaptationScore || 0) / 10000) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Adaptation Score Progress
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">⚡</span>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                className="btn-secondary w-full flex items-center justify-center"
                onClick={() => setShowTransferModal(true)}
                disabled={
                  !portfolio?.vaiBalance ||
                  parseFloat(portfolio.vaiBalance) <= 0
                }
              >
                <span className="mr-2">📤</span>
                Transfer VAI
              </button>
              <button
                className="btn-secondary w-full flex items-center justify-center"
                onClick={() =>
                  (window.location.href = "/dashboard/affiliate")
                }
              >
                <span className="mr-2">👥</span>
                View Referrals
              </button>
              <button
                className="btn-secondary w-full flex items-center justify-center"
                onClick={() => (window.location.href = "/bootstrap")}
              >
                <span className="mr-2">🚀</span>
                Join Bootstrap
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Transaction History
              {historyLoading && (
                <span className="ml-2 text-sm text-gray-500">(Loading...)</span>
              )}
            </h3>

            {transactionHistory && transactionHistory.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactionHistory.map((tx, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">
                        {getTransactionIcon(tx.type)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {getTransactionLabel(tx.type)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(tx.timestamp * 1000).toLocaleString()}
                        </div>
                        {tx.hash && (
                          <div className="text-xs text-blue-600">
                            <a
                              href={`https://bscscan.com/tx/${tx.hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {formatAddress(tx.hash)}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-semibold ${
                          tx.type.includes("RECEIVE") ||
                          tx.type.includes("CLAIM")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.type.includes("RECEIVE") ||
                        tx.type.includes("CLAIM")
                          ? "+"
                          : "-"}
                        {parseFloat(tx.amount).toFixed(4)} {tx.token}
                      </div>
                      {(tx.from || tx.to) && (
                        <div className="text-xs text-gray-500">
                          {tx.type.includes("TRANSFER") && tx.to
                            ? `To: ${formatAddress(tx.to)}`
                            : ""}
                          {tx.type.includes("RECEIVE") && tx.from
                            ? `From: ${formatAddress(tx.from)}`
                            : ""}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">📭</div>
                <div className="text-lg font-medium mb-2">
                  No Transactions Yet
                </div>
                <p className="text-sm">
                  Your transaction history will appear here once you start using
                  the platform.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="card p-6 m-4 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Transfer VAI</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Address
                </label>
                <input
                  type="text"
                  value={transferTo}
                  onChange={(e) => setTransferTo(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (VAI)
                </label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Available:{" "}
                  {parseFloat(portfolio?.vaiBalance || "0").toLocaleString()}{" "}
                  VAI
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowTransferModal(false)}
                className="btn-secondary flex-1"
                disabled={isTransferring}
              >
                Cancel
              </button>
              <button
                onClick={handleTransferVAI}
                className="btn-primary flex-1"
                disabled={!transferTo || !transferAmount || isTransferring}
              >
                {isTransferring ? "Transferring..." : "Transfer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioOverview;
