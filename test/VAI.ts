import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Value Artificial Intelligence", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const INITIAL_SUPPLY = 391 * 1_000_000_000; // 391 billion VAIs

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const VAI = await hre.ethers.getContractFactory("VAI");
    const token = await VAI.deploy(
      "Value Artificial Intelligence",
      "VAI",
      INITIAL_SUPPLY,
      owner.address
    );

    return { token, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { token, owner } = await loadFixture(deployFixture);

      expect(await token.owner()).to.equal(owner.address);
    });
  });
});
