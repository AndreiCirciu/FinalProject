import React, { Component, Fragment, useState } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';
export class AddMedicine extends Component {
    static displayName = AddMedicine.name;


    constructor(props) {
        super(props);
        this.state = {
            medicines: [], loading: true,
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

    async handleSave() {
        let data = {
            id: 0,
            name: this.state.name,
            companyName: this.state.companyname,
            price: this.state.price,
            quantity: this.state.quantity,
            imageUrl: this.state.imageurl,
            uses: this.state.uses,
            expirationDate:this.state.expirationdate
        }


        let url = "https://localhost:44368/api/Medicine/addMedicine";
        console.log(url);
        console.log(JSON.stringify(data));

        /*const response = await fetch('https://localhost:44368/api/Account/getAllAccounts');
        const data2 = await response.json();
        console.log(data2);*/
        let authToken = "bearer " + localStorage.getItem("jwtToken");

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': authToken,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(response);
        console.log(JSON.stringify(response));
        const result = await response;
        console.log(result.status);
        this.setState({ error: result.status });
        window.location.reload();

    }

    handleNameChange = (value) => {
        this.setState({ name: value });
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

    handleImageUrlChange = (value) => {
        this.setState({ imageurl: value });
    }

    handleUsesChange = (value) => {
        this.setState({ uses: value })
    }

    handleIsExpirationDateChange = (value) => {
        this.setState({ expirationdate: value })
    }




    /*<div>
    <NavMenu />
    <Container>
        {this.props.children}
    </Container>
</div>*/

    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : AddMedicine.renderMedicineTable(this.state.medicines);
     
        return (          
            <Fragment>
                <AdminDashboard />
                <div style={{ textAlign: 'center' }}>
                <div> <strong> Add Medicine </strong> </div>                
                <label> Name </label>
                <br />
                <input type="text" id='txtName' placeholder="Enter Name" onChange={(e) => this.handleNameChange(e.target.value)} />
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
                <label> Image URL </label>
                <br />
                <input type="text" id='txtImageUrl' placeholder="Enter Image URL" onChange={(e) => this.handleImageUrlChange(e.target.value)} />
                <br />
                <label> Uses </label>
                <br />
                <input type="text" id='txtUses' placeholder="Uses" onChange={(e) => this.handleUsesChange(e.target.value)} />
                <br />
                <label> Expiration Date </label>
                <br />
                    <input type="text" id='txtExpirationDate' placeholder="Expiration Date" onChange={(e) => this.handleIsExpirationDateChange(e.target.value)} />
                <br /><br />
                    <button onClick={() => this.handleSave()}> Save </button>
                    <br />
                    <br />
                    <br />
                    {contents}
                </div>
            </Fragment>
        )
    }
    async populateMedicineData() {
        let authToken = "bearer " + localStorage.getItem("jwtToken");
        const response = await fetch('https://localhost:44368/api/Medicine/getAllMedicine', {
            method: "GET",
                headers: {
                'Authorization' : authToken
            }
        });
        const data = await response.json();
        this.setState({ medicines: data, loading: false });

    }

}

