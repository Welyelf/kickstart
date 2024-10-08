import React, { Component } from "react";
import Layout from '../../components/Layout';
import { FormField, Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';
  
class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false });
    };
    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <FormField>
                        <label>Minimum Contribution</label>
                        <Input
                            label={{ basic: true, content: 'wei' }}
                            labelPosition='right'
                            placeholder='Enter wei'
                            value={this.state.minimumContribution}
                            onChange={
                                event => this.setState({minimumContribution: event.target.value})
                            }
                        />
                    </FormField>
                    <Message error header="Opps!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary type='submit'>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;