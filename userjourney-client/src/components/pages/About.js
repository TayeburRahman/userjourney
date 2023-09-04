import { Container } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import about_left from '../../assets/About_left.png'
import about_right from '../../assets/About_right.png'
import Footer from './sheard/Footer'
import Header from './sheard/NavBar'

function About() {
    return (
        <div>
          <div className='about'>
            <Header />
            <div  
            >
                <Container className='mt-5'>
                    <div className='about_top_bg'>
                        <div className='about_up_bg'>

                            <div className='p-4'>
                               <p className='p_product_text mt-5 text-left'>Hey Trader 🖐️,</p>

                                <h3 className='text_large_white_product mb-4 letter_spacing text-left' >About Peepips </h3> 

                                <p className='p_product_text padding_bottom_50 text-left'>We are a leading provider of coding services for trading bots, empowering clients to automate their financial market activities. With our expertise in algorithmic trading and software development, we offer customized solutions tailored to individual trading strategies and requirements. Our user-friendly platform enables clients to define their trading parameters, including market selection, indicators, risk management rules, and execution strategies. Skilled developers collaborate closely with clients throughout the project lifecycle, ensuring efficient communication and delivering high-quality trading bots.</p>
                               
                            </div>

                        </div>
                    </div>
                  </Container>
             </div>

              <div className='row padding_top_50'>
                <div className='div-md-top p-4'>
                    <h4 className='text_large_green_about text-center mt-5'>
                    Accurate Back-testing
                    </h4> 
                </div>
                <div className='col-sm-12 col-md-5 col-lg-5 position_relative  mt-5'>
                    <img src={about_left} alt="logo" className="position_absolute_about" />
                </div>
                <div className='col-sm-12 col-md-7 col-lg-7  mt-5 mt-none-sm mx-w-700 sm_text_padding'>
                    <div className=''>
                        <h4 className='md-none-dp pt-5 text_large_green_about text-left padding_bottom_50 '>
                        Accurate Back-testing
                        </h4>
                        <p className='text_sm_black text-left pb-4 pr-4'>Backed by a robust code repository with version control, we prioritize transparency and collaboration, allowing clients and developers to securely store, manage, and track trading bot source code. Our sandbox testing environment ensures thorough validation and performance evaluation, using historical market data for accurate backtesting before deployment.</p>
                    </div>
                    <div className='text-left'>
                         
                    </div>
                </div> 

              </div>

              <div className='mb-5 pb-5'>
                <div className='row flex-end'>
                    <div className='div-md-top p-4 mt-5'>
                        <h4 className='text_large_green_about text-center letter_spacing'>
                        Security, Reliability & Seamless Integration
                        </h4>
                       
                    </div>

                    <div className='col-sm-12  col-md-7 col-lg-7 text-right mt-5 mt-none-sm mx-w-700'>
                        <div className='pt-5 sm_text_padding_bottom'>
                            <h4 className='md-none-dp text_large_50_green text-left padding_bottom_50 '>
                            Security, Reliability & Seamless Integration
                            </h4>
                            <p className='text_sm_black text-left pb-4 pr-4'>At our core, we value reliability, security, and seamless integration. Our deployment capabilities ensure a smooth transition of trading bots to live platforms or backtesting environments, providing real-time automation that aligns with clients’ trading accounts and strategies.</p>
                        </div> 
                    </div>

                    <div className='col-sm-12 col-md-5 col-lg-5 position_relative_bottom mt-5'>
                        <img src={about_right} alt="logo" className="position_absolute_about_bottom" />
                    </div>  
                </div>
              </div>

              <div className='about_bg_bottom mt-4 pb-5' >
                        <Container className='pt-4'>
                        <p className='text_md_white text-left pt-5 '>Join us today and experience the power of cutting-edge technology combined with personalized coding services for trading success.</p> 

                        <p className='p_product_text padding_bottom_50 mt-5 text-left'>With a commitment to excellence, we strive to empower clients in achieving their financial goals through automated trading.</p>

                        <Link to="/login" className='link_get_start'><button className='button_get_start mb-5'>Get Started</button></Link> 
                        </Container>
                    </div>
        </div>
        <Footer/>
        </div>
    )
}

export default About
