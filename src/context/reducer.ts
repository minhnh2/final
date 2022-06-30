import { InitialState } from "./initialState";

export const actionType = {
    SET_USER: 'SET_USER', // update user : call action type and dispatch the value
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS'

}


const reducer = (state: InitialState, action: { type: string, user: any, foodItems: any }) => {
    console.log(action)

    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actionType.SET_FOOD_ITEMS:
            return {
                ...state,
                foodItems: action.foodItems,
            }
        default: return state;
    }
}

export default reducer;