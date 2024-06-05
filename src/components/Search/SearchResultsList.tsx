import React, { LegacyRef, MutableRefObject, RefObject, useRef, useState } from 'react';
import { createProducts } from '../../Testing/ProductsTesting';
import { useLocation } from 'react-router-dom';
import ProductCreateForm from '../Products/ProductCreateForm';

const SearchResultsList = (props: any) => {

    let searchResultsArray = [];
    searchResultsArray = props.searchResults?.productsList.$values;

    let pageNumber: any;
    pageNumber = props.searchResults?.pageNumber;

    let pageNumberForDisplay;
    pageNumberForDisplay = props.searchResults?.pageNumber - 1;

    let totalProductCount = 0;
    totalProductCount = props.searchResults?.totalProductCount;

    let totalPageCount: any;
    totalPageCount = Math.ceil(totalProductCount / 20);

    let searchType: string = props.searchType;

    const nextPageSubmitHandler = () => {
        if (pageNumber + 1 > totalPageCount) {
            return;
        }
        const pageUrl = new URLSearchParams(document.location.search);
        pageUrl.set("pagenumber", `${(pageNumber + 1)}`);
        window.location.href = `http://localhost:3000/products?${pageUrl}`;
    };

    const previousPageSubmitHandler = () => {
        if (pageNumber - 1 < 1) {
            return;
        }
        const pageUrl = new URLSearchParams(document.location.search);
        pageUrl.set("pagenumber", `${(pageNumber - 1)}`);
        window.location.href = `http://localhost:3000/products?${pageUrl}`;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeCreateProductModalCallback = () => {
        setIsModalOpen(false);
    };


    let modal: RefObject<HTMLDivElement> = useRef(null);
    //Close create product modal if user clicks anywhere on window
    const handleOutsideClick = (e: MouseEvent) => {
        if (modal.current?.contains(e.target as Node)) {
            return;
        }
        setIsModalOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);

    //For adding fake products to the database for testing
    // const runProductDataFill = async () => {
    //     createProducts();
    // }


    return (
        <div className='flex flex-col flex-wrap items-center'>
            {/* <button className='bg-red-500 text-3xl' onClick={runProductDataFill}>CREATE FAKE PRODUCT (FOR TESTING)</button> */}
            <div className="bg-white p-2 rounded-md w-full md:w-[80%]">
                <div className="flex items-center justify-between pb-6">
                    <div>
                        <h2 className="text-gray-600 font-semibold">{searchType.charAt(0).toUpperCase() + searchType.slice(1)}</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="lg:ml-40 ml-10 space-x-8 relative">
                            <button onClick={() => setIsModalOpen(!isModalOpen)} className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                                Create
                            </button>
                            <div ref={modal} id='createProductModal' className={`${isModalOpen ? "flex" : "hidden"} absolute right-[0px] mt-[10px] z-10`}>
                                <ProductCreateForm closeModalFunc={closeCreateProductModalCallback} />
                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="max-w-full leading-normal">
                                <thead>
                                    <tr className='hidden h-14 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2'>
                                        <th className="pl-1">Name/ID</th>
                                        <th className="pl-1">Description</th>
                                        <th className="pl-1">Quantity</th>
                                        <th className="pl-1">Price</th>
                                        <th className="pl-1">Date Added</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResultsArray && searchResultsArray.map((product: any, index: number) => {
                                        return (
                                            <tr className='flex flex-col md:flex-row items-center mb-[30px] border-b' key={index}>
                                                <td className="md:px-5 md:py-5 border-gray-200 bg-white text-sm leading-8 w-full flex items-center justify-center">
                                                    <div className="flex items-center flex-col">
                                                        <div className="flex-shrink-0 max-w-[150px]">
                                                            <img className="max-w-[100px] md:max-w-[200px]"
                                                                src={product.imageUrl}
                                                                alt="product"
                                                            />
                                                        </div>
                                                        <div className="md:ml-3 w-full">
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
                                                <td className="flex flex-col items-center text-center border-gray-200 bg-white mb-[10px] mx-[10px]">
                                                    <p className="text-gray-600 whitespace-no-wrap">
                                                        {product.description}
                                                    </p>

                                                    <p className="text-gray-900 whitespace-no-wrap mb-[10px]">
                                                        Quantity: {product.quantity}
                                                    </p>
                                                    <p className="text-gray-900 whitespace-no-wrap mb-[10px]">
                                                        £{product.price}
                                                    </p>
                                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight z-[0]">
                                                        <span aria-hidden
                                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                                        </span>
                                                        <span className="relative">
                                                            {(((Date.now() - Date.parse(product.createdAt)) / 1000 / 60 / 60) / 24).toFixed()} days ago
                                                        </span>
                                                    </span>
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
            </div>
        </div>
    );
};

export default SearchResultsList;