export default function useAdmin(){ 
    const localAuth = localStorage?.getItem("_user");
    const localAuthToken = localStorage?.getItem("_token");
    const _token = JSON.parse(localAuthToken); 
    const _user = JSON.parse(localAuth);

    if( _user?.role === "admin" && _token){
        return true; 
    } else{
        return false;
    }
}