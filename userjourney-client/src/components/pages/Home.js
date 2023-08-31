import { Container } from '@mui/material'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import banner_image from '../../assets/banner_image.png'
import desk_image from '../../assets/desk_image.png'
import eos_icons_ai_1 from '../../assets/eos_icons_ai_1.svg'
import eos_icons_ai_2 from '../../assets/eos_icons_ai_2.svg'
import eos_icons_ai_3 from '../../assets/eos_icons_ai_3.svg'
import image_right from '../../assets/image_right.png'
import solid_robot from '../../assets/solid_robot.svg'
import Footer from './sheard/Footer'
import Header from './sheard/NavBar'

function Home() {
    return (
        <Fragment>
            <div className='home_banner padding_bottom_50'>
                <div className='home_banner-left'>
                    <Header />
                    <Container className=''>
                        <div className='row padding_bottom_50'>
                            <div className='col-sm-12  col-md-6 col-lg-6 padding_top_50'>
                                <h4 className='text_large_white text-left padding_bottom_50 mt-5'>
                                    Powering your  <span className='text_large_green'> trading</span> success.
                                </h4>
                                <p className='text_sm_white text-left padding_bottom_50'>We help you turn your manual coding strategies into automated bots that you can resell on our platform and make an extra income.</p>
                                <div className='text-left  '>
                                    <Link to="/" className='home_button'>Get Started</Link>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>

                                <div className='top_ser_border'>
                                    <div className='bottom_ser_border'>
                                        <div className='md_ser_bg'>
                                          <img src={banner_image} alt="logo" className="banner_image" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Container>
                </div>
                <div>
                </div>
            </div>
            <div className='row padding_top_50'>
                <div className='div-md-top p-4'>
                    <h4 className='text_large_green text-center padding_bottom_50 '>
                        What’s Included
                    </h4>
                    <p className='text_sm_black text-left '>We help you turn your manual coding strategies into automated bots that you can resell on our platform and make an extra income.</p>
                </div>
                <div className='col-sm-12 col-md-6 col-lg-6 position_relative  mt-5'>
                    <img src={desk_image} alt="logo" className="position_absolute" />
                </div>
                <div className='col-sm-12  col-md-6 col-lg-6  mt-5 mt-none-sm mx-w-600'>
                    <div className='md-none-dp pt-5'>
                        <h4 className='text_large_green text-left padding_bottom_50 '>
                            What’s Included
                        </h4>
                        <p className='text_sm_black text-left pb-4 pr-4'>We help you turn your manual coding strategies into automated bots that you can resell on our platform and make an extra income.</p>
                    </div>
                    <div className='text-left'>
                        <div className='d-flex'>
                            <img src={solid_robot} alt="logo" className="pr-3" />
                            <p className='small_normal'>Get your strategy coded for MQL5 or python</p>
                        </div>

                        <div className='d-flex mt-3'>
                            <img src={solid_robot} alt="logo" className="pr-3" />
                            <p className='small_normal'>Use of AI to improve your bot</p>
                        </div>

                        <div className='d-flex mt-3'>
                            <img src={solid_robot} alt="logo" className="pr-3" />
                            <p className='small_normal'>Integration with other APIs e.g Deriv</p>
                        </div>

                        <div className='d-flex mt-3'>
                            <img src={solid_robot} alt="logo" className="pr-3" />
                            <p className='small_normal'>Backtest and bot analytics reports</p>
                        </div>

                        <div className='d-flex mt-3'>
                            <img src={solid_robot} alt="logo" className="pr-3" />
                            <p className='small_normal'>User management of the people you rent out the bot to</p>
                        </div>

                        <div className='d-flex mt-3'>
                            <img src={solid_robot} alt="logo" className="pr-3" />
                            <p className='small_normal'>Start and stop bots at the click of a button</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-image-features-top mt-4'>
                <div className='bg-image-features'>
                    <Container>
                        <div className='pt-5 text-left '>
                            <h4 className='text_large_green text-center-md padding_bottom_50 pt-4 letter_spacing'>
                                Key Features of PeepPips
                            </h4>
                            <p className='text_sm_white text-left pb-3 mb-5'>PeepPips is an all-in-one platform for building fast, testable strategies in a matter of days. It offers a range of exciting features for traders. Some of the key features are:</p>
                        </div>
                        <div className='row '>
                            <div className='col-sm-12 col-md-4 col-lg-4 pb-3'>
                                <div className='features_card'>
                                    <div className='eos_icons '>
                                        <img src={eos_icons_ai_1} alt="logo" className="" />
                                    </div>

                                    <h5 className='cart_text_lg mt-3'>AI Integration</h5>
                                    <p className='p-2 small_normal_white'>AI integration to turbo charge your strategies</p>
                                </div>

                            </div>

                            <div className='col-sm-12 col-md-4 col-lg-4 pb-3'>
                                <div className='features_card'>
                                    <div className='eos_icons '>
                                        <img src={eos_icons_ai_2} alt="logo" className="" />
                                    </div>

                                    <h5 className='cart_text_lg mt-3'>Extra Income</h5>
                                    <p className='p-2 small_normal_white'>Earn extra income from the same bot</p>
                                </div>

                            </div>

                            <div className='col-sm-12 col-md-4 col-lg-4 pb-3'>
                                <div className='features_card'>
                                    <div className='eos_icons '>
                                        <img src={eos_icons_ai_3} alt="logo" className="" />
                                    </div>

                                    <h5 className='cart_text_lg mt-3'>Intuitive Interface</h5>
                                    <p className='p-2 small_normal_white'>User-friendly interface, easy to use and understand.</p>
                                </div>

                            </div>

                        </div>
                        <div className='text-center padding_bottom_50 padding_top_50'>
                            <button className='home_button pl-5 pr-5'>Get Started</button>
                        </div>
                    </Container>
                </div>
            </div>
            <div className='mb-5 pb-5'>
                <div className='row flex-end'>
                    <div className='div-md-top p-4 mt-5'>
                        <h4 className='text_large_green text-center padding_bottom_50 letter_spacing'>
                            Why choose PeepPips for your next project?
                        </h4>
                        <p className='text_sm_black text-left '>With PeepPips, you can build a new source of income from your strategies.</p>
                    </div>

                    <div className='col-sm-12  col-md-6 col-lg-6 text-right mt-5 mt-none-sm mx-w-600'>
                        <div className='md-none-dp pt-5'>
                            <h4 className='text_large_50_green text-left padding_bottom_50 mt-5'>
                                Why choose PeepPips for your next project?
                            </h4>
                            <p className='text_sm_black text-left pb-4 pr-4'>With PeepPips, you can build a new source of income from your strategies.</p>
                        </div>
                        <div className='text-left'>
                            <div className='d-flex'>
                                <img src={solid_robot} alt="logo" className="pr-3" />
                                <p className='small_normal'>Great customer service.</p>
                            </div>

                            <div className='d-flex mt-3'>
                                <img src={solid_robot} alt="logo" className="pr-3" />
                                <p className='small_normal'>Easy to use interface.</p>
                            </div>

                            <div className='d-flex mt-3'>
                                <img src={solid_robot} alt="logo" className="pr-3" />
                                <p className='small_normal'>Built with scalability in mind.</p>
                            </div>

                            <div className='d-flex mt-3'>
                                <img src={solid_robot} alt="logo" className="pr-3" />
                                <p className='small_normal'>Built on cutting-edge technology to keep your projects up-to-date with the latest web standards.</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-12 col-md-6 col-lg-6 position_relative_bottom bg_image  mt-5'>
                        <img src={image_right} alt="logo" className="position_absolute_bottom" />
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default Home
