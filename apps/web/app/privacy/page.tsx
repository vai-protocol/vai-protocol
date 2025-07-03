"use client";

import React from "react";

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8">
            <h1 className="text-4xl font-bold mb-8 gradient-text">
              Privacy Policy
            </h1>

            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-gray-600 mb-8">Last updated: [Date]</p>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                1. Information We Collect
              </h2>
              <p>
                VAI Protocol collects minimal data necessary for providing our
                services:
              </p>
              <ul>
                <li>
                  Wallet addresses for membership and transaction processing
                </li>
                <li>On-chain transaction data (publicly available)</li>
                <li>Contribution data submitted to Field DAOs</li>
                <li>Usage analytics for platform optimization</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                2. How We Use Your Information
              </h2>
              <p>Your information is used to:</p>
              <ul>
                <li>Process membership registration and rewards</li>
                <li>Facilitate Bootstrap Bay campaigns</li>
                <li>Calculate referral commissions</li>
                <li>Improve platform functionality</li>
                <li>Comply with legal requirements</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                3. Data Storage and Security
              </h2>
              <p>We implement industry-standard security measures:</p>
              <ul>
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure key management systems</li>
                <li>Regular security audits and penetration testing</li>
                <li>Minimal data retention policies</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                4. Blockchain Transparency
              </h2>
              <p>
                As a blockchain-based protocol, certain information is publicly
                accessible:
              </p>
              <ul>
                <li>Wallet addresses and transaction history</li>
                <li>Membership status and rewards earned</li>
                <li>Contribution records and scoring</li>
                <li>Governance participation</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">
                5. Third-Party Services
              </h2>
              <p>We may use third-party services for:</p>
              <ul>
                <li>Analytics and performance monitoring</li>
                <li>Cloud infrastructure and storage</li>
                <li>Communication and support</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access your personal data</li>
                <li>Request data correction or deletion</li>
                <li>Withdraw consent for processing</li>
                <li>Export your contribution data</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">7. Contact Us</h2>
              <p>
                For privacy-related questions, contact us at:
                privacy@vaiprotocol.ai
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
