import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

const linksUser = [
    { href: '/searchMedicine', text: 'Search Medicine' },
    { href: '/viewCart', text: 'Cart' },
    { href: '/orderStatus', text: 'Order' },
    { href: '/updateAccount', text: 'Edit Profile' },
    /* { href: '/login', text: 'Logout' },*/
];


const linksAdmin = [
    { href: '/addMedicine', text: 'AddMedicine' },
    { href: '/updateMedicine', text: 'Update Medicine' },
    { href: '/deleteMedicine', text: 'Delete Medicine' },
    { href: '/viewUsers', text: 'View Users' },
    { href: '/generateReports', text: 'Generate Reports' },
];

const linksRegisterLogin = [
    { href: '/registration', text: 'Register' },
    { href: '/login', text: 'Login' },
];
const createNavItem = ({ href, text, className }) => (
    <NavItem>
        <NavLink href={href} className={className}><div style={{ fontSize: '20px', marginLeft: '10px', fontWeight:'bold' }}>{text} </div></NavLink>
    </NavItem>
);

export class AdminDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    async resetIsAdmin() {
        localStorage.setItem('isAdmin', 4);
    }

    render() {
        if (localStorage.getItem("isAdmin") == 1)
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/adminDashboard" style={{marginRight:'100px', fontSize:'30px'}}>E-Healthcare</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {linksAdmin.map(createNavItem)}
                                {linksUser.map(createNavItem)}
                                <NavItem>
                                    <NavLink onClick={() => this.resetIsAdmin()} href={'/login'}><div style={{ fontSize: '20px', marginLeft: '10px', fontWeight: 'bold' }}>Logout </div></NavLink>
                                  </NavItem>      
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
        else if (localStorage.getItem("isAdmin") == 0)
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/adminDashboard" style={{ marginRight: '100px', fontSize: '30px' }}>E-Healthcare</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {linksUser.map(createNavItem)}
                                <NavItem>
                                    <NavLink onClick={() => this.resetIsAdmin()} href={'/login'}><div style={{ fontSize: '20px', marginLeft: '10px', fontWeight: 'bold' }}>Logout </div></NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
        else
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <NavbarBrand href="/adminDashboard">E-Healthcare</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {linksRegisterLogin.map(createNavItem)}   
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            );
    }
}
