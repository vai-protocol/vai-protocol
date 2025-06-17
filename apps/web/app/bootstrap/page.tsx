"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Mock data - replace with real contract calls
const mockData = {
  currentRound: 1,
  rounds: [
    {
      id: 1,
      name: "Round 1",
      entryFee: "0.02",
      bnbPool: "2,000",
      specialSlots: "1,000",
      slotReward: "2",
      deadline: new Date("2025-07-01"),
      vaiReserve: "3,000,000,000",
      isActive: true,
      participants: 15432,
      slotsRemaining: 823,
    },
    {
      id: 2,
      name: "Round 2",
      entryFee: "0.2",
      bnbPool: "200,000",
      specialSlots: "10,000",
      slotReward: "20",
      deadline: new Date("2025-10-01"),
      vaiReserve: "30,000,000,000",
      isActive: false,
      participants: 0,
      slotsRemaining: 10000,
    },
    {
      id: 3,
      name: "Round 3",
      entryFee: "2",
      bnbPool: "20,000,000",
      specialSlots: "100,000",
      slotReward: "200",
      deadline: new Date("2026-04-01"),
      vaiReserve: "300,000,000,000",
      isActive: false,
      participants: 0,
      slotsRemaining: 100000,
    },
  ],
  leaderboard: [
    { rank: 1, address: "0x1234...5678", referrals: 847, vaiEarned: "84,700" },
    { rank: 2, address: "0x9876...4321", referrals: 623, vaiEarned: "62,300" },
    { rank: 3, address: "0xabcd...efgh", referrals: 512, vaiEarned: "51,200" },
    { rank: 4, address: "0x5555...3333", referrals: 445, vaiEarned: "44,500" },
    { rank: 5, address: "0x7777...9999", referrals: 398, vaiEarned: "39,800" },
  ],
  globalStats: {
    totalParticipants: "15,432",
    totalBnbLocked: "308.64",
    totalVaiDistributed: "154,320,000",
    totalReferrals: "7,216",
  },
};

const BootstrapPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const activeRound = mockData.rounds.find((round) => round.isActive);
  const currentRound = activeRound || mockData.rounds[0]!;

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +currentRound.deadline - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [currentRound.deadline]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800/30">
                <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                  🌊 Bootstrap Bay Campaign
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="text-gray-900 dark:text-white">Bootstrap</span>{" "}
                <span className="gradient-text">Bay</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Join the community-building campaign and earn VAI tokens.
                Participate in BNB prize pools and receive 10,000 VAI airdrops
                instantly upon entry.
              </p>
            </div>

            {/* Current Round Status */}
            {activeRound ? (
              <div className="card-glass p-8 max-w-5xl mx-auto transform hover:scale-[1.02] transition-transform duration-500 animate-fade-in">
                <div className="space-y-8">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center animate-pulse">
                      🔥
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                      {currentRound.name} is Live!
                    </h2>
                  </div>

                  {/* Countdown Timer */}
                  <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                    {[
                      { value: timeLeft.days, label: "Days" },
                      { value: timeLeft.hours, label: "Hours" },
                      { value: timeLeft.minutes, label: "Minutes" },
                      { value: timeLeft.seconds, label: "Seconds" },
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-4 shadow-lg hover:shadow-glow transition-shadow duration-300">
                          <div className="text-2xl lg:text-3xl font-bold">
                            {item.value}
                          </div>
                          <div className="text-sm font-medium">
                            {item.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        value: `${currentRound.entryFee} BNB`,
                        label: "Entry Fee",
                        icon: "💰",
                        color: "from-green-400 to-green-600",
                      },
                      {
                        value: `${currentRound.bnbPool} BNB`,
                        label: "Prize Pool",
                        icon: "🏆",
                        color: "from-yellow-400 to-orange-500",
                      },
                      {
                        value: currentRound.slotsRemaining,
                        label: "Slots Left",
                        icon: "🎯",
                        color: "from-blue-400 to-blue-600",
                      },
                      {
                        value: "10,000 VAI",
                        label: "Airdrop",
                        icon: "🪂",
                        color: "from-purple-400 to-purple-600",
                      },
                    ].map((stat, index) => (
                      <div key={index} className="stat-card group">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform`}
                        >
                          {stat.icon}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/bootstrap/round-${currentRound.id}`}
                    className="btn-primary inline-flex items-center gap-3 text-lg"
                  >
                    <span>🚀</span>
                    Join {currentRound.name} Now
                  </Link>
                </div>
              </div>
            ) : (
              <div className="card p-8 max-w-2xl mx-auto text-center animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                  <span>🚀</span>
                  Coming Soon
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  All rounds are currently inactive. Stay tuned for Round 1
                  launch!
                </p>
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                  {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
                    <div key={i} className="text-center">
                      <div className="bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-2xl p-4">
                        <div className="text-2xl font-bold">--</div>
                        <div className="text-sm">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Global Summary */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Global Summary
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real-time statistics from all Bootstrap Bay rounds and participant
              activity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "👥",
                value: mockData.globalStats.totalParticipants,
                label: "Total Participants",
                color: "from-blue-400 to-blue-600",
                bgColor:
                  "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
              },
              {
                icon: "🔒",
                value: `${mockData.globalStats.totalBnbLocked} BNB`,
                label: "Total BNB Locked",
                color: "from-green-400 to-green-600",
                bgColor:
                  "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
              },
              {
                icon: "🪂",
                value: `${mockData.globalStats.totalVaiDistributed} VAI`,
                label: "VAI Distributed",
                color: "from-purple-400 to-purple-600",
                bgColor:
                  "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
              },
              {
                icon: "🔗",
                value: mockData.globalStats.totalReferrals,
                label: "Total Referrals",
                color: "from-orange-400 to-orange-600",
                bgColor:
                  "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="card p-8 text-center group hover:scale-105 transition-transform duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto shadow-lg group-hover:shadow-glow transition-shadow duration-300`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Referral Leaderboard
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Top 10 referrers by invite count. Leaders receive honour awards
              and special recognition.
            </p>
          </div>

          <div className="card overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
              <div className="grid grid-cols-4 gap-4 font-bold text-white text-lg">
                <div className="flex items-center gap-2">
                  <span>🏆</span>
                  Rank
                </div>
                <div>Address</div>
                <div>Referrals</div>
                <div>VAI Earned</div>
              </div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockData.leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`grid grid-cols-4 gap-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                    entry.rank <= 3
                      ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        entry.rank === 1
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                          : entry.rank === 2
                            ? "bg-gradient-to-br from-gray-400 to-gray-600"
                            : entry.rank === 3
                              ? "bg-gradient-to-br from-orange-400 to-orange-600"
                              : "bg-gradient-to-br from-blue-400 to-blue-600"
                      }`}
                    >
                      {entry.rank === 1 && <span>🥇</span>}
                      {entry.rank === 2 && <span>🥈</span>}
                      {entry.rank === 3 && <span>🥉</span>}
                      {entry.rank > 3 && `#${entry.rank}`}
                    </div>
                  </div>
                  <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg inline-block">
                    {entry.address}
                  </div>
                  <div className="font-bold text-lg text-gray-900 dark:text-white">
                    {entry.referrals}
                  </div>
                  <div className="font-bold text-lg text-green-600 dark:text-green-400">
                    {entry.vaiEarned} VAI
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Rounds Overview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              All Rounds
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Three progressive rounds with increasing stakes and rewards.
              Choose your entry point.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockData.rounds.map((round, index) => (
              <div
                key={round.id}
                className={`card p-8 group hover:scale-105 transition-transform duration-500 ${
                  round.isActive ? "ring-2 ring-blue-500 shadow-glow" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {round.name}
                  </h3>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      round.isActive
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {round.isActive ? "🟢 Active" : "⏳ Coming Soon"}
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      label: "Entry Fee",
                      value: `${round.entryFee} BNB`,
                      icon: "💰",
                    },
                    {
                      label: "Prize Pool",
                      value: `${round.bnbPool} BNB`,
                      icon: "🏆",
                    },
                    {
                      label: "Special Slots",
                      value: round.specialSlots,
                      icon: "🎯",
                    },
                    {
                      label: "Slot Reward",
                      value: `${round.slotReward} BNB`,
                      icon: "💎",
                    },
                    {
                      label: "VAI Reserve",
                      value: `${round.vaiReserve} VAI`,
                      icon: "🪂",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {round.isActive && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span>
                        Participants: {round.participants.toLocaleString()}
                      </span>
                      <span>Slots Remaining: {round.slotsRemaining}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${((parseInt(round.specialSlots.replace(",", "")) - round.slotsRemaining) / parseInt(round.specialSlots.replace(",", ""))) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                <Link
                  href={`/bootstrap/round-${round.id}`}
                  className={`block w-full text-center py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    round.isActive
                      ? "btn-primary"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
                  }`}
                >
                  {round.isActive ? "🚀 Join Now" : "👀 View Details"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How Bootstrap Bay Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Six simple steps to participate in the community-building campaign
              and earn rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Pay Entry Fee",
                description:
                  "Pay the round entry fee in BNB to join the campaign",
                icon: "💳",
                color: "from-blue-400 to-blue-600",
              },
              {
                step: 2,
                title: "Receive VAI Airdrop",
                description: "Get 10,000 VAI tokens instantly upon entry",
                icon: "🪂",
                color: "from-green-400 to-green-600",
              },
              {
                step: 3,
                title: "Refer Friends",
                description: "Invite others and earn 10% of their VAI airdrops",
                icon: "🤝",
                color: "from-purple-400 to-purple-600",
              },
              {
                step: 4,
                title: "Qualify for Rewards",
                description:
                  "Get 100+ referrals to qualify for special BNB slots",
                icon: "🎯",
                color: "from-orange-400 to-orange-600",
              },
              {
                step: 5,
                title: "Win BNB Prizes",
                description:
                  "Random selection from qualified wallets for BNB rewards",
                icon: "🏆",
                color: "from-yellow-400 to-yellow-600",
              },
              {
                step: 6,
                title: "Surplus Burns",
                description: "Unused VAI tokens are burned, maintaining value",
                icon: "🔥",
                color: "from-red-400 to-red-600",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="card p-8 text-center group hover:scale-105 transition-transform duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto shadow-lg group-hover:shadow-glow transition-shadow duration-300`}
                >
                  {item.icon}
                </div>
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${item.color} text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4`}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BootstrapPage;
