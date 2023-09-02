import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Button, Container } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './sheard/NavBar';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    maxWidth: '90%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {

        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        paddingTop: "12px",
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '23ch',
            '&:focus': {
                width: '23ch',
            },
        },
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

function Products() {
    const [emailSubscribe, setEmailSubscribe] = useState()
    const localAuth = localStorage?.getItem("_user");
    const _user = JSON.parse(localAuth);
    const navigate = useNavigate()

    const handelOnClick = (e) => {
        if (!_user?.email) {
            navigate('/login')
            return;
        } 

        const formData = {
            name: _user.name, 
            email: emailSubscribe,
        }; 
        axios
            .post("http://localhost:5000/api/v1/product/add_subscribe", { formData })
            .then((res) => {  
                setEmailSubscribe('')     
                    alert(`Hi,${_user.name}. Subscribe You Successfully!`); 
                     
            })
            .catch((error) => {
            
                console.log(error);
            });
    
    }
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
                    <div className='product_top_bg'>
                        <div className='product_up_bg'>

                            <div className='p-4'>
                                <h3 className='pt-5 text_large_white_product  letter_spacing' >Subscribe to our newsletter </h3>
                                <h3 className='text_large_white_product padding_bottom_50 letter_spacing'>for monthly article update.</h3>

                                <p className='p_product_text padding_bottom_50 text-left'>"Unlock the Power of Automation 🤖💰 Subscribe to our newsletter now and discover how you can transform your manual coding into lucrative automated bots! 🚀 Start generating extra income on our platform today! 💵 Don't miss out on this exciting opportunity – join our community today</p>
                                <div className='  df_jc_center padding_bottom_50'>
                                    <Search className='subscribe_email m-2'>
                                        <SearchIconWrapper>
                                            <MailOutlineIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            
                                            onBlur={e => setEmailSubscribe(e.target.value)}
                                            className='email_filed'
                                            value={emailSubscribe}
                                            placeholder="Enter your e-mail address"
                                        />
                                    </Search>
                                    <Button className='subscribe_button  m-2' onClick={handelOnClick}>Subscribe</Button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="mt-5 mb-4">
                        <h6 className="text-center footer_bottom">ⓒ Peeppips. All Rights Reserved 2023</h6>
                    </div>
                </Container>


            </div>
        </div>
    )
}

export default Products

