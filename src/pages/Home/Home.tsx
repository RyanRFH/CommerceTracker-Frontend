import React from 'react';
import logoBanner from '../../assets/etrack-logo-zip-file/png/logo-no-background.png'
import bgImage from '../../assets/shopping-bag-cart.jpg'
import SearchBarAlone from '../../components/Search/SearchBarAlone';
import bgImageLong from '../../assets/shopping-cart-with-bag.jpg'

const Home = () => {
    return (
        <div className='bg-slate-100 min-h-screen'>

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
                        <img className='mt-[10px] max-w-[300px] lg:max-w-[400px] rounded-xl absolute z-[5] shadow-2xl' src='https://cdn-ikppnan.nitrocdn.com/zaXtQkXNMlZQivMrhELgMpbOEjTHUDcT/assets/images/optimized/rev-c790198/www.locate2u.com/wp-content/uploads/elementor/thumbs/A-1-47-qmwyerlvt0ntofi3fg220f0adfvckpe5xgtubb4uyy.webp' alt='orders' />
                        <p className='text-white font-bold bg-blue-400 rounded-md px-[20px] py-[5px] z-[6]'>Orders</p>
                    </a>
                </div>

            </div>
            {/* Page Links */}

            {/* Adverts */}
            <div className='flex justify-center'>
                <div className='flex flex-col w-3/4 mt-[30px] bg-neutral-200 px-[20px] py-[10px] rounded-2xl shadow-2xl'>
                    <h1 className='text-2xl'>Today's Deals</h1>
                    <div className='flex justify-evenly flex-col items-center md:flex-row text-center'>
                        <div className='flex flex-col items-center max-w-[200px]'>
                            <img alt='advert 1' src='https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png' width="200px" />
                            <p>Annibale Colombo Bed</p>
                            <p className='text-green-500 text-2xl'>10% OFF</p>
                        </div>

                        <div className='flex flex-col items-center max-w-[200px]'>
                            <img alt='advert 2' src='https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png' width="200px" />
                            <p>Chanel Coco Noir Eau De</p>
                            <p className='text-green-500 text-2xl'>5% OFF</p>
                        </div>

                        <div className='flex flex-col items-center max-w-[200px]'>
                            <img alt='advert 3' src='https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png' className='w-[200px]' />
                            <p>Knoll Saarinen Executive Conference Chair</p>
                            <p className='text-green-500 text-2xl'>15% OFF</p>
                        </div>
                    </div>
                </div>
            </div>





            {/* Adverts */}

        </div>

    );
};

export default Home;