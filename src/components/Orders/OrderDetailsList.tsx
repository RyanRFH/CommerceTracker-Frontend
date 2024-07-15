import { Button } from '@mui/joy';
import React from 'react';

const OrderDetailsList = (props: any) => {

    return (
        <div>

            <a className='flex m-[15px]' href='/orders'>
                <Button className=''>← Return to orders</Button>
            </a>

            <table className="w-full leading-normal h-full">
                <thead>
                    <tr className='hidden h-14 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2'>
                        <th className="pl-1">Name/ID</th>
                        <th className="pl-1">Description</th>
                        <th className="pl-1">Quantity</th>
                        <th className="pl-1">Price</th>
                        <th className="pl-1">Date Added</th>
                    </tr>
                </thead>
                <tbody className='flex flex-col h-full w-full items-center justify-center'>
                    <tr className='flex flex-col md:flex-row md:w-[100%] items-center border-b h-full my-[10px]'>
                        <td className='border-gray-200 bg-white text-sm leading-8 w-full h-full flex flex-col items-center justify-center'>
                            <p className='text-xl'>Order ID</p>
                            <p>{props.orderData?.orderId}</p>
                        </td>
                        <td className='border-gray-200 bg-white text-sm leading-8 w-full h-full flex flex-col items-center justify-center'>
                            <p className='text-xl'>User ID</p>
                            <p>{props.orderData?.userId}</p>
                        </td>
                    </tr>
                    {props.orderData?.orderItems.$values && props.orderData?.orderItems.$values.map((orderItem: any, index: number) => {
                        return (
                            <tr className='flex flex-col md:flex-row md:w-[50%] items-center border-b h-full' key={index}>
                                <td className="border-gray-200 bg-white text-sm leading-8 w-full md:w-1/2 h-full flex items-center justify-center">

                                    {orderItem?.product.name}
                                </td>
                                <td className="flex flex-col items-center md:w-1/2 text-center border-gray-200 bg-white mb-[10px] mx-[10px]">

                                </td>
                                <td>
                                    <div className="custom-number-input h-10 w-32 text-center">
                                        <label className="w-full text-gray-700 text-sm font-semibold">
                                            Quantity:{orderItem.quantity}
                                        </label>
                                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">

                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='flex justify-center mt-[20px]'>
                <Button onClick={props.deleteOrderCallBack} color='danger' className=''>Delete Order</Button>
            </div>

        </div>
    );
};

export default OrderDetailsList;