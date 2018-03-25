/* eslint-env node, mocha */
/*
  global
  web3: true,
  artifacts:true,
  contract:true,
  assert:true
*/

const STAEtoken = artifacts.require('./STAEtoken.sol');

// hardcoded in smart contract
const TOKEN = {
  name: 'STAE',
  symbol: 'STAE',
  decimals: 18,
};

// hardcode in smart contract to 40 million
TOKEN.totalSupply = new web3.BigNumber(40000000).shift(TOKEN.decimals);

contract('STAEtoken', (accounts) => {
  const [deployAccount, user1Account, user2Account] = accounts;

  describe('deployment', () => {
    it('after deployment ERC20 token variables should be initialized to correct values', async () => {
      const instance = await STAEtoken.new();

      const [name, symbol, totalSupply, decimals, deployBalance] = await Promise.all([
        instance.name.call(),
        instance.symbol.call(),
        instance.totalSupply.call(),
        instance.decimals.call(),
        instance.balanceOf(deployAccount),
      ]);

      // verify the token values
      // ----
      assert(name === TOKEN.name, `'name' should be set to ${TOKEN.name}`);
      assert(symbol === TOKEN.symbol, `'symbol' should be set to ${TOKEN.symbol}`);
      assert(decimals.toNumber() === TOKEN.decimals, `'decimals' should be set to ${TOKEN.decimals}`);
      assert(totalSupply.eq(TOKEN.totalSupply), `'totalSupply' should be set to ${TOKEN.totalSupply.toString()}`);

      // verify the initial balance of the deploy account
      // ----
      assert(deployBalance.eq(TOKEN.totalSupply), `balance of deploy address should be all tokens = ${TOKEN.totalSupply.toString()}`);
    });
  });

  describe('transfer', () => {
    it('token.transfer should send correct amount of tokens', async () => {
      const instance = await STAEtoken.new();

      // we want to send 1 STAE token (STAE has 18 decimals, just like ETH)
      const AMOUNT_TOKENS_TO_TRANSFER = new web3.BigNumber(1).shift(TOKEN.decimals);

      const [deployBalance_before, user1Balance_before] = await Promise.all([
        instance.balanceOf(deployAccount),
        instance.balanceOf(user1Account),
      ]);

      // verify the balances of deploy + user1 before doing token.transfer
      // ----
      assert(deployBalance_before.eq(TOKEN.totalSupply), `balance of deploy address should be all tokens = ${TOKEN.totalSupply.toString()}`);
      assert(user1Balance_before.eq(0), `balance of user1 address should be zero`);

      const transferResult = await instance.transfer(user1Account, AMOUNT_TOKENS_TO_TRANSFER.toString(), { from: deployAccount })

      // verify the emitted Transfer event
      // ----
      assert(transferResult.logs.length === 1, 'expected precisely 1 event to be emitted');
      const event = transferResult.logs[0];
      assert(event.event === 'Transfer', 'expected emitted event to be named \'Transfer\'');
      assert(event.args.from === deployAccount, 'from should be the deploy address');
      assert(event.args.to === user1Account, 'from should be the user1 address');
      assert(event.args.value.eq(AMOUNT_TOKENS_TO_TRANSFER), `value should be ${AMOUNT_TOKENS_TO_TRANSFER.toString()}`);

      const [deployBalance_after, user1Balance_after] = await Promise.all([
        instance.balanceOf(deployAccount),
        instance.balanceOf(user1Account),
      ]);

      // verify the balances of deploy + user1 after doing token.transfer
      // ----
      assert(deployBalance_after.eq(TOKEN.totalSupply.minus(AMOUNT_TOKENS_TO_TRANSFER)), `balance of deploy address should have decreased by ${AMOUNT_TOKENS_TO_TRANSFER.toString()}`);
      assert(user1Balance_after.eq(AMOUNT_TOKENS_TO_TRANSFER), `balance of user1 address should be ${AMOUNT_TOKENS_TO_TRANSFER.toString()}`);
    });
  });
});
