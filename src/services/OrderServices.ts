import { getCookie } from "../common/Cookies/cookies";
import { getUser } from "./AccountServices";

export const CreateOrderFromBasket = async () => {
    const user = await getUser();
    if (!user) {
        return { error: `User not found`, message: "User not found" };
    }

    try {
        const res = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/api/order/createfrombasket?userId=${user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok === false) {
            return { error: `Fetch failed`, message: res.statusText };
        }
        const data = await res.json();
        return { success: true, message: data };
    } catch (error) {
        console.log("Error in services/basket/CreateOrderFromBasket");
        return { error: error, message: "An error occurred" };
    }
};

export const GetOrdersByQuery = async (query: Array<string>) => {

    //Build query for API query
    let queryURL = `${process.env.REACT_APP_COMMERCE_API_URL}/api/order`
    for (let i = 0; i < query?.length; i += 2) {
        //Take the createdat value, which is an amount of days, and transform it into an ISO date
        if (query[i] === "createdat") {

            let queryDateinMS
            queryDateinMS = Number.parseInt(query[i + 1]) * 24 * 60 * 60 * 1000;

            let differenceInTimeInMS
            differenceInTimeInMS = Date.now() - queryDateinMS;

            query[i + 1] = new Date(differenceInTimeInMS).toISOString();

        }

        if (i === 0) {
            queryURL = queryURL + `?${query[i]}=${query[i + 1]}`
        } else {
            queryURL = queryURL + `&${query[i]}=${query[i + 1]}`
        }
    }

    const userJWt = getCookie("login-jwt");

    try {
        const res = await fetch(queryURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userJWt}`
            }
        });

        if (res.ok === false) {
            return { error: `Fetch failed`, message: res.statusText };
        }
        const data = await res.json();
        return { success: true, message: data };
    } catch (error) {
        console.log("Error in services/order/GetOrdersByQuery");
        return { error: error, message: "An error occurred" };
    }


};

export const DeleteOrder = async (orderId: string) => {
    const userJWt = getCookie("login-jwt");

    let user = await getUser();

    if (user.error) {
        return { success: false, message: "User not found" };
    };

    try {
        const res = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/api/order`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userJWt}`
            },
            body: JSON.stringify(orderId)

        });

        if (res.ok === false) {
            return { error: `Fetch failed`, message: res.statusText };
        }
        const data = await res.json();
        return { success: true, message: data };
    } catch (error) {
        console.log("Error in services/order/DeleteOrder");
        return { error: error, message: "An error occurred" };
    }
};