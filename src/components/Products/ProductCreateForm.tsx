import React from 'react';

const ProductCreateForm = (props: any) => {

    return (
        <div className="p-4 rounded-lg min-w-[350px] bg-gray-50 border-4">
            <div className='flex justify-between'>
                <h1>Add a new product</h1>
                <button onClick={props.closeModalFunc} className='bg-gray-200 py-[5px] px-[12px] rounded-lg'>X</button>
            </div>

            <div>
                <label className="text-gray-600 text-sm">
                    Name
                </label>
                <div className="relative mt-2 max-w-xs">
                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2"></div>
                    <input placeholder="Enter a name" className="w-full pl-[10px] py-[10px] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
                </div>
            </div>

            <div>
                <label className="text-gray-600 text-sm">
                    Description
                </label>
                <div className="relative mt-2 max-w-xs">
                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2"></div>
                    <input placeholder="Enter a description" className="w-full pl-[10px] py-[10px] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
                </div>
            </div>

            <div>
                <label className="text-gray-600 text-sm">
                    Quantity
                </label>
                <div className="relative mt-2 max-w-xs">
                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2"></div>
                    <input type='number' placeholder="Enter a quantity" className="w-full pl-[10px] py-[10px] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
                </div>
            </div>

            <div>
                <label className="text-gray-600 text-sm">
                    Price
                </label>
                <div className="relative mt-2 max-w-xs">
                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2"></div>
                    <input type='number' placeholder="Enter a price" className="w-full pl-[10px] py-[10px] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
                </div>
            </div>

            <div>
                <label className="text-gray-600 text-sm">
                    Image URL
                </label>
                <div className="relative mt-2 max-w-xs">
                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2"></div>
                    <input placeholder="Enter an image URL" className="w-full pl-[10px] py-[10px] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
                </div>
            </div>

        </div>
    );
};

export default ProductCreateForm;