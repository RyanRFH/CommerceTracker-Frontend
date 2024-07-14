import React, { useEffect, useState } from 'react';
import { GetOrdersByQuery } from '../../services/OrderServices';
import OrderResults from '../../components/Orders/OrderResults';
import { getUser } from '../../services/AccountServices';

const Orders = () => {
    console.log("Orders Page Working");
    //See personal orders button?
    //See all orders button (admin)?

    let queryArray: [];
    const [orders, setOrders] = useState(Array<any>);
    const [errorMessage, setErrorMessage] = useState("");
    const [notificationMessage, setNotificationMessage] = useState("");
    const getOrders = async () => {

        let user = await getUser();
        console.log("user = ", user);
        if (user.error) {
            setErrorMessage("Please log in to see orders")
            return;
        }

        if (user.role === "User") {
            let queryByUser = ["userId", user.id]
            let res = await GetOrdersByQuery(queryByUser);

            if (res.error || res.success !== true) {
                setErrorMessage("Error retrieving orders");
                console.log("Error retrieving orders");
                return;
            };

            if (res.message.$values) {
                setOrders(res.message.$values);
                setNotificationMessage("Your Orders");
            } else {
                setErrorMessage("Error retrieving orders");
            }

            return;
        }


        let res = await GetOrdersByQuery(queryArray);
        if (res.error || res.success !== true) {
            setErrorMessage("Error retrieving orders");
            console.log("Error retrieving orders");
            return;
        };

        if (res.message.$values) {
            setOrders(res.message.$values);
            setNotificationMessage("Viewing All Orders");
        } else {
            setErrorMessage("Error retrieving orders");
        }

    };

    console.log("orders = ", orders);
    useEffect(() => {
        getOrders();
    }, [])

    return (
        <div>
            <p className='flex items-center justify-center my-[30px] text-3xl'>{errorMessage}</p>
            <p className='flex items-center justify-center my-[30px] text-3xl'>{notificationMessage}</p>
            <OrderResults orderList={orders} />
        </div>
    );
};

export default Orders;