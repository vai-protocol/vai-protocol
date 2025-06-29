"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  useBootstrapRound,
  useRoundStatistics,
  useContributorInfo,
  useBootstrapActions,
} from "../../services/bootstrapService";

const BootstrapOverview: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data: roundData, isLoading: roundLoading } = useBootstrapRound();
  const { data: statistics, isLoading: statsLoading } = useRoundStatistics();
  const { data: contributorInfo } = useContributorInfo();
  const {
    contribute,
    claimRewards,
    calculateExpectedRewards,
    getTimeRemaining,
    canParticipate,
  } = useBootstrapActions();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [referrerAddress, setReferrerAddress] = useState("");
  const [isContributing, setIsContributing] = useState(false);

  // Update countdown timer
  useEffect(() => {
    if (!roundData) return;

    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(roundData.deadline));
    }, 1000);

    return () => clearInterval(timer);
  }, [roundData, getTimeRemaining]);

  if (!isConnected) {
    return (
      <div className="card p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Bootstrap Bay</h2>
        <p className="text-gray-600">
          Connect your wallet to participate in Bootstrap Bay
        </p>
        <appkit-button />
      </div>
    );
  }

  if (roundLoading || statsLoading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!roundData || !statistics) {
    return (
      <div className="card p-6 border-red-200 bg-red-50">
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          No Active Round
        </h2>
        <p className="text-red-600">
          There is no active bootstrap round at the moment.
        </p>
      </div>
    );
  }

  const handleContribute = async () => {
    setIsContributing(true);
    try {
      const result = await contribute(referrerAddress || undefined);
      console.log("Contribution successful:", result);
      // TODO: Show success notification and refresh data
    } catch (error) {
      console.error("Error contributing:", error);
      // TODO: Show error notification
    } finally {
      setIsContributing(false);
    }
  };

  const handleClaimRewards = async () => {
    try {
      const result = await claimRewards();
      console.log("Rewards claimed:", result);
      // TODO: Show success notification
    } catch (error) {
      console.error("Error claiming rewards:", error);
      // TODO: Show error notification
    }
  };

  const expectedReward = calculateExpectedRewards(roundData, roundData.entry);
  const canUserParticipate = canParticipate(roundData, statistics);
  const progressPercentage = (
    (statistics.contributorsCount / roundData.slots) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Bootstrap Bay - Round {roundData.id}
            </h1>
            <p className="text-gray-600">
              Participate in the bootstrap round to earn VAI tokens
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                roundData.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {roundData.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="card p-6 text-center bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg font-semibold mb-4">Time Remaining</h3>
        <div className="flex justify-center gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {timeLeft.days}
            </div>
            <div className="text-sm text-gray-600">Days</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {timeLeft.hours}
            </div>
            <div className="text-sm text-gray-600">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {timeLeft.minutes}
            </div>
            <div className="text-sm text-gray-600">Minutes</div>
          </div>
        </div>
      </div>

      {/* Round Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Entry Fee</div>
          <div className="text-2xl font-bold text-blue-600">
            {roundData.entry} BNB
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Total Pool</div>
          <div className="text-2xl font-bold text-green-600">
            {statistics.contributions} / {roundData.pool} BNB
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">Participants</div>
          <div className="text-2xl font-bold text-purple-600">
            {statistics.contributorsCount} / {roundData.slots}
          </div>
        </div>

        <div className="stat-card">
          <div className="text-sm text-gray-500 mb-1">VAI Reserve</div>
          <div className="text-2xl font-bold text-orange-600">
            {parseFloat(roundData.reserve).toLocaleString()} VAI
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Round Progress</span>
          <span className="text-sm text-gray-600">
            {progressPercentage}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 slots</span>
          <span>{roundData.slots} slots</span>
        </div>
      </div>

      {/* Participation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contribution Form */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Participate Now</h3>

          {contributorInfo ? (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Your Participation
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Contribution:</span>
                    <span className="font-semibold">
                      {contributorInfo.contribution} BNB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Reward:</span>
                    <span className="font-semibold">
                      {contributorInfo.expectedReward} VAI
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Referral Bonus:</span>
                    <span className="font-semibold">
                      {contributorInfo.referralBonus} BNB
                    </span>
                  </div>
                </div>
              </div>

              {statistics.rewardsCalculated &&
                !contributorInfo.hasWithdrawn && (
                  <button
                    onClick={handleClaimRewards}
                    className="btn-primary w-full"
                  >
                    Claim Rewards
                  </button>
                )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">
                  Entry Fee Required
                </div>
                <div className="text-2xl font-bold">{roundData.entry} BNB</div>
                <div className="text-sm text-gray-600 mt-1">
                  Expected Reward: ~{expectedReward} VAI
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referrer Address (Optional)
                </label>
                <input
                  type="text"
                  value={referrerAddress}
                  onChange={(e) => setReferrerAddress(e.target.value)}
                  placeholder="0x... (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Enter a referrer address to give them a commission bonus
                </div>
              </div>

              <button
                onClick={handleContribute}
                disabled={!canUserParticipate || isContributing}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  canUserParticipate && !isContributing
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isContributing
                  ? "Contributing..."
                  : canUserParticipate
                    ? `Contribute ${roundData.entry} BNB`
                    : "Cannot Participate"}
              </button>

              {!canUserParticipate && (
                <div className="text-sm text-red-600 text-center">
                  {!roundData.isActive && "Round is not active"}
                  {roundData.isActive &&
                    statistics.availableSlots === 0 &&
                    "No slots available"}
                  {roundData.isActive &&
                    timeLeft.days === 0 &&
                    timeLeft.hours === 0 &&
                    timeLeft.minutes === 0 &&
                    "Round has ended"}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Round Information */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Round Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Round ID</span>
              <span className="font-semibold">#{roundData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Entry Fee</span>
              <span className="font-semibold">{roundData.entry} BNB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Slots</span>
              <span className="font-semibold">{roundData.slots}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Available Slots</span>
              <span className="font-semibold">{statistics.availableSlots}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">VAI Reserve</span>
              <span className="font-semibold">
                {parseFloat(roundData.reserve).toLocaleString()} VAI
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Deadline</span>
              <span className="font-semibold">
                {new Date(roundData.deadline * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-semibold mb-2">How it works:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Pay the entry fee to participate</li>
              <li>• Earn VAI tokens when the round ends</li>
              <li>• Refer others to earn bonus BNB</li>
              <li>• Claim your rewards after round completion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootstrapOverview;
