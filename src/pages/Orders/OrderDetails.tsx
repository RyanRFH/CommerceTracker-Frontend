import React, { useEffect, useState } from 'react';
import OrderDetailsList from '../../components/Orders/OrderDetailsList';
import { DeleteOrder, GetOrdersByQuery } from '../../services/OrderServices';
import { getUser } from '../../services/AccountServices';

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

        let user = await getUser();

        if (user.error) {
            setErrorMessage("Error: User not found");
            return;
        }

        let res = await GetOrdersByQuery(queryArray);
        if (res.error || res.success !== true) {
            setErrorMessage("Error retrieving orders");
            console.log("Error retrieving orders");
            return;
        };

        console.log("res ===", res);
        console.log(user.id);
        if (res.message.$values[0].userId !== user.id) {
            setErrorMessage("Unauthorized to view this order");
            return;
        }

        if (res) {
            setOrderData(res);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);


    return (
        <div>
            {!errorMessage && <OrderDetailsList deleteOrderCallBack={deleteOrder} orderData={orderData.message?.$values[0]} />}
            <p className='flex items-center justify-center my-[30px] text-3xl'>{errorMessage}</p>

        </div>
    );
};

export default OrderDetails;