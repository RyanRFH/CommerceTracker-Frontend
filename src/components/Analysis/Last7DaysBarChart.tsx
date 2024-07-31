import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
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


        seriesOrderCountData = [0, 0, 0, 0, 0, 0, 0];
        seriesData = [0, 0, 0, 0, 0, 0, 0];

        // const orderData = await GetOrdersByQuery([]);
        const orderData = props.orderData;

        orderData.message.$values.forEach((value: any) => {
            let tempPrice = 0;
            value.orderItems.$values.forEach((orderItem: any) => {
                tempPrice += orderItem.quantity * orderItem.product.price;
            });
            let orderCreationDate = new Date(Date.parse(value.createdAt));
            for (let i = 0; i < 7; i++) {

                if (xAxisDataDates[i].getDate() === orderCreationDate.getDate()) {
                    seriesData[6 - i] += tempPrice;
                    seriesOrderCountData[6 - i]++;
                };

            };
            setSeriesDataDisplay(seriesData);
            setOrderCountDisplay(seriesOrderCountData);
        });
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
                    <h1 className='text-4xl'>Daily Sales in last 7 days</h1>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: xAxisDataState }]}
                        series={[{ label: "Daily Sales", data: seriesDataDisplay }, { label: "Orders", data: seriesOrderCountDisplay }]}
                        {...chartSetting}
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