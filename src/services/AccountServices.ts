import { Account } from "../Dtos/Accounts/RegisterAccountDto";
import { getCookie, writeCookie } from "../common/Cookies/cookies";

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();
        writeCookie("login-jwt", data.token, 14);

        return data;
    } catch (error) {
        console.log("Error in services/account/loginUser");
        return { error: error };
    }
}

//Get user by jwt cookie
export const getUser = async () => {
    const cookie = getCookie("login-jwt");

    if (!cookie) {
        return { error: "JWT cookie not found" };
    }
    try {
        const res = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "userJWT": cookie
            }
        })
        if (!res.ok) {
            return { error: "Could not retrieve user details", reason: res.statusText };
        }
        const data = res.json();
        return data;
    } catch (error) {
        console.log("Error in services/account/getUser");
        return { error: error };
    }
};

export const registerUser = async (newUser: Account) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        })
        if (!res.ok) {
            return { error: "Could not create account", reason: res.statusText };
        }
        const data = res.json();
        return data;
    } catch (error) {
        console.log("Error in services/account/getUser");
        return { error: error };
    }
};