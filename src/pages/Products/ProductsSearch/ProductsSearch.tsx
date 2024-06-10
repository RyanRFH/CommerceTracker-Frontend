import React, { useEffect, useState } from 'react';
import Search from "../../../components/Search/Search"
import { GetProductQuery } from "../../../services/ProductServices";



const ProductsSearch = () => {

    console.log("Test");

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



    return (
        <div className='h-full'>
            <Search searchType="products" searchResults={searchResults}></Search>

        </div>
    );
};

export default ProductsSearch;