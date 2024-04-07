export function getAuthToken() {

    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('mytoken='));
    if (!tokenCookie) {
        return null;
    }
    return tokenCookie.split('=')[1];
}