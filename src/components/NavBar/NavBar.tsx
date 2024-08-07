import React, { RefObject, useEffect, useRef, useState } from 'react';
import logo from "../../assets/etrack-logo-zip-file/png/logo-no-background.png"
import { getUser } from '../../services/AccountServices';
import { deleteCookie } from '../../common/Cookies/cookies';
import { Dropdown } from '@mui/joy';
import { Menu, MenuButton, MenuItem } from '@mui/base';

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

    //Close user selection box modal if user clicks anywhere on window
    let modal: RefObject<HTMLDivElement> = useRef(null);
    const handleOutsideClick = (e: MouseEvent) => {

        if (modal.current?.contains(e.target as Node)) {
            return;
        }
        setIsUserModalOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);




    return (
        <div className='flex justify-center border-b-[2px] text-sm md:text-xl'>
            <div className='flex justify-center items-center w-[100%] md:w-[100%]'>

                {/* Logo */}
                <div className='md:flex hidden'>
                    <a href='/'>
                        <img src={logo} className='max-w-[75px] md:max-w-[150px] ml-[20px] my-[10px]' alt='logo' />
                    </a>
                </div>
                {/* Logo */}

                {/* {Link to backend} */}
                <div className='md:text-base text-xs md:w-[300px] ml-[20px] text-blue-500'>
                    <a target='_blank' className='flex items-center hover:underline' href='https://commerce-api-dotnet.azurewebsites.net/api/product'>
                        <img className='w-[20px] mr-[5px]' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/External_link_font_awesome.svg/1200px-External_link_font_awesome.svg.png' />
                        <p>Backend API</p>
                    </a>
                    <a target='_blank' className='flex items-center hover:underline' href='https://github.com/RyanRFH/Commerce-Tracker'>
                        <img className='w-[20px] mr-[5px]' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/External_link_font_awesome.svg/1200px-External_link_font_awesome.svg.png' />
                        <p>Backend Github</p>
                    </a>
                    <a target='_blank' className='flex items-center hover:underline' href='https://github.com/RyanRFH/CommerceTracker-Frontend/tree/main/src'>
                        <img className='w-[20px] mr-[5px]' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/External_link_font_awesome.svg/1200px-External_link_font_awesome.svg.png' />
                        <p>Frontend Github</p>
                    </a>
                </div>
                {/* {Link to backend} */}

                {/* Page Links */}
                <div className='flex justify-center lg:hidden items-center w-1/2 mx-[10px]'>
                    <Dropdown>
                        <MenuButton><img alt='burger icon' className='w-[20px]' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png' /></MenuButton>
                        <Menu className='bg-white border px-[20px] py-[10px]'>
                            <a className='hover:opacity-50' href='/'>
                                <p>Home</p>
                            </a>
                            <a className='hover:opacity-50' href='/products'>
                                <p>Products</p>
                            </a>
                            <a className='hover:opacity-50' href='/orders'>
                                <p>Orders</p>
                            </a>
                            <a className='hover:opacity-50' href='/analysis'>
                                <p>Analysis</p>
                            </a>
                        </Menu>
                    </Dropdown>
                </div>
                <div className='hidden lg:flex items-center justify-center w-full'>
                    <div className='hidden justify-around items-center w-1/2 ml-[0px] lg:flex'>
                        <a className='hover:opacity-50' href='/'>
                            <p>Home</p>
                        </a>
                        <a className='hover:opacity-50' href='/products'>
                            <p>Products</p>
                        </a>

                        <a className='hover:opacity-50' href='/orders'>
                            <p>Orders</p>
                        </a>

                        <a className='hover:opacity-50' href='/analysis'>
                            <p>Analysis</p>
                        </a>
                    </div>
                </div>

                {/* Page Links */}


                {/* Login Link */}
                <div className='flex items-center justify-end ml-auto border-l'>
                    <div className='h-full'>
                        {userDetails.userName ?
                            <div className='flex items-center relative mx-[0px] h-full'>
                                <a className='h-full' href='/basket'>
                                    <div className='flex items-center px-[5px] md:px-[30px] hover:animate-bounce h-full'>
                                        <img className='max-w-[20px] md:max-w-[40px]' src='https://icons.veryicon.com/png/o/system/dan_system/shopping-basket-11.png' />
                                    </div>
                                </a>
                                <button onClick={() => setIsUserModalOpen(!isUserModalOpen)} className='flex items-center hover:opacity-50 mr-[10px]'>
                                    <img className='mr-[5px] w-[40px] hidden md:block' alt='usericon' src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg' />
                                    <p className='md:mr-[30px]'>{userDetails.userName}</p>
                                </button>
                                <div ref={modal} className={`${isUserModalOpen ? "flex" : "hidden"} ] absolute right-[10px] top-[30px] md:right-[100px] md:top-[50px]`}>
                                    <div className="z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                        <button onClick={profileSubmitHandler} className="block w-full hover:bg-gray-100 px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">Profile</button>
                                        {/* <p>Settings</p> */}
                                        <button onClick={logoutSubmitHandler} className="block w-full hover:bg-gray-100 px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">Sign out</button>
                                    </div>
                                </div>

                                <div className={`md:flex hidden items-center ${userDetails?.role === "Admin" ? "bg-green-400" : "bg-yellow-400"} rounded-3xl px-[12px] md:px-[20px] mx-[5px] md:mx-[20px] text-xs md:text-sm font-bold h-[40px]`}>
                                    <p>{userDetails?.role.toUpperCase()}</p>
                                </div>


                            </div>
                            :
                            <div className='flex items-center justify-center  mx-[5px] h-full min-w-[100px] md:min-w-[150px]'>
                                <a href='/login'>
                                    <p>Login</p>
                                </a>
                            </div>

                        }


                    </div>
                </div>

                {/* Login Link */}

            </div>


        </div>
    );
};

export default NavBar;