import React, { useEffect, useState } from 'react';
import logo from "../../assets/etrack-logo-zip-file/png/logo-no-background.png"
import { getUser } from '../../services/AccountServices';
import { deleteCookie } from '../../common/Cookies/cookies';

const NavBar = () => {

    const [userDetails, setUserDetails] = useState(Object);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const getUserDetails = async () => {
        const user = await getUser();
        if (user.error) {
            return;
        }
        if (user) {
            setUserDetails(user);
        }
    }

    const logoutSubmitHandler = () => {
        deleteCookie("login-jwt");
        window.location.href = `/login`;
    };

    const profileSubmitHandler = () => {
        window.location.href = `/profile`;
    };

    useEffect(() => {
        getUserDetails();
    }, []);




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
                <div className='flex justify-around items-center w-[400px] ml-[100px] text-xl'>
                    <a href='/'>
                        <p>Home</p>
                    </a>
                    <a href='/products'>
                        <p>Products</p>
                    </a>

                    <a href='/orders'>
                        <p>Orders</p>
                    </a>
                </div>
                {/* Page Links */}


                {/* Login Link */}
                <div className='flex items-center justify-end text-xl ml-auto'>
                    <div className=''>
                        {userDetails.userName ?
                            <div className='relative'>
                                <button onClick={() => setIsUserModalOpen(!isUserModalOpen)} className='flex items-center'>
                                    <img className='mr-[5px]' width={"40px"} alt='usericon' src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg' />
                                    <p>{userDetails.userName}</p>
                                </button>
                                <div className={`${isUserModalOpen ? "flex" : "hidden"} ] absolute right-[10px]`}>

                                    <div className="z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                        <button onClick={profileSubmitHandler} className="block w-full hover:bg-gray-100 px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">Profile</button>
                                        {/* <p>Settings</p> */}
                                        <button onClick={logoutSubmitHandler} className="block w-full hover:bg-gray-100 px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">Sign out</button>
                                    </div>


                                </div>

                            </div>
                            :
                            <a href='/login'>
                                <p>Login</p>
                            </a>
                        }


                    </div>
                </div>

                {/* Login Link */}

            </div>


        </div>
    );
};

export default NavBar;