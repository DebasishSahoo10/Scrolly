/* eslint-disable react/prop-types */
import { useContext } from "react"
import { Navigate, useLocation } from "react-router"
import { AuthContext } from "../Contexts/AuthContext"

export const RequiresAuth = ({children}) => {
    const location = useLocation()
    const {auth} = useContext(AuthContext)
    return auth.length===0 ?  (<Navigate to="/login" state={{from :location}}/>) : (children)
}