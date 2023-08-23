import { Alert } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useForwardEmailMutation } from '../../features/auth/authApi';
import './auth.css';

function Email({ title }) {

  // Post API Stp.P.2 [client sit data server site post]
  const [emailData, setEmailData] = useState({});
  const [isMessage, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("")


  // Email return to the Private Page 

  const [forwardEmail, { data: resData, error: responseError }] = useForwardEmailMutation();


  console.log('resData?.status', resData?.message )
  useEffect(() => {
    if (resData?.status === "error") {
      setMessage('')
      setErrorMessage(resData?.message)
      return;
    }
    if (resData?.status === "success") { 
      setErrorMessage('')
      const field = "email";
      const newEmailData = {};
      newEmailData[field] = '';
      setEmailData(newEmailData); 
      setMessage('Send a link, Check your email') 
      return;
    }
    setErrorMessage('')
    setMessage('')
  }, [resData])



  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newEmailData = { ...emailData };
    newEmailData[field] = value;
    setEmailData(newEmailData);
    // console.log(newEmailData);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    await forwardEmail(emailData);

  }; 

  return (
    <Fragment>
      <div className="login-filed">
        <h5 className="mt-5 login_account">{title}</h5>
                {
                  errorMessage && <Alert severity="error"  >{errorMessage }</Alert>
                } 
                {
                  isMessage && <Alert severity="success">{isMessage}</Alert>
                }
        <form className="mt-5" onSubmit={handelSubmit}>
          <input className="effect-12" type="email" name="email" placeholder="Email" value={emailData.email} required onChange={handleOnChange} />
          <button className="login_button mt-4" type="submit" >Request Reset Password</button>
        </form>

        <div className="mt-3 mb-4">
          <h6 className="d-flex dont_have justify-content-center mt-3">Remembered password?<Link to='/login' className="span-ywll ms-2">Login </Link></h6>
        </div>
      </div>
    </Fragment>
  )
}

export default Email 