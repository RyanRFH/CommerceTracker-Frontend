import React from 'react';
import logo from "../../assets/etrack-logo-zip-file/png/logo-no-background.png"

const NavBar = () => {
    return (
        <div className='flex justify-center border-b-[2px]'>
            <div className='flex w-[90%]'>

                {/* Logo */}
                <div className=''>
                    <a href='/'>
                        <img src={logo} width="200px" className='ml-[20px] my-[10px]' alt='logo' />
                    </a>
                </div>
                {/* Logo */}


                {/* Page Links */}
                <div className='flex justify-around items-center w-1/4 ml-[100px] text-xl'>
                    <a href='/'>
                        <p>Home</p>
                    </a>
                    <a href='/products'>
                        <p>Products</p>
                    </a>

                </div>
                {/* Page Links */}


                {/* Login Link */}
                <div className='flex items-center justify-end text-xl w-full mr-[50px]'>
                    <a href='/login'>
                        <p>Login</p>
                    </a>
                </div>
                {/* Login Link */}

            </div>


        </div>
    );
};

export default NavBar;