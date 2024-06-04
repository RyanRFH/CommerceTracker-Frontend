import React, { useState } from 'react';
import { registerUser } from '../../services/AccountServices';
import { Account } from '../../Dtos/Accounts/RegisterAccountDto';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const Signup = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onRegisterSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        console.log("role = ", role);
        const user: Account = {
            username: userName,
            email: email,
            password: password,
            role: role
        };

        const response = await registerUser(user);
        console.log(response);

    };


    return (
        <div className='flex items-center justify-center mt-[50px]'>
            <form onSubmit={e => onRegisterSubmitHandler(e)}>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create an account
                            </p>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Username
                                </label>
                                <input onChange={(e) => setUserName(e.target.value)} placeholder="Username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" type="text" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="email" type="email" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Role

                                </label>
                                {/* SELECT NOT SETTING THE ROLE USESTATE */}
                                <select defaultValue="user" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="password" type="password" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Confirm password
                                </label>
                                <input onChange={(e) => setConfirmPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" id="confirmPassword" type="password" required />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" type="checkbox" aria-describedby="terms" id="terms" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="font-light text-gray-500">
                                        I accept the
                                        <a href="#" className="font-medium text-primary-600 hover:underline text-primary-500">
                                            <p>Terms and Conditions</p>
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <button className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                                Create an account
                            </button>
                            <div className='flex justify-center items-center'>
                                <p className='text-red-500'>{errorMessage}</p>
                            </div>


                        </div>
                    </div>
                </div></form>

        </div>
    );
};

export default Signup;