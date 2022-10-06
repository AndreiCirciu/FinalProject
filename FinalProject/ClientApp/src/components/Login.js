import React, { Component, Fragment } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import './NavMenu.css';
import { AdminDashboard } from './AdminDashboard';
import jwt from "jwt-decode";

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: 0
        };
    }

    async handleSave() {
        let data = {
            userName: this.state.username,
            password: this.state.password
        }

        let url = "https://localhost:44368/api/Auth/login";

        console.log(url);
        console.log(JSON.stringify(data));

        /*const response = await fetch('https://localhost:44368/api/Account/getAllAccounts');
        const data2 = await response.json();
        console.log(data2);*/

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
     
        const result = await response;

        console.log(result.status);

        //token

        let jwtToken = await result.json();
        console.log("asdasdasd");
        console.log(jwtToken.jwtToken);
        localStorage.setItem('jwtToken', jwtToken.jwtToken);
        var token = '"' +  jwtToken.jwtToken +'"';
        console.log("TOKENNNN");
        console.log(token);
        const decodeToken = jwt(token);
        const role = decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        console.log("asdasdasdasdasd");
        console.log(role);
        const userid = decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        console.log("asdasdasdasdasd");
        console.log(userid);

        if (role == "Admin") {
            localStorage.setItem('isAdmin', 1);
        }
        else {
            localStorage.setItem('isAdmin', 0);
        }

        console.log(result.statusText);
        
        console.log("ESTE");
        console.log(localStorage.getItem("isAdmin"));


        this.setState({ error: result.status });

       // let userid = await user_id.json();
        localStorage.setItem("ID", userid);
        console.log(localStorage.getItem("ID"));
    }

    handleUsernameChange = (value) => {
        this.setState({ username: value });
    }

    handlePasswordChange = (value) => {
        this.setState({ password: value })
    }

    render() {
        let content = this.state.error === 200 ? <Navigate to="/adminDashboard" /> : (this.state.error === 400 ?  <p><em>Username or Password were incorrect.</em></p> : <p></p>);
        //let resetIsAdmin = localStorage.getItem("isAdmin") == 1 ? localStorage.setItem("isAdmin", 4) : <p><em> </em> </p>;
        console.log(localStorage.getItem("isAdmin"));
        return (
            <Fragment>
                <AdminDashboard />
                {content}
                
                
                <div style={{ textAlign: 'center' }}>
                <div><strong> Login </strong></div>
                <label> Username </label>

                <input type="text" id='txtName' placeholder="Enter Username" onChange={(e) => this.handleUsernameChange(e.target.value)} />
                <br />
                <label> Password </label>
                <input type="password" id='txtPassword' placeholder="Enter Password" onChange={(e) => this.handlePasswordChange(e.target.value)} />
                <br /><br />
                    <button onClick={() => this.handleSave()}> Save </button>
                </div>
            </Fragment>
        )
    }
}

