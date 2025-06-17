"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Mock data - replace with real contract calls
const mockRoundsData = {
  1: {
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
    description:
      "The inaugural Bootstrap Bay round designed for broad community participation with low entry barriers.",
    features: [
      "Low 0.02 BNB entry fee for maximum accessibility",
      "2,000 BNB total prize pool distribution",
      "1,000 special slots worth 2 BNB each",
      "10,000 VAI instant airdrop per participant",
      "180-day participation window",
      "Qualification requires 100+ referrals",
    ],
    timeline: [
      { phase: "Launch", date: "2025-01-01", status: "completed" },
      { phase: "Mid-round", date: "2025-04-01", status: "current" },
      { phase: "Final phase", date: "2025-06-15", status: "upcoming" },
      { phase: "Round closes", date: "2025-07-01", status: "upcoming" },
      { phase: "Winners announced", date: "2025-07-03", status: "upcoming" },
    ],
  },
  2: {
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
    description:
      "Scaled expansion round targeting serious community builders with increased rewards and higher stakes.",
    features: [
      "0.2 BNB entry fee for committed participants",
      "200,000 BNB massive prize pool",
      "10,000 special slots worth 20 BNB each",
      "10,000 VAI instant airdrop per participant",
      "120-day concentrated participation window",
      "Qualification requires 100+ referrals",
    ],
    timeline: [
      { phase: "Launch", date: "2025-08-01", status: "upcoming" },
      { phase: "Mid-round", date: "2025-09-01", status: "upcoming" },
      { phase: "Final phase", date: "2025-09-25", status: "upcoming" },
      { phase: "Round closes", date: "2025-10-01", status: "upcoming" },
      { phase: "Winners announced", date: "2025-10-03", status: "upcoming" },
    ],
  },
  3: {
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
    description:
      "The ultimate Bootstrap Bay round with institutional-scale rewards for professional community builders.",
    features: [
      "2 BNB entry fee for professional participants",
      "20,000,000 BNB enormous prize pool",
      "100,000 special slots worth 200 BNB each",
      "10,000 VAI instant airdrop per participant",
      "180-day extended participation window",
      "Qualification requires 100+ referrals",
    ],
    timeline: [
      { phase: "Launch", date: "2026-01-01", status: "upcoming" },
      { phase: "Mid-round", date: "2026-02-15", status: "upcoming" },
      { phase: "Final phase", date: "2026-03-20", status: "upcoming" },
      { phase: "Round closes", date: "2026-04-01", status: "upcoming" },
      { phase: "Winners announced", date: "2026-04-03", status: "upcoming" },
    ],
  },
};

const RoundPage = () => {
  const params = useParams();
  const roundId = parseInt(params.id as string);
  const round = mockRoundsData[roundId as keyof typeof mockRoundsData];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isParticipating, setIsParticipating] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  // Countdown timer
  useEffect(() => {
    if (!round) return;

    const calculateTimeLeft = () => {
      const difference = +round.deadline - +new Date();

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
  }, [round]);

  const handleParticipate = async () => {
    // Here you would integrate with the smart contract
    setIsParticipating(true);
    // Mock transaction
    setTimeout(() => {
      setIsParticipating(false);
      alert(
        "Successfully joined the round! You'll receive 10,000 VAI tokens shortly."
      );
    }, 2000);
  };

  if (!round) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Round Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The requested round does not exist.
            </p>
            <Link
              href="/bootstrap"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Bootstrap Bay
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Round Header */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/bootstrap"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Bootstrap Bay
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">{round.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Round Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Bootstrap Bay {round.name}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    round.isActive
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {round.isActive ? "Active" : "Coming Soon"}
                </span>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                {round.description}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Entry Fee
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {round.entryFee} BNB
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Prize Pool
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {round.bnbPool} BNB
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Participants
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {round.participants.toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Slots Left
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {round.slotsRemaining}
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Time Remaining
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-blue-600 text-white rounded-lg p-4">
                    <div className="text-2xl font-bold">{timeLeft.days}</div>
                    <div className="text-sm">Days</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-600 text-white rounded-lg p-4">
                    <div className="text-2xl font-bold">{timeLeft.hours}</div>
                    <div className="text-sm">Hours</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-600 text-white rounded-lg p-4">
                    <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-sm">Minutes</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-600 text-white rounded-lg p-4">
                    <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                    <div className="text-sm">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Participation Section */}
      {round.isActive && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Participation Form */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Join {round.name}
                </h2>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="referralCode"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Referral Code (Optional)
                    </label>
                    <input
                      type="text"
                      id="referralCode"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Enter referral code to share rewards"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      What You&apos;ll Receive:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-green-500">✅</span>
                        10,000 VAI tokens (instant airdrop)
                      </li>
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-green-500">✅</span>
                        Entry into {round.bnbPool} BNB prize pool
                      </li>
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-green-500">✅</span>
                        Chance to win {round.slotReward} BNB special slots
                      </li>
                      <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <span className="text-green-500">✅</span>
                        Referral rewards (10% of invitee airdrops)
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <appkit-button />
                    <button
                      onClick={handleParticipate}
                      disabled={isParticipating}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors"
                    >
                      {isParticipating
                        ? "Processing..."
                        : `Pay ${round.entryFee} BNB & Join`}
                    </button>
                  </div>
                </div>
              </div>

              {/* Participation Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Qualification Requirements
                  </h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">👥</div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          100+ Referrals Required
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          To qualify for special BNB slots, you need at least
                          100 paying referrals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Round Features
                  </h3>
                  <ul className="space-y-3">
                    {round.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-blue-500 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Round Timeline
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {round.timeline.map((phase, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-6 h-6 rounded-full border-4 ${
                        phase.status === "completed"
                          ? "bg-green-500 border-green-500"
                          : phase.status === "current"
                            ? "bg-blue-500 border-blue-500"
                            : "bg-gray-300 dark:bg-gray-600 border-gray-300 dark:border-gray-600"
                      }`}
                    ></div>
                    {index < round.timeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 ml-2.5 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold ${
                        phase.status === "completed"
                          ? "text-green-600 dark:text-green-400"
                          : phase.status === "current"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {phase.phase}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {phase.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terms and Conditions */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Terms & Conditions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Participation Rules
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Entry fee must be paid in BNB on BNB Smart Chain</li>
                <li>• One entry per wallet address</li>
                <li>• VAI airdrop is immediate upon successful entry</li>
                <li>
                  • Referral bonding is permanent after first on-chain action
                </li>
                <li>
                  • Round closes when all special slots are filled OR deadline
                  is reached
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Reward Distribution
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Special slots require minimum 100 qualified referrals</li>
                <li>• BNB winners selected randomly using Chainlink VRF</li>
                <li>• Referrers earn 10% of invitee VAI airdrops</li>
                <li>• Unused VAI from reserve will be burned</li>
                <li>• All transactions are on-chain and auditable</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Risk Disclaimers
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Cryptocurrency investments carry inherent risks</li>
                <li>• Lottery regulations vary by jurisdiction</li>
                <li>• Services may be geo-blocked where required</li>
                <li>• Smart contracts may contain bugs or vulnerabilities</li>
                <li>• No guarantee of profits or returns</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Compliance
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• KYT (Know Your Transaction) screening applied</li>
                <li>• OFAC sanctions list checking</li>
                <li>• Anti-sybil measures in place</li>
                <li>• Entry fees serve as spam prevention</li>
                <li>• Timelock governance for protocol upgrades</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Bootstrap Bay */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bootstrap"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              ← Back to Bootstrap Bay
            </Link>
            <Link
              href="/docs/whitepaper"
              className="border border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
            >
              Read Whitepaper
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoundPage;
