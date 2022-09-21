import React, { Component, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
export class SetAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            dateofbirth: '',
            phone: '',
            address: '',
            funds: 0,
            isadmin:0
        };
    }

    async handleSave() {
        let data = {
            id : 0,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            dateOfBirth: this.state.dateofbirth,
            phone: this.state.phone,
            address: this.state.address,
            funds: this.state.funds,
            isAdmin : this.state.isadmin
        }

        
        let url = "https://localhost:44368/api/Account/addAccount";
        console.log(url);
        console.log(JSON.stringify(data));

        /*const response = await fetch('https://localhost:44368/api/Account/getAllAccounts');
        const data2 = await response.json();
        console.log(data2);*/
        console.log(JSON.stringify)
        const response = await fetch(url, {
            method: 'POST',
            headers: {

                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response);
        console.log(JSON.stringify(response));
        const result = await response;
        console.log(result.status);
        this.setState({ error: result.status });
    }
    handleFirstNameChange = (value) => {
        this.setState({ firstname: value });
    }

    handleLastNameChange = (value) => {
        this.setState({ lastname: value })
    }

    handleDateOfBirthChange = (value) => {
        this.setState({ dateofbirth: value });
    }

    handlePhoneChange = (value) => {
        this.setState({ phone: value })
    }

    handleAddressChange = (value) => {
        this.setState({ address: value });
    }

    handleFundsChange = (value) => {
        this.setState({ funds: value })
    }

    handleIsAdminChange = (value) => {
        this.setState({ isadmin: value })
    }
    //navigate = useNavigate();



    render() {
        return (
            <Fragment>
                <div> Set your account </div>
                <label> Firstname </label>
                <input type="text" id='txtFirstName' placeholder="Enter Firstname" onChange={(e) => this.handleFirstNameChange(e.target.value)} />
                <br />
                <br />
                <label> Lastname </label>
                <input type="text" id='txtLastName' placeholder="Enter Lastname" onChange={(e) => this.handleLastNameChange(e.target.value)} />
                <br />
                <br />
                <label> Date Of Birth </label>
                <input type="text" id='txtDateOfBirth' placeholder="Enter Date Of Birth" onChange={(e) => this.handleDateOfBirthChange(e.target.value)} />
                <br />
                <br />
                <label> Phone Number </label>
                <input type="text" id='txtPhone' placeholder="Enter Phone Number" onChange={(e) => this.handlePhoneChange(e.target.value)} />
                <br />
                <br />
                <label> Address </label>
                <input type="text" id='txtAddress' placeholder="Enter Address" onChange={(e) => this.handleAddressChange(e.target.value)} />
                <br />
                <br />
                <label> Funds </label>
                <input type="text" id='txtFunds' placeholder="Enter your Funds" onChange={(e) => this.handleFundsChange(e.target.value)} />
                <br />
                <br />
                <label> Are you an admin? </label>
                <input type="text" id='txtIsAdmin' placeholder="1/0" onChange={(e) => this.handleIsAdminChange(e.target.value)} />
                <br />
                <br />
                <button onClick={() => this.handleSave()}> Save </button>
                
            </Fragment>
        )
    }
}

