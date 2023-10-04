/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router"
import { useSelector } from "react-redux"

export const RequiresAuth = ({children}) => {
    const location = useLocation()
    const auth = useSelector(state => state.auth.auth)
    return auth.length===0 ?  (<Navigate to="/login" state={{from :location}}/>) : (children)
}