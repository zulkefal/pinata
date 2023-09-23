// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18;

contract FileHashStorage {
  mapping(uint256 => string) public hashes;

  function storeFileHash(uint256 id, string memory sendFileHash) public {
    hashes[id] = sendFileHash;
  }

  function getFileHash(uint256 id) public view returns (string memory) {
    return hashes[id];
  }
}
