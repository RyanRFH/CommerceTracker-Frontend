
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
        console.log("Error in services/products/products");
        return { error: error };
    }
}