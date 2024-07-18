import React, { useEffect, useState } from 'react';
import AnalysisDetails from '../../components/Analysis/AnalysisDetails';
import { axisClasses, BarChart, LineChart } from '@mui/x-charts';
import { transform } from 'typescript';
import { GetOrdersByQuery } from '../../services/OrderServices';
import { getUser } from '../../services/AccountServices';

const Analysis = () => {
    let xAxisData: Array<any> = [];
    let xAxisDataDates: Array<Date> = [];
    let seriesData: Array<number> = [0, 0, 0, 0, 0, 0, 0];
    let [seriesDataDisplay, setSeriesDataDisplay] = useState(Array<any>);
    let [xAxisDataState, setxAxisDataState] = useState(Array<any>);
    let [userAuthorized, setUserAuthorized] = useState(false);
    //Display order data for last 7 days
    const getBarChartData = async () => {
        let user = await getUser();
        if (user.role !== "Admin") {
            return;
        } else {
            setUserAuthorized(true);
        }

        let date = new Date();
        for (let i = 0; i < 7; i++) {
            let newDate = new Date(date.getTime() - i * 86400000);
            xAxisDataDates.push(newDate);
            xAxisData.push(newDate.toLocaleDateString());
        };

        xAxisData.reverse();

        seriesData = [0, 0, 0, 0, 0, 0, 0];
        const orderData = await GetOrdersByQuery([]);
        orderData.message.$values.forEach((value: any) => {
            let tempPrice = 0;
            value.orderItems.$values.forEach((orderItem: any) => {
                tempPrice += orderItem.quantity * orderItem.product.price;
            });
            console.log(tempPrice);
            console.log(value);
            let orderCreationDate = new Date(Date.parse(value.createdAt));
            // console.log("test", xAxisDataDates[0].getDate());
            for (let i = 0; i < 7; i++) {

                if (xAxisDataDates[i].getDate() === orderCreationDate.getDate()) {
                    seriesData[6 - i] += tempPrice;
                }

            };
            console.log("seriesData= ", seriesData);
            console.log(orderCreationDate.getDate());
            setSeriesDataDisplay(seriesData);
            setxAxisDataState(xAxisData);
        });
        // for (let i = 0; i < orderData.message.$values.length; i++) {

        // };

        console.log(orderData);
    };
    // getBarChartData();

    useEffect(() => {
        getBarChartData();
    }, []);

    const chartSetting = {
        yAxis: [
            {
                label: 'Pounds(£)',
            },
        ],
        width: 1500,
        height: 500,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-12px, 0)'
            }
        },
    };
    console.log("SD = ", seriesDataDisplay);

    return (
        <div>
            {userAuthorized
                ?
                <div className='flex flex-col items-center justify-center mt-[30px]'>
                    <h1 className='text-4xl'>Sales data for last 7 days</h1>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: xAxisDataState }]}
                        series={[{ label: "Daily Sales", data: seriesDataDisplay }]}
                        {...chartSetting}
                    />
                </div>
                :
                <div className='flex flex-col items-center justify-center mt-[30px]'>
                    <h1 className='text-4xl'>Requires admin account</h1>
                </div>
            }

            <AnalysisDetails />

        </div>
    );
};

export default Analysis;