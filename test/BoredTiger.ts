import { expect } from "chai";
import { ethers } from "hardhat";

describe("BoredTiger", () => {
    const deployContractFixture: any = async () => {
        const BT = await ethers.getContractFactory("BoredTiger")
        const BTContract = await BT.deploy()
        await BTContract.deployed()
        return { BTContract }
    }

    describe("deployment", () => {
        it("should return the name of the token", async () => {
            const { BTContract } = await deployContractFixture()
            const name = await BTContract.name()
            expect(name).to.equal("BoredTiger")
        })
    })

    describe("mint", () => {
        describe("positive test", () => {
            it("should mint an ERC721 token with token id 0", async () => {
                const { BTContract } = await deployContractFixture()
                await BTContract.mint({ value: ethers.utils.parseEther("0.01") })
                const tokenId = await BTContract.tokenId()
                expect(Number(tokenId)).to.equal(1)
            })

            it("should burn an ERC721 token with token id 0", async () => {
                const [owner] = await ethers.getSigners()
                const { BTContract } = await deployContractFixture()
                await BTContract.mint({ value: ethers.utils.parseEther("0.01") })
                await BTContract.burn(0)
                const tokenBalance = await BTContract.balanceOf(owner.address)
                expect(Number(tokenBalance)).to.equal(0)
            })

            it("should pause the contract", async () => {
                const { BTContract } = await deployContractFixture()
                await BTContract.setPaused(true)
                const pauseStatus = await BTContract.paused()
                expect(pauseStatus).to.equal(true)
                await expect(BTContract.mint({ value: ethers.utils.parseEther("0.01") })).to.be.revertedWith("Function Paused")
            })
        })

        describe("negative test", () => {
            it("should fail to mint token if ethers sent is not equal to 0.01", async () => {
                const { BTContract } = await deployContractFixture()
                await expect(BTContract.mint({ value: ethers.utils.parseEther("0.001") })).to.be.revertedWith("Please make sure your metamask have more than 0.01 ether")
            })

            it("should fail to burn token if not owner", async () => {
                const [_, addr1] = await ethers.getSigners()
                const { BTContract } = await deployContractFixture()
                await BTContract.mint({ value: ethers.utils.parseEther("0.01") })
                await expect(BTContract.connect(addr1).burn(0)).to.be.revertedWith("You can only burn your own token")
            })
        })
    })
})
