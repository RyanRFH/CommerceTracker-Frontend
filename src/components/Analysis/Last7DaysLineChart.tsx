import React, { useEffect, useState } from 'react';
import { axisClasses, LineChart } from '@mui/x-charts';
import { getUser } from '../../services/AccountServices';

const Last7DaysBarChart = (props: any) => {

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

        if (!props.orderData?.message?.$values) {
            return;
        }

        console.log(props.orderData?.message?.$values);

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
        // const orderData = await GetOrdersByQuery([]);
        const orderData = props.orderData;
        let totalSales = 0;
        let totalOrders = 0;

        for (let i = 6; i > -1; i--) {
            orderData.message.$values.forEach((order: any) => {
                let orderCreationDate = new Date(Date.parse(order.createdAt));
                let tempOrderSales = 0;

                let currentDateMinusDays = new Date(date.getTime() - i * 1000 * 60 * 60 * 24);

                if (orderCreationDate.getDate() === currentDateMinusDays.getDate()) {
                    totalOrders++;
                    order.orderItems.$values.forEach((orderItem: any) => {
                        tempOrderSales += orderItem.quantity * orderItem.product.price
                    });
                };
                totalSales += tempOrderSales;
                seriesData[6 - i] = totalSales;
                seriesOrderCountData[6 - i] = totalOrders;
            });
            console.log(seriesOrderCountData);

        };

        setSeriesDataDisplay(seriesData);
        setOrderCountDisplay(seriesOrderCountData);
    };

    useEffect(() => {
        getBarChartData();
    }, [props]);

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
            {userAuthorized === true
                ?
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
                :
                <div>
                    <p>Admin account required</p>
                </div>
            }
        </div>
    );
};

export default Last7DaysBarChart;