const { Web3 } = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'addict taxi pair until mouse evil erosion royal remove like bronze various',
  'https://sepolia.infura.io/v3/d8d87f0b141a483d85561998bc7edcea'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const bytecode = compiledFactory.evm.bytecode.object;

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: bytecode })
    .send({ gas: '2000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();

//Contract deployed to 0x5f09C6A12582693249cE0BB629BA15153ef795dc
