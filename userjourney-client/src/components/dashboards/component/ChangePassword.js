import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
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



export default function ChangePassword({ openChangePass, setOpenChangePass, editData, onState,setOnState}) {
    const {
        register,
        handleSubmit, 
        reset, 
        formState: { errors },
    } = useForm();
 
    const [file, setFile] =  useState()     
    const [accountName, setAccountName] =  useState([]);
 

    const localAuth = localStorage?.getItem("_user");
    const _user  = JSON.parse(localAuth);  
  
   useEffect(() => {
        reset()
      }, [])

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
    //                 setOpenChangePass(false);
    //                 reset();
    //             }else{
    //                 alert("Error can't upload file, Please check you file!");
    //             }  
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

 

   

    const handleClose = () => setOpenChangePass(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openChangePass}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openChangePass}>
                    <Box sx={style} className="modal-main">
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit New Project
                        </Typography>
                        <Box>
                            <form 
                            // onSubmit={handleSubmit(onSubmit)}
                             className="d-grid">
                                <label className="mt-2">Project Name </label>
                                <input className="project-add-input"  required placeholder="Project Name" {...register("project_name")} /> 
                       
                            
                                

                                {errors.exampleRequired && <span>This field is required</span>}

                                <Box className="add-button-box"> 
                                <button className="mt-3 button-add"  >  <img src={add_icon} alt="logo" className="coles-icon" /> Update </button>  
                               
                                <button className="button_close mt-3 ml-2" onClick={handleClose}>   <img src={close_icon} alt="logo" className="coles-icon" />  Close</button> 
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
 