import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses, LineChart } from '@mui/x-charts';
import { getUser } from '../../services/AccountServices';
import { GetOrdersByQuery } from '../../services/OrderServices';

const Last7DaysBarChart = () => {

    let xAxisData: Array<any> = [];
    let xAxisDataDates: Array<Date> = [];
    let seriesData: Array<number> = [0, 0, 0, 0, 0, 0, 0];
    let seriesOrderCountData: Array<number> = [0, 0, 0, 0, 0, 0, 0];
    let [seriesDataDisplay, setSeriesDataDisplay] = useState(Array<any>);
    let [seriesOrderCountDisplay, setOrderCountDisplay] = useState(Array<any>);
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

        setxAxisDataState(xAxisData);

        seriesData = [0, 0, 0, 0, 0, 0, 0];
        const orderData = await GetOrdersByQuery([]);
        let totalSales = 0;
        let totalOrders = 0;

        for (let i = 6; i > -1; i--) {
            console.log(orderData.message.$values);
            orderData.message.$values.forEach((order: any) => {
                let orderCreationDate = new Date(Date.parse(order.createdAt));
                let tempOrderSales = 0;
                if (orderCreationDate.getDate() === date.getDate() - i) {
                    totalOrders++;
                    order.orderItems.$values.forEach((orderItem: any) => {
                        tempOrderSales += orderItem.quantity * orderItem.product.price
                    });
                };
                totalSales += tempOrderSales;
                seriesData[6 - i] = totalSales;


                seriesOrderCountData[6 - i] = totalOrders;

            });

        };

        setSeriesDataDisplay(seriesData);
        setOrderCountDisplay(seriesOrderCountData);
    };

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
                transform: 'translate(-10px, 0)'
            }
        },
    };

    return (
        <div>
            <div className='flex flex-col mt-[30px] ml-[30px]'>
                <h1 className='text-4xl'>Total Sales in last 7 days</h1>

                <LineChart
                    xAxis={[{ data: xAxisDataState, scaleType: `point` }]}
                    series={[
                        {
                            label: "Total Sales",
                            data: seriesDataDisplay
                        }, { label: "Orders", data: seriesOrderCountDisplay }
                    ]}
                    {...chartSetting}
                    width={1500}
                    height={500}
                />
            </div>
        </div>
    );
};

export default Last7DaysBarChart;