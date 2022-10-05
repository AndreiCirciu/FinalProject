import React, { Component, Fragment, useState } from 'react';
import { AdminDashboard } from './AdminDashboard';

export class DeleteMedicine extends Component {
    static displayName = DeleteMedicine.name;

    constructor(props) {
        super(props);
        this.state = {
            medicines: [], loading: true,
            id: '',
            
        };
    }

    componentDidMount() {
        this.populateMedicineData();
    }

    static renderMedicineTable(medicines) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Company Name</th>
                        <th>Price</th>
                        <th> Quantity</th>
                        <th>Image URL</th>
                        <th>Uses</th>
                        <th>Expiration Date</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(medicines =>
                        <tr key={medicines.id}>
                            <td>{medicines.id}</td>
                            <td>{medicines.name}</td>
                            <td>{medicines.companyName}</td>
                            <td>{medicines.price}</td>
                            <td>{medicines.quantity}</td>
                            <td>{medicines.imageUrl}</td>
                            <td>{medicines.uses}</td>
                            <td>{medicines.expirationDate}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    handleIdChange = (value) => {
        this.setState({ id: value });
    }

    

    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : DeleteMedicine.renderMedicineTable(this.state.medicines);

        return (
            <Fragment>
                <AdminDashboard />
                <div style={{ textAlign: 'center' }}>
                    <h1 id="tabelLabel" >Delete Medicine</h1>
                    <p>Which medicine you want to delete?</p>
                    <label> ID </label>
                    <br />
                    <input type="text" id='txtId' placeholder="Enter ID" onChange={(e) => this.handleIdChange(e.target.value)} />                    
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
        
        let url = "https://localhost:44368/api/Medicine/deleteMedicineById" + "?id=" + this.state.id;
        console.log(url);  

        const responseDelete = await fetch(url, {
            method: 'DELETE',
            headers: {
                'accept': 'text/plain'
            }
        });
        window.location.reload();

    }
    async populateMedicineData() {
        const response = await fetch('https://localhost:44368/api/Medicine/getAllMedicine');
        const data = await response.json();
        this.setState({ medicines: data, loading: false });
        
    }
}
