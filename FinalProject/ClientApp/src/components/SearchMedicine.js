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
            allMedicines: [],
            use: '',
            error: 0
        };
    }
    componentDidMount() {
        this.populateMedicineData();
    }

    static renderMedicineTable(medicines) {
        let reloadButton = localStorage.getItem('allmed') == 1 ? <button onClick={() => SearchMedicine.ReloadPage()}> See all medicines </button> : <p><em> </em> </p>;
        return (
           
            <Fragment>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Company Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Uses</th>
                            <th>Expiration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map(medicines =>
                            <tr key={medicines.id}>
                                <td>{medicines.name}</td>
                                <td>{medicines.companyName}</td>
                                <td>{medicines.price}</td>
                                <td>{medicines.quantity}</td>
                                <td>{medicines.uses}</td>
                                <td>{medicines.expirationDate}</td>
                                <td> <button onClick={() => SearchMedicine.addToCart(medicines.id)}> Add </button> </td>
                            </tr>
                        )}
                    
                    </tbody>

                </table>
                {reloadButton}  
            </Fragment>

        );
    }
    static ReloadPage() {

        localStorage.setItem("allmed", 0);
        window.location.reload();

    }


    async handleSave() {
        let data = {
            use: this.state.use,
        }
        localStorage.setItem("allmed", 1);


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

        /*const response = await fetch('https://localhost:44368/api/Account/getAllMedicine');
        const data2 = await response.json();
        console.log(data2);*/

        const responseSearch = await fetch(lastPart, {
            method: 'GET',
            headers: {
                'accept': 'text/plain',
            }

        });
        const dataTable = await responseSearch.json();
        console.log(dataTable);
        this.setState({ medicines: dataTable, loading: false });
        console.log(responseSearch);
        console.log(JSON.stringify(responseSearch));
        //const result = await response;
        // x;
        //this.setState({ error: result.status });
        // window.location.reload();

    }


    handleUseChange = (value) => {
        this.setState({ use: value });
    }

    static addToCart = async (valueIdMed) => {
        var userId = localStorage.getItem("ID");
        console.log("asdasdasd");
        console.log(userId);
        let urlAddToCart = "https://localhost:44368/api/Cart/addToCart" + "?userId=" + userId + "&" + "medicineId=" + valueIdMed;
        console.log(urlAddToCart);
        const responseAddToCart = await fetch(urlAddToCart, {
            method: 'PUT',
            headers: {
                'accept': 'text/plain',
            }
        });
        console.log(responseAddToCart);
        return (
            <div> It was added </div>
        );
        const result = await responseAddToCart;
        this.setState({ error: result.status });

    }

    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : SearchMedicine.renderMedicineTable(this.state.medicines);

        // let wasAdded = this.state.error == 200 ? <h2> Medicine was added to cart</h2> : (this.state.error == 400 ? <p><em>Failed to add to cart.</em></p> : <p></p>);
        return (
            <Fragment>
                <AdminDashboard />
                <div style={{ textAlign: 'center' }}>
                    <div> <strong> Search the medicine by the uses </strong> </div>
                    <label> Uses </label>
                    <br />
                    <input type="text" id='txtUse' placeholder="Enter Use" onChange={(e) => this.handleUseChange(e.target.value)} />
                    <br />
                    <button onClick={() => this.handleSave()}> Search </button>
                    <br />
                    <br />
                    <br />
                    {contents}

                    {/*{wasAdded}*/}
                </div>
            </Fragment>
        )
    }
    async populateMedicineData() {
        const response = await fetch('https://localhost:44368/api/Medicine/getAllMedicine');

        const info = await response.json();
        console.log(info);
        this.setState({ medicines: info, loading: false });

    }


}

