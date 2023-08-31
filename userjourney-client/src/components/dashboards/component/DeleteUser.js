import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import close_icon from "../../../assets/close.svg";
import remove_icon from "../../../assets/remove.svg";
 


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

 
 
 


export default function DeleteUser({ openRemove, setOpenRemove, userData, onState,setOnState}) {
   
console.log("userData", userData)
    const handleOnClick = (data) => { 

        axios
            .delete(`http://localhost:5000/api/v1/user/sub_user/delete/${userData?.id}`)
            .then((res) => {
                setOnState(onState? false : true); 
                setOpenRemove(false); 
            })
            .catch((error) => {
                console.log(error);
            });
    };
 
    const handleClose = () => setOpenRemove(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openRemove}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openRemove}>
                    <Box sx={style} className="modal-main">
                        <Typography className="model_title" id="transition-modal-title"  >
                          Remove User
                        </Typography>
                        <Box>
                        <Box>
                            <Typography className="remove-sm-text">
                            Are you sure you want to remove <span className="remove_project_name">{userData?.name}</span>?This action cannot be undone
                            </Typography>
                        </Box>
                        <Box className="add-button-box"> 
                                <button onClick={handleOnClick}  className="mt-3 button-delete" >  <img src={remove_icon} alt="logo" className="coles-icon" /> Remove</button>  
                               
                                <Button className="button_close mt-3 ml-2" onClick={handleClose}>   <img src={close_icon} alt="logo" className="coles-icon" />  Close</Button> 
                                </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
 