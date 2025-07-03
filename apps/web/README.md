# VAI Protocol Web App

Web frontend for VAI Protocol - Decentralized AI Economy Platform.

## Quick Start

### 1. Environment Setup

Create `.env.local` file in this directory:

```bash
# Web3 Configuration
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id_here

# Network Configuration - specify single network only
# Can be: localhost, bscTestnet, bsc
NEXT_PUBLIC_NETWORK=localhost

# Contract Addresses (same for all networks)
NEXT_PUBLIC_VAI_TOKEN=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_MEMBERSHIP=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_BOOTSTRAP_BAY=0x1234567890123456789012345678901234567890
```

### 2. Install Dependencies

```bash
# From root directory
pnpm install
```

### 3. Run Development Server

```bash
# From root directory
pnpm dev

# Or from this directory
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Environment Configuration

### Network Selection

The app connects to **only one network** at a time based on the `NEXT_PUBLIC_NETWORK` environment variable:

- **Local Development**: `NEXT_PUBLIC_NETWORK=localhost`
- **Staging**: `NEXT_PUBLIC_NETWORK=bscTestnet`
- **Production**: `NEXT_PUBLIC_NETWORK=bsc`

Network switching is disabled in the UI to ensure consistency.

### Required Environment Variables

| Variable                    | Description                               | Required |
| --------------------------- | ----------------------------------------- | -------- |
| `NEXT_PUBLIC_PROJECT_ID`    | Reown/WalletConnect Project ID            | ✅       |
| `NEXT_PUBLIC_NETWORK`       | Target network (localhost/bscTestnet/bsc) | ✅       |
| `NEXT_PUBLIC_VAI_TOKEN`     | VAI Token contract address                | ✅       |
| `NEXT_PUBLIC_MEMBERSHIP`    | Membership contract address               | ✅       |
| `NEXT_PUBLIC_BOOTSTRAP_BAY` | Bootstrap Bay contract address            | ✅       |

### Getting Contract Addresses

Deploy contracts to your target network and use the deployed addresses:

- For **localhost**: Deploy using `pnpm deploy:localhost` in `apps/core`
- For **bscTestnet**: Deploy using `pnpm deploy:testnet` in `apps/core`
- For **bsc**: Deploy using `pnpm deploy:mainnet` in `apps/core`

### Getting Reown Project ID

1. Visit [Reown Cloud Dashboard](https://cloud.reown.com/)
2. Create a new project
3. Copy the Project ID to `NEXT_PUBLIC_PROJECT_ID`

## Features

- **Web3 Wallet Connection** (via Reown/WalletConnect)
- **Single Network Mode** (no network switching)
- **Dashboard** with portfolio overview
- **Bootstrap Rounds** participation
- **Affiliate System** management
- **Responsive Design** with Tailwind CSS

## Tech Stack

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Wagmi** for Ethereum interactions
- **Reown AppKit** for wallet connections
- **Tailwind CSS** for styling
- **TanStack Query** for data fetching

## Project Structure

```
apps/web/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── config/             # Web3 and app configuration
├── context/            # React context providers
├── services/           # Business logic and API calls
└── public/             # Static assets
```

## Development

### Building

```bash
pnpm build
```

### Type Checking

```bash
pnpm check-types
```

### Linting

```bash
pnpm lint
```

## Deployment Examples

### Local Development

```bash
NEXT_PUBLIC_PROJECT_ID=your_project_id
NEXT_PUBLIC_NETWORK=localhost
NEXT_PUBLIC_VAI_TOKEN=0x5FbDB2315678afecb367f032d93F642f64180aa3
NEXT_PUBLIC_MEMBERSHIP=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
NEXT_PUBLIC_BOOTSTRAP_BAY=0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

### Staging (BSC Testnet)

```bash
NEXT_PUBLIC_PROJECT_ID=your_project_id
NEXT_PUBLIC_NETWORK=bscTestnet
NEXT_PUBLIC_VAI_TOKEN=0x...deployed_on_testnet
NEXT_PUBLIC_MEMBERSHIP=0x...deployed_on_testnet
NEXT_PUBLIC_BOOTSTRAP_BAY=0x...deployed_on_testnet
```

### Production (BSC Mainnet)

```bash
NEXT_PUBLIC_PROJECT_ID=your_project_id
NEXT_PUBLIC_NETWORK=bsc
NEXT_PUBLIC_VAI_TOKEN=0x...deployed_on_mainnet
NEXT_PUBLIC_MEMBERSHIP=0x...deployed_on_mainnet
NEXT_PUBLIC_BOOTSTRAP_BAY=0x...deployed_on_mainnet
```
