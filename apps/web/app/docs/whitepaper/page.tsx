export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-800/30">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                📄 Technical Documentation
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-900 dark:text-white">
                VAI Protocol
              </span>
              <br />
              <span className="gradient-text">Whitepaper</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive technical documentation of the Value-AI Token
              ecosystem, Field DAOs, and Bootstrap Bay campaigns.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Version 0.2.0 (Draft)
              </div>
              <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                May 2025
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📋 Table of Contents
            </h2>

            <nav className="space-y-4">
              <a href="#genesis" className="block group">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-blue-500 font-semibold">1.</span>
                  <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Genesis of the VAI Token
                  </span>
                </div>
              </a>

              <a href="#strategy" className="block group">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-blue-500 font-semibold">2.</span>
                  <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Strategy
                  </span>
                </div>
              </a>

              <a href="#architecture" className="block group">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-blue-500 font-semibold">3.</span>
                  <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Technical Architecture
                  </span>
                </div>
              </a>

              <a href="#references" className="block group">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="text-blue-500 font-semibold">4.</span>
                  <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    References & Disclaimer
                  </span>
                </div>
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section 1: Genesis */}
          <section id="genesis" className="scroll-mt-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  1
                </span>
                Genesis of the VAI Token
              </h2>

              {/* Motivation */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  🎯 Motivation
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">
                          Current Challenge
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">
                          How VAI Token Addresses It
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          AI data silos controlled by a handful of big-tech
                          companies.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          <strong>Field DAOs</strong> incentivise experts to
                          upload data and earn VAI instantly.
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-700/30">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          Non-transparent AI training costs and revenue sharing.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          Rewards, fees and burns are recorded{" "}
                          <strong>on-chain</strong> – auditable in real time.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          Inflationary token models in many Web3-AI projects.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          VAI is minted only at reward events; unused VAI is{" "}
                          <strong>burned</strong>.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Strengths */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  💪 Strengths
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      On-chain fiscal discipline
                    </h4>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Clear supply ceiling, fixed burn schedule.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Contribution traceability
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      Every action links a proposalId, queryable on-chain.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                      Direct incentives
                    </h4>
                    <p className="text-purple-700 dark:text-purple-300 text-sm">
                      Contributors earn VAI proportional to value; no hidden
                      funds.
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                      Open infrastructure
                    </h4>
                    <p className="text-orange-700 dark:text-orange-300 text-sm">
                      EVM-compatible, TypeScript/Rust SDKs, cloud-agnostic.
                    </p>
                  </div>
                </div>
              </div>

              {/* Engineer's Take */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">👨‍💻</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Engineer&apos;s Take
                    </h4>
                    <blockquote className="text-gray-700 dark:text-gray-300 italic">
                      &ldquo;VAI Token provides a transparent, disciplined
                      framework for data, rewards and supply – a solid
                      foundation for an open AI economy.&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Strategy */}
          <section id="strategy" className="scroll-mt-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Strategy
              </h2>

              {/* VAI Token Properties */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  🪙 VAI Token
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">
                        Type
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ERC-20 (Permit)
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">
                        Initial Supply
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        0 – minted only at reward events
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">
                        Mint Role
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ProposalManager, BootstrapBay
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">
                        Burn Role
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Any holder; automatic in BootstrapBay
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-gray-600 dark:text-gray-400">
                        Transfer Fee
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        0% – no transaction tax
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Field DAO */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  🏛️ Field DAO
                </h3>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-6 border border-amber-200 dark:border-amber-800/30">
                  <h4 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-4">
                    Field Trust Score
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-amber-700 dark:text-amber-300">
                        Range:
                      </strong>{" "}
                      0 – 10,000
                    </div>
                    <div>
                      <strong className="text-amber-700 dark:text-amber-300">
                        Default:
                      </strong>{" "}
                      0 when Field is created
                    </div>
                    <div>
                      <strong className="text-amber-700 dark:text-amber-300">
                        Delta:
                      </strong>{" "}
                      +50 if proposal passes, -100 if fails
                    </div>
                    <div>
                      <strong className="text-amber-700 dark:text-amber-300">
                        Thresholds:
                      </strong>{" "}
                      &lt;0 → Field frozen, ≥500 → featured listing
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border">
                    <strong className="text-gray-900 dark:text-white">
                      Reward Multiplier:
                    </strong>
                    <code className="ml-2 text-sm text-blue-600 dark:text-blue-400">
                      fieldMultiplier = 1 + trust / 10,000
                    </code>
                  </div>
                </div>
              </div>

              {/* Bootstrap Bay */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  🚢 Bootstrap Bay
                </h3>

                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-cyan-200 dark:border-cyan-800/30 mb-6">
                  <blockquote className="text-cyan-800 dark:text-cyan-200 italic text-lg">
                    &ldquo;Bootstrap Bay is more than a BNB raffle; it on-boards
                    people and liquidity into VAI Protocol within months, not
                    years.&rdquo;
                  </blockquote>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">
                          Round
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">
                          Entry Fee
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">
                          BNB Pool
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">
                          Special Slots
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">
                          VAI Reserve
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">
                          R1
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          0.02 BNB
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          2,000
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          1,000 × 2 BNB
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                          3B
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-700/30">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">
                          R2
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          0.2 BNB
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          200,000
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          10,000 × 20 BNB
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                          30B
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">
                          R3
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          2 BNB
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          20,000,000
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          100,000 × 200 BNB
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                          300B
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Technical Architecture */}
          <section id="architecture" className="scroll-mt-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  3
                </span>
                Technical Architecture
              </h2>

              {/* High-Level Diagram */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  🏗️ High-Level Architecture
                </h3>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre">
                    {`Frontend (React/Next) — WalletConnect/SIWE
            │ RPC
────────────▼──────────────────────────────
          BNB Smart Chain
  VAIToken (ERC-20)        ← immutable
        ▲ MINTER/BURNER
BootstrapBay (UUPS) ─ calls ─┐
ReferralManager (UUPS) ──────┘
FieldManager (UUPS) — stake/vote — ProposalManager (UUPS)
            ▲ rewards                 │
            └─────────── Treasury.sol (UUPS)
TimelockGovernor (OZ) controls upgrades & spending
VRFConsumer (UUPS) supplies randomness to BootstrapBay`}
                  </pre>
                </div>
              </div>

              {/* Core Contracts */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  📋 Core Smart Contract Set
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-800 dark:text-red-200">
                        VAIToken.sol
                      </h4>
                      <p className="text-red-700 dark:text-red-300 text-sm">
                        ERC-20 + Permit + Burnable - Native token (immutable)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                        FieldManager.sol
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Create/activate Field, manage stake & trust (UUPS)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-800 dark:text-green-200">
                        ProposalManager.sol
                      </h4>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        Proposal lifecycle (create → vote → finalise) (UUPS)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                        BootstrapBay.sol
                      </h4>
                      <p className="text-purple-700 dark:text-purple-300 text-sm">
                        Three rounds, BNB pool, VRF draw, burn surplus (UUPS)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800/30">
                <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
                  🔒 Security & Compliance
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-red-700 dark:text-red-300">
                      Re-entrancy:
                    </strong>{" "}
                    ReentrancyGuard on payable functions
                  </div>
                  <div>
                    <strong className="text-red-700 dark:text-red-300">
                      Role leakage:
                    </strong>{" "}
                    AccessControl; roles revocable
                  </div>
                  <div>
                    <strong className="text-red-700 dark:text-red-300">
                      VRF spam:
                    </strong>{" "}
                    Single requestId lock until fulfilled
                  </div>
                  <div>
                    <strong className="text-red-700 dark:text-red-300">
                      Upgrade risk:
                    </strong>{" "}
                    48-hour timelock + multisig approvals
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: References & Disclaimer */}
          <section id="references" className="scroll-mt-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  4
                </span>
                References & Legal
              </h2>

              {/* References */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  📚 References
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                    <span className="text-blue-500 font-semibold min-w-[2rem]">
                      1.
                    </span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">
                        Ethereum Improvement Proposal 2612
                      </strong>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Off-chain signatures (Permit) for VAIToken
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                    <span className="text-blue-500 font-semibold min-w-[2rem]">
                      2.
                    </span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">
                        Chainlink Docs – VRF v2
                      </strong>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Randomness for Bootstrap Bay
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                    <span className="text-blue-500 font-semibold min-w-[2rem]">
                      3.
                    </span>
                    <div>
                      <strong className="text-gray-900 dark:text-white">
                        OpenZeppelin Contracts v5 API
                      </strong>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        ERC-20, AccessControl, UUPS, Governor
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800/30">
                <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
                  ⚠️ Important Disclaimer
                </h4>

                <div className="space-y-4 text-sm text-yellow-700 dark:text-yellow-300">
                  <div>
                    <strong>No Investment Advice:</strong> This document is for
                    information purposes only; it does not constitute financial
                    or investment advice.
                  </div>

                  <div>
                    <strong>Market & Technical Risk:</strong> Tokens are
                    volatile; smart contracts may contain bugs; key management
                    is the user&apos;s responsibility.
                  </div>

                  <div>
                    <strong>Regulatory:</strong> Crypto-asset and raffle
                    regulations vary by jurisdiction; services may be
                    geo-blocked where required.
                  </div>

                  <div>
                    <strong>Limitation of Liability:</strong> VAI-Protocol,
                    contributors and partners shall not be liable for any losses
                    arising from use of the token, contracts or information
                    herein.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* License */}
          <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              📄 License - Apache 2.0
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-white dark:bg-gray-900 p-4 rounded border">
              Copyright 2025 VAI-Protocol
              <br />
              <br />
              Licensed under the Apache License, Version 2.0 (the
              &ldquo;License&rdquo;);
              <br />
              you may not use this file except in compliance with the License.
              <br />
              You may obtain a copy of the License at
              <br />
              <br />
              <a
                href="https://www.apache.org/licenses/LICENSE-2.0"
                className="text-blue-500 hover:underline"
              >
                https://www.apache.org/licenses/LICENSE-2.0
              </a>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
