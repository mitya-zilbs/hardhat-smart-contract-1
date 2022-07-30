const { ethers, getNamedAccounts, network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert } = require("chai");

//test will only run if network is on developmentChains (hardhat or localhost)
developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", async function () {
      let fundMe, deployer;
      const sendValue = ethers.utils.parseEther("1");

      beforeEach(async function () {
        developer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe", deployer);
      });

      //tests to see if wallet bal can be funded/withdrawn on testnet
      it("allows people to fund and withdraw", async function () {
        await fundMe.fund({ value: sendValue });
        await fundMe.withdraw();
        const endingBalance = await fundMe.provider.getBalance(fundMe.address);
        assert.equal(endingBalance.toString(), "0");
      });
    });
