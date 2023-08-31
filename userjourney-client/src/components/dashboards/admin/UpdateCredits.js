import { Chip, MenuItem, OutlinedInput, Select, useTheme } from "@material-ui/core";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ManIcon from '@mui/icons-material/Man';
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import close_icon from "../../../assets/close.svg";
import paypal from '../../../assets/paypal.png';
import add_icon from "../../../assets/update.svg";
import { useUpdateProfileInfoMutation } from "../../../features/auth/authApi";
import { updateUserAuth } from "../../../features/auth/authSlice";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: "5px",

};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            maxWidth: 250,
        },
    },
};

function getStyles(name, accountName, theme) {
    return {
        fontWeight:
            accountName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

 


export default function UpdateCredits({ openEdit, setOpenEdit, editData, onState, setOnState }) {
    const [valuePay, setValuePay] = useState('manual') 
    const [error, setError] = useState('')
    const [names, setSubUser] = useState([])

    const [phoneNum, setPhoneNum] = useState('');
    const [whatsAppNum, setWhatsAppNum] = useState('');
    const [userName, setUserName] = useState(''); 
    const [accountName, setAccountName] = useState([]);

    const [updateProfileInfo , { data: resData, error: responseError }] = useUpdateProfileInfoMutation();
    const localAuth = localStorage?.getItem("_user");
    const _token = localStorage?.getItem("_token");
    const _user = JSON.parse(localAuth);
    const dispatch = useDispatch()
    const theme = useTheme();

    useEffect(() => {
        setUserName(_user?.name)
        setWhatsAppNum(_user?.wp_num? _user?.wp_num: '254 ')
        setPhoneNum(_user?.phone_num? _user?.phone_num: '254 ') 
    }, [openEdit])

    useEffect(() => { 
        setAccountName('')

        axios.get(`http://localhost:5000/api/v1/user/sub_user/${_user?.email}`)
            .then(res => {
                setSubUser(res.data.users)
            })
    }, [editData])



    useEffect(() => {
      if (resData?.status === "success") {  
        dispatch(updateUserAuth(resData.data))   
        setOpenEdit(false)
        alert("Successfully update your profile!");
        setError('')  
      }
      if(resData?.status === "error") {
        setError("Update request failed")
      }
    }, [resData])  
   

      const handleUpdate = async () => { 
        const wp_number = whatsAppNum.length < 6 ? '' : whatsAppNum
        const ph_number = phoneNum.length < 6 ? '' : phoneNum
        
        const useData = {
            name: userName,
            phone_num: ph_number,
            wp_num: wp_number,
            email: _user?.email
          } 
          
          let userData = { ...useData }; 
           await updateProfileInfo(userData)    
      } 

   

      const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setAccountName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleClose = () => setOpenEdit(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openEdit}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openEdit}>
                    <Box sx={style} className="modal-main">
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                        Edit Profile
                        </Typography>
                        <Box>
                          {error && <Typography className="error">{error} !!</Typography>}
                          
                         <div className='row model_box_cr'>
                            <div className='col-md-6 col-lg-6 col-sm-12 p-2'>
                            <div 
                                className="d-grid"> 
                                <label className=" color-gre m-0  " >Project Name: </label>
                                <input className="form-control" disabled type="text" required placeholder="Project Name" defaultValue={userName} onBlur={e => setUserName(e.target.value)}  />

                                <label className="color-gre m-0 pt-1  ">Email: </label>
                                <input className="form-control" disabled type="text" required placeholder="Project Name" defaultValue={_user?.email}   />

                                <label className="mt-3 color-gre" >Rate per project</label>
                                <div className='d-flex'>
                                    <AttachMoneyIcon/>
                                <input className="form-control" type="number" required placeholder="Rate per project" defaultValue={_user?.email}   /> 
                                </div> 

                                <label className="mt-3 color-gre" >Rate per person</label>
                                <div className='d-flex'>
                                    <ManIcon/>
                                <input className="form-control" type="number" required placeholder="Rate per person" defaultValue={_user?.email}   /> 
                                </div>  

                               
                             
                                 <label className="mt-2">Accounts</label>
                                <Select
                                    className="credits-add-input_multiple"
                                    multiple
                                    required
                                    value={accountName?.length ? accountName : editData?.account_name}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip className="multiple_value" key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {names?.map((user) => (
                                        <MenuItem
                                            key={user?.email}
                                            value={user?.email}
                                            style={getStyles(user?.email, accountName, theme)}
                                        >
                                            {user?.email}
                                        </MenuItem>
                                    ))}

                                </Select> 
                                 
                            </div>


                            </div>

                            <div className='col-md-6 col-lg-6 col-sm-12 p-2'>
                            <div className="d-grid"> 
                            <label className="mt-3 color-gre" >Payment method</label> 
                            <div className='payment_box'>
                                <div className='d-flex' style={{alignItems: "center", justifyContent: "center"}}>
                                <button className='pay_button mr-2' 
                                id={`${valuePay === "manual" && "pay_button_on"}`}
                                onClick={e=> setValuePay("manual")}>Pay Manual</button>

                                 <button className='pay_button'
                                 id={`${valuePay === "paypal" && "pay_button_on"}`}
                                  onClick={e=> setValuePay("paypal")}>
                                     <img src={paypal}  
                                  className='paypal_image' /> </button> 
                                </div> 
                                
                                <div className='hight_50 d_f_pay' id={`${valuePay === "manual" && "display_block"}`}>
                                    <button className='papal_pay_open'>Pay With PayPal</button> 
                                </div>

                                <div className='hight_50 ps-2' id={`${valuePay === "paypal" && "display_block"}`}>
                                 <div>
                                 <label className="mt-2 color-gre">Proof of payment :</label>
                                <textarea className="form-control" type="text" required placeholder="Project Name"   defaultValue={_user?.email}   />
                                 </div>
                                  </div>

                            </div>
                                
                            </div>  
                            </div> 
                         </div> 

                         <Box className="add-button-box">
                                    <button className="mt-3 button-add" onClick={handleUpdate} >  <img src={add_icon} alt="logo" className="coles-icon" /> Update </button>

                                    <Button className="button_close mt-3 ml-2" onClick={handleClose}>   <img src={close_icon} alt="logo" className="coles-icon" />  Close</Button>
                                </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
