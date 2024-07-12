import { getUser } from "./AccountServices";

//Add product to basket cookie
export const AddToBasket = async (productId: string) => {
    const user = await getUser();
    if (!user) {
        return { error: `User not found`, message: "User not found" };
    }

    try {
        const res = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/api/basket/additem`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: user.id, productId: productId, quantity: 1 }),
        });

        if (res.ok === false) {
            return { error: `Fetch failed`, message: res.statusText };
        }
        const data = await res.json();
        return { success: true, message: data };
    } catch (error) {
        console.log("Error in services/basket/AddToBasket");
        return { error: error, message: "An error occurred" };
    }
};

//Remove product from basket
export const RemoveFromBasket = async (basketItemId: string) => {

    try {
        const res = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/api/basket/removeitem?basketItemId=${basketItemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok === false) {
            return { error: `Fetch failed`, message: res.statusText };
        }
        const data = await res.json();
        return { success: true, message: data };
    } catch (error) {
        console.log("Error in services/basket/RemoveFromBasket");
        return { error: error, message: "An error occurred" };
    }
};

export const GetBasket = async () => {
    const user = await getUser();
    if (!user) {
        return { error: `User not found`, message: "User not found" };
    }

    try {
        const res = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/api/basket?userId=${user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok === false) {
            return { error: `Fetch failed`, message: res.statusText };
        }
        const data = await res.json();
        return { success: true, message: data };
    } catch (error) {
        console.log("Error in services/basket/GetBasket");
        return { error: error, message: "An error occurred" };
    }


};

export const UpdateBasketItemQuantity = async (basketItemId: string, quantity: number) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/api/basket/basketitem/updatequantity?basketItemId=${basketItemId}&quantity=${quantity}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok === false) {
            return { error: `Fetch failed`, message: res.statusText };
        }
        const data = await res.json();
        return { success: true, message: data };
    } catch (error) {
        console.log("Error in services/basket/UpdateBasketItemQuantity");
        return { error: error, message: "An error occurred" };
    }
};

export const ClearBasket = async () => {
    const user = await getUser();
    if (!user) {
        return { error: `User not found`, message: "User not found" };
    }

    try {
        const res = await fetch(`${process.env.REACT_APP_COMMERCE_API_URL}/api/basket/clearbasket?userId=${user.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok === false) {
            return { error: `Fetch failed`, message: res.statusText };
        }
        // const data = await res.json();
        return { success: true, message: res };
    } catch (error) {
        console.log("Error in services/basket/ClearBasket = ", error);
        return { error: error, message: "An error occurred" };
    }


};