import React, { useEffect, useRef, useState } from 'react';
import SaveIcon from '../../assets/save-file.png'
import EditIcon from '../../assets/edit-247.svg'
import { Button, Tooltip } from '@mui/joy';
import { UpdateProduct } from '../../services/ProductServices';
import { Product } from '../../Dtos/Products/CreateProductDto';

const SearchResultsListItem = (props: any) => {

    let product = props.product;
    let userDetails = props.userDetails;
    let addItemToBasketClickHandler = props.addItemToBasketClickHandler;
    let addProductButtonState = props.addProductButtonState;
    let deleteProductClickHandler = props.deleteProductClickHandler;
    let setAddProductButtonState = props.setAddProductButtonState;



    // const [productId, setProductId] = useState(String);
    // const [productName, setProductName] = useState(String);
    // const [productDescription, setProductDescription] = useState(String);
    // const [productQuantity, setProductQuantity] = useState(String);
    // const [productImage, setProductImage] = useState(String);

    const nameElement = useRef<HTMLDivElement | null>(null);
    const descriptionElement = useRef<HTMLDivElement | null>(null);
    const priceElement = useRef<HTMLDivElement | null>(null);
    const quantityElement = useRef<HTMLDivElement | null>(null);





    const [productDetailsChanged, setProductDetailsChanged] = useState(false);
    let [productDetailsSavedMessage, setProductDetailsSavedMessage] = useState("");

    const [editingProduct, setEditingProduct] = useState(false);


    console.log(productDetailsChanged);

    const setProductDetails = () => {
        setProductDetailsChanged(true);
        // let newProductQuantity = quantityElement?.current?.textContent;
        // if (newProductQuantity) {
        //     setProductQuantity(newProductQuantity);
        // };
    };


    const updateProductClicked = async () => {
        setProductDetailsSavedMessage("");
        setAddProductButtonState(false);

        const updatedProduct: Product = {
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            price: product.price,
            imageUrl: product.imageUrl
        };

        if (nameElement?.current?.textContent) {
            updatedProduct.name = nameElement?.current?.textContent;
        };
        if (descriptionElement?.current?.textContent) {
            updatedProduct.description = descriptionElement?.current?.textContent;
        };
        if (priceElement?.current?.textContent) {
            updatedProduct.price = priceElement?.current?.textContent;
        };
        if (quantityElement?.current?.textContent) {
            updatedProduct.quantity = quantityElement?.current?.textContent;
        };



        const updateProductRes = await UpdateProduct(product.productId, updatedProduct);

        if (updateProductRes?.success) {
            setProductDetailsSavedMessage("Product Updated");
            setProductDetailsChanged(false);
        } else {
            setProductDetailsSavedMessage("An error occurred");
        }
        setAddProductButtonState(true);



    };

    return (
        <>
            <td className="border-gray-200 bg-white text-sm leading-8 w-full md:w-1/2 h-full flex items-center justify-center">
                <div className="flex flex-col items-center w-full">
                    <div className="">
                        <img className="max-w-[200px] md:max-w-[200px] max-h-[200px] md:max-h-[200px]"
                            src={product.imageUrl}
                            alt="product"
                        />
                    </div>
                    <div className="md:ml-3 w-full mb-[50px]">

                        <div className="flex items-center flex-col text-gray-900 whitespace-no-wrap">
                            <p ref={nameElement} suppressContentEditableWarning={true} onInput={() => setProductDetails()} contentEditable={editingProduct} className={`text-[15px] md:text-[30px] ${editingProduct && "bg-gray-100 border-solid border-[1px] border-black p-[5px] ml-[5px]"} `}>
                                {product.name}
                            </p>
                            <p className='text-[10px] md:text-[20px] text-slate-400 md:mt-[10px]'>
                                {product.productId}
                            </p>
                        </div>
                    </div>
                </div>
            </td>
            <td className="flex flex-col items-center md:w-1/2 text-center border-gray-200 bg-white mb-[10px] mx-[10px]">
                <p ref={descriptionElement} suppressContentEditableWarning={true} onInput={() => setProductDetails()} contentEditable={editingProduct} className={`text-gray-600 whitespace-no-wrap ${editingProduct && " bg-gray-100 border-solid border-[1px] border-black p-[5px] ml-[5px]"}`}>
                    {product.description}
                </p>
                <div className='flex items-center justify-center w-full my-[10px]'>
                    <p className="text-gray-900  ">
                        Quantity:
                    </p>
                    <p ref={quantityElement} suppressContentEditableWarning={true} onInput={() => setProductDetails()} contentEditable={editingProduct} className={`${editingProduct && " bg-gray-100 border-solid border-[1px] border-black p-[5px] ml-[5px]"}`}>
                        {product.quantity}
                    </p>

                </div>
                <div className='flex items-center justify-center w-full my-[10px]'>
                    <p className="text-gray-900  ">
                        £
                    </p>
                    <p ref={priceElement} suppressContentEditableWarning={true} onInput={() => setProductDetails()} contentEditable={editingProduct} className={`${editingProduct && " bg-gray-100 border-solid border-[1px] border-black p-[5px] ml-[5px]"}`}>
                        {product.price}
                    </p>
                </div>

                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight z-[0] mb-[20px]">
                    <span aria-hidden
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                    </span>
                    <span className="relative">
                        {(((Date.now() - Date.parse(product.createdAt)) / 1000 / 60 / 60) / 24).toFixed()} days ago
                    </span>
                </span>
                {!addProductButtonState || !userDetails?.role
                    ?
                    <Tooltip title="Requires login" arrow>
                        <div>
                            <Button disabled className="pointer-events-none">Add to basket</Button>
                        </div>
                    </Tooltip>
                    :
                    <Button onClick={() => addItemToBasketClickHandler(product.productId, product.name)} className="">Add to basket</Button>
                }
                <div className='mt-[10px]'>
                    {!addProductButtonState || userDetails?.role !== "Admin"
                        ?
                        <Tooltip title="Requires admin account" arrow>
                            <div>
                                <Button disabled className="pointer-events-none">Delete Product</Button>
                            </div>
                        </Tooltip>
                        :
                        <Button color='danger' onClick={() => deleteProductClickHandler(product.productId, product.name)}>Delete Product</Button>
                    }
                </div>



            </td>
            <td>
                <div className='flex flex-col items-center w-[300px]'>

                    <button disabled={!productDetailsChanged} onClick={updateProductClicked} className={`${productDetailsChanged ? "opacity-100 hover:bg-green-400" : "opacity-25"} flex items-center w-[150px] text-gray-200 bg-green-500  rounded-md border font-bold p-[15px]`}>
                        Save Changes
                        <img src={SaveIcon} className='w-[32px] ml-[5px]' />
                    </button>

                    <p className='text-green-500 text-center'>{productDetailsSavedMessage}</p>
                </div>
                <div className='flex flex-col items-center w-[300px] mt-[10px]'>

                    <button onClick={() => setEditingProduct(!editingProduct)} className={`flex items-center w-[150px] text-white bg-slate-500 rounded-md border font-bold p-[15px] ${editingProduct && "opacity-50"}`}>
                        Edit Product
                        <img src={EditIcon} className='w-[32px] ml-[5px]' />
                    </button>
                </div>
            </td>


        </>

    );
};

export default SearchResultsListItem;