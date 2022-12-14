import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { accounts: [], loading: true };
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
            <th>Address</th>
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
    let contents = this.state.loading ? <p><em>Loading...</em></p> : FetchData.renderAccountsTable(this.state.accounts);

    return (
      <div>
        <h1 id="tabelLabel" >Accounts</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

    async populateAccountsData() {
    const response = await fetch('https://localhost:44368/api/Account/getAllAccounts');
    const data = await response.json();
    this.setState({ accounts: data, loading: false });
  }
}
