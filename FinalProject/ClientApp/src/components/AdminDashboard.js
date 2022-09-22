import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import './NavMenu.css';


export class AdminDashboard extends Component {
    static displayName = AdminDashboard.name;

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

               
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-blue border-bottom box-shadow mb-3 align-items-center" light>
                    <Container>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-6" />
                        <Collapse className="d-sm-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow " >
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/addMedicine"><div style={{ fontSize: '22px' }}>Add Medicine</div></NavLink>
                                </NavItem>
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/updateMedicine"><div style={{ fontSize: '22px' }}>Update Medicine</div></NavLink>
                                </NavItem>
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/deleteMedicine"><div style={{ fontSize: '22px' }}>Delete Medicine</div></NavLink>
                                </NavItem>
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/viewUsers"><div style={{ fontSize: '22px' }}>View customer/user details</div></NavLink>
                                </NavItem>
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/generateReports"><div style={{ fontSize: '22px' }}>Generate Reports</div></NavLink>
                                </NavItem>
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/login"><div style={{ fontSize: '22px' }}>Logout</div></NavLink>
                                </NavItem>
                                <NavItem>
                                    <div style={{ color: 'lightgreen' }}>waadawwadwwa </div>
                                </NavItem>
                                

                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

}
