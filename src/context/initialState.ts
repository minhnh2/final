import { fetchCart, fetchUser } from "utils/FetchLocalStorageData"


const userData = fetchUser()
const cartInfo = fetchCart()

export interface InitialState {
    user: any,
    foodItems: any,
    cartShow: boolean,
    cartItems: any
}

export const initialState: InitialState = {
    user: userData,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo
}