import { Navigate } from "react-router-dom";
import useUsersAdmin from "../hooks/useUsersAdmin";

export default function UserRoute({children}){
    
    const isLoggedIn = useUsersAdmin();

    return isLoggedIn ? children : <Navigate to='/login'/>
}