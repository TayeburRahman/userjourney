import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, Container, Grid } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Firebase/Hooks/useAuth";
import google from '../../assets/google.svg';
import image_login from '../../assets/loginimage.png';
import noto_rocket from '../../assets/noto_rocket.svg';
import { useRegistrationMutation } from "../../features/auth/authApi";
import { createUsersData } from "../../features/auth/authSlice";
import './auth.css';

const SingUp = () => {
  const location = useLocation();
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [passwordSecStatus, setPasswordSecStatus] = useState(false);
  const [loginData, setLoginData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const { signImWithGoogle } = useAuth();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [registration, { data: resData, error: responseError }] = useRegistrationMutation();



  useEffect(() => {
    if (resData?.error) {
      setErrorMessage(resData?.error)
      return;
    }
    if (resData?.status === "success") {
      console.log("resData?.data", resData?.data)
      dispatch(createUsersData(resData?.data))
      navigate('/active/otp')
    }
    setErrorMessage('')

  }, [resData])

  const handelOnPassword = (e) => {
    setPasswordStatus(passwordStatus === false ? true : false);
    e.preventDefault();
  };

  const handelSecPassword = (e) => {
    setPasswordSecStatus(passwordSecStatus === false ? true : false);
    e.preventDefault();
  };
 
  //   Register Input value
  const handleonChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
    e.preventDefault();

  };
 

  //   Register Button
  const handelRegister = async (e) => {
    e.preventDefault();

    let fullname = `${loginData?.fst_name} ${loginData.snd_name}`

    if (loginData?.password && loginData?.confirmpassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.")
      return
    }
    if (loginData?.password !== loginData?.confirmpassword) {
      setErrorMessage("Password not match");
      return
    }
    if (!loginData?.email) {
      setErrorMessage("Please check email again.");
      return
    }
    setErrorMessage("")

    const useData = {
      name: fullname,
      password: loginData?.password,
      email: loginData?.email
    }

    let userData = { ...useData };
    await registration(userData) 
  };

  const handelGoogleSignIn = (e) => {
    signImWithGoogle(location, navigate)
  };


  return (
    <Fragment>
      <div className="account-pages">
        <Container className="container">
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
              <div className="login-filed">
                <h5 className="mt-4 login_account">Create Account</h5>
                {
                  errorMessage && <Alert severity="error">{errorMessage}</Alert>
                }


                <form onSubmit={handelRegister} >
                  <div className="input-group-name">
                    <input className="effect-13 mt-4" onChange={handleonChange} required type="text" name="fst_name" placeholder="Fast Name" />
                    <input className="effect-13 mt-4" onChange={handleonChange} type="text" name="snd_name" placeholder="Last Name" />
                  </div>
                  <div>
                    <input className="effect-12 mt-4" onChange={handleonChange} required type="email" name="email" placeholder="Email" />
                  </div>
                  <div className="input-group">
                    <input
                      required
                      type={passwordStatus ? "text" : "password"}
                      name="password"
                      className="effect-11"
                      placeholder="Password"
                      onChange={handleonChange}

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
                  <div className="input-group">
                    <input
                      required
                      type={passwordSecStatus ? "text" : "password"}
                      name="confirmpassword"
                      className="effect-11"
                      placeholder="Confirm password"
                      onChange={handleonChange}

                    />
                    <button className="input-group-button" onClick={handelSecPassword}>
                      <span className="password-eye">
                        {passwordSecStatus ? (
                          <VisibilityOffIcon className="OnPassword" />
                        ) : (
                          <VisibilityIcon className="OnPassword" />
                        )}
                      </span>
                    </button>
                  </div>
                  <button type="submit" className="login_button" >Register</button>
                </form>
                <div className=" ">
                  <h6 className="or_login mt-3">Or Login With</h6>

                  <button className="d-flex auth_google" onClick={handelGoogleSignIn} >

                    <img src={google} alt="logo" className="google_logo" />
                    <span className="google" >Google</span>
                  </button>

                  <h6 className="d-flex dont_have justify-content-center mt-3">Don't Have An Account?<Link to='/login' className="span-ywll ms-2">Sign In </Link></h6>
                </div>
              </div>
            </Grid>
          </Grid>
          <div className=" ">
            <h6 className="text-center peeppips">ⓒ Peeppips. All Rights Reserved 2023</h6>
          </div>


        </Container>
      </div>
    </Fragment>
  );
};

export default SingUp;
