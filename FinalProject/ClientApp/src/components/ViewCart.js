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
        var totalPrice = 0;
        totalPrice += medicines.price;
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(medicines =>
                        <tr key={medicines.id}>
                            <td>{medicines.id}</td>
                            <td>{medicines.userId}</td>
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
        let contents = this.state.loading ? <p><em>Loading...</em></p> : ViewCart.renderMedicineTable(this.state.medicines);
        return (
            <Fragment>
                <AdminDashboard />
                <div style={{ textAlign: 'center' }}>
                    <h1 id="tabelLabel" >Your Cart</h1>
                    <br />
                    <br />
                    {contents}

                </div>
            </Fragment>
        );
    }

    async populateMedicineData() {
        var userId = localStorage.getItem("ID");
        let url = "https://localhost:44368/api/Cart/getCartByUserId" + "?id=" + userId;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({ medicines: data, loading: false });
    }
}
