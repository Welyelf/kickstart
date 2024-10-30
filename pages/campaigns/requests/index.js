import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { FormField, Button, Form, Input, Table } from 'semantic-ui-react';
import { Link, Router } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

 class RequestIndex extends Component {

    static async getInitialProps(props) { // this will work great on slow internet area/device
        const { address } = props.query;
        const campaign = Campaign(address);
        let requestCount = await campaign.methods.getRequestsCount().call();
        requestCount = Number(requestCount); 
        const getApproversCount = await campaign.methods.approversCount().call();
        const approversCount = getApproversCount.toString();
        

        const requests = await Promise.all(
            Array(requestCount).fill().map((element, index) => {
                return campaign.methods.requests(index).call();
            })
        );

        // Format the requests to handle BigInt
        const formattedRequests = requests.map(request => ({
            description: request.description, // Assuming it's already a string
            value: request.value.toString(), // Convert BigInt to string
            recipient: request.recipient, // Assuming it's already a string (Ethereum address)
            complete: request.complete, // Assuming it's already a boolean
            approvalCount: request.approvalCount.toString() // Convert BigInt to string
          }));

        
        return { address, requests: formattedRequests, requestCount, approversCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) =>{
            return <RequestRow 
                id={index} 
                request={request} 
                key="{index}" 
                address={this.props.address} 
                approversCount={this.props.approversCount}
            />
        })  
    }
    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <div>Requests List</div>

                
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <Button style={{ marginTop: '20px' }}  primary >Add Request</Button>
                </Link>
                <Table celled>
                    <Header>
                        <Row>
                            <HeaderCell>Id</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
            </Layout>
        
        )
    }
}

export default RequestIndex;
