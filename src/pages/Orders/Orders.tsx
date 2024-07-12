import React, { useEffect, useState } from 'react';
import { GetOrdersByQuery } from '../../services/OrderServices';
import OrderResults from '../../components/Orders/OrderResults';

const Orders = () => {
    console.log("Orders Page Working");
    //See personal orders button?
    //See all orders button (admin)?

    let queryArray: any;
    const [orders, setOrders] = useState(Array<any>);
    const [errorMessage, setErrorMessage] = useState("");
    const getOrders = async () => {
        let res = await GetOrdersByQuery(queryArray);
        if (res.error || res.success !== true) {
            setErrorMessage("Error retrieving orders");
            console.log("Error retrieving orders");
            return;
        };

        if (res.message.$values) {
            setOrders(res.message.$values);
        }

    };


    useEffect(() => {
        getOrders();
    }, [])

    return (
        <div>
            <p className='flex items-center justify-center mt-[100px] text-3xl'>{errorMessage}</p>
            <OrderResults orderList={orders} />
        </div>
    );
};

export default Orders;