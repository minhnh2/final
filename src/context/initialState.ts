import fetchUser from "utils/FetchUserData"


const userData = fetchUser()

export interface InitialState {
    user: any,
    foodItems: any
}

export const initialState: InitialState = {
    user: userData,
    foodItems: null
}