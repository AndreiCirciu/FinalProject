import React, { Component, Fragment, useState } from 'react';
import { AdminDashboard } from './AdminDashboard';

export class ViewCart extends Component {
    static displayName = ViewCart.name;

    constructor(props) {
        super(props);
        this.state = {
            medicines: [], loading: true,
            id: '',
            userId: '',
            medicineId: '',
            quantity: '',
            price: '',
            error: 0,
            idMed:''

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
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(medicines =>
                        <tr key={medicines.id}>
                            <td>{medicines.medicine.name}</td>
                            <td>{medicines.quantity}</td>
                            <td>{medicines.price}</td>
                            <td> <button onClick={() => ViewCart.handleSave(medicines.medicineId)}> Delete </button> </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
    handleIdChange = (value) => {
        this.setState({ id: value });
    }

    static handleSave = async (valueIdMed) => {
        console.log(valueIdMed);
        var userId = localStorage.getItem("ID");
        var urlDelete = "https://localhost:44368/api/Cart/removeFromCartByUserId" + "?userId=" + userId + "&medicineId=" + valueIdMed;
        console.log("anwjdbawhdbwahdwahdwahdwahvd");
        console.log(urlDelete);
        const responseDelete = await fetch(urlDelete, {
            method: 'PUT',
            headers: {
                'accept': 'text/plain'
            }
        });
        window.location.reload();    
    }

    render() {
        let contents = this.state.error === 404 ? <p><em>Loading...</em></p> : ViewCart.renderMedicineTable(this.state.medicines);
        return (
            <Fragment>
                <AdminDashboard />
                <div style={{ textAlign: 'center' }}>
                    <h1 id="tabelLabel" >Your Cart</h1>
                    <br />
                    <br />
                    {contents}
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h3><button onClick={() => this.handleCheckout()}>  CHECKOUT </button> </h3>
                </div>
            </Fragment>
        );
    }

    async handleCheckout() {
        var userId = localStorage.getItem("ID");
        var urlCheckout = "https://localhost:44368/api/Order/checkOut" + "?id=" + userId;
        console.log(urlCheckout);
        const responseDelete = await fetch(urlCheckout, {
            method: 'PUT',
            headers: {
                'accept': 'text/plain'
            }
        });
        
        const dataCheckout = await responseDelete.json();
        console.log(dataCheckout);


    }

    async populateMedicineData() {
        var userId = localStorage.getItem("ID");
        let url = "https://localhost:44368/api/Cart/getCartByUserId" + "?id=" + userId;
        console.log(url);
        
        const response = await fetch(url);
        const data = await response.json();
        const result = await response;
        console.log(result.status)
        this.setState({ error: result.status });
        console.log(data);
        if (data != 404)
        {
            this.setState({ medicines: data, loading: false });
        }
          
    }
}
