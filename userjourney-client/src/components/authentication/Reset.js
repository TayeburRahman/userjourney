 
 

  import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, Container, Grid } from "@mui/material";
import { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image_login from '../../assets/loginimage.png';
import noto_rocket from '../../assets/noto_rocket.svg';
import './auth.css';

const ResetPassword = () => {
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [passwordSecStatus, setPasswordSecStatus] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState(''); 
  const [isMessage, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
 

 
  const location = useLocation()
  const navigate = useNavigate()

   
  const handelOnPassword = (e) => {
    setPasswordStatus(passwordStatus === false ? true : false);
    e.preventDefault();
  };
  const handelSecPassword = (e) => {
    setPasswordSecStatus(passwordSecStatus === false ? true : false);
    e.preventDefault();
  };
 
 

  const handleOnClick = (e) => {  
    e.preventDefault();
    const password = confirmPassword === newPassword;

    if(confirmPassword || newPassword.length < 6){
      setErrorMessage("Password must be at least 6 characters.")
    }
    if(!password){
      setErrorMessage("Confirm Password does not match")
    } 

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
                <h5 className="mt-5 login_account">Password Reset</h5>
          
                {
                  errorMessage && <Alert severity="error"  >{errorMessage }</Alert>
                }  
                <form >
                  
                  <div className="input-group mt-5">
                        <input
                          type={passwordStatus ? "text" : "password"}
                          id="password"
                          name="newPassword"
                          className="effect-11"
                          placeholder="New Password"
                          onChange={e => setNewPassword(e.target.value)}
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
                          type={passwordSecStatus ? "text" : "password"}
                          name="confirmPassword"
                          className="effect-11"
                          placeholder="Confirm Password" 
                          onChange={e => setConfirmPassword(e.target.value)}
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
                   <button className="login_button" onClick={handleOnClick}>Register</button>
                </form>

                <div className=" ">
 

                  <h6 className="d-flex dont_have justify-content-center mt-3">Back to<Link to='/singup' className="span-ywll ms-2">  Login </Link></h6>
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

export default ResetPassword;
