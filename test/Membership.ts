import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Membership", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Membership = await hre.ethers.getContractFactory("Membership");
    const membership = await Membership.deploy();

    return { membership, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the owner", async function () {
      const { membership, owner } = await loadFixture(deployFixture);

      expect(await membership.owner()).to.equal(owner.address);
    });
  });
});
