import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800/30">
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    🚀 Decentralized AI Revolution
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gray-900 dark:text-white">
                    Build the Future of
                  </span>
                  <br />
                  <span className="gradient-text">AI Data Economy</span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                  Join Field DAOs, contribute valuable AI data, and earn VAI
                  tokens through transparent, on-chain rewards. No data silos,
                  no hidden costs – just pure value creation.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/bootstrap"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-lg"
                >
                  <span>🏆</span>
                  Join Bootstrap Bay
                </Link>
                <Link
                  href="/docs/whitepaper"
                  className="btn-secondary inline-flex items-center justify-center gap-2 text-lg"
                >
                  <span>📖</span>
                  Read Whitepaper
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    3B+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    VAI in Bootstrap
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    Zero
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Transaction Fees
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Transparency
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-float">
              <div className="card-glass p-8 transform rotate-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">
                    🧠
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      AI Data Field
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Live Processing
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Data Flow */}
                  <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/30 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Researchers
                      </span>
                    </div>
                    <div className="text-gray-400">→</div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Field DAO
                      </span>
                    </div>
                    <div className="text-gray-400">→</div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        VAI Rewards
                      </span>
                    </div>
                  </div>

                  {/* Trust Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Trust Score: 8,750
                      </span>
                      <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                        87.5%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full animate-pulse"
                        style={{ width: "87.5%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems & Solutions */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Solving AI Industry Challenges
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Traditional AI development faces critical barriers. VAI Protocol
              provides revolutionary solutions.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                problem: {
                  icon: "🏢",
                  title: "AI Data Silos",
                  description:
                    "Big-tech companies control valuable AI training data",
                },
                solution: {
                  icon: "🌐",
                  title: "Field DAOs",
                  description:
                    "Experts upload data and earn VAI tokens instantly",
                },
              },
              {
                problem: {
                  icon: "🔒",
                  title: "Hidden Costs",
                  description:
                    "Non-transparent training costs and revenue sharing",
                },
                solution: {
                  icon: "📊",
                  title: "On-chain Records",
                  description:
                    "All rewards, fees, and burns are auditable in real-time",
                },
              },
              {
                problem: {
                  icon: "📈",
                  title: "Token Inflation",
                  description:
                    "Many Web3-AI projects suffer from inflationary models",
                },
                solution: {
                  icon: "🔥",
                  title: "Deflationary Burns",
                  description:
                    "VAI minted only at rewards, surplus tokens burned",
                },
              },
            ].map((item, index) => (
              <div
                key={index}
                className="card p-8 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Problem */}
                  <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-2xl border border-red-200 dark:border-red-800/30">
                    <div className="text-4xl mb-3">{item.problem.icon}</div>
                    <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">
                      {item.problem.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {item.problem.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-glow">
                      <span className="text-white text-xl font-bold">→</span>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-2xl border border-green-200 dark:border-green-800/30">
                    <div className="text-4xl mb-3">{item.solution.icon}</div>
                    <h3 className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">
                      {item.solution.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {item.solution.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Protocol Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built for the future of decentralized AI with cutting-edge
              features and robust security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🏆",
                title: "Bootstrap Bay Campaigns",
                description:
                  "Three-round community building with BNB rewards. Entry fees from 0.02 to 2 BNB, with massive prize pools and VAI airdrops.",
                link: "/bootstrap",
                linkText: "Explore Campaigns",
                gradient: "from-yellow-400 to-orange-500",
              },
              {
                icon: "🗳️",
                title: "Proposal Governance",
                description:
                  "Stake VAI, create proposals, vote with weighted influence. Earn rewards through quality contributions.",
                link: "/governance",
                linkText: "View Proposals",
                gradient: "from-blue-400 to-indigo-500",
              },
              {
                icon: "🏛️",
                title: "Field DAOs",
                description:
                  "Specialized communities for AI data contribution. Each Field has trust scores, staking requirements, and reward multipliers.",
                link: "/fields",
                linkText: "Browse Fields",
                gradient: "from-purple-400 to-pink-500",
              },
              {
                icon: "📈",
                title: "Adaptive Rewards",
                description:
                  "Your contribution quality affects future rewards. High-performing participants get better multipliers.",
                score: "5,000-10,000",
                gradient: "from-green-400 to-teal-500",
              },
              {
                icon: "🔗",
                title: "Referral Network",
                description:
                  "Earn 10% of your referrals' VAI airdrops. Build your network and grow the community.",
                score: "Permanent Bonding",
                gradient: "from-pink-400 to-rose-500",
              },
              {
                icon: "🛡️",
                title: "Security First",
                description:
                  "Built with OpenZeppelin contracts, timelock governance, and comprehensive audits.",
                link: "/security",
                linkText: "Security Details",
                gradient: "from-red-400 to-pink-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card p-8 group hover:scale-105 transition-transform duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:shadow-glow transition-shadow duration-300`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {feature.link ? (
                  <Link
                    href={feature.link}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    {feature.linkText} →
                  </Link>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400 font-semibold">
                    {feature.score}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  VAI Tokenomics
                </h2>
                <h3 className="text-2xl font-semibold gradient-text mb-6">
                  Deflationary by Design
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: "✅",
                    title: "Zero Initial Supply",
                    desc: "Minted only at reward events",
                  },
                  {
                    icon: "✅",
                    title: "No Transaction Fees",
                    desc: "Pure ERC-20 with no taxes",
                  },
                  {
                    icon: "✅",
                    title: "Automatic Burns",
                    desc: "Surplus VAI burned in Bootstrap Bay",
                  },
                  {
                    icon: "✅",
                    title: "Transparent Rewards",
                    desc: "All minting events on-chain",
                  },
                  {
                    icon: "✅",
                    title: "BNB Smart Chain",
                    desc: "Low gas, high performance",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border border-green-200/50 dark:border-green-800/30"
                  >
                    <span className="text-green-500 text-xl flex-shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {" "}
                        - {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Governance Flow Visual */}
            <div className="card-glass p-8 bg-gradient-to-br from-purple-500/10 to-blue-600/10">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Governance Flow
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: "📝",
                    title: "Create Proposal",
                    desc: "Stake ≥5,000 VAI",
                  },
                  {
                    icon: "🗳️",
                    title: "Community Votes",
                    desc: "7-day voting period",
                  },
                  {
                    icon: "💰",
                    title: "VAI Rewards",
                    desc: "Split: 35% creator, 40% voters",
                  },
                ].map((step, index) => (
                  <div key={index}>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4 hover:bg-white/20 transition-colors">
                      <div className="text-4xl">{step.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white text-lg">
                          {step.title}
                        </h4>
                        <p className="text-white/80">{step.desc}</p>
                      </div>
                    </div>
                    {index < 2 && (
                      <div className="flex justify-center py-2">
                        <div className="text-white/60 text-2xl">↓</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-white">
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
              Ready to Join the
              <br />
              <span className="text-yellow-300">AI Revolution?</span>
            </h2>

            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Start earning VAI tokens by contributing to Field DAOs or
              participating in Bootstrap Bay campaigns. The future of AI is
              decentralized, transparent, and rewarding.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/bootstrap"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🚀 Join Bootstrap Bay
              </Link>
              <Link
                href="/docs/guidelines"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm"
              >
                📚 Getting Started Guide
              </Link>
            </div>

            <div className="card-glass p-6 max-w-2xl mx-auto">
              <p className="text-sm font-medium">
                <span className="text-yellow-300 font-bold">
                  Currently Live:
                </span>{" "}
                Bootstrap Bay Round 1 - Entry fee 0.02 BNB, 2,000 BNB prize
                pool, 1,000 special slots available
              </p>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-purple-300/20 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-20 w-12 h-12 bg-blue-300/20 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </section>
    </div>
  );
};

export default HomePage;
