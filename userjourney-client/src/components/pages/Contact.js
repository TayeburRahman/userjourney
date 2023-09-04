import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-input-2';
import Header from './sheard/NavBar';


function Contact() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm(); 
    const [phoneNum, setPhoneNum] = useState('254 ');

    const onSubmit = (e) => {

        const data ={
              name: e?.name,
              email: e?.email,
              company_name: e?.company_name,
              massage: e?.massage,
              phone : phoneNum,
        }
        axios
        .post(`http://localhost:5000/api/v1/user/post_contact`, { data})
        .then((res) => { 
            reset()
                alert("Successfully send your massage!");  
        })
        .catch((error) => {
            
        });
    };

    return (
        <div className='products'>
            <Header />
            <div className='d-flex'
                style={{
                    minHeight: "100vh",
                    alignItems: "center"
                }}
            >
                <Container className='mt-5'>

                    <div className='row'>
                        <div className='col-md-7 col-lg-8 col-sm-12 contact-left mb-4 hight-contact'>

                            <form onSubmit={handleSubmit(onSubmit)} className='d-grid pb-5 form-contact'>
                                <Typography className='text_sm_black text-left mt-5 mb-3'> Send us a massage: </Typography>
                                <label className="label_input_text text-left p-1 pb-1" style={{ marginBottom: "0" }}> Name* </label>
                                <div className=" input-group-name_cu">

                                    <input className="effect-13 mb-2 mt-1" required type="text" placeholder="Full Name"  {...register("name")} />

                                    <input className="effect-13 mb-2 mt-1" type="text" placeholder="Company Name"  {...register("company_name")} />

                                </div>
                                <label className="label_input_text text-left" style={{ marginBottom: "0" }}>Email*</label>
                                <input className="effect-12 mt-2" required type="email" name="email" placeholder="Email"   {...register("email")} />

                                <label className="label_input_text text-left mt-2" style={{ marginBottom: "0" }}>Phone Number*</label>
                                <PhoneInput
                                    className="effect-14 mt-2"
                                    placeholder="Enter phone number"
                                    defaultValue={phoneNum}
                                    value={phoneNum}
                                    required
                                    onChange={phone => setPhoneNum(phone)} />

                                <label className="label_input_text text-left mt-2" style={{ marginBottom: "0" }}>Massage* </label>
                                <textarea className="effect-15 mt-2" required type="text" name="email" placeholder="Type Your massage"   {...register("massage")} />

                                {errors.exampleRequired && <span>This field is required</span>}

                                <input type="submit" className='login_button' />
                            </form>
                        </div>
                        <div className='col-md-5 col-lg-4 col-sm-12 contact-right hight-contact'>
                        <Typography className='text_sm_white text-left mt-5 mb-3'> Contact Information: </Typography>  

                        <p className='small_normal_white text-left mt-5'>If you require assistance with any aspect  of our services, our dedicated customer support is ready to help. You can contact them via email or by phone number</p>

                        <div className='d-flex mt-4'> 
                           <MailOutlineIcon className='mb-2 me-2' sx={{color:"white"}}/>
                            <p className='small_normal_yellow'>peepips@gmail.io</p>
                        </div>
                        <div className='d-flex mt-2'>
                        <WhatsAppIcon className='mb-3 me-2' sx={{color:"white"}}/>
                            <p className='small_normal_yellow'>+254799276543</p>
                        </div>

                        </div> 
                    </div>

                </Container> 
            </div>
           
        </div>
    )
}

export default Contact
