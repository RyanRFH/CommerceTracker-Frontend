import React, { useEffect } from 'react';
import AnalysisDetails from '../../components/Analysis/AnalysisDetails';
import { axisClasses, BarChart } from '@mui/x-charts';
import { transform } from 'typescript';

const Analysis = () => {

    let date = new Date();
    let xAxisData: Array<any> = [];

    //Display order data for last 7 days
    const getBarChartData = async () => {
        for (let i = 0; i < 7; i++) {
            xAxisData.push(date.toUTCString().split(" ", 4));
            date.setTime(date.getTime() - 86400000);
        };
        xAxisData.reverse();

        let seriesData = [];
    };
    getBarChartData();

    const chartSetting = {
        yAxis: [
            {
                label: 'rainfall (mm)',
            },
        ],
        width: 1500,
        height: 500,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-5px, 0)',
            },
        },
    };

    return (
        <div>
            <p>{date.toUTCString().split(" ", 4)}</p>
            <BarChart
                xAxis={[{ scaleType: 'band', data: xAxisData }]}
                series={[{ label: "Revenue", data: [400, 2, 3, 2, 5, 6, 4] }, { data: [1, 6, 3] }]}
                {...chartSetting}
            />


            {/* <BarChart
                xAxis={[{ scaleType: 'band', data: xAxisData }]}
                yAxis={[{ label: "Pounds(£)" }]}
                series={[{ label: "Revenue", data: [400, 2, 3, 2, 5, 6, 4] }, { data: [1, 6, 3] }]}
                width={1500}
                height={500}
            /> */}

            <AnalysisDetails />
        </div>
    );
};

export default Analysis;