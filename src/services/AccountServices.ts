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
        return data;
    } catch (error) {
        console.log("Error in services/account/loginUser");
        return { error: error };
    }
}