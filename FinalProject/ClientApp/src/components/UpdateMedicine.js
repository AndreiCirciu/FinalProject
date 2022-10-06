import React, { Component, Fragment, useState } from 'react';
import { AdminDashboard } from './AdminDashboard';

export class UpdateMedicine extends Component {
    static displayName = UpdateMedicine.name;

    constructor(props) {
        super(props);
        this.state = {
            medicines: [], loading: true,
            id:'',
            name: '',
            companyName: '',
            price: 0,
            quantity: 0,
            image: '',
            uses: '',
            expirationDate: '',
            error: 0
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
                        <th>Quantity</th>
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

    handleCompanyNameChange = (value) => {
        this.setState({ companyname: value })
    }

    handlePriceChange = (value) => {
        this.setState({ price: value });
    }

    handleQuantityChange = (value) => {
        this.setState({ quantity: value })
    }

    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : UpdateMedicine.renderMedicineTable(this.state.medicines);

        return (
            <Fragment>
                <AdminDashboard />
                <div style={{ textAlign: 'center' }}>
                    <h1 id="tabelLabel" >Update Medicine</h1>
                    <p>Which medicine you want to update?</p>
                    <label> ID </label>
                    <br />
                    <input type="text" id='txtId' placeholder="Enter ID" onChange={(e) => this.handleIdChange(e.target.value)} />
                    <br />
                    <label> Company Name </label>
                    <br />
                    <input type="text" id='txtCompanyName' placeholder="Enter Company Name" onChange={(e) => this.handleCompanyNameChange(e.target.value)} />
                    <br />
                    <label> Price </label>
                    <br />
                    <input type="text" id='txtPrice' placeholder="Enter Price" onChange={(e) => this.handlePriceChange(e.target.value)} />
                    <br />
                    <label> Quantity </label>
                    <br />
                    <input type="text" id='txtQuantity' placeholder="Enter Quantity" onChange={(e) => this.handleQuantityChange(e.target.value)} />
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
        let data = {
            id: this.state.id,
            companyName: this.state.companyname,
            price: this.state.price,
            quantity: this.state.quantity
            /*name: this.state.name,            
            imageUrl: this.state.imageurl,
            uses: this.state.uses,
            expirationDate: this.state.expirationdate*/
        }
        let url = "https://localhost:44368/api/Medicine/getMedicineById" + "?id=" + this.state.id;
        console.log(url);
        console.log(JSON.stringify(data));

        /*const response = await fetch('https://localhost:44368/api/Account/getAllAccounts');
        const data2 = await response.json();
        console.log(data2);*/
        let authToken = "bearer " + localStorage.getItem("jwtToken");


        const responseGet = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': authToken,
                'accept': 'text/plain',
            }
        });
        const dataGet = await responseGet.json();
        console.log(dataGet);
        const resultGet = await responseGet;
        console.log(resultGet.status);


        let finalData = {
            id : this.state.id,
            name : dataGet.name,
            companyName : this.state.companyname,
            price: this.state.price,
            quantity: this.state.quantity,
            imageUrl: dataGet.imageUrl,
            uses: dataGet.uses,
            expirationDate: dataGet.expirationDate
        }
        let urlUpdateById = "https://localhost:44368/api/Medicine/updateMedicine";
       

        const responsePut = await fetch(urlUpdateById, {
            method: 'PUT',
            headers: {
                'Authorization': authToken,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(finalData)
        });
        console.log(finalData);
        const resultPut = await responsePut;
        console.log(resultPut.status);
        window.location.reload();
        /*setTimeout(function () { alert("Medicine updated! Please refresh!"); }, 1000);*/

    }
        async populateMedicineData() {
            let authToken = "bearer " + localStorage.getItem("jwtToken");
            const response = await fetch('https://localhost:44368/api/Medicine/getAllMedicine', {
                method: "GET",
                headers: {
                    'Authorization': authToken
                }
            });
            const data = await response.json();
            this.setState({ medicines: data, loading: false });
        }
    }
