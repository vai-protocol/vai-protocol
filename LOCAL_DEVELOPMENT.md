# 🚀 LOCAL DEVELOPMENT SETUP

Complete guide to run VAI Protocol locally for development.

## 📋 Prerequisites

- Node.js 18+
- pnpm
- MetaMask browser extension

## 🔧 Quick Start

### 1. **Start Hardhat Node**

```bash
# Terminal 1: Start local blockchain
cd apps/core
pnpm node
```

This will:

- Start local blockchain on `http://127.0.0.1:8545`
- Create 20 accounts with 10,000 ETH each
- Display private keys and addresses

### 2. **Deploy Contracts**

```bash
# Terminal 2: Deploy all contracts
cd apps/core
pnpm deploy:local
```

This will:

- Deploy VAI Token, Membership, and Bootstrap Bay contracts
- Auto-generate `apps/web/.env.local` with contract addresses
- Display deployment summary and next steps

### 3. **Setup MetaMask**

#### Add Localhost Network:

- Network Name: `Localhost 8545`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Currency Symbol: `ETH`

#### Import Test Account:

Copy a private key from Hardhat node output and import to MetaMask.

### 4. **Configure Web App**

```bash
# Edit the generated file
nano apps/web/.env.local

# Set your WalletConnect Project ID (get from cloud.walletconnect.com)
NEXT_PUBLIC_PROJECT_ID=your_project_id_here
```

### 5. **Start Web App**

```bash
# Terminal 3: Start frontend
cd apps/web
pnpm dev
```

Open `http://localhost:3001`

## 🎯 Usage Flow

### **For Regular User:**

1. Connect MetaMask to localhost
2. Navigate to Bootstrap Bay
3. Contribute to round with test ETH
4. View referral system in Affiliate section

### **For Developer:**

1. Contracts deployed and ready
2. Full Web3 integration working
3. Real blockchain interaction (local)
4. Same experience as testnet/mainnet

## ⚡ Available Scripts

| Script         | Command                             | Description               |
| -------------- | ----------------------------------- | ------------------------- |
| **Start Node** | `cd apps/core && pnpm node`         | Start local blockchain    |
| **Deploy**     | `cd apps/core && pnpm deploy:local` | Deploy all contracts      |
| **Test**       | `cd apps/core && pnpm test`         | Run contract tests        |
| **Start Web**  | `cd apps/web && pnpm dev`           | Start frontend dev server |

## 🔍 Contract Addresses

After deployment, check `apps/web/.env.local`:

```env
NEXT_PUBLIC_VAI_TOKEN_LOCALHOST=0x5FbDB2315678afecb367f032d93F642f64180aa3
NEXT_PUBLIC_MEMBERSHIP_LOCALHOST=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
NEXT_PUBLIC_BOOTSTRAP_BAY_LOCALHOST=0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

## 🧪 Testing Features

### **VAI Token:**

- ✅ Mint/Burn functionality
- ✅ Blacklist system
- ✅ Pause mechanism
- ✅ Transfer controls

### **Membership:**

- ✅ Join with/without referrer
- ✅ 10% commission system
- ✅ Ban/reactivate members
- ✅ Claim commissions

### **Bootstrap Bay:**

- ✅ Contribute with BNB
- ✅ Referral tracking
- ✅ Reward distribution
- ✅ Round management

## 🚨 Troubleshooting

### **"Contract not found" Error:**

```bash
# Redeploy contracts
cd apps/core
pnpm deploy:local
```

### **MetaMask Connection Issues:**

1. Reset MetaMask account in Settings > Advanced > Reset Account
2. Ensure you're on `Localhost 8545` network
3. Check private key import

### **Web App Not Loading Contracts:**

1. Check `.env.local` file exists in `apps/web/`
2. Restart web dev server after deployment
3. Verify `NEXT_PUBLIC_PROJECT_ID` is set

### **Transactions Failing:**

1. Ensure you have test ETH from Hardhat accounts
2. Check MetaMask is connected to correct network
3. Try resetting MetaMask account

## 🎯 Development Workflow

### **Smart Contract Changes:**

```bash
# 1. Modify contracts in apps/core/contracts/
# 2. Redeploy
cd apps/core
pnpm deploy:local

# 3. Restart web app to pick up new addresses
cd apps/web
pnpm dev
```

### **Frontend Changes:**

- Hot reload enabled
- No need to restart for React changes
- Restart only if changing wagmi config

## 🌐 Network Comparison

| Feature        | Localhost  | BSC Testnet  | BSC Mainnet  |
| -------------- | ---------- | ------------ | ------------ |
| **Speed**      | ⚡ Instant | 🐌 3s blocks | 🐌 3s blocks |
| **Cost**       | 💰 Free    | 💰 Free      | 💸 Real BNB  |
| **Reset**      | 🔄 Easy    | ❌ No        | ❌ No        |
| **Debug**      | 🔍 Full    | ⚠️ Limited   | ❌ No        |
| **Experience** | ✅ Same    | ✅ Same      | ✅ Same      |

## ✨ Benefits of Local Development

- **🚀 Instant transactions** - No waiting for block confirmations
- **💰 Unlimited test funds** - 10,000 ETH per account
- **🔄 Easy reset** - Restart node for clean state
- **🔍 Full debugging** - Complete blockchain logs
- **⚡ Fast iteration** - Deploy and test immediately
- **🌐 Real Web3** - Identical to mainnet experience

---

**Ready to build on VAI Protocol! 🎉**
