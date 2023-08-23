import { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './auth.css';

const VerifyOtp = ({title, alert, error}) => {
  // Post API Stp.P.2 [client sit data server site post]
  const [value, setValue] = useState(''); 
 

  // Login return to the Private Page 
  const location = useLocation()
  const navigate = useNavigate()
 

  const handleOnClick = (e) => { 
    e.preventDefault();

  };

  

  return (
    <Fragment>   
              <div className="login-filed">
                <h5 className="mt-5 login_account">{title}</h5> 
                <form className="mt-5">
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
