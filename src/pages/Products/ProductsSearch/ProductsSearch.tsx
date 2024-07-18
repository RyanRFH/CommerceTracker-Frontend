import React, { useEffect, useState } from 'react';
import Search from "../../../components/Search/Search"
import { DeleteProduct, GetProductQuery } from "../../../services/ProductServices";
import { Button } from '@mui/joy';



const ProductsSearch = () => {

    console.log("Products Page Working");

    const [searchResults, setSearchResults] = useState();
    const getProductsByQuery = async () => {
        const searchResults = await GetProductQuery(searchParamsDto);
        setSearchResults(searchResults);
    };


    //Get url params and send them to the product service for API calling
    const searchParams = new URLSearchParams(document.location.search);
    let searchParamsDto: Array<string> = [];
    searchParams.forEach((value, key) => { searchParamsDto.push(key); searchParamsDto.push(value) });

    if (!searchResults) {
        getProductsByQuery();
    };

    const deleteProduct = async (productId: string) => {
        let response = await DeleteProduct(productId);
        getProductsByQuery();
        return response;
    };



    return (
        <div className='h-full'>
            <div className='fixed text-sm right-[10px] top-[400px] bg-neutral-200 w-[170px] h-[80px] z-[100] rounded-2xl items-center justify-center flex'>
                <div className='items-center justify-center text-xl'>
                    <a className='h-full' href='/basket'>
                        <Button>


                            <img className='max-w-[20px] md:max-w-[35px] mr-[10px]' src='https://icons.veryicon.com/png/o/system/dan_system/shopping-basket-11.png' />

                            Basket
                        </Button>

                    </a>
                </div>

            </div>
            <Search searchType="products" searchResults={searchResults} deleteProductCallBack={deleteProduct}></Search>

        </div>
    );
};

export default ProductsSearch;