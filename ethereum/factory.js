import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x076623fac385f6f9f75a2a3f22a0409d0703b2ac'
);

export default instance;
