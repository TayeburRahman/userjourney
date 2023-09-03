import { Alert } from "@mui/material";
import axios from "axios";
import { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './auth.css';

const VerifyOtp = ({title, alert, error}) => { 
  const [errorMessage, setErrorMessage] = useState("")
  const [value, setValue] = useState(''); 
  const localAuth = localStorage?.getItem("_user"); 
  const _user = JSON.parse(localAuth);
  
  const location = useLocation()
  const navigate = useNavigate()
 

  const handleOnClick = (e) => { 
    setErrorMessage('')
    const otp =  Number(value)
     console.log(otp)

    axios
    .put(`http://localhost:5000/api/v1/user/email/otp/${_user.email}`,{
      otp
    })
    .then((res) => {
      if(res.status === 200) {
        navigate("/login")
      }  
    })
    .catch((error) => {
      setErrorMessage("No match your OTP, Please check again !")
    }); 

    e.preventDefault();

  };

  

  return (
    <Fragment>   
              <div className="login-filed">
                <h5 className="mt-5 mb-4 login_account">{title}</h5>  
                {errorMessage &&
                 <Alert severity="error" className="pl-3 pr-4 m-3"> 
                    {errorMessage}
                  </Alert>}
                <form className="mt-3">
                   <input className="effect-12" type="code" name="OTP" placeholder="Code" onChange={e => setValue(e.target.value)} /> 
                   <button className="login_button mt-4" onClick={handleOnClick}>Verify Code</button> 
                </form>

                <div className="mt-3 mb-4"> 
                  <h6 className="d-flex dont_have justify-content-center mt-3">Didn’t receive code? Resend<Link to='/singup' className="span-ywll ms-2">Resend </Link></h6>
                </div> 
              </div>  
    </Fragment>
  );
};

export default VerifyOtp;
