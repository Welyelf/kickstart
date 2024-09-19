import React, { Component } from "react";

import { Card, Button } from 'semantic-ui-react';
import factory from "../ethereum/factory";
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
	static async getInitialProps() { // this will work great on slow internet area/device
		const campaigns = await factory.methods.getDeployedCampaigns().call();
		return { campaigns }
	}

	renderCampaigns() {
		const items = this.props.campaigns.map(address => {
			return  {
				header : address,
				description : (<Link route={`/campaigns/${address}`} className="item">View Campaign</Link>),
				fluid : true
			}
		});

		return <Card.Group items={items} />;
	}
	// async componentDidMount() {
		
	// }

	render() {
		return (
			<Layout>
				<div>
					<h3>Open Campaigns</h3>
					<Link route="/campaigns/new">
					<Button floated="right" icon='add circle' content='Create Campaign' primary />
					</Link>
					{this.renderCampaigns()}
					
				</div>
			</Layout>
		);
	}
}

export default CampaignIndex;
