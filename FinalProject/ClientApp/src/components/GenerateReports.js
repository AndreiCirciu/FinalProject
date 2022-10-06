import React, { Component, Fragment, useState } from 'react';
import { AdminDashboard } from './AdminDashboard';

export class GenerateReports extends Component {
    static displayName = GenerateReports.name;

    constructor(props) {
        super(props);
        this.state = {
            accounts: [], loading: true,
            valueReport: '',
            valuePeriod: ''
        };

    }

    /*componentDidMount() {
        this.populateAccountsData();
    }*/

    static renderAccountsTable(accounts) {
        console.log("asdasdasdasd");
        console.log(localStorage.getItem("report") == 'Sales');
        if (localStorage.getItem("report") == 'Sales') {
            return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Company Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Image URL</th>
                            <th>Uses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(accounts =>
                            <tr key={accounts.id}>
                                <td>{accounts.name}</td>
                                <td>{accounts.companyName}</td>
                                <td>{accounts.price}</td>
                                <td>{accounts.quantity}</td>
                                <td>{accounts.imageUrl}</td>
                                <td>{accounts.uses}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            );
        }
        else {
            return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Medicine Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Time</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(accounts =>
                            <tr key={accounts.id}>
                                <td>{accounts.userId}</td>
                                <td>{accounts.medicineNames}</td>
                                <td>{accounts.price}</td>
                                <td>{accounts.status}</td>
                                <td>{accounts.time}</td>
                                
                            </tr>
                        )}
                    </tbody>
                </table>
            );
        }

    }

    handleChangePeriod = (value) => {
        this.setState({ valuePeriod: value });
        console.log(value)
    }

    handleChangeReports = (value) => {
        this.setState({ valueReport: value });
        console.log(value);
    }

    async handleSave() {
        console.log(this.state.valuePeriod);
        console.log(this.state.valueReport);
        if (this.state.valueReport == 'Stock') {
            var url = 'https://localhost:44368/api/Order/generateReports?sales=true&stock=false' + '&range=' + this.state.valuePeriod;
            console.log(url)
            localStorage.setItem('report', this.state.valueReport);
        }
        if (this.state.valueReport == 'Sales') {
            var url = 'https://localhost:44368/api/Order/generateReports?sales=false&stock=true' + '&range=' + this.state.valuePeriod;
            console.log(url)
            localStorage.setItem('report', this.state.valueReport);
        }
        const responsePut = await fetch(url, {
            method: 'PUT',
            headers: {
                'accept': 'text/plain',
            },
        });
        const data = await responsePut.json();
        console.log(data);
        this.setState({ accounts: data, loading: false });
    }


    render() {
        let contents = this.state.loading ? <p><em>Loading</em></p> : GenerateReports.renderAccountsTable(this.state.accounts);
        console.log('TEST');
        console.log(this.state.valuePeriod);
        return (
            <Fragment>
                <AdminDashboard />  
                <div style={{ textAlign: 'center' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">                                
                                    <label>
                                        Choose the type of the reports
                                    <select onChange={(e) => this.handleChangeReports(e.target.value)}>
                                            <option value="Stock">Stocks</option>
                                            <option value="Sales">Sales</option>
                                        </select>
                                </label>
                                <br/>
                                    <label>
                                        Choose the period
                                        <select onChange={(e) => this.handleChangePeriod(e.target.value)}>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Yearly">Yearly</option>
                                        </select>
                                </label>
                                <br />
                                    <button onClick={() => this.handleSave()}> Submit </button>
                               
                            </div>
                        </div>
                    </div>
                    {contents}

                </div>
            </Fragment>
        );
    }

    




/*async populateAccountsData() {
    const response = await fetch('https://localhost:44368/api/Account/getAllAccounts');
    const data = await response.json();
    this.setState({ accounts: data, loading: false });
}*/
}
