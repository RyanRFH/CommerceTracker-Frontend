// import React from 'react';
// import logoBanner from '../../assets/etrack-logo-zip-file/png/logo-no-background.png'
// import bgImage from '../../assets/shopping-bag-cart.jpg'
import SearchBarAlone from '../../components/Search/SearchBarAlone';
import bgImageLong from '../../assets/shopping-cart-with-bag.jpg'
import { FormEvent, useEffect, useState } from 'react';
import { getUser, loginUser } from '../../services/AccountServices';

const Home = () => {

    const [statusMessage, setStatusMessage] = useState("");

    const loginAsGuestAdminSubmitHandler = async () => {

        let user = await getUser();
        if (!user.error) {
            return;
        }

        const response = await loginUser("GuestAdmin", "Qwertyuiop123!");
        if (!response.error) {
            setStatusMessage("Automatically logged in as Admin");
        };
    };

    useEffect(() => {
        loginAsGuestAdminSubmitHandler();
    }, []);

    console.log("Home Page Working");
    return (
        <div className='bg-slate-100 min-h-screen'>

            <div className='items-center justify-center flex text-green-400 mt-[10px]'>{statusMessage}</div>

            {/* Background Images */}
            <div>
                {/* <img src={bgImage} alt='bgImage' className='absolute w-full z-[-100] hidden md:block' /> */}
            </div>
            <div>
                <img src={bgImageLong} alt='bgImageLong' className='fixed w-full z-[-110] md:hidden h-full' />
            </div>

            {/* Background Images */}
            <div className='flex flex-col items-center w-full'>
                <div className='flex justify-center w-full'>
                    <div className='flex flex-col justify-center w-full'>
                        <SearchBarAlone searchType="products" />
                        {/* <p className='pt-[20px] text-3xl'>Welcome to eTrack!</p> */}
                        {/* <img src={logoBanner} width="400px" className='mt-[20px]' /> */}
                    </div>
                </div>
            </div>

            {/* Page Links */}
            <div className='flex flex-col sm:flex-row w-full justify-evenly text-3xl lg:text-6xl min-h-[500px] md:min-h-[300px]'>

                <div className='flex justify-center items-center'>
                    <a href='/products' className='w-full h-full flex justify-center items-center'>
                        <img className='mt-[10px] max-w-[300px] lg:max-w-[400px] rounded-xl absolute z-[5] shadow-2xl' src='https://queue-it.com/media/ppcp1twv/product-drop.jpg' alt='products' />
                        <p className=' text-white font-bold bg-green-400 rounded-md px-[20px] py-[5px] z-[6]'>Products</p>
                    </a>
                </div>

                <div className='flex justify-center items-center'>
                    <a href='/orders' className='w-full h-full flex justify-center items-center'>
                        <img className='mt-[10px] max-w-[300px] lg:max-w-[425px] rounded-xl absolute z-[5] shadow-2xl' src='https://eu-images.contentstack.com/v3/assets/blt892f41c9788ae399/blt0f95964a562f7f3f/62e38ce74ec9fe660e803f47/An_Ultimate_Java_Framework_List_for_Advanced_Engineers_XL_Big.jpg' alt='orders' />
                        <p className='text-white font-bold bg-blue-600 rounded-md px-[20px] py-[5px] z-[6]'>Orders</p>
                    </a>
                </div>

            </div>
            {/* Page Links */}

            {/* Adverts */}
            <div className='flex justify-center'>
                <div className='flex flex-col w-3/4 mt-[30px] bg-neutral-200 px-[20px] py-[10px] rounded-2xl shadow-2xl'>
                    <h1 className='text-2xl'>Today's Deals</h1>
                    <div className='flex justify-evenly flex-col items-center md:flex-row text-center'>
                        <a href='/products?name=Annibale Colombo Bed'>
                            <div className='flex flex-col items-center max-w-[200px]'>
                                <img alt='advert 1' src='https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png' width="200px" />
                                <p>Annibale Colombo Bed</p>
                                <p className='text-green-500 text-2xl'>10% OFF</p>
                            </div>
                        </a>

                        <a href='/products?name=Chanel Coco Noir Eau De'>
                            <div className='flex flex-col items-center max-w-[200px]'>
                                <img alt='advert 2' src='https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png' width="200px" />
                                <p>Chanel Coco Noir Eau De</p>
                                <p className='text-green-500 text-2xl'>5% OFF</p>
                            </div>
                        </a>


                        <a href='/products?name=Knoll Saarinen Executive Conference Chair'>
                            <div className='flex flex-col items-center max-w-[200px]'>
                                <img alt='advert 3' src='https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png' className='w-[200px]' />
                                <p>Knoll Saarinen Executive Conference Chair</p>
                                <p className='text-green-500 text-2xl'>15% OFF</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>





            {/* Adverts */}

        </div>

    );
};

export default Home;