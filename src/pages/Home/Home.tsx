import React from 'react';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center'>
                <div className='flex justify-center'>
                    <div className='flex flex-col justify-center w-full'>
                        <p className='mt-[20px] text-3xl'>Welcome to eTrack!</p>
                    </div>
                </div>
            </div>

            {/* Page Links */}
            <div className='flex flex-col sm:flex-row w-screen justify-evenly mt-[50px] text-sm lg:text-6xl'>
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

        </div>

    );
};

export default Home;