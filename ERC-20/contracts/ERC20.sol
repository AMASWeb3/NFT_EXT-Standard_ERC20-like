// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TeronToken is ERC20, ERC20Burnable, Ownable {
    constructor(address initialOwner)
        ERC20("Teron", "TERN")
        Ownable(initialOwner)
    {
        _mint(initialOwner, 1000000000 * 10 ** decimals());
    }
    function issueTokens(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

}