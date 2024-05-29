import React, { useEffect, useState } from 'react';
// import Select from 'react-select';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';


//Params finished, do page selection next, then create product button

interface SearchProps {
    searchType: string;
}

const SearchBar = (props: SearchProps) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [productIdParam, setProductIdParam] = useState(String);
    const [minQuantityParam, setMinQuantityParam] = useState(String);
    const [maxPriceParam, setMaxPriceParam] = useState(String);
    const [oldestCreationDateParam, setOldestCreationDateParam] = useState("");
    const [isDescendingParam, setIsDescendingParam] = useState(false);
    const [sortByParam, setSortByParam] = useState("Name");

    useEffect(() => {
        const searchParamsRaw = new URLSearchParams(document.location.search);
        let searchParams = {
            nameParam: searchParamsRaw.get("name"),
            productId: searchParamsRaw.get("productid"),
            quantity: searchParamsRaw.get("quantity"),
            price: searchParamsRaw.get("price"),
            date: searchParamsRaw.get("createdat"),
            isdescending: searchParamsRaw.get("isdescending"),
            sortby: searchParamsRaw.get("sortby")
        };

        if (searchParams.nameParam) {
            setSearchQuery(searchParams.nameParam);
        }
        if (searchParams.productId) {
            setProductIdParam(searchParams.productId);
        }
        if (searchParams.quantity) {
            setMinQuantityParam(searchParams.quantity);
        }
        if (searchParams.price) {
            setMaxPriceParam(searchParams.price);
        }
        if (searchParams.date) {
            setOldestCreationDateParam(searchParams.date);
        }
        if (searchParams.isdescending) {
            if (searchParams.isdescending === "true") {
                setIsDescendingParam(true);
            } else if (searchParams.isdescending === "false") {
                setIsDescendingParam(false);
            }
        }
        if (searchParams.sortby) {
            setSortByParam(searchParams.sortby);
        }
    }, []);


    // let searchParamsDto: Array<string> = [];
    // searchParams.forEach((value, key) => { searchParamsDto.push(key); searchParamsDto.push(value) });

    const onSearchSubmitHandler = (event: any) => {
        event.preventDefault();

        //Build URL, adding each search param
        let urlWithSearchParams = `${process.env.REACT_APP_LOCAL_URL}/${props.searchType}?name=${searchQuery}`;

        if (sortByParam) {
            urlWithSearchParams = urlWithSearchParams + `&sortby=${sortByParam}`;
        }
        if (productIdParam) {
            urlWithSearchParams = urlWithSearchParams + `&productid=${productIdParam}`;
        }
        if (minQuantityParam) {
            urlWithSearchParams = urlWithSearchParams + `&quantity=${minQuantityParam}`;
        }
        if (maxPriceParam) {
            urlWithSearchParams = urlWithSearchParams + `&price=${maxPriceParam}`;
        }
        if (oldestCreationDateParam) {
            urlWithSearchParams = urlWithSearchParams + `&createdat=${oldestCreationDateParam}`;
        }

        urlWithSearchParams = urlWithSearchParams + `&isdescending=${isDescendingParam}`;

        window.location.href = urlWithSearchParams;
    };

    const onSortBySubmitHandler = (event: React.SyntheticEvent | null, newSortByValue: string | null) => {
        if (newSortByValue) {
            setSortByParam(newSortByValue);
        }
    }

    const onMaximumAgeSubmitHandler = (event: any) => {
        // let dateinMS
        // let calculatedDateInMS
        // if (event.target.value) {
        //     dateinMS = Number.parseInt(event.target.value) * 24 * 60 * 60 * 1000;
        //     calculatedDateInMS = Date.now() - dateinMS;
        // }

        // let parsedDate
        // if (calculatedDateInMS) {
        //     parsedDate = new Date(calculatedDateInMS).toISOString()
        // }
        // if (parsedDate) {
        //     setOldestCreationDateParam(parsedDate.toString());
        // }
        setOldestCreationDateParam(event.target.value);

    }

    return (
        <div className=''>
            <div className="max-w-2xl mx-auto mt-[25px]">
                <form onSubmit={onSearchSubmitHandler}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input onChange={(event) => { setSearchQuery(event.target.value) }} value={searchQuery} type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here to search" />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {/* Param selectors */}
            <div className='flex justify-center'>
                <div className='flex flex-wrap items-center justify-center mt-[10px] bg-slate-100 py-[10px] px-[20px] rounded-2xl'>

                    <div className='w-[150px]'>
                        <p className=''>Sort order</p>
                        <Select onChange={() => setIsDescendingParam(!isDescendingParam)} className='' defaultValue="Ascending" value={isDescendingParam ? "Descending" : "Ascending"} variant='outlined'>
                            <Option value="Ascending">Ascending</Option>
                            <Option value="Descending">Descending</Option>
                        </Select>
                    </div>

                    <div className='w-[150px] ml-[30px]'>
                        <p className=''>Sort by</p>
                        <Select onChange={onSortBySubmitHandler} className='' defaultValue="Name" value={sortByParam} variant='outlined'>
                            <Option value="Name">Name</Option>
                            <Option value="Price">Price</Option>
                            <Option value="Quantity">Quantity</Option>
                            <Option value="CreationDate">Creation Date</Option>
                        </Select>
                    </div>

                    <div className='w-[250px] ml-[30px]'>
                        <p>Minimum Quantity</p>
                        <Input type='number' onChange={(e) => setMinQuantityParam(e.target.value)} value={minQuantityParam} placeholder="Enter a number" />
                    </div>


                    <div className='w-[250px] ml-[30px]'>
                        <p>Maximum Price</p>
                        <Input type='number' onChange={(e) => setMaxPriceParam(e.target.value)} value={maxPriceParam} placeholder="Enter a number" />
                    </div>


                    <div className='w-[250px] ml-[30px]'>
                        <p>Maximum Age</p>
                        <Input type='number' onChange={onMaximumAgeSubmitHandler} value={oldestCreationDateParam} placeholder="Enter a number of days ago" />
                    </div>

                    <div className='w-[250px] ml-[30px]'>
                        <p>ID</p>
                        <Input onChange={(e) => setProductIdParam(e.target.value)} value={productIdParam} placeholder="Enter an ID" />
                    </div>

                </div>
            </div>

        </div>
    );
};

export default SearchBar;