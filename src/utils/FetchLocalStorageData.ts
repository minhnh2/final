export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') !== 'undefined' ?
        JSON.parse(localStorage.getItem("user") || "false")
        : localStorage.clear();

    return userInfo;
}

export const fetchCart = () => {
    const cartInfo = localStorage.getItem('cartItems') !== 'undefined' ?
        JSON.parse(localStorage.getItem("cartItems") || "false")
        : localStorage.clear();

    return cartInfo ? cartInfo : [];

}