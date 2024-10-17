import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Poll", function () {
    async function deploySimplePollFixture() {
        const [owner, other] = await hre.ethers.getSigners();

        const Poll = await hre.ethers.getContractFactory("Poll");

        const poll = await Poll.deploy();

        return { poll, owner, other };
    }

    describe("Deployment", function () {
        it("Should have no options", async function () {
            const { poll } = await loadFixture(deploySimplePollFixture);

            expect(await poll.getNumOptions()).to.equal(0);
        })
    });

    describe("Adding Options", function () {
        it("Should add options and store them", async function () {
            const { poll } = await loadFixture(deploySimplePollFixture);
            await poll.addOption("MJ")
            await poll.addOption("Lebron")
            expect(await poll.options(0)).to.equal("MJ");
            expect(await poll.options(1)).to.equal("Lebron");
            expect(await poll.getNumOptions()).to.equal(2);
        })
    })

    describe("Voting", function () {
        it("Should vote for an option", async function () {
            const { poll, owner, other } = await loadFixture(deploySimplePollFixture);
            await poll.addOption("MJ")
            await poll.addOption("Lebron")
            await poll.vote(0);
            expect(await poll.votes(owner)).to.equal(0);

            await poll.vote(1);
            expect(await poll.votes(owner)).to.equal(1);
        })

        it("Should not allow you to vote for an option that doesn't exist", async function () {
            const { poll, owner, other } = await loadFixture(deploySimplePollFixture);
            await expect(poll.vote(0)).to.be.revertedWith("Invalid option");
        })
    })
});