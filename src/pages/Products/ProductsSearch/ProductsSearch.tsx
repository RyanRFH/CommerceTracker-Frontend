import React, { useEffect, useState } from 'react';
import Search from "../../../components/Search/Search"
import { GetProductQuery } from "../../../services/ProductServices";



const ProductsSearch = () => {

    useEffect(() => {
        const interval = setInterval(() => reloadPage(), 900000);
        return () => clearInterval(interval);
    }, []);

    console.log("Test");

    //Reload page every 15 minutes
    const reloadPage = () => {
        window.location.reload();
    };


    const getProductsByQuery = async () => {
        const searchResults = await GetProductQuery(searchParamsDto);
        setSearchResults(searchResults);
    };
    const [searchResults, setSearchResults] = useState();

    //Get url params and send them to the product service for API calling
    const searchParams = new URLSearchParams(document.location.search);
    let searchParamsDto: Array<string> = [];
    searchParams.forEach((value, key) => { searchParamsDto.push(key); searchParamsDto.push(value) });

    if (!searchResults) {
        getProductsByQuery();
    };



    return (
        <div>
            <Search searchType="products" searchResults={searchResults}></Search>
        </div>
    );
};

export default ProductsSearch;