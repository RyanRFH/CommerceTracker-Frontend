import React, { useEffect, useState } from 'react';
import { deleteCookie, getCookie } from '../../common/Cookies/cookies';
import { GetProductList } from '../../services/ProductServices';
import BasketResults from '../../components/Basket/BasketResults';
import { removeFromBasket } from '../../services/BasketService';
import { Button } from '@mui/joy';

const Basket = () => {

    const [productsList, setProductsList] = useState(Array<Object>);
    const [totalPrice, setTotalPrice] = useState(Number);

    const [errorMessage, setErrorMessage] = useState("");

    const onClickRemoveFromBasketHandler = (productid: string) => {
        removeFromBasket(productid);
        getProduct();
    };

    useEffect(() => {
        getProduct();
    }, []);


    const getProduct = async () => {

        const cookiesString = getCookie("basket");

        if (typeof cookiesString !== "string") {
            console.log("Cookie not found");
            setProductsList([]);
            setTotalPrice(0);
            return "Error in cookies";
        }

        if (cookiesString.length === 0) {
            setProductsList([]);
            setTotalPrice(0);
            return { error: "No cookies found" };
        }

        try {
            const products = await GetProductList("productid", cookiesString);

            console.log("products = ", products);

            if (products.error) {
                console.log("Product not found");
                setErrorMessage("Invalid basket, please add items again");
                deleteCookie("basket");
                return { error: products.error };
            };

            setProductsList(products.$values);
            let totalPriceTemp = 0;
            products.$values?.map((product: any, index: any) => {
                totalPriceTemp += product.price;

            });
            setTotalPrice(totalPriceTemp);
            return true;

        } catch (error) {
            console.log(error);
            return { error: error };
        };
    };


    console.log(productsList);

    return (
        <div>
            <div className='fixed right-0 bg-neutral-200 w-[200px] h-[300px] z-[100] rounded-2xl'>
                <div className='ml-[20px] mt-[20px]'>
                    <p>{`Items: ${productsList?.length}`} </p>
                    <p>{`Total Price: £${totalPrice.toFixed(2)}`} </p>
                </div>

                <div className='h-[70%] flex items-end justify-center'>
                    <Button className=''>Create Order</Button>
                </div>


            </div>

            <BasketResults productsList={productsList} updateBasketCallback={onClickRemoveFromBasketHandler} />

            <div className='flex justify-center'>
                {errorMessage && <p>{errorMessage}</p>}
            </div>

        </div>
    );
};

export default Basket;