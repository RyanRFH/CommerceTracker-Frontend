import { Button } from '@mui/joy';
import React, { useEffect, useState } from 'react';

const BasketResults = (props: any) => {

    enum pageStates {
        loading = "loading",
        updating = "updating",
        ready = "ready"
    }

    // const pageState = props.pageState;
    const [pageState, setPageState] = useState(props.pageState);

    const onClickRemoveFromBasketHandler = (productid: string) => {
        props.updateBasketCallback(productid);
    };

    const onClickDecreaseBasketItemQuantity = async (basketItemId: string, currentQuantity: number) => {
        if (currentQuantity < 1) {
            return;
        }
        await props.decreaseBasketItemQuantityCallback(basketItemId, currentQuantity);
    };

    const onClickIncreaseBasketItemQuantity = (basketItemId: string, currentQuantity: number, productMaxQuantity: number) => {
        if (currentQuantity + 1 > productMaxQuantity) {
            return;
        }
        props.increaseBasketItemQuantityCallback(basketItemId, currentQuantity);
    };

    useEffect(() => {
        setPageState(props.pageState);
    }, [props]);

    return (
        <div className='flex flex-col flex-wrap h-full mt-[30px]'>
            <div className="flex flex-col bg-white p-2 rounded-md w-full h-full">
                <div className='h-full w-full'>
                    <div>
                        <h2 className="text-gray-600 font-semibold text-2xl ml-[50px]">Basket</h2>
                    </div>
                    <div className='flex items-center justify-center'>
                        {props?.productsList.length === 0 && <p className='text-3xl mt-[30px]'>No items in basket</p>}
                    </div>

                    <div className="px-4 sm:px-8 py-4 overflow-x-auto h-full">

                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden h-full">

                            <table className="w-full leading-normal h-full">
                                <thead>
                                    <tr className='hidden h-14 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2'>
                                        <th className="pl-1">Name/ID</th>
                                        <th className="pl-1">Description</th>
                                        <th className="pl-1">Quantity</th>
                                        <th className="pl-1">Price</th>
                                        <th className="pl-1">Date Added</th>
                                    </tr>
                                </thead>
                                <tbody className='flex flex-col h-full'>
                                    {props?.productsList.length !== 0 && props.productsList.map((product: any, index: number) => {
                                        return (
                                            <tr className='flex flex-col md:flex-row md:w-[80%] items-center border-b h-full' key={index}>
                                                <td className="border-gray-200 bg-white text-sm leading-8 w-full md:w-1/2 h-full flex items-center justify-center">
                                                    <div className="flex flex-col items-center w-full">
                                                        <div className="">
                                                            <img className="max-w-[200px] md:max-w-[200px] max-h-[200px] md:max-h-[200px]"
                                                                src={product.product.imageUrl}
                                                                alt="product"
                                                            />
                                                        </div>
                                                        <div className="md:ml-3 w-full mb-[50px]">
                                                            <div className="flex items-center flex-col text-gray-900 whitespace-no-wrap">
                                                                <p className='text-[15px] md:text-[30px]'>
                                                                    {product.product.name}
                                                                </p>
                                                                <p className='text-[10px] md:text-[20px] text-slate-400 md:mt-[10px]'>
                                                                    {product.product.productId}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className="flex flex-col items-center md:w-1/2 text-center border-gray-200 bg-white mb-[10px] mx-[10px]">
                                                    <p className="text-gray-600 whitespace-no-wrap">
                                                        {product.product.description}
                                                    </p>

                                                    <p className="text-gray-900 whitespace-no-wrap mb-[10px]">
                                                        Quantity: {product.product.quantity}
                                                    </p>
                                                    <p className="text-gray-900 whitespace-no-wrap mb-[10px]">
                                                        £{product.product.price}
                                                    </p>
                                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight z-[0] mb-[20px]">
                                                        <span aria-hidden
                                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                                        </span>
                                                        <span className="relative">
                                                            {(((Date.now() - Date.parse(product.product.createdAt)) / 1000 / 60 / 60) / 24).toFixed()} days ago
                                                        </span>
                                                    </span>
                                                    {pageState === pageStates.ready
                                                        ?
                                                        <Button onClick={() => onClickRemoveFromBasketHandler(product.basketItemId)} className=''>Remove from basket</Button>
                                                        :
                                                        <Button disabled className=''>Remove from basket</Button>
                                                    }


                                                </td>
                                                <td>
                                                    <div className="custom-number-input h-10 w-32 text-center">
                                                        <label className="w-full text-gray-700 text-sm font-semibold">Quantity
                                                        </label>
                                                        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">

                                                            {pageState !== pageStates.ready || product.quantity < 1
                                                                ?
                                                                <div>
                                                                    < button disabled data-action="decrement" className="opacity-50 bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l">
                                                                        <span className="m-auto text-2xl font-thin">-</span>
                                                                    </button>
                                                                </div>
                                                                :
                                                                <div>
                                                                    < button onClick={() => onClickDecreaseBasketItemQuantity(product.basketItemId, product.quantity)} data-action="decrement" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l">
                                                                        <span className="m-auto text-2xl font-thin">-</span>
                                                                    </button>
                                                                </div>
                                                            }

                                                            <div className={`flex px-[10px] items-center justify-center ${pageState === pageStates.updating && "opacity-50"} outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default text-gray-700`}>{product.quantity}</div>

                                                            {pageState !== pageStates.ready || product.quantity >= product.product.quantity
                                                                ?

                                                                <div>
                                                                    < button disabled data-action="increment" className="opacity-50 bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r">
                                                                        <span className="m-auto text-2xl font-thin">+</span>
                                                                    </button>
                                                                </div>
                                                                :

                                                                <div>
                                                                    < button onClick={() => onClickIncreaseBasketItemQuantity(product.basketItemId, product.quantity, product.product.quantity)} data-action="increment" className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r">
                                                                        <span className="m-auto text-2xl font-thin">+</span>
                                                                    </button>
                                                                </div>
                                                            }

                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default BasketResults;