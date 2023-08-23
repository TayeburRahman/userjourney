import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from 'react-phone-input-2';
import close_icon from "../../../assets/close.svg";
import add_icon from "../../../assets/update.svg";



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

 
 


export default function UpdateProfile({ openEdit, setOpenEdit, editData, onState, setOnState }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [file, setFile] = useState()
    const [phoneNum, setPhoneNum] = useState('254 ');
    const [whatsAppNum, setWhatsAppNum] = useState('254 ');


    const localAuth = localStorage?.getItem("_user");
    const _user = JSON.parse(localAuth);

    useEffect(() => {
        reset()
    }, [])

    console.log("phoneNum", phoneNum)

    // const onSubmit = (data) => {
    //     const formData = {
    //         project_name: data.project_name,
    //         bot_platform: data.bot_platform,
    //         expected_sales: data.expected_sales, 
    //         account_name: updateAccount,  
    //         user_email: _user.email,
    //         status: editData?.status
    //     }; 

    //     axios
    //         .put(`http://localhost:5000/api/v1/projects/update_project/${editData?.id}`, { formData })
    //         .then((res) => {

    //             const storageRef = ref(storage, `/project/${_user?.email}/${data?.project_name}/${file?.name}`)
    //             const uploadTask = uploadBytesResumable(storageRef, file);  

    //             if(uploadTask){ 
    //                 setOnState(onState? false : true);
    //                 alert("Successfully update project!");
    //                 setOpenEdit(false);
    //                 reset();
    //             }else{
    //                 alert("Error can't upload file, Please check you file!");
    //             }  
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    const constructor=(props) => {
       
       console.log(props)
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
                            <div 
                                className="d-grid"> 
                                <label className="mt-2 color-gre" >Profile Name </label>
                                <input className="form-control" type="text" required placeholder="Project Name" defaultValue={_user?.name}  />

                                <label className="mt-3 color-gre">Email (can no't change) </label>
                                <input className="form-control" disabled type="text" required placeholder="Project Name" defaultValue={_user?.email}   />

                                <label className="mt-3 color-gre" >Phone Number </label>
                                <PhoneInput
                                className="profile_phone "  
                                placeholder="Enter phone number"
                                defaultValue={_user?.phone_num} 
                                value={phoneNum}
                                onChange={phone=> setPhoneNum(phone)}/>

                                <label className="mt-3 color-gre" >WhatsApp Phone Number </label>
                                 <PhoneInput
                                className="profile_phone "  
                                placeholder="Enter phone number"
                                value={whatsAppNum}
                                defaultValue={_user?.wp_num} 
                                onChange={phone=> setWhatsAppNum(phone)}/>  
                               

                                 <Box className="add-button-box">
                                    <button className="mt-3 button-add"  >  <img src={add_icon} alt="logo" className="coles-icon" /> Update </button>

                                    <button className="button_close mt-3 ml-2" onClick={handleClose}>   <img src={close_icon} alt="logo" className="coles-icon" />  Close</button>
                                </Box>
                            </div>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
