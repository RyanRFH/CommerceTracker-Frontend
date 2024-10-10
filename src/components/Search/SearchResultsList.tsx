import React, { FormEvent, RefObject, useEffect, useRef, useState } from 'react';
import ProductCreateForm from '../Products/ProductCreateForm';
import { Button, Tooltip } from '@mui/joy';
import { AddToBasket } from '../../services/BasketService';
import { getUser, loginUser } from '../../services/AccountServices';
import { DeleteProduct } from '../../services/ProductServices';
// import { getCookie } from '../../common/Cookies/cookies';
import SearchResultsItem from './SearchResultsListItem';
import SearchResultsListItem from './SearchResultsListItem';


const SearchResultsList = (props: any) => {

    useEffect(() => {
        getUserDetails();
        const interval = setInterval(() => setProductAddedMessageState("hidden"), 5000);
        return () => clearInterval(interval);
    }, []);

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


    const [userDetails, setUserDetails] = useState(Object);

    const getUserDetails = async () => {
        const user = await getUser();

        if (user.error) {
            setUserDetails(null);
            return;
        }
        if (user) {
            setUserDetails(user);
        }
    }

    const loginAsGuestAdminSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const response = await loginUser("GuestAdmin", "Qwertyuiop123!");

        window.location.href = `/products`;
    };

    const [productAddedMessage, setProductAddedMessage] = useState(`Item added to basket`);
    const [productAdded, setProductAdded] = useState("");
    let [productAddedMessageState, setProductAddedMessageState] = useState("hidden"); //fixed or hidden
    const [addProductButtonState, setAddProductButtonState] = useState(true);

    const addItemToBasketClickHandler = async (productId: string, productName: string) => {
        setAddProductButtonState(false);

        let response = await AddToBasket(productId);

        if (response.error || !response.success) {
            setProductAdded(`${productName}`);
            setProductAddedMessage(`error in adding to basket`);
            setProductAddedMessageState("fixed");
            return;
        }

        setProductAdded(`${productName}`);
        setProductAddedMessage(`added to basket`);
        setProductAddedMessageState("fixed");

        setAddProductButtonState(true);

    };

    const deleteProductClickHandler = async (productId: string, productName: string) => {

        setAddProductButtonState(false);

        let userRes = window.confirm(`Delete ${productName}?`);
        if (userRes === false) {
            setAddProductButtonState(true);
            return;
        }

        let response = await props.deleteProductCallBack(productId);



        if (response.error || !response.success) {
            setProductAdded(`${productName}`);
            setProductAddedMessage(`error in deleting product`);
            setProductAddedMessageState("fixed");
            return;
        };

        setProductAdded(`${productName}`);
        setProductAddedMessage(`deleted`);
        setProductAddedMessageState("fixed");

        setAddProductButtonState(true);
    }

    const nextPageSubmitHandler = () => {
        if (pageNumber + 1 > totalPageCount) {
            return;
        }
        const pageUrl = new URLSearchParams(document.location.search);
        pageUrl.set("pagenumber", `${(pageNumber + 1)}`);
        window.location.href = `/products?${pageUrl}`;
    };

    const previousPageSubmitHandler = () => {
        if (pageNumber - 1 < 1) {
            return;
        }
        const pageUrl = new URLSearchParams(document.location.search);
        pageUrl.set("pagenumber", `${(pageNumber - 1)}`);
        window.location.href = `/products?${pageUrl}`;
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeCreateProductModalCallback = () => {
        setIsModalOpen(false);
    };

    //Close create product modal if user clicks anywhere on window
    let modal: RefObject<HTMLDivElement> = useRef(null);
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
        <div className='flex flex-col flex-wrap items-center h-full'>
            {userDetails?.role !== "Admin" &&
                <button onClick={loginAsGuestAdminSubmitHandler} className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-md py-2 px-4 w-[250px] mt-[10px]">Quick Sign in as Admin</button>}

            {productAddedMessage
                &&
                <div className={`${productAddedMessageState} right-[30px] top-[80px] text-xl z-10 bg-white w-[200px] min-h-[100px] border-2 text-center py-[15px]`}>
                    <p className='t text-gray-500'>{`${productAdded}`}</p>
                    <p >{`${productAddedMessage}`}</p>
                </div>
            }
            {/* <button className='bg-red-500 text-3xl' onClick={runProductDataFill}>CREATE FAKE PRODUCT (FOR TESTING)</button> */}
            <div className="flex flex-col items-center bg-white p-2 rounded-md w-full h-full">
                <div className="flex items-center w-[80%] justify-between pb-6 h-full">
                    <div>
                        <h2 className="text-gray-600 font-semibold">{searchType.charAt(0).toUpperCase() + searchType.slice(1)}</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        {userDetails?.role === "Admin" ?
                            <div className="lg:ml-40 ml-10 space-x-8 relative">
                                <button onClick={() => setIsModalOpen(!isModalOpen)} className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer hover:bg-indigo-700">
                                    Create
                                </button>
                                <div ref={modal} id='createProductModal' className={`${isModalOpen ? "flex" : "hidden"} absolute right-[0px] mt-[10px] z-10`}>
                                    <ProductCreateForm closeModalFunc={closeCreateProductModalCallback} />
                                </div>

                            </div>
                            :
                            <div className="lg:ml-40 ml-10 space-x-8 relative">
                                <Tooltip title="Requires admin account" arrow>
                                    <div>
                                        <div className="bg-indigo-600 pointer-events-none opacity-25 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer hover:bg-indigo-700">
                                            <p>Create</p>
                                        </div>
                                    </div>

                                </Tooltip>

                            </div>
                        }

                    </div>
                </div>

                <div className='h-full'>
                    <div className="px-4 sm:px-8 py-4 overflow-x-auto h-full">
                        <div className="flex flex-col items-center min-w-full shadow rounded-lg overflow-hidden h-full">
                            {searchResultsArray.length === 0 &&
                                <div className='mb-[30px]'>
                                    <p>No products found</p>
                                </div>
                            }
                            <table className="w-full leading-normal h-full">
                                <thead>
                                    {/* <tr className='hidden h-14 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2'>
                                        <th className="pl-1">Name/ID</th>
                                        <th className="pl-1">Description</th>
                                        <th className="pl-1">Quantity</th>
                                        <th className="pl-1">Price</th>
                                        <th className="pl-1">Date Added</th>
                                    </tr> */}
                                </thead>
                                <tbody className='flex flex-col items-center h-full'>
                                    {searchResultsArray && searchResultsArray.map((product: any, index: number) => {
                                        return (
                                            <tr className='flex flex-col md:flex-row md:w-[80%] items-center border-b h-full' key={index}>
                                                <SearchResultsListItem product={product} userDetails={userDetails} addItemToBasketClickHandler={addItemToBasketClickHandler} addProductButtonState={addProductButtonState} deleteProductClickHandler={deleteProductClickHandler} setAddProductButtonState={setAddProductButtonState} />
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