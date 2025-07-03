import { ethers } from "hardhat";
import deployVAI from "./01-deploy-vai-token";
import deployMembership from "./02-deploy-membership";
import deployBootstrapBay from "./03-deploy-bootstrap-bay";
import setupLocalEnv from "../setup-local-env";

interface DeploymentResult {
    vai: {
        address: string;
        contract: any;
    };
    membership: {
        address: string;
        contract: any;
    };
    bootstrapBay: {
        address: string;
        contract: any;
    };
    deploymentSummary: {
        network: any;
        deployer: string;
        timestamp: string;
        gasUsed: string;
    };
}

async function main(): Promise<DeploymentResult> {
    const [deployer] = await ethers.getSigners();
    const network = await deployer.provider.getNetwork();
    
    console.log("=".repeat(60));
    console.log("🌟 VAI PROTOCOL COMPLETE DEPLOYMENT");
    console.log("=".repeat(60));
    console.log("🌐 Network:", network.name, `(Chain ID: ${network.chainId})`);
    console.log("👤 Deployer:", deployer.address);
    console.log("💰 Initial Balance:", ethers.formatEther(await deployer.provider.getBalance(deployer.address)), "ETH");
    console.log("📅 Timestamp:", new Date().toISOString());
    console.log("=".repeat(60));
    
    let totalGasUsed = 0n;
    
    try {
        // Phase 1: Deploy VAI Token
        console.log("\n🎯 PHASE 1: VAI Token Deployment");
        console.log("-".repeat(40));
        const vaiResult = await deployVAI();
        
        if (vaiResult.vai.deploymentTransaction()) {
            const receipt = await vaiResult.vai.deploymentTransaction()!.wait();
            if (receipt) {
                totalGasUsed += receipt.gasUsed;
                console.log("⛽ Gas used for VAI deployment:", receipt.gasUsed.toString());
            }
        }
        
        // Phase 2: Deploy Membership
        console.log("\n🎯 PHASE 2: Membership System Deployment");
        console.log("-".repeat(40));
        const membershipResult = await deployMembership();
        
        if (membershipResult.membership.deploymentTransaction()) {
            const receipt = await membershipResult.membership.deploymentTransaction()!.wait();
            if (receipt) {
                totalGasUsed += receipt.gasUsed;
                console.log("⛽ Gas used for Membership deployment:", receipt.gasUsed.toString());
            }
        }
        
        // Phase 3: Deploy Bootstrap Bay
        console.log("\n🎯 PHASE 3: Bootstrap Bay Deployment");
        console.log("-".repeat(40));
        const bootstrapBayResult = await deployBootstrapBay();
        
        if (bootstrapBayResult.bootstrapBay.deploymentTransaction()) {
            const receipt = await bootstrapBayResult.bootstrapBay.deploymentTransaction()!.wait();
            if (receipt) {
                totalGasUsed += receipt.gasUsed;
                console.log("⛽ Gas used for BootstrapBay deployment:", receipt.gasUsed.toString());
            }
        }
        
        // Final balance check
        const finalBalance = await deployer.provider.getBalance(deployer.address);
        
        // Deployment Summary
        const deploymentSummary = {
            network: {
                name: network.name,
                chainId: Number(network.chainId),
            },
            deployer: deployer.address,
            timestamp: new Date().toISOString(),
            gasUsed: totalGasUsed.toString()
        };
        
        // Results
        const results: DeploymentResult = {
            vai: {
                address: vaiResult.vaiAddress,
                contract: vaiResult.vai
            },
            membership: {
                address: membershipResult.membershipAddress,
                contract: membershipResult.membership
            },
            bootstrapBay: {
                address: bootstrapBayResult.bootstrapBayAddress,
                contract: bootstrapBayResult.bootstrapBay
            },
            deploymentSummary
        };
        
        // Auto-setup environment for localhost
        if (network.chainId === 31337n || network.name === "localhost") {
            console.log("\n🎯 PHASE 4: Setting up Local Environment");
            console.log("-".repeat(40));
            
            setupLocalEnv({
                VAI_TOKEN: results.vai.address,
                MEMBERSHIP: results.membership.address,
                BOOTSTRAP_BAY: results.bootstrapBay.address,
            });
        }
        
        // Success Summary
        console.log("\n" + "=".repeat(60));
        console.log("🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!");
        console.log("=".repeat(60));
        console.log("\n📋 CONTRACT ADDRESSES:");
        console.log("┌─────────────────┬──────────────────────────────────────────────┐");
        console.log("│ Contract        │ Address                                      │");
        console.log("├─────────────────┼──────────────────────────────────────────────┤");
        console.log(`│ VAI Token       │ ${results.vai.address} │`);
        console.log(`│ Membership      │ ${results.membership.address} │`);
        console.log(`│ Bootstrap Bay   │ ${results.bootstrapBay.address} │`);
        console.log("└─────────────────┴──────────────────────────────────────────────┘");
        
        console.log("\n📊 DEPLOYMENT STATISTICS:");
        console.log("┌─────────────────┬──────────────────────────────────────────────┐");
        console.log("│ Metric          │ Value                                        │");
        console.log("├─────────────────┼──────────────────────────────────────────────┤");
        console.log(`│ Network         │ ${network.name} (${network.chainId})                                   │`);
        console.log(`│ Total Gas Used  │ ${totalGasUsed.toString()}                                │`);
        console.log(`│ Final Balance   │ ${ethers.formatEther(finalBalance)} ETH                       │`);
        console.log(`│ Deployer        │ ${deployer.address} │`);
        console.log("└─────────────────┴──────────────────────────────────────────────┘");
        
        if (network.chainId !== 31337n && network.name !== "localhost") {
            console.log("\n🔗 VERIFICATION COMMANDS:");
            console.log(`npx hardhat verify --network ${network.name} ${results.vai.address} "Value Artificial intelligence" "VAI" "391000000000000000000"`);
            console.log(`npx hardhat verify --network ${network.name} ${results.membership.address}`);
            console.log(`npx hardhat verify --network ${network.name} ${results.bootstrapBay.address} "[[\\"${ethers.parseEther("0.1")}\\",\\"${ethers.parseEther("10")}\\",\\"100\\",\\"${ethers.parseUnits("1000000", 9)}\\",\\"${Math.floor(Date.now() / 1000) + (180 * 24 * 60 * 60)}\\",true]]"`);
        }
        
        console.log("\n✨ Next Steps:");
        if (network.chainId === 31337n || network.name === "localhost") {
            console.log("1. Environment is automatically configured in apps/web/.env.local");
            console.log("2. Start the web app: cd apps/web && pnpm dev");
            console.log("3. Connect MetaMask to localhost:8545");
            console.log("4. Import one of the hardhat accounts to MetaMask");
            console.log("5. Optional: Update NEXT_PUBLIC_PROJECT_ID in .env.local if needed");
        } else {
            console.log("1. Manually update apps/web/.env.local with these contract addresses:");
            console.log(`   NEXT_PUBLIC_VAI_TOKEN=${results.vai.address}`);
            console.log(`   NEXT_PUBLIC_MEMBERSHIP=${results.membership.address}`);
            console.log(`   NEXT_PUBLIC_BOOTSTRAP_BAY=${results.bootstrapBay.address}`);
            console.log("2. Verify all contracts on block explorer");
            console.log("3. Set up inter-contract permissions");
            console.log("4. Configure referral commission rates");
            console.log("5. Initialize bootstrap rounds");
        }
        console.log("5. Run integration tests");
        
        console.log("\n" + "=".repeat(60));
        
        return results;
        
    } catch (error) {
        console.error("\n❌ DEPLOYMENT FAILED!");
        console.error("Error:", error);
        throw error;
    }
}

// Execute deployment
if (require.main === module) {
    main()
        .then((results) => {
            console.log("\n✅ All contracts deployed successfully!");
            process.exit(0);
        })
        .catch((error) => {
            console.error("❌ Deployment script failed:");
            console.error(error);
            process.exit(1);
        });
}

export default main; 