const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const Web3 = require("web3");

const web3 = new Web3();

let balances = [
  {
    addr: "0xD974Edd0214Fd590BC4c9a1d61Fc314247009bee",
    amount: web3.eth.abi.encodeParameter(
      "uint256",
      "10000000000000000000000000"
    ),
  },
  {
    addr: "0x9Ff2c70a579109d2087c0d50aC8Fa1b8a4d67747",
    amount: web3.eth.abi.encodeParameter(
      "uint256",
      "20000000000000000000000000"
    ),
  },
];

const leafNodes = balances.map((balance) =>
  keccak256(
    Buffer.concat([
      Buffer.from(balance.addr.replace("0x", ""), "hex"),
      Buffer.from(balance.amount.replace("0x", ""), "hex"),
    ])
  )
);

const merkleTree = new MerkleTree(leafNodes, keccak256, {
  sortPairs: true,
});

console.log("---------");
console.log("Merkle Tree");
console.log("---------");
console.log(merkleTree.toString());
console.log("---------");
console.log("Merkle Root: " + merkleTree.getHexRoot());

console.log("Proof 1: " + merkleTree.getHexProof(leafNodes[0]));
console.log("Proof 2: " + merkleTree.getHexProof(leafNodes[1]));
