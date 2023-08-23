import { Container, Grid } from "@mui/material";
import { Fragment } from "react";
import image_login from '../../assets/loginimage.png';
import noto_rocket from '../../assets/noto_rocket.svg';
import Email from "./Email";
import './auth.css';

const EmailForget = () => {

  const title = ["Forgot Password"]
 

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
              <Email title={title} />
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

export default EmailForget;
