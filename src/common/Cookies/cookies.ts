export const writeCookie = (key: string, value: string, days: number | null) => {
    let date = new Date();
    days = days || 7;
    date.setDate(date.getDate() + days);

    let cookie = document.cookie = key + "=" + value + "; expires =" + date.toUTCString() + "; path=/"
    return cookie;
}

export const getCookie = (cookieName: string) => {
    const re = new RegExp(`(?<=${cookieName}=)[^;]*`)

    try {
        let cookies = document.cookie.match(re);
        let cookie;
        if (cookies) {
            cookie = cookies[0];
        }
        return cookie
    } catch (error) {
        return false;
    }
}

export const deleteCookie = (cookieName: string) => {
    try {
        document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    } catch (error) {
        console.log(error);
    }
}