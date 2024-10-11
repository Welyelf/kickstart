import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x5f09C6A12582693249cE0BB629BA15153ef795dc'
);

export default instance;
