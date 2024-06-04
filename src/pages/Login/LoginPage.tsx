import React, { FormEvent, useState } from 'react';
import logo from "../../assets/etrack-logo-zip-file/png/logo-no-background.png"
import bgimage from "../../assets/istock-unfinished-business-hed-2015.jpg.webp"
import { loginUser } from '../../services/AccountServices';


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const loginSubmitHandler = async (event: FormEvent) => {
        setErrorMessage("");
        event.preventDefault();
        const response = await loginUser(username, password);

        if (response.error) {
            setErrorMessage(response.error);
            return;
        }

        window.location.href = `/`;
    }

    const loginAsGuestUserSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const response = await loginUser("GuestUser", "Qwertyuiop123!");

        if (response.error) {
            setErrorMessage(response.error);
            return;
        }

        window.location.href = `/`;
    }

    const loginAsGuestAdminSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const response = await loginUser("GuestAdmin", "Qwertyuiop123!");

        if (response.error) {
            setErrorMessage(response.error);
            return;
        }

        window.location.href = `/`;
    }

    return (
        <div>
            <div className="bg-gray-100 flex justify-center items-center h-screen">

                <div className="w-1/2 h-screen hidden lg:block relative">
                    <img src={bgimage} alt="bg" className="object-cover w-full h-full" />
                    <img src={logo} alt='logo' className='absolute left-0 bottom-0 bg-black bg-opacity-40 py-[30px] px-[50px]' />
                </div>

                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>

                    <form onSubmit={loginSubmitHandler}>
                        <div className="mb-4">
                            <label typeof="username" className="block text-gray-600">Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} required type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                        </div>

                        <div className="mb-4">
                            <label typeof="password" className="block text-gray-600">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" required id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                        </div>

                        {/* <div className="mb-4 flex items-center">
                            <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
                            <label typeof="remember" className="text-gray-600 ml-2">Remember Me</label>
                        </div> */}

                        {/* <div className="mb-6 text-blue-500">
                            <a href="#" className="hover:underline">Forgot Password?</a>
                        </div> */}
                        <div className='flex justify-center'>
                            <p className='text-red-600'>{errorMessage}</p>
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>

                    </form>
                    <div className='flex justify-evenly items-center mt-[10px]'>
                        <button onClick={loginAsGuestUserSubmitHandler} className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-md py-2 px-4 w-2/5">Sign in as guest (User)</button>
                        <button onClick={loginAsGuestAdminSubmitHandler} className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-md py-2 px-4 w-2/5">Sign in as guest (Admin)</button>
                    </div>


                    <div className="mt-6 text-blue-500 text-center">
                        <a href="/signup" className="hover:underline">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;