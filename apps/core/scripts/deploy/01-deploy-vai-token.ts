import { ethers } from "hardhat";
import { VAI } from "../../typechain-types";

// Utility function to handle BigInt serialization
function bigIntReplacer(key: string, value: any): any {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("=".repeat(50));
  console.log("🚀 Deploying VAI Token Contract");
  console.log("=".repeat(50));
  console.log("Deploying account:", deployer.address);
  console.log(
    "Account balance:",
    ethers.formatEther(await deployer.provider.getBalance(deployer.address)),
    "ETH"
  );

  // Token parameters
  const TOKEN_NAME = "Defi AI";
  const TOKEN_SYMBOL = "DEAI";
  const INITIAL_SUPPLY = ethers.parseUnits("391000000000", 9); // 391 billion VAI with 9 decimals

  console.log("\n📄 Token Parameters:");
  console.log("Name:", TOKEN_NAME);
  console.log("Symbol:", TOKEN_SYMBOL);
  console.log("Decimals: 9");
  console.log("Initial Supply:", ethers.formatUnits(INITIAL_SUPPLY, 9), "VAI");

  // Deploy VAI Token
  console.log("\n⏳ Deploying VAI Token...");
  const VAI = await ethers.getContractFactory("VAI");
  const vai: VAI = await VAI.deploy(TOKEN_NAME, TOKEN_SYMBOL, INITIAL_SUPPLY);

  await vai.waitForDeployment();
  const vaiAddress = await vai.getAddress();

  console.log("✅ VAI Token deployed successfully!");
  console.log("Contract Address:", vaiAddress);
  console.log("Transaction Hash:", vai.deploymentTransaction()?.hash);

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const name = await vai.name();
  const symbol = await vai.symbol();
  const decimals = await vai.decimals();
  const totalSupply = await vai.totalSupply();
  const owner = await vai.owner();

  console.log("Verified Name:", name);
  console.log("Verified Symbol:", symbol);
  console.log("Verified Decimals:", decimals);
  console.log(
    "Verified Total Supply:",
    ethers.formatUnits(totalSupply, 9),
    "VAI"
  );
  console.log("Verified Owner:", owner);
  console.log(
    "Owner Balance:",
    ethers.formatUnits(await vai.balanceOf(owner), 9),
    "VAI"
  );

  // Save deployment info
  const network = await vai.runner?.provider?.getNetwork();
  const deploymentInfo = {
    network: {
      name: network?.name,
      chainId: network?.chainId?.toString(),
    },
    contractAddress: vaiAddress,
    deployerAddress: deployer.address,
    deploymentTransaction: vai.deploymentTransaction()?.hash,
    blockNumber: vai.deploymentTransaction()?.blockNumber?.toString(),
    timestamp: new Date().toISOString(),
    constructorArgs: [TOKEN_NAME, TOKEN_SYMBOL, INITIAL_SUPPLY.toString()],
    tokenInfo: {
      name: name,
      symbol: symbol,
      decimals: decimals.toString(),
      totalSupply: totalSupply.toString(),
      owner: owner,
    },
  };

  console.log("\n💾 Deployment Info:");
  console.log(JSON.stringify(deploymentInfo, bigIntReplacer, 2));

  console.log("\n🎉 VAI Token deployment completed successfully!");
  console.log("=".repeat(50));

  return {
    vai,
    vaiAddress,
    deploymentInfo,
  };
}

// Execute deployment
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Deployment failed:");
      console.error(error);
      process.exit(1);
    });
}

export default main;
