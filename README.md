# STAE ERC20 Token smart contract

| variable | value |
|------|------|
| name | STAE |
| symbol | STAE |
| decimals | 18 |
| totalSupply | 40000000 |

## Deployment

| network | contract address |
|---------|------------------|
| ropsten | [`0xaceaa48defbd7834140126f52fe26d4692dc463f`](https://ropsten.etherscan.io/token/0xaceaa48defbd7834140126f52fe26d4692dc463f) |
| mainnet | [`0xcf7a2f536ff54fc2fc13f963eff8e3130d6a3574`](https://etherscan.io/token/0xcf7a2f536ff54fc2fc13f963eff8e3130d6a3574) |

## Info

The `src/STAEtoken.sol` smart contract inherits from `StandardToken` in [`zeppelin-solidity`](https://github.com/OpenZeppelin/zeppelin-solidity/tree/v1.7.0), version `1.7.0`.

Etherscan expects a single flat file with dependencies inlined. The generation of this file happens when running `npm run build` (which executes [`soljitsu combine`](https://github.com/BlockChainCompany/soljitsu)). This will transform the `src/STAEtoken.sol` smart contract into the flat file version and save it in `contracts/STAEtoken.sol`.

The contract that is deployed is `contracts/STAEtoken.sol`
