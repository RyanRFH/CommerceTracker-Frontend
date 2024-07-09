import { Product } from "../Dtos/Products/CreateProductDto";
import { getCookie } from "../common/Cookies/cookies";

//Get a list of products via a query using url parameters
export const GetProductQuery = async (query: Array<string>) => {

    //Build query for API
    let queryURL = `${process.env.REACT_APP_COMMERCE_API_URL}/api/product`
    for (let i = 0; i < query.length; i += 2) {
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


    try {
        const response = await fetch(queryURL, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error in services/products/GetProductQuery");
        return { error: error };
    }
};

export const CreateProduct = async (product: Product) => {
    const userJWt = getCookie("login-jwt");
    try {
        const res = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/api/product`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userJWt}`

            },
            body: JSON.stringify(product),
        });

        if (res.ok === false) {
            return { error: `Fetch failed`, reason: res.statusText };
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error in services/products/CreateProduct");
        return { error: error };
    }
};

//Get a single product
export const GetProductSingle = async (queryType: string, queryValue: string) => {

    try {
        const response = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/api/product?${queryType}=${queryValue}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error in services/products/GetProductSingle");
        return { error: error };
    }
};

//Get a list of products from a list of value (e.g. productids)
export const GetProductList = async (queryType: string, queryValues: string) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/api/product/list?queryType=${queryType}&queryValues=${queryValues}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error in services/products/GetProductList");
        return { error: error };
    }
};