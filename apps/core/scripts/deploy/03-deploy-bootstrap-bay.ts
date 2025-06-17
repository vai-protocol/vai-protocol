import { ethers } from "hardhat";
import { BootstrapBay } from "../../typechain-types";

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
  console.log("🚀 Deploying BootstrapBay Contract");
  console.log("=".repeat(50));
  console.log("Deploying account:", deployer.address);
  console.log(
    "Account balance:",
    ethers.formatEther(await deployer.provider.getBalance(deployer.address)),
    "ETH"
  );

  // Round configuration for Round 1
  const roundConfig = {
    entry: ethers.parseEther("0.1"), // 0.1 BNB entry fee
    pool: ethers.parseEther("10"), // 10 BNB total pool
    slots: 100, // 100 participation slots
    reserve: ethers.parseUnits("1000000", 9), // 1M VAI reserve
    deadline: Math.floor(Date.now() / 1000) + 180 * 24 * 60 * 60, // 6 months from now
    isActive: true,
  };

  console.log("\n📄 Round Configuration:");
  console.log("Entry Fee:", ethers.formatEther(roundConfig.entry), "BNB");
  console.log("Total Pool:", ethers.formatEther(roundConfig.pool), "BNB");
  console.log("Slots:", roundConfig.slots);
  console.log(
    "VAI Reserve:",
    ethers.formatUnits(roundConfig.reserve, 9),
    "VAI"
  );
  console.log("Deadline:", new Date(roundConfig.deadline * 1000).toISOString());
  console.log("Is Active:", roundConfig.isActive);

  // Deploy BootstrapBay Contract
  console.log("\n⏳ Deploying BootstrapBay Contract...");
  const BootstrapBay = await ethers.getContractFactory("BootstrapBay");
  const bootstrapBay: BootstrapBay = await BootstrapBay.deploy(roundConfig);

  await bootstrapBay.waitForDeployment();
  const bootstrapBayAddress = await bootstrapBay.getAddress();

  console.log("✅ BootstrapBay Contract deployed successfully!");
  console.log("Contract Address:", bootstrapBayAddress);
  console.log("Transaction Hash:", bootstrapBay.deploymentTransaction()?.hash);

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const owner = await bootstrapBay.owner();
  const currentRound = await bootstrapBay.getCurrentRound();

  console.log("Verified Owner:", owner);
  console.log("Current Round Info:");
  console.log("  Entry Fee:", ethers.formatEther(currentRound.entry), "BNB");
  console.log("  Pool:", ethers.formatEther(currentRound.pool), "BNB");
  console.log("  Slots:", currentRound.slots.toString());
  console.log("  Reserve:", ethers.formatUnits(currentRound.reserve, 9), "VAI");
  console.log(
    "  Deadline:",
    new Date(Number(currentRound.deadline) * 1000).toISOString()
  );
  console.log("  Is Active:", currentRound.isActive);

  // Save deployment info
  const network = await bootstrapBay.runner?.provider?.getNetwork();
  const deploymentInfo = {
    network: {
      name: network?.name,
      chainId: network?.chainId?.toString(),
    },
    contractAddress: bootstrapBayAddress,
    deployerAddress: deployer.address,
    deploymentTransaction: bootstrapBay.deploymentTransaction()?.hash,
    blockNumber: bootstrapBay.deploymentTransaction()?.blockNumber?.toString(),
    timestamp: new Date().toISOString(),
    constructorArgs: {
      entry: roundConfig.entry.toString(),
      pool: roundConfig.pool.toString(),
      slots: roundConfig.slots,
      reserve: roundConfig.reserve.toString(),
      deadline: roundConfig.deadline,
      isActive: roundConfig.isActive,
    },
    roundConfiguration: {
      entry: roundConfig.entry.toString(),
      pool: roundConfig.pool.toString(),
      slots: roundConfig.slots,
      reserve: roundConfig.reserve.toString(),
      deadline: roundConfig.deadline,
      isActive: roundConfig.isActive,
    },
  };

  console.log("\n💾 Deployment Info:");
  console.log(JSON.stringify(deploymentInfo, bigIntReplacer, 2));

  console.log("\n🎉 BootstrapBay Contract deployment completed successfully!");
  console.log("=".repeat(50));

  return {
    bootstrapBay,
    bootstrapBayAddress,
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
