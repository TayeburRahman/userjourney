import { Container } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import email_icon_f from '../../../assets/email_icon_f.svg'
import facebook_icon from '../../../assets/facebook_icon.svg'
import instra_icon from '../../../assets/instra_icon.svg'
import logo_nav from '../../../assets/logo.jpg'
import mt_icon from '../../../assets/mt_icon.svg'
import towtr_ion from '../../../assets/towtr_ion.svg'
import wp_icon from '../../../assets/wp_icon.svg'

function Footer() {

     
    
    return (
        <div>
            <Container className='mt-5 pb-4'>
            <div className='row' style={{alignItems: "flex-start"}}> 
                <div className='col-lg-3 col-sm-12 col-md-4 mb-5 d-grid text-left'>
                    <div className="nav_width_footer text-left">
                       <img src={logo_nav} alt="logo" className="logo_nav" /> 
                    </div> 
                    <p className='small_normal text-left mt-4 mb-4'>Turning manual coding strategies into automated bots</p> 
                    <div>
                        <Link className='icon_footer' href=''><img src={facebook_icon} alt="facebook icon" className="noto_rocket" /> </Link>
                        <Link className='icon_footer' href=''><img src={towtr_ion} alt="twitter icon" className="noto_rocket" /> </Link>
                        <Link className='icon_footer' href=''><img src={instra_icon} alt="instagram icon" className="noto_rocket" /> </Link>
                        <Link className='icon_footer' href=''><img src={mt_icon} alt="mega icon" className="noto_rocket" /> </Link>
                        {/* <Link className='icon_footer' href=''><img src={youtub_icon} alt="YouTube icon" className="noto_rocket" /> </Link> */}
                    </div>
                </div>
                <div className='col-lg-3 col-sm-12 col-md-4 mb-5 d-grid text-left dp-none-md-footer'>  
                 <h6 className="footer_tag">Links</h6> 
                        <Link className='footer_link' to=''> About </Link> 
                        <Link className='footer_link' to=''> Contact </Link> 
                        <Link className='footer_link' to=''>Buy March</Link>   
                </div>
                 <div className='col-lg-3 col-sm-12 col-md-4 d-grid text-left mb-5'>  
                     <h6 className="footer_tag">Products</h6>  
                        <Link className='footer_link' to=''> Create Expert Advisor </Link> 
                        <Link className='footer_link' to=''> Hosting Bots </Link> 
                        <Link className='footer_link' to=''> Newsletter </Link> 
                        <Link className='footer_link' to=''> AI Dashboard </Link>  
                 </div>

                 <div className='col-lg-3 col-sm-12 col-md-4  d-grid text-left mb-4'>  
                     <h6 className="footer_tag">Contact</h6> 
                       <div className='d-flex mt-3'>
                            <img src={email_icon_f} alt="logo" className="pr-3" />
                            <p className='small_normal'>peepips@gmail.io</p>
                        </div>

                        <div className='d-flex mt-3'>
                            <img src={wp_icon} alt="logo" className="pr-3" />
                            <p className='small_normal'>+254799276543</p>
                        </div>
                       
                 </div> 
            </div>

            <div className=" ">
              <h6 className="text-center footer_bottom">ⓒ Peeppips. All Rights Reserved 2023</h6>
            </div>
            </Container>
        </div>
    )
}

export default Footer
