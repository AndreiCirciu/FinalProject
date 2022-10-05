import React, { Component, Fragment } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import './NavMenu.css';
import { AdminDashboard } from './AdminDashboard';

export class Registration extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password: '',
            isadmin: 0,
            error: 0
            
        };
    }

    async handleSave() {
        let data = {
            userName: this.state.username,
            password: this.state.password,
            isAdmin: this.state.isadmin
        }       

        console.log(this.state.username);
        console.log(this.state.passwrod);
        let url = "https://localhost:44368/api/Auth/register";
        console.log(url);
        console.log(JSON.stringify(data));

        /*const response = await fetch('https://localhost:44368/api/Account/getAllAccounts');
        const data2 = await response.json();
        console.log(data2);*/

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'accept' : 'text/plain',
                'Content-type' : 'application/json'
            },      
            body: JSON.stringify(data)
        });
        
        console.log(response);
        console.log(JSON.stringify(response));
        const result = await response;
        console.log(result.status);
        this.setState({ error: result.status });
        /*if (response === 200) {
           navigate("/SetAccount");
        }   */    

    }        

        handleUsernameChange = (value) => {
            this.setState({ username: value });
        }

        handlePasswordChange = (value) => {
            this.setState({ password: value })
    }

        
         
   
    

    render() {
        let content = this.state.error == 400 ? <p><em>User already exists.</em></p> : (this.state.error == 200 ? <Navigate to="/SetAccount" /> : <p></p>);
        return (           
            <Fragment>
                {content}
                <AdminDashboard />
                <div style={{ textAlign: 'center' }}>
                <div><strong> Register </strong></div>                
                <label> Username </label>
                
                <input type="text" id='txtName' placeholder="Enter Username" onChange={(e) => this.handleUsernameChange(e.target.value)} />
                <br />
                <label> Password </label>                
                <input type="text" id='txtPassword' placeholder="Enter Password" onChange={(e) => this.handlePasswordChange(e.target.value)} />
                <br /><br />
                    <button onClick={() => this.handleSave()}> Save </button>
                    </div>
                               
                
            </Fragment>
            )
    }

}

