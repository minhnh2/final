import { InitialState } from "./initialState";

export const actionType = {
    SET_USER: 'SET_USER' // update user : call action type and dispatch the value

}


const reducer = (state: InitialState, action: { type: string, user: any }) => {
    console.log(action)

    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user
            }
        default: return state;
    }
}

export default reducer;