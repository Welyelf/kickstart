import React, { Component } from 'react'
import Layout from '../../components/Layout';
import Campaign  from '../../ethereum/campaign';
import { CardGroup, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link, Router } from '../../routes';

class CampaignShow extends Component {

  static async getInitialProps(props) { // this will work great on slow internet area/device
    const campagin = Campaign(props.query.address);
    const summary = await campagin.methods.getSummary().call();
    
    return {
      address: props.query.address,
      minimumContribution: summary[0].toString(),
      balance: summary[1].toString(),
      requestsCount: summary[2].toString(),
      approversCount: summary[3].toString(),
      manager: summary[4].toString(),
    };
		//const campaigns = await factory.methods.getDeployedCampaigns().call();
		//return { campaigns }
	}

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of manager',
        description: 'The manager created this campaign and can create requests to withdraw money.',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute.',
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'A request tried to withdraw money from contract. Request must be approve by approvers.',
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of people who have already donated to this campaign.',
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'The balance is how much money this campaign has left to spend.',
      },
    ];

    return <CardGroup items={items} />;
  }

  render() {
    return (
        <Layout>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                {this.renderCards()}
                <Link route={`/campaigns/${this.props.address}/requests`}>
                  <Button style={{ marginTop: '20px' }}  primary >View Requests</Button>
                </Link>
              </Grid.Column>
              <Grid.Column width={6}>
                <ContributeForm address={this.props.address}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Layout>
    )
  }
}

export default CampaignShow;