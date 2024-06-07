import React, { useState } from 'react';
import { getCookie } from '../../common/Cookies/cookies';
import { GetProductSingle } from '../../services/ProductServices';
import BasketResults from '../../components/Basket/BasketResults';

const Basket = () => {

    const [productsList, setProductsList] = useState();

    const getBasketData = () => {

        const cookies = getCookie("basket");

        if (typeof cookies === "string") {
            return cookies.split(",");
        }

        return { error: "Error in getBasketData" };

    };

    const getProduct = async () => {
        let cookiesArray = getBasketData();

        // console.log("cookiesarray = ", cookiesArray);

        if ('error' in cookiesArray) {
            return;
        }

        if (cookiesArray.length === 0) {
            return { error: "No cookies found" };
        }

        try {
            const product = await GetProductSingle("productid", cookiesArray[0]);
            console.log(product);

            if (!product?.productsList?.$values?.[0]) {
                console.log({ error: "Product not found" });
                return { error: "Product not found" };
            };

            setProductsList(product.productsList.$values[0]);
            return true;

        } catch (error) {
            console.log(error);
            return { error: error };
        };
    };

    if (!productsList) {
        getProduct();
    }

    // console.log(productsList);

    return (
        <div>
            {productsList && <BasketResults productsList={productsList} />}

        </div>
    );
};

export default Basket;