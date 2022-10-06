import React, { Component, Fragment, useState } from 'react';
import { AdminDashboard } from './AdminDashboard';
export class OrderStatus extends Component {
    static displayName = OrderStatus.name;

    constructor(props) {
        super(props);
        this.state = { orders: [], loading: true };
    }

    componentDidMount() {
        this.populateOrdersData();
    }

    static renderOrdersTable(orders) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Medicine Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Order Time</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(orders =>
                        <tr key={orders.id}>
                            <td>{orders.medicineNames}</td>
                            <td>{orders.price}</td>
                            <td>{orders.status}</td>
                            <td>{orders.time}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading ? <p><h2> Your cart is empty </h2></p> : OrderStatus.renderOrdersTable(this.state.orders);

        return (
            <Fragment>
                <AdminDashboard />
                <div style={{ textAlign: 'center' }}>
                    <h1 id="tabelLabel" >Order Status</h1>
                    <br />
                    <br />
                    <br />
                    <br />
                    {contents}
                </div>
            </Fragment>
        );
    }

    async populateOrdersData() {
        var userId = localStorage.getItem("ID");
        var urlCheckout = "https://localhost:44368/api/Order/getOrderByUserId" + "?id=" + userId;
        let authToken = "bearer " + localStorage.getItem("jwtToken");
        const response = await fetch(urlCheckout, {
            method: "GET",
            headers: {
                'Authorization': authToken
            }
        });
        const data = await response.json();
        this.setState({ orders: data, loading: false });
        
    }
}
