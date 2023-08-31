import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from "react-redux";
import close_icon from "../../../assets/close.svg";
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

 


export default function UpdateCredits({ openEdit, setOpenEdit, editData, onState, setOnState }) {
 

    const [error, setError] = useState('')
    const [phoneNum, setPhoneNum] = useState('');
    const [whatsAppNum, setWhatsAppNum] = useState('');
    const [userName, setUserName] = useState(''); 

    const [updateProfileInfo , { data: resData, error: responseError }] = useUpdateProfileInfoMutation();
    const localAuth = localStorage?.getItem("_user");
    const _token = localStorage?.getItem("_token");
    const _user = JSON.parse(localAuth);
    const dispatch = useDispatch()

    useEffect(() => {
        setUserName(_user?.name)
        setWhatsAppNum(_user?.wp_num? _user?.wp_num: '254 ')
        setPhoneNum(_user?.phone_num? _user?.phone_num: '254 ') 
    }, [openEdit])



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
                            <div 
                                className="d-grid"> 
                                <label className="mt-2 color-gre" >Profile Name </label>
                                <input className="form-control" type="text" required placeholder="Project Name" defaultValue={userName} onBlur={e => setUserName(e.target.value)}  />

                                <label className="mt-3 color-gre">Email (can no't change) </label>
                                <input className="form-control" disabled type="text" required placeholder="Project Name" defaultValue={_user?.email}   />

                                <label className="mt-3 color-gre" >Phone Number </label>
                                <PhoneInput
                                className="profile_phone "  
                                placeholder="Enter phone number"
                                defaultValue={phoneNum} 
                                value={phoneNum}
                                required
                                onChange={phone=> setPhoneNum(phone)}/>

                                <label className="mt-3 color-gre" >WhatsApp Phone Number </label>
                                 <PhoneInput
                                className="profile_phone "  
                                placeholder="Enter phone number"
                                value={whatsAppNum}
                                defaultValue={whatsAppNum} 
                                onChange={phone=> setWhatsAppNum(phone)}/>  
                               

                                 <Box className="add-button-box">
                                    <button className="mt-3 button-add" onClick={handleUpdate} >  <img src={add_icon} alt="logo" className="coles-icon" /> Update </button>

                                    <Button className="button_close mt-3 ml-2" onClick={handleClose}>   <img src={close_icon} alt="logo" className="coles-icon" />  Close</Button>
                                </Box>
                            </div>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
