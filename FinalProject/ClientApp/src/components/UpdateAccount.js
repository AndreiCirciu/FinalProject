import React, { Component, Fragment, useState } from 'react';
import { AdminDashboard } from './AdminDashboard';

export class UpdateAccount extends Component {
    static displayName = UpdateAccount.name;

    constructor(props) {
        super(props);
        this.state = {
            account: [], loading: true,
            firstname: '',
            lastname: '',
            dateofbirth: 0,
            phone: '',
            address: '',
            funds: 0,
            error: 0
        };
    }

    componentDidMount() {
        this.populateAccountData();
    }

    static renderAccountTable(account) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th> ID </th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Funds</th>
                    </tr>
                </thead>
                <tbody>
                            <tr>
                            <td>{account.id}</td>
                            <td>{account.firstName}</td>
                            <td>{account.lastName}</td>
                            <td>{account.dateOfBirth}</td>
                            <td>{account.phone}</td>
                            <td>{account.address}</td>
                        <td>{account.funds}</td>
                        </tr>

                </tbody>
            </table>
        );
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
        this.setState({ address: value })
    }

    handleFundsChange = (value) => {
        this.setState({ funds: value })
    }
    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : UpdateAccount.renderAccountTable(this.state.account);

        return (
            <Fragment>
                <AdminDashboard />
                <div style={{ textAlign: 'center' }}>
                    <h1 id="tabelLabel" >Update your Account</h1>
                    <label> First Name </label>
                    <br />
                    <input type="text" id='txtFirstName' placeholder="Enter First Name" onChange={(e) => this.handleFirstNameChange(e.target.value)} />
                    <br />
                    <label> Last Name</label>
                    <br />
                    <input type="text" id='txtLastName' placeholder="Enter Last Name" onChange={(e) => this.handleLastNameChange(e.target.value)} />
                    <br />
                    <label> Date of Birth </label>
                    <br />
                    <input type="text" id='txtDateOfBirth' placeholder="Enter Date of Birth" onChange={(e) => this.handleDateOfBirthChange(e.target.value)} />
                    <br />
                    <label> Phone </label>
                    <br />
                    <input type="text" id='txtPhone' placeholder="Enter Phone" onChange={(e) => this.handlePhoneChange(e.target.value)} />
                    <br />
                    <label> Address </label>
                    <br />
                    <input type="text" id='txtAddress' placeholder="Enter Address" onChange={(e) => this.handleAddressChange(e.target.value)} />
                    <br />
                    <label> Funds </label>
                    <br />
                    <input type="text" id='txtFunds' placeholder="Enter Funds" onChange={(e) => this.handleFundsChange(e.target.value)} />
                    <br />
                    <button onClick={() => this.handleSave()}> Save </button>
                    <br />
                    <br />
                    <br />
                    {contents}

                </div>
            </Fragment>
        );
    }
    async handleSave() {

        var userId = localStorage.getItem("ID");
        var is_admin = localStorage.getItem("isAdmin");

        let data = {
            id: userId,
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            dateOfBirth: this.state.dateofbirth,
            phone: this.state.phone,
            address: this.state.address,
            funds: this.state.funds,
            isAdmin: is_admin
        }

        let urlUpdateById = "https://localhost:44368/api/Account/updateAccount";
        let authToken = "bearer " + localStorage.getItem("jwtToken");
        const responsePut = await fetch(urlUpdateById, {
            method: 'PUT',
            headers: {
                'Authorization': authToken,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(data);
        const resultPut = await responsePut;
        console.log(resultPut.status);
        window.location.reload();

    }
    async populateAccountData() {
        var userId = localStorage.getItem("ID");
        var urlGetAccountById = "https://localhost:44368/api/Account/getAccountById" + "?id=" + userId;
        let authToken = "bearer " + localStorage.getItem("jwtToken");
        const response = await fetch(urlGetAccountById, {
            method: "GET",
            headers: {
                'Authorization': authToken
            }
        });
        const data = await response.json();
        this.setState({ account: data, loading: false });
    }
}
