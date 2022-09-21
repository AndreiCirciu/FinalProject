import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import './NavMenu.css';

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

                {/*<input type="button" onClick=" value="Go to Google" />*/}

                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-blue border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-6" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem className ="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/registration">User</NavLink>
                                </NavItem>
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/login">Admin</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

}
