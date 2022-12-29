// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BoredTiger is ERC721URIStorage, Ownable {

    // A global boolean variable is created to manage pause capabilities called paused
    bool public paused;
    
    address payable public contractOwner; // Store contract owner address
    uint256 public tokenId = 0;

    constructor() ERC721("BoredTiger", "BTG") {
        contractOwner = payable(msg.sender);
    }

 
    function mint() public payable {
        require(paused == false, "Function Paused");
        require(msg.value == 0.01 ether, "Please make sure your metamask have more than 0.1 ether");
        sendViaCall(contractOwner);
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, "This is the URI Data of this token");
        tokenId++;
    }

    /**
     * Burn a ERC721 token referencing the token ID
     *
     * @param _tokenId            Token Id which represent the ERC721 token
     */
    function burn(uint256 _tokenId) public {
        require(paused == false, "Function Paused");
        require(msg.sender == ownerOf(_tokenId), "You can only burn your own token");
        _burn(_tokenId);
    }

    function sendViaCall(address payable _to) private {
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Ether transactions failed");
    }


    /**
     * Allow owner to set the pause status of the contract
     *
     * @param _paused          bool value which determine the pause status
     */
    function setPaused(bool _paused) public onlyOwner {
       paused = _paused;
    }
}
