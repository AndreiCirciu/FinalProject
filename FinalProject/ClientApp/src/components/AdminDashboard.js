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
        let navbar;
        if (localStorage.getItem("isAdmin") == 1) {
            navbar =
                <ul className="navbar-nav flex-grow ">
                    <NavItem className="navbar-text">
                    <NavLink tag={Link} className="text-dark" to="/addMedicine"><div style={{ fontSize: '20px', marginLeft: '5px'}}>Add Medicine</div></NavLink>
                    </NavItem>
                    <NavItem className="navbar-text">
                    <NavLink tag={Link} className="text-dark" to="/updateMedicine"><div style={{ fontSize: '20px', marginLeft: '5px'}}>Update Medicine</div></NavLink>
                    </NavItem>
                    <NavItem className="navbar-text">
                    <NavLink tag={Link} className="text-dark" to="/deleteMedicine"><div style={{ fontSize: '20px', marginLeft: '5px'}}>Delete Medicine</div></NavLink>
                    </NavItem>
                    <NavItem className="navbar-text">
                    <NavLink tag={Link} className="text-dark" to="/viewUsers"><div style={{ fontSize: '20px', marginLeft: '5px'}}>View customer/user details</div></NavLink>
                    </NavItem>
                    <NavItem className="navbar-text">
                    <NavLink tag={Link} className="text-dark" to="/generateReports"><div style={{ fontSize: '20px', marginLeft: '5px'}}>Generate Reports</div></NavLink>
                    </NavItem>
                </ul>
        }
        return (
            


            <header>

               
                <Navbar className="navbar-expand-sm navbar-toggleable-lm ng-blue border-bottom box-shadow mb-3 align-items-center" style={{ width: '100%', textAlign:'center' }} light>
                    <Container>
                        <NavbarToggler onClick={this.toggleNavbar}/>
                        <Collapse className="" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow" style={{ backgroundSize:'' }}>
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/searchMedicine"><div style={{ fontSize: '20px'}}>Search for medicine</div></NavLink>
                                </NavItem>
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/updateMedicine"><div style={{ fontSize: '20px', marginLeft: '5px' }}>Buy Medicine</div></NavLink>
                                </NavItem>
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/deleteMedicine"><div style={{ fontSize: '20px', marginLeft: '5px' }}>Order Status</div></NavLink>
                                </NavItem>
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/viewUsers"><div style={{ fontSize: '20px', marginLeft: '5px' }}>Edit Profile</div></NavLink>
                                </NavItem>
                                <NavItem className="navbar-text">
                                    <NavLink tag={Link} className="text-dark" to="/generateReports"><div style={{ fontSize: '20px', marginLeft: '5px' }}>Funds</div></NavLink>
                                </NavItem>
                                {navbar}
                                <NavItem className="navbar-text" >
                                    <NavLink tag={Link} className="text-dark" to="/login"><div style={{ fontSize: '20px', marginLeft: '5px' }}>Logout</div></NavLink>
                                </NavItem>
                                <NavItem>
                                    <div style={{ color: 'lightgreen' }}> </div>
                                </NavItem>                               

                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

}
