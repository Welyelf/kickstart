import React, { Component } from 'react'
import Layout from '../../../components/Layout';
import { FormField, Button, Form, Input, Message } from 'semantic-ui-react';
import { Link, Router } from '../../../routes';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';

class RequestNew extends Component {

    state = {
        value: '',
        description: '',
        recipient: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        const campaign = Campaign(this.props.address);
        const { description, value, recipient } =  this.state;

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest( description, web3.utils.toWei(value, 'ether'),recipient)
                .send({ from: accounts[0] });
            Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false });
    };

    static async getInitialProps(props) { // this will work great on slow internet area/device
        const { address } = props.query;
        return { address };
    }
    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    Back
                </Link>
                <h3>Create a request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <FormField>
                        <label>Description</label>
                        <Input
                            placeholder='Enter description'
                            value={this.state.description}
                            onChange={
                                event => this.setState({description: event.target.value})
                            }
                        />
                    </FormField>
                    <FormField>
                        <label>Value in Ether</label>
                        <Input
                            label="ether"
                            labelPosition='right'
                            placeholder='Enter Ether'
                            value={this.state.value}
                            onChange={
                                event => this.setState({value: event.target.value})
                            }
                        />
                    </FormField>    
                    <FormField>
                        <label>Recipient</label>
                        <Input 
                            value={this.state.recipient}
                            onChange={
                                event => this.setState({recipient: event.target.value})
                            }
                        />
                    </FormField>
                    <Message error header="Opps!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary type='submit'>Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;
