import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

const VAI_NAME = "Value Artificial Intelligence";
const VAI_SYMBOL = "VAI";
const VAI_DECIMALS = 9;
const INITIAL_SUPPLY_IN_VAI = 391 * 1_000_000_000; // 391 billion VAIs

describe("Value Artificial Intelligence", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const VAI = await hre.ethers.getContractFactory("VAI");
    const token = await VAI.deploy(
      VAI_NAME,
      VAI_SYMBOL,
      INITIAL_SUPPLY_IN_VAI,
      owner.address
    );

    return { token, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right name, symbol, decimals and owner", async function () {
      const { token, owner } = await loadFixture(deployFixture);

      expect(await token.name()).to.equal(VAI_NAME);
      expect(await token.symbol()).to.equal(VAI_SYMBOL);
      expect(await token.decimals()).to.equal(VAI_DECIMALS);
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply to the owner", async function () {
      const { token, owner } = await loadFixture(deployFixture);

      expect(await token.totalSupply()).to.equal(INITIAL_SUPPLY_IN_VAI);
      expect(await token.balanceOf(owner.address)).to.equal(
        INITIAL_SUPPLY_IN_VAI
      );
    });
  });
});
