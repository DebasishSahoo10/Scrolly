import { createContext, useReducer } from "react";



export const AuthContext = createContext()

const handleAuth = (auth, action) => {
    switch (action.type) {
        case "SET_LOGIN" : return action.payload;
        default : return auth
    }
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    const [auth, authDispatch] = useReducer(handleAuth, "")
    return (
        <AuthContext.Provider value={{auth, authDispatch}}>
            {children}
        </AuthContext.Provider>
    )
}