import React, { useEffect, useState } from 'react';
import { getCookie } from '../../common/Cookies/cookies';
import { GetProductList } from '../../services/ProductServices';
import BasketResults from '../../components/Basket/BasketResults';
import { removeFromBasket } from '../../services/BasketService';

const Basket = () => {

    const [productsList, setProductsList] = useState(Array<Object>);

    const onClickRemoveFromBasketHandler = (productid: string) => {
        removeFromBasket(productid);
        getProduct();
    };


    const getProduct = async () => {

        const cookiesString = getCookie("basket");

        if (typeof cookiesString !== "string") {
            console.log("Cookie not found");
            setProductsList([{}]);
            return "Error in cookies";
        }

        if (cookiesString.length === 0) {
            return { error: "No cookies found" };
        }

        try {
            const products = await GetProductList("productid", cookiesString);

            if (products.error) {
                console.log({ error: "Product not found" });
                return { error: products.error };
            };

            setProductsList(products.$values);
            return true;

        } catch (error) {
            console.log(error);
            return { error: error };
        };
    };

    if (productsList.length === 0) {
        getProduct();
    }

    return (
        <div>
            <BasketResults productsList={productsList} updateBasketCallback={onClickRemoveFromBasketHandler} />
        </div>
    );
};

export default Basket;