import React, { Component, Fragment } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
export class Registration extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password: ''
            
        };
    }

    async handleSave() {
        let data = {
            userName: this.state.username,
            password: this.state.password
        }       


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
        //let content = this.state.error == 400 ? <p><em>User already exists.</em></p> : (this.state.error != 0 ? <Navigate to="/login" /> : <p></p>);
        return (           
            <Fragment>
               {/*// {content}*/}
                <div> Register </div>                
                <label> Username </label>
                
                <input type="text" id='txtName' placeholder="Enter Username" onChange={(e) => this.handleUsernameChange(e.target.value)} />
                <br />
                <label> Password </label>                
                <input type="text" id='txtPassword' placeholder="Enter Password" onChange={(e) => this.handlePasswordChange(e.target.value)} />
                <br /><br />
                <button onClick={() => this.handleSave()}> Save </button>
                               
                
            </Fragment>
            )
    }

}

