import React, { createContext, useContext, useReducer } from "react";

type contextProps = [
    state: any,
    dispatch: any
]


export const StateContext = createContext({} as contextProps);
interface stateProviderInterface {
    reducer: any,
    initialState: any,
    children: any,

}

export const StateProvider = ({ reducer, initialState, children }: stateProviderInterface) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (<StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>)
}


export const useStatevalue = () => useContext(StateContext)

