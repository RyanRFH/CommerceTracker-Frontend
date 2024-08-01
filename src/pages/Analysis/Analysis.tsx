import React, { useEffect, useState } from 'react';
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
    let [errorMessage, setErrorMessage] = useState("");
    const [orderData, setOrderData] = useState(Object);

    const checkUser = async () => {
        const user = await getUser();

        if (user.role !== "Admin") {
            setErrorMessage("Admin account required");
            return;
        } else {
            setUserAuthorized(true);
        }
    };

    const getOrderData = async () => {
        const response = await GetOrdersByQuery([]);
        if (response.success === false) {
            setErrorMessage("Failed to fetch data");
            return;
        }

        if (response) {
            setOrderData(response);
            return;
        } else {
            setErrorMessage("Data is invalid");
            return;
        };

    };

    useEffect(() => {
        checkUser();
        getOrderData();
    }, []);

    return (
        <div>
            {userAuthorized
                ?
                <div>
                    <Last7DaysBarChart orderData={orderData} />
                    <Last7DaysLineChart orderData={orderData} />
                </div>

                :
                <div className='flex flex-col items-center justify-center mt-[30px]'>
                    <h1 className='text-4xl'>{errorMessage}</h1>
                </div>
            }



        </div>
    );
};

export default Analysis;