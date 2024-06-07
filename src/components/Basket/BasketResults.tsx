import React from 'react';

const BasketResults = (props: any) => {
    return (
        <div className='flex flex-col flex-wrap items-center h-full'>
            {/* <div className="flex flex-col items-center bg-white p-2 rounded-md w-full h-full">
                <div className='h-full'>
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
                                <tbody className='flex flex-col items-center h-full'>
                                    {searchResultsArray && searchResultsArray.map((product: any, index: number) => {
                                        return (
                                            <tr className='flex flex-col md:flex-row md:w-[80%] items-center border-b h-full' key={index}>
                                                <td className="border-gray-200 bg-white text-sm leading-8 w-full md:w-1/2 h-full flex items-center justify-center">
                                                    <div className="flex flex-col items-center w-full">
                                                        <div className="">
                                                            <img className="max-w-[200px] md:max-w-[200px] max-h-[200px] md:max-h-[200px]"
                                                                src={product.imageUrl}
                                                                alt="product"
                                                            />
                                                        </div>
                                                        <div className="md:ml-3 w-full mb-[50px]">
                                                            <div className="flex items-center flex-col text-gray-900 whitespace-no-wrap">
                                                                <p className='text-[15px] md:text-[30px]'>
                                                                    {product.name}
                                                                </p>
                                                                <p className='text-[10px] md:text-[20px] text-slate-400 md:mt-[10px]'>
                                                                    {product.productId}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="flex flex-col items-center md:w-1/2 text-center border-gray-200 bg-white mb-[10px] mx-[10px]">
                                                    <p className="text-gray-600 whitespace-no-wrap">
                                                        {product.description}
                                                    </p>

                                                    <p className="text-gray-900 whitespace-no-wrap mb-[10px]">
                                                        Quantity: {product.quantity}
                                                    </p>
                                                    <p className="text-gray-900 whitespace-no-wrap mb-[10px]">
                                                        £{product.price}
                                                    </p>
                                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight z-[0] mb-[20px]">
                                                        <span aria-hidden
                                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                                        </span>
                                                        <span className="relative">
                                                            {(((Date.now() - Date.parse(product.createdAt)) / 1000 / 60 / 60) / 24).toFixed()} days ago
                                                        </span>
                                                    </span>
                                                    <Button onClick={() => addToBasket(product.productId)} className=''>Add to basket</Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div
                                className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                                <span className="text-xs xs:text-sm text-gray-900">
                                    {`Showing ${pageNumberForDisplay * 20 + 1} to ${pageNumberForDisplay * 20 + 20 > totalProductCount ? totalProductCount : pageNumberForDisplay * 20 + 20} of ${totalProductCount} Entries`}
                                </span>
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                        onClick={previousPageSubmitHandler}
                                        className={`${pageNumber === 1 && "opacity-[50%]"} text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l`}>
                                        Prev
                                    </button>
                                    &nbsp; &nbsp;
                                    <button
                                        onClick={nextPageSubmitHandler}
                                        className={`${pageNumber === totalPageCount && "opacity-[50%]"} text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r`}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default BasketResults;