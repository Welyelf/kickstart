import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { FormField, Button, Form, Input, Message } from 'semantic-ui-react';
import { Link, Router } from '../../../routes';

 class RequestIndex extends Component {

    static async getInitialProps(props) { // this will work great on slow internet area/device
        const { address } = props.query;
        return { address };
    }
    render() {
        return (
            <Layout>
                <div>Requests List</div>
                

                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <Button style={{ marginTop: '20px' }}  primary >Add Request</Button>
                </Link>
            </Layout>
        
        )
    }
}

export default RequestIndex;
