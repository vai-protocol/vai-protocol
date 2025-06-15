'use client'

import { useAccount, useReadContract } from 'wagmi'

// Example VAI Token ABI (minimal for demonstration)
const VAI_TOKEN_ABI = [
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol", 
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// VAI Token contract address (placeholder - replace with actual address)
const VAI_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_VAI_TOKEN_BSC as `0x${string}`

export default function WalletInfo() {
  const { address, isConnected, chain } = useAccount()

  // Read VAI token name
  const { data: tokenName } = useReadContract({
    abi: VAI_TOKEN_ABI,
    address: VAI_TOKEN_ADDRESS,
    functionName: 'name',
    query: {
      enabled: !!VAI_TOKEN_ADDRESS && VAI_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000'
    }
  })

  // Read VAI token symbol
  const { data: tokenSymbol } = useReadContract({
    abi: VAI_TOKEN_ABI,
    address: VAI_TOKEN_ADDRESS,
    functionName: 'symbol',
    query: {
      enabled: !!VAI_TOKEN_ADDRESS && VAI_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000'
    }
  })

  // Read user's VAI balance
  const { data: balance } = useReadContract({
    abi: VAI_TOKEN_ABI,
    address: VAI_TOKEN_ADDRESS,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!VAI_TOKEN_ADDRESS && VAI_TOKEN_ADDRESS !== '0x0000000000000000000000000000000000000000'
    }
  })

  if (!isConnected) {
    return (
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Wallet Status</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your wallet to see your VAI token information
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Wallet Information</h3>
      
      <div className="space-y-3">
        <div>
          <span className="font-medium">Address:</span>
          <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">
            {address}
          </p>
        </div>
        
        <div>
          <span className="font-medium">Network:</span>
          <p className="text-sm">{chain?.name || 'Unknown'}</p>
        </div>

        {tokenName && tokenSymbol && (
          <div>
            <span className="font-medium">Token:</span>
            <p className="text-sm">{tokenName} ({tokenSymbol})</p>
          </div>
        )}

        {balance !== undefined && (
          <div>
            <span className="font-medium">VAI Balance:</span>
            <p className="text-sm">{(Number(balance) / 1e18).toFixed(6)} VAI</p>
          </div>
        )}
      </div>
    </div>
  )
}
