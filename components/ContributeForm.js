import React, { Component } from 'react'
import { FormField, Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

 class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });
        try {
            const campaign = Campaign(this.props.address);
            const accounts = await web3.eth.getAccounts();

            await campaign.methods
                .contribute()
                .send({
                    from: accounts[0],
                    value: web3.utils.toWei(this.state.value, 'ether')
                });
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };
    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <FormField>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition='right'
                        placeholder='Enter ether'
                        value={this.state.value}
                        onChange={
                            event => this.setState({value: event.target.value})
                        }
                    />
                </FormField>
                <Message error header="Opps!" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary type='submit'>Contribute</Button>
            </Form>
        )
    }
}

export default ContributeForm;
