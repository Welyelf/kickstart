const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

//Input format for Solidity compiler
const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode.object'],  // Specify what output you need
      },
    },
  },
};
//const output = solc.compile(source, 1).contracts;

// Compile the Solidity code
const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);

fs.ensureDirSync(buildPath);

for (let contract in output.contracts['Campaign.sol']) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + ".json"),
    output.contracts['Campaign.sol'][contract]
  );
}
// for (let contract in output.contracts['Campaign.sol']) {
//   fs.outputJsonSync(
//     path.resolve(buildPath, contract.replace(":", "") + ".json"),
//     output.contracts['Campaign.sol'][contract] 
//   );
// }
