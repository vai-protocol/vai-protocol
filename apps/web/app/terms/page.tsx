"use client";

import React from "react";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8">
            <h1 className="text-4xl font-bold mb-8 gradient-text">
              Terms of Service
            </h1>

            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-gray-600 mb-8">Last updated: [Date]</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using VAI Protocol, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                2. Protocol Overview
              </h2>
              <p>
                VAI Protocol is a decentralized AI data ecosystem that enables:
              </p>
              <ul>
                <li>Membership-based participation in AI data contributions</li>
                <li>Bootstrap Bay campaigns for early funding</li>
                <li>Referral commission systems</li>
                <li>Field DAO governance and rewards</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                3. Membership Requirements
              </h2>
              <p>To participate in VAI Protocol:</p>
              <ul>
                <li>You must connect a Web3 wallet</li>
                <li>Join the membership system through our smart contracts</li>
                <li>Comply with all platform guidelines and rules</li>
                <li>Provide accurate information for contributions</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                4. Prohibited Activities
              </h2>
              <p>Users are prohibited from:</p>
              <ul>
                <li>Creating fake accounts or manipulating referral systems</li>
                <li>Submitting low-quality or fraudulent data</li>
                <li>Attempting to exploit smart contract vulnerabilities</li>
                <li>Engaging in market manipulation or wash trading</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                5. Rewards and Tokens
              </h2>
              <p>VAI tokens and rewards:</p>
              <ul>
                <li>
                  Are distributed based on contribution quality and platform
                  rules
                </li>
                <li>May be subject to vesting schedules or claiming periods</li>
                <li>Do not constitute securities or investment contracts</li>
                <li>May fluctuate in value and are not guaranteed</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                6. Anti-Fraud Measures
              </h2>
              <p>We reserve the right to:</p>
              <ul>
                <li>Monitor user activities for suspicious behavior</li>
                <li>Suspend or ban accounts that violate terms</li>
                <li>Blacklist wallets from receiving tokens</li>
                <li>Pause the system in case of security threats</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                7. Disclaimer of Warranties
              </h2>
              <p>
                VAI Protocol is provided "AS IS" without warranties of any kind.
                We do not guarantee:
              </p>
              <ul>
                <li>Continuous availability of the platform</li>
                <li>Bug-free operation of smart contracts</li>
                <li>Protection against financial losses</li>
                <li>Compatibility with all wallets and devices</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                8. Limitation of Liability
              </h2>
              <p>
                In no event shall VAI Protocol be liable for any indirect,
                incidental, special, consequential, or punitive damages,
                including without limitation, loss of profits, data, use,
                goodwill, or other intangible losses.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">9. Governing Law</h2>
              <p>
                These terms shall be interpreted and governed by the laws of
                [Jurisdiction], without regard to its conflict of law
                provisions.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                10. Contact Information
              </h2>
              <p>
                For questions about these terms, contact us at:
                legal@vaiprotocol.ai
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
