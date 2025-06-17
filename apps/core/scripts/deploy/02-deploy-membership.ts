import { ethers } from "hardhat";
import { Membership } from "../../typechain-types";

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
  console.log("🚀 Deploying Membership Contract");
  console.log("=".repeat(50));
  console.log("Deploying account:", deployer.address);
  console.log(
    "Account balance:",
    ethers.formatEther(await deployer.provider.getBalance(deployer.address)),
    "ETH"
  );

  // Deploy Membership Contract
  console.log("\n⏳ Deploying Membership Contract...");
  const Membership = await ethers.getContractFactory("Membership");
  const membership: Membership = await Membership.deploy();

  await membership.waitForDeployment();
  const membershipAddress = await membership.getAddress();

  console.log("✅ Membership Contract deployed successfully!");
  console.log("Contract Address:", membershipAddress);
  console.log("Transaction Hash:", membership.deploymentTransaction()?.hash);

  // Verify deployment
  console.log("\n🔍 Verifying deployment...");
  const owner = await membership.owner();
  const defaultAdaptation = await membership.DEFAULT_ADAPTATION();
  const paused = await membership.paused();

  console.log("Verified Owner:", owner);
  console.log("Default Adaptation Score:", defaultAdaptation.toString());
  console.log("Contract Paused:", paused);

  // Test basic functionality
  console.log("\n🧪 Testing basic functionality...");

  // Check if deployer is already a member
  const isDeployerMember = await membership.isMember(deployer.address);
  console.log("Deployer is member:", isDeployerMember);

  if (!isDeployerMember) {
    console.log("Adding deployer as first member...");
    const joinTx = await membership["join()"]();
    await joinTx.wait();
    console.log("✅ Deployer joined successfully!");

    // Verify membership
    const isNowMember = await membership.isMember(deployer.address);
    const memberInfo = await membership._members(deployer.address);
    console.log("Deployer is now member:", isNowMember);
    console.log("Member adaptation:", memberInfo.adaptation.toString());
    console.log("Member referrer:", memberInfo.referrer);
  }

  // Save deployment info
  const network = await membership.runner?.provider?.getNetwork();
  const deploymentInfo = {
    network: {
      name: network?.name,
      chainId: network?.chainId?.toString(),
    },
    contractAddress: membershipAddress,
    deployerAddress: deployer.address,
    deploymentTransaction: membership.deploymentTransaction()?.hash,
    blockNumber: membership.deploymentTransaction()?.blockNumber?.toString(),
    timestamp: new Date().toISOString(),
    constructorArgs: [],
    configuration: {
      defaultAdaptation: defaultAdaptation.toString(),
      owner: owner,
      paused: paused,
    },
  };

  console.log("\n💾 Deployment Info:");
  console.log(JSON.stringify(deploymentInfo, bigIntReplacer, 2));

  console.log("\n🎉 Membership Contract deployment completed successfully!");
  console.log("=".repeat(50));

  return {
    membership,
    membershipAddress,
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
