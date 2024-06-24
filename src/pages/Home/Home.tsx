import React from 'react';
import logoBanner from '../../assets/etrack-logo-zip-file/png/logo-no-background.png'

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center'>
                <div className='flex justify-center'>
                    <div className='flex flex-col justify-center w-full'>
                        <p className='pt-[20px] text-3xl'>Welcome to eTrack!</p>
                        {/* <img src={logoBanner} width="400px" className='mt-[20px]' /> */}
                    </div>
                </div>
            </div>

            {/* Page Links */}
            <div className='flex flex-col sm:flex-row w-full justify-evenly mt-[50px] text-sm lg:text-6xl'>
                <div className='flex flex-col items-center mb-[20px]'>
                    <p className=' text-black font-bold'>Products</p>
                    <a href='/products'>
                        <img className='mt-[10px] max-w-[300px] lg:max-w-[400px] ' src='https://queue-it.com/media/ppcp1twv/product-drop.jpg' alt='products' />
                    </a>
                </div>

                <div className='flex flex-col items-center'>

                    <p className='text-black font-bold'>Orders</p>

                    <a href='/'>
                        <img className='mt-[10px] max-w-[300px] lg:max-w-[400px]' src='https://cdn-ikppnan.nitrocdn.com/zaXtQkXNMlZQivMrhELgMpbOEjTHUDcT/assets/images/optimized/rev-c790198/www.locate2u.com/wp-content/uploads/elementor/thumbs/A-1-47-qmwyerlvt0ntofi3fg220f0adfvckpe5xgtubb4uyy.webp' alt='orders' />
                    </a>

                </div>
            </div>

            {/* Page Links */}

            {/* Adverts */}
            <div className='w-3/4 mt-[30px]'>
                <h1 className='text-2xl'>Today's Deals</h1>
                <div className='flex justify-evenly flex-col items-center md:flex-row text-center'>
                    <div className='flex flex-col items-center max-w-[200px]'>
                        <img src='https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png' width="200px" />
                        <p>Annibale Colombo Bed</p>
                        <p className='text-green-500 text-2xl'>10% OFF</p>
                    </div>

                    <div className='flex flex-col items-center max-w-[200px]'>
                        <img src='https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png' width="200px" />
                        <p>Chanel Coco Noir Eau De</p>
                        <p className='text-green-500 text-2xl'>5% OFF</p>
                    </div>

                    <div className='flex flex-col items-center max-w-[200px]'>
                        <img src='https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png' className='w-[200px]' />
                        <p>Knoll Saarinen Executive Conference Chair</p>
                        <p className='text-green-500 text-2xl'>15% OFF</p>
                    </div>
                </div>
            </div>




            {/* Adverts */}

        </div>

    );
};

export default Home;