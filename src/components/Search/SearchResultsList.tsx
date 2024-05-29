import React from 'react';

const SearchResultsList = (props: any) => {

    let searchResultsArray = [];
    searchResultsArray = props.searchResults?.$values;

    let searchType: string = props.searchType;

    return (
        <div className='flex flex-col flex-wrap'>
            <div className="bg-white p-8 rounded-md">
                <div className="flex items-center justify-between pb-6">
                    <div>
                        <h2 className="text-gray-600 font-semibold">{searchType.charAt(0).toUpperCase() + searchType.slice(1)}</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="lg:ml-40 ml-10 space-x-8">
                            <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr className='h-14 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b-2'>
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
                                            <tr key={index}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-[150px]">
                                                            <img className="w-full h-full"
                                                                src={product.imageUrl}
                                                                alt="product"
                                                            />
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-gray-900 whitespace-no-wrap">
                                                                <p className='text-[30px]'>
                                                                    {product.name}
                                                                </p>
                                                                <p className='text text-slate-400 mt-[10px]'>
                                                                    {product.productId}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {product.description}
                                                    </p>
                                                </td>
                                                <td className="border-b border-gray-200 text-sm bg-white">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {product.quantity}
                                                    </p>
                                                </td>
                                                <td className="border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        £{product.price}
                                                    </p>
                                                </td>
                                                <td className="border-b border-gray-200 bg-white text-sm">
                                                    <span
                                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                        <span aria-hidden
                                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
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
                                    Showing 1 to 4 of 50 Entries
                                </span>
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                        Prev
                                    </button>
                                    &nbsp; &nbsp;
                                    <button
                                        className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
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