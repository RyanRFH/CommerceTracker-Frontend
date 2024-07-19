import React, { useEffect, useState } from 'react';
import { axisClasses, BarChart, LineChart } from '@mui/x-charts';
import { transform } from 'typescript';
import { GetOrdersByQuery } from '../../services/OrderServices';
import { getUser } from '../../services/AccountServices';
import Last7DaysBarChart from '../../components/Analysis/Last7DaysBarChart';
import Last7DaysLineChart from '../../components/Analysis/Last7DaysLineChart';

const Analysis = () => {
    // let xAxisData: Array<any> = [];
    // let xAxisDataDates: Array<Date> = [];
    // let seriesData: Array<number> = [0, 0, 0, 0, 0, 0, 0];
    // let [seriesDataDisplay, setSeriesDataDisplay] = useState(Array<any>);
    // let [xAxisDataState, setxAxisDataState] = useState(Array<any>);
    let [userAuthorized, setUserAuthorized] = useState(false);

    const checkUser = async () => {
        const user = await getUser();

        if (user.role !== "Admin") {
            return;
        } else {
            setUserAuthorized(true);
        }
    };


    //Display order data for last 7 days
    // const getBarChartData = async () => {
    //     let user = await getUser();
    //     if (user.role !== "Admin") {
    //         return;
    //     } else {
    //         setUserAuthorized(true);
    //     }

    //     let date = new Date();
    //     for (let i = 0; i < 7; i++) {
    //         let newDate = new Date(date.getTime() - i * 86400000);
    //         xAxisDataDates.push(newDate);
    //         xAxisData.push(newDate.toLocaleDateString());
    //     };

    //     xAxisData.reverse();

    //     seriesData = [0, 0, 0, 0, 0, 0, 0];
    //     const orderData = await GetOrdersByQuery([]);
    //     orderData.message.$values.forEach((value: any) => {
    //         let tempPrice = 0;
    //         value.orderItems.$values.forEach((orderItem: any) => {
    //             tempPrice += orderItem.quantity * orderItem.product.price;
    //         });

    //         let orderCreationDate = new Date(Date.parse(value.createdAt));

    //         for (let i = 0; i < 7; i++) {

    //             if (xAxisDataDates[i].getDate() === orderCreationDate.getDate()) {
    //                 seriesData[6 - i] += tempPrice;
    //             }

    //         };

    //         setSeriesDataDisplay(seriesData);
    //         setxAxisDataState(xAxisData);
    //     });
    // };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <div>
            {userAuthorized
                ?
                <div>
                    <Last7DaysBarChart />
                    <Last7DaysLineChart />
                </div>

                :
                <div className='flex flex-col items-center justify-center mt-[30px]'>
                    <h1 className='text-4xl'>Requires admin account</h1>
                </div>
            }



        </div>
    );
};

export default Analysis;