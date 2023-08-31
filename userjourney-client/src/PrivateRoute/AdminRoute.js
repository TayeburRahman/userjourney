import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

export default function AdminRoute({children}){
    
    const isLoggedIn = useAdmin();

    return isLoggedIn ? children : <Navigate to='/login'/>
}