import React, { Component, Fragment } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import './NavMenu.css';
import { AdminDashboard } from './AdminDashboard';

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
        let secondPart = "?username=" + this.state.username;
        let urlIsAdmin = "https://localhost:44368/api/Auth/getIfAdminOrUser" + secondPart;
        console.log(urlIsAdmin);
        let urlReturnId = "https://localhost:44368/api/Auth/getUserId" + secondPart;
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

        const responseIsAdmin = await fetch(urlIsAdmin, {
            method: "GET",
            headers: {
                'accept': 'text/plain'
            },

        });

        const responseId = await fetch(urlReturnId, {
            method: "GET",
            headers: {
                'accept': 'text/plain'
            },
        });

/*      console.log(urlReturnId);
        console.log("RESPONSE");
        console.log(response);
        console.log("RESPONSE ISADMIN");
        console.log(responseIsAdmin);*/
        const result = await response;
        const resultIsAdmin = await responseIsAdmin;
        const user_id = await responseId;

        console.log(result.status);

        //token
        let jwtToken = await result.json();
        console.log(jwtToken.jwtToken);
        localStorage.setItem('jwtToken', jwtToken.jwtToken);


        console.log(result.statusText);

        //isAdmin
        let isadmin = await resultIsAdmin.json();
        //console.log(isadmin.isadmin);
        localStorage.setItem('isAdmin', isadmin.isadmin);
        console.log("ESTE");
        console.log(localStorage.getItem("isAdmin"));


        this.setState({ error: result.status });

        console.log(urlReturnId);
        console.log(isadmin); 
        console.log(responseId);


        let userid = await user_id.json();
        localStorage.setItem("ID", userid.userid);
        console.log("ESTE");
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

