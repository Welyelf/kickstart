import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
  onApprove = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);
      await campaign.methods.approveRequest(this.props.id)
        .send({ from: accounts[0] });
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
  };

  onFinalize = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);
      await campaign.methods.finalizeRequest(this.props.id)
        .send({ from: accounts[0] });
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
  };


  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount} / { approversCount }</Cell>
        <Cell>
          <Button color='green' basic onClick={this.onApprove}>Approve</Button>
        </Cell>
        <Cell>
          <Button color='teal' basic onClick={this.onFinalize}>Finalize</Button>
        </Cell>
      </Row>
    )
  }
}

export default RequestRow;
