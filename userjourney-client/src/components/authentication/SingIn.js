import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Firebase/Hooks/useAuth";
import google from '../../assets/google.svg';
import image_login from '../../assets/loginimage.png';
import noto_rocket from '../../assets/noto_rocket.svg';
import { useLoginUserMutation } from "../../features/auth/authApi";
import { userLoggedIn } from "../../features/auth/authSlice";
import './auth.css';

const SignIn = () => {
  // Post API Stp.P.2 [client sit data server site post]
  const [loginData, setLoginData] = useState({});
  const {  isLoading, authError, signImWithGoogle} = useAuth();
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
 

  // Login return to the Private Page 
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginUser, { data: resData, error: responseError }] = useLoginUserMutation();


  useEffect(() => {
    if (resData?.status === "error") {
      setErrorMessage(resData?.message)
      return;
    }
    if (resData?.status === "success") {  
      dispatch(userLoggedIn(resData.data))   

      if(checkbox){
        localStorage.setItem('_user', resData?.data)
      }
      
      const destination = location?.state?.from || "/";
      navigate(destination)
    }
    setErrorMessage('')

  }, [resData])


  const handelGoogleSignIn = (e) => {
    signImWithGoogle(location, navigate) 
  };
  
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;

    console.log('newLoginData',newLoginData)
    setLoginData(newLoginData);
    // console.log(newLoginData);
  };

  const handelLogin = async (e) => {
    e.preventDefault(); 
    const useData = { 
      password: loginData?.password,
      email: loginData?.email
    }

    let userData = { ...useData }; 
      await loginUser(userData);
  
  };

  // , location,navigate
  const handelOnPassword = (e) => {
    setPasswordStatus(passwordStatus === false ? true : false);
    e.preventDefault();
  };

  return (
    <Fragment>
      <div className="account-pages">
        <div className="container">
           <div className="header-log mb-2">
              <img src={noto_rocket} alt="logo" className="noto_rocket" />
              <h6 className="pee_pips">PeepPips</h6> 
           </div>
          <Grid container>
            <Grid item className="login-left mt-4" md={6} xs={12} lg={6}>
              <h2 className="login-h2"> Powering your <span className="span-ywll">trading</span> success.</h2> 
              <img src={image_login} alt="login" className="image_login" />
            </Grid>  
            <Grid item className="login-right d-grid-c-c" xs={12} md={6} lg={6}>
              <div className="login-filed pb-4">
                <h5 className="mt-5 login_account">Login To Your Account</h5>
          

                <form onSubmit={handelLogin}>
                  <input className="effect-12 mt-5" type="email"  onChange={handleOnChange} name="email" placeholder="Email" />
                  <div className="input-group">
                        <input
                          type={passwordStatus ? "text" : "password"}
                          name="password"
                          className="effect-11"
                          placeholder="Enter your password"
                          onChange={handleOnChange}
                         
                        /> 
                          <button className="input-group-button" onClick={handelOnPassword}>
                            <span className="password-eye">
                              {passwordStatus ? (
                                <VisibilityOffIcon className="OnPassword" />
                              ) : (
                                <VisibilityIcon className="OnPassword" />
                              )}
                            </span>
                          </button> 
                   </div>
                   <div className="mt-3 d-flex justify-content-between">
                       <div className="d-flex">
                          <input type="checkbox" id="html" name="fav_language" value={checkbox} onSelect={e=>(setCheckbox(checkbox === true? false: true))} className="checkbox" />
                          <h6 className="m-0 ms-2 checkbox">Remember Me</h6>
                       </div>
                       <Link to="/forward/email" className="forgot" >Forgot Your Password?</Link>
                   </div>
                   <button className="login_button" type="submit" >Login</button>
                </form>

                <div className=" ">
                  <h6 className="or_login">Or Login With</h6>

                  <button className="d-flex auth_google" onClick={handelGoogleSignIn} > 

                  <img src={google} alt="logo" className="google_logo" />
                    <span className="google">Google</span>
                  </button>

                  <h6 className="d-flex dont_have justify-content-center mt-3">Don't Have An Account?<Link to='/singup' className="span-ywll ms-2">Sign Up </Link></h6>
                </div>


               
              </div> 
            </Grid>  
          </Grid>
          <div className=" ">
              <h6 className="text-center peeppips">ⓒ Peeppips. All Rights Reserved 2023</h6>
            </div>
          
          
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
