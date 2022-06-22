import { fetchUser } from '../utils/FetchUserData';

const userData = fetchUser()

export interface InitialState {
    user: any
}

export const initialState: InitialState = {
    user: userData,
}