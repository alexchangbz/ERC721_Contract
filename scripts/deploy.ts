import { ethers } from "hardhat";

async function main() {
  const BoredTiger = await ethers.getContractFactory("BoredTiger");
  const boredTiger = await BoredTiger.deploy();

  await boredTiger.deployed();

  console.log(`Smart contract deployed to ${boredTiger.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
