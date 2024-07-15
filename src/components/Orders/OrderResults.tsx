import React, { useEffect, useState } from 'react';

const OrderResults = (props: any) => {





    let totalPriceArray: Array<any> = [];
    const calculateTotalPrice = () => {
        props.orderList.map((order: any) => {
            let totalPrice = 0;
            order?.orderItems.$values.map((value: any) => {
                totalPrice += value.product.price;
            })
            totalPriceArray.push(totalPrice);
        });
    };
    calculateTotalPrice();


    const goToOrdersDetailsPage = (orderId: string) => {
        window.location.href = `${process.env.REACT_APP_LOCAL_URL}/orders/details?orderId=${orderId}`;
    };

    return (
        <div className='flex items-center justify-center'>
            {props.orderList?.length > 0 && <table className="w-[90%] leading-normal h-full">
                <thead>
                    <tr className='h-14 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2'>
                        <th className="pl-1">User ID</th>
                        <th className="pl-1">Order ID</th>
                        <th className="pl-1">Order Created</th>
                        <th className="pl-1">Item Count</th>
                        <th className="pl-1">Total Price</th>
                    </tr>
                </thead>
                <tbody className='h-full'>
                    {props.orderList?.length !== 0 && props.orderList?.map((order: any, index: number) => {
                        return (
                            <tr onClick={(e) => goToOrdersDetailsPage(order?.orderId)} className='items-center border-b h-full cursor-pointer hover:bg-gray-100' key={index}>
                                <td className="border-gray-200 leading-8">
                                    <div className="w-full">
                                        <p>{order?.userId}</p>
                                    </div>
                                </td>
                                <td className="border-gray-200 leading-8">
                                    <div className="w-full">
                                        <p>{order?.orderId}</p>
                                    </div>
                                </td>
                                <td className="border-gray-200 leading-8">
                                    <div className=''>
                                        <p>{order?.createdAt}</p>
                                        {(((Date.now() - Date.parse(order?.createdAt)) / 1000 / 60 / 60) / 24).toFixed()} days ago

                                    </div>

                                </td>
                                <td className="border-gray-200 leading-8">
                                    <div>
                                        <p>{order?.orderItems.$values.length}</p>
                                    </div>

                                </td>

                                <td className="border-gray-200leading-8">
                                    <div>
                                        £{totalPriceArray[index]}
                                    </div>

                                </td>
                            </tr>

                        )

                    })}
                </tbody>
            </table>}

        </div>
    );
};

export default OrderResults;