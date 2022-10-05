import React, { Component } from 'react';
import './NavMenu.css';
import { AdminDashboard } from './AdminDashboard';

export class Sign extends Component {
    static displayName = Sign.name;

    constructor(props) {
        super(props);
        this.handleLoginPress = this.handleLoginPress.bind(this);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true

        };
    }
    handleLoginPress = () => {
        this.props.navigation.navigate('/registration');
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <AdminDashboard />
            </header>
        );
    }

}
