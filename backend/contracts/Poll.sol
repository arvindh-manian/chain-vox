// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

contract Poll {
    mapping (address => uint) public votes;
    string[] public options;

    function vote(uint option) public {
        require(option < options.length, "Invalid option");
        votes[msg.sender] = option;
    }

    function addOption(string memory option) public {
        options.push(option);
    }

    function getNumOptions() public view returns (uint) {
        return options.length;
    }
}