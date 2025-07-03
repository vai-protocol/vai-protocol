import { ethers } from "hardhat";
import { Membership } from "../../typechain-types";

// Configuration
const REFERRER_ADDRESS = "0x569f861496BccC52056f0f45ee4D91cE018B1820";
const REFERRER_PRIVATE =
  "e14cdab5a698e2f35f76412eca1666d3330d4a5e401b36b4e940efd2da469646";
const REFERRER_AMOUNT = ethers.parseEther("1"); // 1 BNB
const MEMBER_AMOUNT = ethers.parseEther("0.1"); // 0.1 BNB
const NUM_MEMBERS = 66;

interface GeneratedMember {
  address: string;
  privateKey: string;
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await deployer.provider.getNetwork();

  console.log("=".repeat(60));
  console.log("🎯 VAI PROTOCOL REFERRAL DATA GENERATOR");
  console.log("=".repeat(60));
  console.log("🌐 Network:", network.name, `(Chain ID: ${network.chainId})`);
  console.log("👤 Deployer:", deployer.address);
  console.log(
    "💰 Initial Balance:",
    ethers.formatEther(await deployer.provider.getBalance(deployer.address)),
    "BNB"
  );
  console.log("🎯 Referrer Address:", REFERRER_ADDRESS);
  console.log("👥 Members to Generate:", NUM_MEMBERS);
  console.log("=".repeat(60));

  // Get Membership contract address from environment
  let membershipAddress: string;

  try {
    // Try to read from local env file (created by deployment)
    const fs = require("fs");
    const path = require("path");
    const envPath = path.join(__dirname, "../../../web/.env.local");

    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf8");
      const membershipMatch = envContent.match(/NEXT_PUBLIC_MEMBERSHIP=(.+)/);
      if (membershipMatch) {
        membershipAddress = membershipMatch[1].trim();
        console.log("📋 Found Membership contract:", membershipAddress);
      } else {
        throw new Error("NEXT_PUBLIC_MEMBERSHIP not found in .env.local");
      }
    } else {
      throw new Error(".env.local file not found");
    }
  } catch (error) {
    console.log("⚠️  Could not read contract address from .env.local");
    console.log(
      "💡 Please ensure contracts are deployed first with: pnpm deploy:local"
    );
    throw error;
  }

  // Connect to Membership contract
  const membership: Membership = await ethers.getContractAt(
    "Membership",
    membershipAddress
  );
  console.log("✅ Connected to Membership contract");

  // Check initial state
  const initialDeployerBalance = await deployer.provider.getBalance(
    deployer.address
  );
  const isReferrerMember = await membership.isMember(REFERRER_ADDRESS);

  console.log("\n📊 INITIAL STATE CHECK:");
  console.log("Referrer is member:", isReferrerMember);
  console.log(
    "Contract balance:",
    ethers.formatEther(await deployer.provider.getBalance(membershipAddress)),
    "BNB"
  );

  // Step 1: Send a funds to referrer address
  console.log("\n🎯 STEP 1: Funding Referrer Address");
  console.log("-".repeat(40));

  const fundReferrerTx = await deployer.sendTransaction({
    to: REFERRER_ADDRESS,
    value: REFERRER_AMOUNT,
    gasLimit: 21000,
  });

  await fundReferrerTx.wait();
  console.log("✅ Sent " + REFERRER_AMOUNT + " BNB to referrer");
  console.log("Transaction:", fundReferrerTx.hash);

  // Step 2: Make referrer join membership (if not already a member)
  console.log("\n🎯 STEP 2: Referrer Membership");
  console.log("-".repeat(40));

  if (!isReferrerMember) {
    const referrerBalance =
      await deployer.provider.getBalance(REFERRER_ADDRESS);
    console.log(
      "Referrer balance:",
      ethers.formatEther(referrerBalance),
      "BNB"
    );

    // Create wallet instance from private key and connect to provider
    const referrerWallet = new ethers.Wallet(
      REFERRER_PRIVATE,
      deployer.provider
    );

    const membershipAsReferrer = membership.connect(referrerWallet);
    const joinTx = await membershipAsReferrer["join()"]();
    await joinTx.wait();

    console.log("✅ Referrer joined membership");
    console.log("Transaction:", joinTx.hash);
  } else {
    console.log("✅ Referrer is already a member");
  }

  // Step 3: Generate random addresses and fund them
  console.log("\n🎯 STEP 3: Generating and Funding Random Members");
  console.log("-".repeat(40));

  const generatedMembers: GeneratedMember[] = [];

  // Generate wallets
  console.log("🔄 Generating", NUM_MEMBERS, "random wallets...");
  for (let i = 0; i < NUM_MEMBERS; i++) {
    const wallet = ethers.Wallet.createRandom();
    generatedMembers.push({
      address: wallet.address,
      privateKey: wallet.privateKey,
    });
  }
  console.log("✅ Generated", NUM_MEMBERS, "random wallets");

  // Fund all addresses sequentially to avoid nonce issues
  console.log(
    "💰 Funding all addresses with " + MEMBER_AMOUNT + " BNB each..."
  );
  let totalFunded = 0;

  for (let i = 0; i < generatedMembers.length; i++) {
    const member = generatedMembers[i];

    const tx = await deployer.sendTransaction({
      to: member.address,
      value: MEMBER_AMOUNT,
      gasLimit: 21000,
    });

    await tx.wait();
    totalFunded++;

    // Log progress every 10 addresses
    if (totalFunded % 10 === 0 || totalFunded === NUM_MEMBERS) {
      console.log(`✅ Funded ${totalFunded}/${NUM_MEMBERS} addresses`);
    }
  }

  // Step 4: Join membership for all generated addresses
  console.log("\n🎯 STEP 4: Joining Membership for All Members");
  console.log("-".repeat(40));

  if (network.chainId === 31337n) {
    let totalJoined = 0;

    for (let i = 0; i < generatedMembers.length; i++) {
      const member = generatedMembers[i];

      // Create wallet instance from private key and connect to provider
      const memberWallet = new ethers.Wallet(
        member.privateKey,
        deployer.provider
      );

      const membershipAsMember = membership.connect(memberWallet);
      const joinTx =
        await membershipAsMember["join(address)"](REFERRER_ADDRESS);
      await joinTx.wait();

      totalJoined++;

      // Log progress every 10 members
      if (totalJoined % 10 === 0 || totalJoined === NUM_MEMBERS) {
        console.log(`✅ Joined ${totalJoined}/${NUM_MEMBERS} members`);
      }
    }
  } else {
    console.log("⚠️  Cannot auto-join members on non-localhost network");
    console.log("💡 Generated addresses with private keys for manual joining:");
    generatedMembers.forEach((member, index) => {
      console.log(`${index + 1}. ${member.address} (PK: ${member.privateKey})`);
    });
    return;
  }

  // Step 5: Verify results
  console.log("\n🎯 STEP 5: Verification");
  console.log("-".repeat(40));

  const referrerInfo = await membership.getMemberInfo(REFERRER_ADDRESS);
  const contractBalance = await deployer.provider.getBalance(membershipAddress);
  const finalDeployerBalance = await deployer.provider.getBalance(
    deployer.address
  );
  const totalCost = initialDeployerBalance - finalDeployerBalance;

  console.log("📊 FINAL RESULTS:");
  console.log("┌─────────────────────────┬──────────────────────────┐");
  console.log("│ Metric                  │ Value                    │");
  console.log("├─────────────────────────┼──────────────────────────┤");
  console.log(
    `│ Referrer Address        │ ${REFERRER_ADDRESS.slice(0, 10)}...${REFERRER_ADDRESS.slice(-8)} │`
  );
  console.log(
    `│ Referrer Referral Count │ ${referrerInfo.referralCount.toString().padEnd(24)} │`
  );
  console.log(
    `│ Total Members Generated │ ${NUM_MEMBERS.toString().padEnd(24)} │`
  );
  console.log(
    `│ Contract Balance        │ ${ethers.formatEther(contractBalance).padEnd(20)} BNB │`
  );
  console.log(
    `│ Total Cost              │ ${ethers.formatEther(totalCost).padEnd(20)} BNB │`
  );
  console.log("└─────────────────────────┴──────────────────────────┘");

  // Verify a few random members
  console.log("\n🔍 Sample Member Verification:");
  for (let i = 0; i < Math.min(5, generatedMembers.length); i++) {
    const member = generatedMembers[i];
    const isMember = await membership.isMember(member.address);
    const memberInfo = await membership.getMemberInfo(member.address);
    console.log(
      `${i + 1}. ${member.address}: Member=${isMember}, Referrer=${memberInfo.referrer}`
    );
  }

  console.log("\n" + "=".repeat(60));
  console.log("🎉 REFERRAL DATA GENERATION COMPLETED SUCCESSFULLY!");
  console.log("=".repeat(60));

  console.log("\n📋 Summary:");
  console.log(
    `• Referrer ${REFERRER_ADDRESS} has ${referrerInfo.referralCount} referrals`
  );
  console.log(`• ${NUM_MEMBERS} members joined with referrer`);
  console.log(`• All addresses funded and joined membership`);
  console.log(`• Total cost: ${ethers.formatEther(totalCost)} BNB`);

  if (network.chainId === 31337n) {
    console.log("\n💡 Next Steps:");
    console.log("1. Start the web app: cd apps/web && pnpm dev");
    console.log("2. Connect MetaMask to localhost:8545");
    console.log("3. Check referral dashboard with the referrer address");
    console.log("4. Verify member portfolios");
  }

  return {
    referrerAddress: REFERRER_ADDRESS,
    referrerInfo,
    generatedMembers,
    totalMembers: NUM_MEMBERS,
    totalCost: ethers.formatEther(totalCost),
  };
}

// Execute script
if (require.main === module) {
  main()
    .then((results) => {
      console.log("\n✅ Referral data generation completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Referral data generation failed:");
      console.error(error);
      process.exit(1);
    });
}

export default main;
