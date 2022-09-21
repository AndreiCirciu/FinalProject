import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Portal } from './Portal';

export class PortalLayout extends Component {
    static displayName = PortalLayout.name;

    render() {
        return (
            <div>
                <Portal />
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
