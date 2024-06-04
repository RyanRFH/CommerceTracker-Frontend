import React from 'react';

const Footer = () => {

    const scrollToTopSubmitHandler = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return (
        <div className='mt-auto pt-[20px]'>
            <div className='flex justify-center items-center'>
                <button onClick={scrollToTopSubmitHandler} className='flex items-center flex-col-reverse mb-[30px] bg-gray-200 rounded-3xl p-4 '>Back to top
                    <img className='mb-[5px]' width={"20px"} src='https://www.svgrepo.com/show/93813/up-arrow.svg' alt='backtotopicon' />
                </button>
            </div>
            <div className='m-[20px]'>
                <p>© 2024 eTrack </p>
            </div>
        </div>

    );
};

export default Footer;