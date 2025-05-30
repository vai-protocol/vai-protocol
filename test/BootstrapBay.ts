import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Bootstrap Bay", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const BootstrapBay = await hre.ethers.getContractFactory("BootstrapBay");
    const bootstrapBay = await BootstrapBay.deploy();

    return { bootstrapBay, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { bootstrapBay, owner } = await loadFixture(deployFixture);

      expect(await bootstrapBay.owner()).to.equal(owner.address);
    });
  });
});
