pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract STAEtoken is StandardToken {
    string  constant public  name = "STAE";
    string  constant public  symbol = "STAE";
    uint8   constant public  decimals = 18;
    uint256 constant private INITIAL_SUPPLY = 40000000 * (10 ** uint256(decimals));

    function STAEtoken() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        Transfer(address(0), msg.sender, INITIAL_SUPPLY);
    }
}
