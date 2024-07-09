import React, { useState } from 'react';
import { CreateProduct } from '../../services/ProductServices';
import { Product } from "../../Dtos/Products/CreateProductDto";
import { text } from 'stream/consumers';

const ProductCreateForm = (props: any) => {

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImageUrl, setProductImageUrl] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const createProductSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!productName || !productDescription || !productQuantity || !productPrice || !productImageUrl) {
            setErrorMessage("All fields are required");
            return;
        }
        const product: Product = {
            name: productName,
            description: productDescription,
            quantity: productQuantity,
            price: productPrice,
            imageUrl: productImageUrl
        }

        const res = await CreateProduct(product);

        if (res.errors) {
            console.log("Error: ", res.errors);
            setErrorMessage("An error occurred");
            return;
        }

        if (res.error) {
            if (res.reason === "Unauthorized") {
                setErrorMessage("Only admins can create products");
                return;
            }
            if (res.reason === "Forbidden") {
                setErrorMessage("Only admins can create products, you are on a User account");
                return;
            }

            console.log("Error: ", res.error);
            setErrorMessage("An error occurred");
            return;
        }

        setErrorMessage("Product created");
        return;

    };

    return (
        <div className="p-4 rounded-lg min-w-[300px] md:min-w-[375px] bg-gray-50 border-4">
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
                    <input onChange={(e) => setProductName(e.target.value)} placeholder="Enter a name" className="w-full pl-[10px] py-[10px] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
                </div>
            </div>

            <div>
                <label className="text-gray-600 text-sm">
                    Description
                </label>
                <div className="relative mt-2 max-w-xs">
                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2"></div>
                    <input onChange={(e) => setProductDescription(e.target.value)} placeholder="Enter a description" className="w-full pl-[10px] py-[10px] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
                </div>
            </div>

            <div>
                <label className="text-gray-600 text-sm">
                    Quantity
                </label>
                <div className="relative mt-2 max-w-xs">
                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2"></div>
                    <input onChange={(e) => setProductQuantity(e.target.value)} type='number' placeholder="Enter a quantity" className="w-full pl-[10px] py-[10px] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
                </div>
            </div>

            <div>
                <label className="text-gray-600 text-sm">
                    Price
                </label>
                <div className="relative mt-2 max-w-xs">
                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2"></div>
                    <input onChange={(e) => setProductPrice(e.target.value)} type='number' placeholder="Enter a price" className="w-full pl-[10px] py-[10px] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
                </div>
            </div>

            <div>
                <label className="text-gray-600 text-sm">
                    Image URL
                </label>
                <div className="relative mt-2 max-w-xs">
                    <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2"></div>
                    <input onChange={(e) => setProductImageUrl(e.target.value)} placeholder="Enter an image URL" className="w-full pl-[10px] py-[10px] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
                </div>
            </div>

            <div className='flex items-center mt-[10px]'>
                <button onClick={(e) => createProductSubmitHandler(e)} className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                    Submit
                </button>
                <p className={`${errorMessage === "Product created" && "text-green-500"} ml-[10px] text-red-500`}>
                    {errorMessage}
                </p>
            </div>

        </div>
    );
};

export default ProductCreateForm;