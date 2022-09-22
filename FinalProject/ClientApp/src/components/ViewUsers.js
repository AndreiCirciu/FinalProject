import React, { Component, Fragment } from 'react';
import { AdminDashboard } from './AdminDashboard';

export class ViewUsers extends Component {
    static displayName = ViewUsers.name;

    constructor(props) {
        super(props);
        this.state = {
            accounts: [], loading: true,
            error: 0
        };
    }

    componentDidMount() {
        this.populateAccountsData();
    }

    static renderAccountsTable(accounts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>DateOfBirth</th>
                        <th>Phone</th>
                        <th>Address (F)</th>
                        <th>Funds</th>
                        <th>IsAdmin</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(accounts =>
                        <tr key={accounts.id}>
                            <td>{accounts.id}</td>
                            <td>{accounts.firstName}</td>
                            <td>{accounts.lastName}</td>
                            <td>{accounts.dateOfBirth}</td>
                            <td>{accounts.phone}</td>
                            <td>{accounts.address}</td>
                            <td>{accounts.funds}</td>
                            <td>{accounts.isAdmin}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    
    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : ViewUsers.renderAccountsTable(this.state.accounts);
        let validation = this.state.error === 403 ? <p> <em>You are not authorized to come here.</em></p> : <p> </p>
        

        return (
            <Fragment>
                <AdminDashboard />
                
                <div style={{ textAlign: 'center' }}>
                    <h1 id="tabelLabel" >All Users</h1>
                    {contents}
                    {validation}
                </div>

            </Fragment>
        );
    }

    async populateAccountsData() {

        let authToken = "bearer " + localStorage.getItem("jwtToken");

        console.log(authToken)
        const response = await fetch('https://localhost:44368/api/Account/getAllAccounts', {
            method : "GET",
            headers: {
                'Authorization' : authToken
            }
        });
        const data = await response.json();
        this.setState({ accounts: data, loading: false })
        const result = await response;
        console.log(result.status);
        
        this.setState({ error: result.status });
    }
}
