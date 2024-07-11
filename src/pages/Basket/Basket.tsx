import React, { useEffect, useMemo, useState } from 'react';
import BasketResults from '../../components/Basket/BasketResults';
import { GetBasket, RemoveFromBasket, UpdateBasketItemQuantity } from '../../services/BasketService';
import { Button } from '@mui/joy';

const Basket = () => {

    enum pageStates {
        loading = "loading",
        updating = "updating",
        ready = "ready"
    }

    const [productsList, setProductsList] = useState(Array<any>);
    const [totalPrice, setTotalPrice] = useState(Number);
    const [errorMessage, setErrorMessage] = useState("");
    const [pageState, setPageState] = useState(pageStates.loading);

    const onClickRemoveFromBasketHandler = async (baketItemId: string) => {
        setPageState(pageStates.updating)
        await RemoveFromBasket(baketItemId);
        await retrieveBasket();
        calculateTotalPrice();
    };

    const decreaseBasketItemQuantity = async (basketItemId: string, currentQuantity: number) => {
        setPageState(pageStates.updating);
        if (currentQuantity < 1) {
            setPageState(pageStates.ready);
            return;
        }
        await UpdateBasketItemQuantity(basketItemId, currentQuantity - 1);
        await retrieveBasket();
        setPageState(pageStates.ready);
    };

    const increaseBasketItemQuantity = async (basketItemId: string, currentQuantity: number) => {
        setPageState(pageStates.updating);
        await UpdateBasketItemQuantity(basketItemId, currentQuantity + 1);
        await retrieveBasket();
        setPageState(pageStates.ready);
    };


    useEffect(() => {
        retrieveBasket();
    }, []);

    useEffect(() => {
        calculateTotalPrice();
    }, [productsList]);

    const retrieveBasket = async () => {
        const newBasket = await GetBasket();

        if (newBasket?.error === true) {
            setErrorMessage("Basket not found");
            console.log("Basket not found");
            return;
        }
        setProductsList(newBasket.message.basketItems.$values);
        setPageState(pageStates.ready);

    };

    const calculateTotalPrice = async () => {
        let tempTotalPrice = 0;

        productsList.map((product: any, index: number) => {
            return (
                tempTotalPrice += product?.product.price * product?.quantity
            )
        })
        setTotalPrice(tempTotalPrice);
    };

    return (
        <div>
            <div>
                <div className='fixed text-sm right-0 bg-neutral-200 w-[250px] h-[200px] z-[100] mr-[10px] rounded-2xl pb-[30px]'>
                    <div className='items-center justify-center ml-[20px] mt-[20px] h-[50%]'>
                        <p>{`Items: ${productsList?.length}`} </p>
                        <p>{`Total Price: £${totalPrice.toFixed(2)}`} </p>
                    </div>
                    <div className='mt-[30px] flex flex-col items-center justify-end'>
                        <Button className='h-auto'>Create Order</Button>
                    </div>
                </div>

                <BasketResults
                    productsList={productsList}
                    updateBasketCallback={onClickRemoveFromBasketHandler}
                    decreaseBasketItemQuantityCallback={decreaseBasketItemQuantity}
                    increaseBasketItemQuantityCallback={increaseBasketItemQuantity}
                    pageState={pageState}
                />

                <div className='flex justify-center'>
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            </div>




        </div>
    );
};

export default Basket;