import React, { Component, Fragment, useState } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';
export class AddMedicine extends Component {


    constructor(props) {
        super(props);
        this.state = {
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

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'text/plain',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(response);
        console.log(JSON.stringify(response));
        const result = await response;
        console.log(result.status);
        this.setState({ error: result.status });
        /*if (response === 200) {
           navigate("/SetAccount");
        }   */

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
                <input type="text" id='txtExpirationDate' placeholder="Uses" onChange={(e) => this.handleIsExpirationDateChange(e.target.value)} />
                <br /><br />
                <button onClick={() => this.handleSave()}> Save </button>
                    </div>
            </Fragment>
        )
    }

}

