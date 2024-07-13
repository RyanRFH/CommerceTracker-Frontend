import React, { useEffect, useState } from 'react';
import OrderDetailsList from '../../components/Orders/OrderDetailsList';
import { DeleteOrder, GetOrdersByQuery } from '../../services/OrderServices';

const OrderDetails = () => {
    console.log("Order Details Page Working");
    const searchParams = new URLSearchParams(document.location.search);
    const orderId = searchParams.get("orderId");
    const [errorMessage, setErrorMessage] = useState("");
    const [orderData, setOrderData] = useState(Object);
    const [user, setUser] = useState(Object);
    let queryArray: Array<string>;


    console.log("OD = ", orderData);

    const deleteOrder = async () => {
        let res = await DeleteOrder(orderData.message.$values[0].orderId);

        if (!res.success || res.error) {
            console.log("Error deleting order", res.message, res?.error);
            return;
        }
        window.location.href = `/orders`;
    };


    const getOrder = async () => {
        if (orderId) {
            queryArray = ["orderId", orderId];
        } else {
            console.log("OrderId not found in URL params");
            setErrorMessage("OrderId not found in URL params");
        }

        let res = await GetOrdersByQuery(queryArray);
        if (res.error || res.success !== true) {
            setErrorMessage("Error retrieving orders");
            console.log("Error retrieving orders");
            return;
        };

        if (res) {
            setOrderData(res);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);


    return (
        <div>
            <p>{errorMessage}</p>
            <OrderDetailsList deleteOrderCallBack={deleteOrder} orderData={orderData.message?.$values[0]} />
        </div>
    );
};

export default OrderDetails;