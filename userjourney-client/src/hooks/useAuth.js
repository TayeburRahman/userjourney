
export default function useAuth(){ 
    const localAuth = localStorage?.getItem("_user");
    const localAuthToken = localStorage?.getItem("_token");
    const _token = JSON.parse(localAuthToken); 
    const _user = JSON.parse(localAuth);

    if(_token && _user?.email){
        return true; 
    } else{
        return false;
    }
}
 
 