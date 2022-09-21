import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import './NavMenu.css';
import {}


export class Portal extends Component {
    static displayName = Portal.name;

    constructor(props) {
        super(props);
        this.handleLoginPress = this.handleLoginPress.bind(this);
        this.elem = <Navigate to="/registration" />;
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true

        };
    }
    handleLoginPress = () => {
        this.props.navigation.navigate('/registration');
    }
    /*nav() {
        console.log("CLIIIICKED!!")
        return
        (<Navigate to="/registration" />);
            
        };*/
        
    
     
   

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }   
    
    render() {
        return (
            <header>

                <input type="button" onClick=" value="Go to Google" />
                
               {/* <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        */}{/*<NavbarBrand tag={Link} to="/">FinalProject</NavbarBrand>*/}{/*
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-6" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/registration">User</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/login">Admin</NavLink>
                                </NavItem>
                                */}{/*<NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/registration">Register</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                                </NavItem>*/}{/*
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>*/}
            </header>
        );
    }

}