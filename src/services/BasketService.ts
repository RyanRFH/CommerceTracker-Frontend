import { deleteCookie, getCookie, writeCookie } from "../common/Cookies/cookies";

//Add product to basket cookie
export const addToBasket = (productId: string) => {
    const cookie = getCookie("basket");
    if (!cookie) {
        writeCookie("basket", productId, 30);
        return { success: true };
    }

    let productsArray = cookie.split(",");
    if (productsArray.includes(productId)) {
        return { success: false, reason: "is already in your basket" };
    }
    writeCookie("basket", cookie + "," + productId, 30);
    return { success: true };
};

//Remove product from basket cookie
export const removeFromBasket = (productId: string) => {
    const cookie = getCookie("basket");
    if (!cookie) {
        console.log("Cookie not found");
        return "Cookie not found";
    }

    let productsArray = cookie.split(",");

    const filteredProductsArray = productsArray.filter(id => id !== productId);

    let productListAsString = filteredProductsArray.toString();

    deleteCookie("basket");
    if (productListAsString) {
        writeCookie("basket", productListAsString, 30);
    }

    return { success: true };
};