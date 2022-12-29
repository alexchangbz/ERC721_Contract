# Running BoredTiger Smart Contract
Setting up environment variables
1. Create a .env file
2. Add the variable according to the .env-sample file 

Deployment
```shell
npx hardhat run --network goerli scripts/deploy.ts
```

Verify on Etherscan
```shell
// npx hardhat verify --network goerli <SMART CONTRACT ADDRESS>
```

# Contract Deploy on Goerli Testnet
Contract address: 0x35A968A5E5e3f503604072f61b2437fF21A7f35E

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
