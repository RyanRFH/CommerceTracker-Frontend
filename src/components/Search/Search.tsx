import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";

// interface SearchProps {
//     searchType: string;
//     searchResults: Object;
// }

const SearchPage = (props: any) => {
    const [errorFlag, setErrorFlag] = useState(false);

    useEffect(() => {
        if (props.searchResults?.error) {
            setErrorFlag(true);
        }

    }, [props]);

    return (
        <div className="h-full">
            <SearchBar searchType={props.searchType} />
            <div className={`${errorFlag && "hidden"} h-full`}>
                {!props.searchResults?.$id ?
                    <div className="text-center h-full">
                        <img className="mx-auto" width="400px" alt="loadinggif" src="https://loading.io/assets/mod/spinner/spinner/lg.gif" />
                        Loading...
                        (May take up to 90 seconds)
                        (Azure free tier)
                    </div >
                    :
                    <SearchResultsList searchResults={props.searchResults} searchType={props.searchType} />
                }
            </div>
            <div className={`justify-center mt-[30px] text-[20px] ${errorFlag ? "flex" : "hidden"} `}>
                An error occurred while fetching the product data. Sorry!
            </div>

        </div>
    );
};

export default SearchPage;