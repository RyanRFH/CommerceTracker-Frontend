import { getCookie } from "../common/Cookies/cookies";

export const createProducts = async () => {

    // FOR FILLING THE PRODUCTS DATABASE WITH PRODUCTS USING DUMMY DATA

    // let data;
    // try {
    //     const res = await fetch('https://dummyjson.com/products', {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" }
    //     });
    //     data = await res.json();
    //     console.log(data.products);

    // } catch (error) {
    //     console.log("Error in testing/productstesting");
    //     return { error: error };
    // }

    // //Manually increment to add each product (individually)
    // let prodNum = 0;

    // let jwt = getCookie("login-jwt");
    // try {
    //     const res: any = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/api/product`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${jwt}`
    //         },
    //         body: JSON.stringify({
    //             name: `${data.products[prodNum].title}`,
    //             description: `${data.products[prodNum].description}`,
    //             quantity: `${data.products[prodNum].stock}`,
    //             price: `${data.products[prodNum].price}`,
    //             imageUrl: `${data.products[prodNum].images[0]}`,
    //         })
    //     });
    //     data = await res.json();
    //     console.log(data);
    //     return data;

    // } catch (error) {
    //     console.log("Error in testing/productstesting");
    //     return { error: error };
    // }





}