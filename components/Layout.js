import React from 'react'
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Header from './Header';

export default (props) => {
	return (
        <Container>
            <Header/>
            {props.children}
            <h1>Im a footer</h1>
        </Container>
    );
};
