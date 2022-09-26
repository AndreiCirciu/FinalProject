import React, { Component, Fragment, useState } from 'react';
import { Last } from 'react-bootstrap/esm/PageItem';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { setConstantValue } from 'typescript';
import { AdminDashboard } from './AdminDashboard';
export class SearchMedicine extends Component {
    static displayName = SearchMedicine.name;


    constructor(props) {
        super(props);
        this.state = {
            medicines: [], loading: true,
            use: '',
            error: 0
        };
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
                        <th>Uses (F)</th>
                        <th>Expiration Date</th>
                        <th>  </th>
                    </tr>
                </thead>
                <tbody>
                    <td>{medicines.id}</td>
                    <td>{medicines.name}</td>
                    <td>{medicines.companyName}</td>
                    <td>{medicines.price}</td>
                    <td>{medicines.quantity}</td>
                    <td>{medicines.imageUrl}</td>
                    <td>{medicines.uses}</td>
                    <td>{medicines.expirationDate}</td>                 

                </tbody>
            </table>
        );
    }

    async handleSave() {
        let data = {
            use: this.state.use,
        }


        var url = "https://localhost:44368/api/Medicine/getMedicineByUses";
        var listData = data.use.split(" ");

        var secondPart = "";
        for (let x of listData) {

            secondPart = secondPart + x + "%20";
        }

        var thirdPart = secondPart.slice(0, -3);

        var lastPart = url + "?uses=" + thirdPart;
        console.log(lastPart);

        console.log(JSON.stringify(data));

        /*const response = await fetch('https://localhost:44368/api/Account/getAllAccounts');
        const data2 = await response.json();
        console.log(data2);*/

        const response = await fetch(lastPart, {
            method: 'GET',
            headers: {
                'accept': 'text/plain',
            }

        });
        const dataTable = await response.json();
        this.setState({ medicines: dataTable, loading: false });
        console.log(response);
        //  console.log(JSON.stringify(response));
        //const result = await response;
        // x;
        //this.setState({ error: result.status });
        // window.location.reload();

    }


    handleUseChange = (value) => {
        this.setState({ use: value });
    }

    async addToCart() {
        var userId = localStorage.getItem("ID");
        console.log(userId);
        let urlAddToCart = "https://localhost:44368/api/Cart/addToCart" + "?userId=" + userId + "&" + "medicineId=" +  this.state.medicines.id ;
        console.log(urlAddToCart);
        const responseAddToCart = await fetch(urlAddToCart, {
            method: 'PUT',
            headers: {
                'accept': 'text/plain',
            }
        });
        console.log(responseAddToCart);

    }

    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : SearchMedicine.renderMedicineTable(this.state.medicines);
        return (
            <Fragment>
                <AdminDashboard />
                <div style={{ textAlign: 'center' }}>
                    <div> <strong> Search the medicine by the uses </strong> </div>
                    <label> Uses </label>
                    <br />
                    <input type="text" id='txtUse' placeholder="Enter Use" onChange={(e) => this.handleUseChange(e.target.value)} />
                    <br />
                    <button onClick={() => this.handleSave()}> Save </button>
                    <br />
                    <br />
                    <br />
                    {contents}
                    <button onClick={() => this.addToCart()}> Add to cart </button>
                </div>
            </Fragment>
        )
    }


}

