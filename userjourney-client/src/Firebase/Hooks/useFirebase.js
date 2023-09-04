import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup, signOut
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleSingInMutation } from "../../features/auth/authApi";
import { userLoggedIn } from "../../features/auth/authSlice";
import initializeFirebase from "../FirebaseInit";
// initialize Firebase app
initializeFirebase();

const useFirebase = () => {
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState('');
  const [isLoading, setIstLoading] = useState(true);
  const [authError, setError] = useState("");
  const [isDestination, setDestination] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [googleSingIn, { data: resData, error: responseError }] = useGoogleSingInMutation();
  const auth = getAuth();
  const provider = new GoogleAuthProvider(); 
  
  useEffect(() => {
    if(resData?.data){
      setUser(resData?.data)
      dispatch(userLoggedIn(resData.data))
      navigate(isDestination)
    }
  },[resData])

  const signImWithGoogle = async (location, navigate) => {
    setIstLoading(true);
    await signInWithPopup(auth, provider)
      .then((result) => {
        // user data save or update
        const localUser = result.user;
        // saveUser(user.email, user.displayName, 'PUT');
        const useData = {
           email: localUser?.email, 
            name: localUser?.displayName
        }
           googleSingIn(useData)   
           
           if(user?.email){
            const destination = location?.state?.from || "/dashboard";
            setDestination(destination);
            setError("");  
            return;
           }else{
            setError("Login field! server error");  
           }
           
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIstLoading(false));
  };
 

 

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      // Loading
      .finally(() => setIstLoading(false));
  };

 
  useEffect(() =>{
    // fetch(`https://sleepy-journey-86126.herokuapp.com/users/${user.email}`)
    // .then(res => res.json())
    // .then(data => setAdmin(data.admin))
  }, [ ])
  return {
    user,  
    logOut,
    isLoading,
    authError,
    signImWithGoogle,
    admin,
  };
};

export default useFirebase;
