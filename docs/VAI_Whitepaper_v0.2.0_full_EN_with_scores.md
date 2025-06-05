# VAI – Value‑AI Token

### Whitepaper v0.2.0 (draft) · May 2025

---

## 1. Genesis of the VAI Token

### 1.1 Motivation

| Current Challenge                                            | How VAI Token Addresses It                                                  |
| ------------------------------------------------------------ | --------------------------------------------------------------------------- |
| AI data silos controlled by a handful of big‑tech companies. | **Field DAOs** incentivise experts to upload data and earn VAI instantly.   |
| Non‑transparent AI training costs and revenue sharing.       | Rewards, fees and burns are recorded **on‑chain** – auditable in real time. |
| Inflationary token models in many Web3‑AI projects.          | VAI is minted only at reward events; unused VAI is **burned**.              |

### 1.2 Strengths

1. **On‑chain fiscal discipline** – clear supply ceiling, fixed burn schedule.
2. **Contribution traceability** – every action links a `proposalId`, queryable on‑chain.
3. **Direct incentives** – contributors earn VAI proportional to value; no hidden funds.
4. **Open infrastructure** – EVM‑compatible, TypeScript/Rust SDKs, cloud‑agnostic.
5. **Scheduled burn events** – Bootstrap Bay burns surplus VAI, limiting inflation.

### 1.3 Weaknesses & Challenges

| Weakness                                      | Analysis                                            |
| --------------------------------------------- | --------------------------------------------------- |
| “Lottery” regulations differ by jurisdiction. | Legal consultation and geo‑fencing may be required. |
| UX complexity (Field → Stake → Propose).      | Wizard & AI Curator will streamline onboarding.     |
| High gas during network congestion.           | Batch transactions or migrate to Layer‑2.           |
| Referral spam.                                | Entry fee in BNB + KYT anomaly detection.           |
| Initial liquidity risk.                       | Strong LP fund and strict vesting schedules.        |

### 1.4 Engineer’s Take

> “VAI Token provides a transparent, disciplined framework for data, rewards and supply – a solid foundation for an open AI economy.”

---

## 2. Strategy

### 2.1 VAI Token

| Property       | Value                                   |
| -------------- | --------------------------------------- |
| Type           | ERC‑20 (Permit)                         |
| Initial Supply | 0 – minted only at reward events        |
| Mint Role      | `ProposalManager`, `BootstrapBay`       |
| Burn Role      | Any holder; automatic in `BootstrapBay` |
| Transfer Fee   | **0 % – no transaction tax**            |

### 2.2 Field DAO

#### 2.2 bis • Field Trust Score

| Attribute                      | Value / Rule                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------- |
| **Range**                      | 0 – 10 000                                                                      |
| **Default**                    | 0 when the Field is created                                                     |
| **Delta on Proposal Finalise** | +50 if proposal passes · −100 if it fails                                       |
| **Thresholds**                 | < 0 → Field _frozen_ (no new proposals) · ≥ 500 → eligible for featured listing |
| **Influence**                  | _Reward multiplier_ for proposals:<br>`fieldMultiplier = 1 + trust / 10 000`    |
| **Decay**                      | −1 % every 30 days without a passing proposal                                   |

> _Trust Score is a public credit rating for each Field—maintainers are motivated to curate quality proposals while users gain higher rewards in reputable Fields._

- Field creation fee = **10 000 VAI** + locked stake **10 000 VAI**.
- Activation: ≥ 10 subscribers, each staking ≥ 1 000 VAI.

### 2.3 Proposal Lifecycle

| Phase    | Requirement                           | Outcome                             |
| -------- | ------------------------------------- | ----------------------------------- |
| Create   | Stake ≥ 5 000 VAI                     | `proposalId`, 7‑day voting window   |
| Vote     | stake × AdaptationScore ≥ 60 % quorum | Pass if **yes ≥ 80 %**              |
| Finalise | Automatic                             | Mint rewards, update trust & scores |

Reward split = **35 %** creator · **40 %** voters · **10 %** top staker · **15 %** referral pool.

### 2.4 Staking & Adaptation

#### 2.4 bis • User Adaptation Score

| Attribute           | Value / Rule                                        |
| ------------------- | --------------------------------------------------- |
| **Range**           | 0 – 10 000 (initial 5 000)                          |
| **Vote Weight**     | `voteWeight = stake × adaptation / 10 000`          |
| **Reward Impact**   | Rewards scaled by the same factor                   |
| **Positive Events** | +25: vote with majority · +50: your proposal passes |
| **Negative Events** | −50: vote in minority · −150: your proposal fails   |
| **Floor / Cap**     | Never below 1 000 or above 10 000                   |
| **Sybil Guard**     | Each −150 penalty locks stake for +3 days           |

> _Score ≈ 10 000 = highly reliable; Score ≈ 2 000 = heavily muted rewards and influence._

- Score 0–10 000, adjusts according to behaviour.
- Vote weight = stake × score / 10 000.
- Unstake cooldown: 7 days.

### 2.5 Bootstrap Bay (v0.13c)

#### 2.5.1 Objectives

**Rapid community growth**

- Simple campaign, low entry fee (R1) → global reach.
- “100 referrals” filters real, influential users and attracts talent.

**Broad VAI distribution**

- 10 000 VAI airdrop per contributor → immediate ability to stake & vote.
- Circulating VAI accelerates Field DAO activity and proposal throughput.

#### 2.5.2 Mission

> “Bootstrap Bay is more than a BNB raffle; it on‑boards people and liquidity into VAI Protocol within months, not years.”

- Empower AI talent: researchers and developers obtain VAI without OTC/CEX.
- Unlock data flow: more VAI held by the community → more staked proposals → fly‑wheel growth.
- Ensure fairness & sustainability:  
  • **Leaderboard** (top 10 by referrals) grants R1 honour awards.  
  • Surplus VAI is burned → zero dilution.

| Round | Entry Fee |   BNB Pool |     Special Slots | Deadline | VAI Reserve | Burn Logic   |
| ----- | --------- | ---------: | ----------------: | -------: | ----------: | ------------ |
| R1    | 0.02 BNB  |      2 000 |     1 000 × 2 BNB |    180 d |     **3 B** | Burn surplus |
| R2    | 0.2 BNB   |    200 000 |   10 000 × 20 BNB |    120 d |    **30 B** | Burn surplus |
| R3    | 2 BNB     | 20 000 000 | 100 000 × 200 BNB |    180 d |   **300 B** | Burn surplus |

_Qualified wallet_ = paid entry + at least 100 paying referrals.  
Round closes when **all special slots are filled** _or_ the deadline elapses. BNB rewards (plus 10 × 100 k VAI honour awards in R1) are paid; remaining VAI is burned.

### 2.6 Referral

- Referrer earns **10 %** of the invitee’s VAI airdrop.
- Binding is permanent upon first on‑chain action.

### 2.7 Governance & Treasury

| Revenue Source                             | Destination    |
| ------------------------------------------ | -------------- |
| Field creation fee (10 000 VAI)            | `Treasury.sol` |
| Reward surplus after Adaptation adjustment | `Treasury.sol` |

`treasurySurplus = baseReward × (1 – adaptationScore / 10 000)`

---

## 3. Technical Architecture

### 3.1 High‑Level Diagram

```text
Frontend (React/Next) — WalletConnect/SIWE
            │ RPC
────────────▼──────────────────────────────
          BNB Smart Chain
  VAIToken (ERC‑20)        ← immutable
        ▲ MINTER/BURNER
BootstrapBay (UUPS) ─ calls ─┐
ReferralManager (UUPS) ──────┘
FieldManager (UUPS) — stake/vote — ProposalManager (UUPS)
            ▲ rewards                 │
            └─────────── Treasury.sol (UUPS)
TimelockGovernor (OZ) controls upgrades & spending
VRFConsumer (UUPS) supplies randomness to BootstrapBay
```

### 3.2 Core Smart‑Contract Set

| Contract               | Type                       | Core Function                                    | Upgradeable        |
| ---------------------- | -------------------------- | ------------------------------------------------ | ------------------ |
| `VAIToken.sol`         | ERC‑20 + Permit + Burnable | Native token – mint/burn via roles               | **No** (immutable) |
| `Treasury.sol`         | Pull‑payments              | Stores Field fees & reward surplus; DAO spending | UUPS               |
| `FieldManager.sol`     | Governance                 | Create/activate Field, manage stake & trust      | UUPS               |
| `ProposalManager.sol`  | Governance                 | Proposal lifecycle (create → vote → finalise)    | UUPS               |
| `AdaptationLib.sol`    | Library                    | Compute AdaptationScore, penalties               | N/A                |
| `VoteWeightLib.sol`    | Library                    | stake × score / 10 000                           | N/A                |
| `ReferralManager.sol`  | Incentive                  | Bind referrer, pay 10 % airdrop VAI              | UUPS               |
| `BootstrapBay.sol`     | Campaign                   | Three rounds, BNB pool, VRF draw, burn surplus   | UUPS               |
| `VRFConsumer.sol`      | Oracle helper              | Receive Chainlink VRF, batch winners             | UUPS               |
| `TimelockGovernor.sol` | Governance                 | Two‑step upgrades & treasury spend               | OZ Governor        |

### 3.3 Roles & Permissions

| Role            | Privilege             | Contracts                                                    |
| --------------- | --------------------- | ------------------------------------------------------------ |
| `DEFAULT_ADMIN` | Grant/revoke roles    | VAIToken, Treasury                                           |
| `MINTER`        | Mint VAI              | ProposalManager, BootstrapBay                                |
| `PAUSER`        | Emergency pause       | All core (Pausable)                                          |
| `UPGRADER`      | `_authorizeUpgrade()` | FieldManager, ProposalManager, BootstrapBay, ReferralManager |
| `SPENDER`       | Treasury transfers    | Timelock‑controlled multisig                                 |

### 3.4 Interaction Flow

#### 3.4.1 Stake → Vote → Reward

```text
User.createField()
  └─ FieldManager.createField() → Treasury.deposit(10k VAI)
User.subscribe() (stake balance += amount)
User.createProposal()
  └─ ProposalManager.create()
Staker.vote()
...7 days...
ProposalManager.finalise()
  ├─ FieldManager.updateTrust(+/-)
  ├─ VAIToken.mint(rewards)
  └─ ReferralManager.distribute()
```

#### 3.4.2 Bootstrap Bay

```text
contribute()
  ├─ transfer BNB in
  ├─ VAIToken.transfer(10k VAI airdrop)
  ├─ ReferralManager.setReferrer()
  ├─ if inviteCount==100 → _qualify()
  └─ if winners==cap OR now>deadline → _close()

_close()
  ├─ VRFConsumer.requestRandomWords()
  ├─ pay BNB jackpot & honour VAI
  └─ VAIToken.burn(reserveLeft)
```

### 3.5 Storage Layout (excerpt)

```solidity
// FieldManager
struct Field { uint96 stakeTotal; uint32 trust; address creator; bool active; }
mapping(uint256 => Field) public fields;
mapping(uint256 => mapping(address => uint96)) public stakeOf;

// ProposalManager
struct Proposal {
    uint32 fieldId;
    uint48 deadline;
    uint96 stake;
    uint128 yes;
    uint128 no;
    address proposer;
    bool executed;
}
mapping(uint256 => Proposal) public proposals;
mapping(uint256 => mapping(address => uint128)) public votes;
```

### 3.6 Example Snippets

#### FieldManager.createField

```solidity
function createField(string calldata name,string calldata uri,uint96 stake) external {
    require(stake >= 10_000e18, "min stake");
    _transferVAI(msg.sender, address(this), stake + 10_000e18); // fee + stake
    uint256 fid = ++fieldId;
    fields[fid] = Field(uint96(stake), 0, msg.sender, false);
    emit FieldCreated(fid, msg.sender);
}
```

#### ProposalManager.vote

```solidity
function vote(uint256 pid, bool support) external {
    Proposal storage p = proposals[pid];
    require(block.timestamp < p.deadline, "ended");
    require(votes[pid][msg.sender] == 0, "already voted");

    uint128 weight = uint128(
        stakeOf[p.fieldId][msg.sender] *
        AdaptationLib.score(msg.sender) / 10_000
    );
    require(weight > 0, "no weight");

    if (support) p.yes += weight; else p.no += weight;
    votes[pid][msg.sender] = weight;
    emit Voted(pid, msg.sender, support, weight);
}
```

### 3.7 Deployment & Upgrade Pipeline

| Step              | Tool                             |
| ----------------- | -------------------------------- |
| Write contracts   | Solidity 0.8.24 + OZ v5          |
| Unit/Fuzz tests   | Foundry (`forge test --fork`)    |
| Static analysis   | Slither / Mythril                |
| Deployment script | Hardhat + @openzeppelin/upgrades |
| Verify & publish  | Tenderly + BscScan               |
| On‑chain config   | Timelock DAO calls `initRound`   |

### 3.8 Security & Compliance

| Topic              | Measure                                 |
| ------------------ | --------------------------------------- |
| Re‑entrancy        | `ReentrancyGuard` on payable functions  |
| Role leakage       | `AccessControl`; roles revocable        |
| VRF spam           | Single `requestId` lock until fulfilled |
| Upgrade risk       | 48‑hour timelock + multisig approvals   |
| Lottery compliance | Geo‑fence and optional free‑entry path  |

---

## 4. References

| #   | Source                                                    | Brief                                      |
| --- | --------------------------------------------------------- | ------------------------------------------ |
| 1   | Ethereum Improvement Proposal 2612                        | Off‑chain signatures (Permit) for VAIToken |
| 2   | Chainlink Docs – VRF v2                                   | Randomness for Bootstrap Bay               |
| 3   | OpenZeppelin Contracts v5 API                             | ERC‑20, AccessControl, UUPS, Governor      |
| 4   | BNB Smart Chain Yellow‑Paper                              | Gas costs & EVM specifics                  |
| 5   | Liveness & Safety of DAO Governance, Cornell IC3 (2023)   | Basis for quorum 60 % / threshold 80 %     |
| 6   | CertiK Audit Report — BootstrapBay v0.13c (upcoming)      | Security & gas assessment                  |
| 7   | A Survey on Tokenomics for AI Projects — arXiv 2302.01234 | Reward/burn design patterns                |
| 8   | OFAC Sanctions List API                                   | Used in KYT for referral‑spam detection    |

---

## 5. License — Apache 2.0

```
Copyright 2025 VAI‑Protocol

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0
```

---

## 6. Disclaimer

### 6.1 No Investment Advice

This document is for information purposes only; it does **not** constitute financial or investment advice.

### 6.2 Market & Technical Risk

Tokens are volatile; smart contracts may contain bugs; key management is the user's responsibility.

### 6.3 Regulatory

Crypto‑asset and raffle regulations vary by jurisdiction; services may be geo‑blocked where required.

### 6.4 Forward‑Looking Statements

Roadmaps and projections are subject to change based on market, technical or DAO decisions.

### 6.5 Limitation of Liability

VAI‑Protocol, contributors and partners shall not be liable for any losses arising from use of the token, contracts or information herein.

---
