import { Container } from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.jpg';
import noto_rocket from '../../../assets/noto_rocket.svg';
import useAuth from '../../../hooks/useAuth';
import AccountMenu from './AccountMenu';
import LeftSmallNav from './AppBar';

export default function Header() {
    const isAuth = useAuth()
    const {pathname} = useLocation()
    const logoGreen = pathname === '/about' | '/contact' ? true : false; 
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className='app_bar shadow_none'>
                 <Container>
                   <Toolbar className='tool_bar' sx={{justifyContent: "space-between"}}>
                     <Box sx={{ display: "flex",  alignItems: 'center' }}>
                         <LeftSmallNav logoGreen={logoGreen} />
                       {
                        logoGreen ?(
                            <Box className="nav_width">
                            <img src={logo} alt="logo" className="logo_nav" /> 
                           </Box>

                        ):(
                            <Box className="nav_width">
                            <img src={noto_rocket} alt="logo" className="noto_rocket" />
                            <h6 className="pee_pips_nav">PeepPips</h6>
                           </Box>
                        )
                       } 
                     </Box>
                     <Box sx={{ display: "flex" }}>
                     <Box className={`${logoGreen? "nav_route_white": "nav_route"}`}>
                            <Link to="/home"> Home</Link>
                            <Link to="/about"> About</Link>
                            <Link to="/product"> Product</Link>
                            <Link to="/contact_us"> Contact</Link>
                            {
                              isAuth &&  <Link to="/dashboard"> Dashboard</Link>
                            }
                    </Box>  
                        {
                            isAuth? (
                                <AccountMenu/>
                            ):
                            (
                            <Link to="/login" className='login_button_nav'>Login</Link>
                            )
                        }
                        
                     </Box> 
                   </Toolbar>
                 </Container>
            </AppBar>
        </Box>
    );
}
