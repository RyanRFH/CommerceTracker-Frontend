import { getCookie, writeCookie } from "../common/Cookies/cookies";

//Add product to basket cookie
export const addToBasket = (productId: string) => {
    const cookie = getCookie("basket");
    if (!cookie) {
        writeCookie("basket", productId, 30);
        return { success: true };
    }
    writeCookie("basket", cookie + "," + productId, 30);
    return { success: true };
};