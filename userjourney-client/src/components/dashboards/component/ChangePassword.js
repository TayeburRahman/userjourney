import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
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





export default function ChangePassword({ openChangePass, setOpenChangePass, editData, onState, setOnState }) {


    const [error, setError] = useState('')

    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState("");


    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const localAuth = localStorage?.getItem("_user");
    const _user = JSON.parse(localAuth);


    useEffect(() => {

        if (newPass === confirmPass) {
            setError(false)
        }

        const strengthChecks = {
            length: 0,
            hasUpperCase: false,
            hasLowerCase: false,
            hasDigit: false,
            hasSpecialChar: false,
        };

        strengthChecks.length = newPass?.length >= 8 ? true : false;
        strengthChecks.hasUpperCase = /[A-Z]+/.test(newPass);
        strengthChecks.hasLowerCase = /[a-z]+/.test(newPass);
        strengthChecks.hasDigit = /[0-9]+/.test(newPass);
        strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(newPass);

        let verifiedList = Object.values(strengthChecks).filter((value) => value);

        let strength =
            verifiedList.length == 5
                ? "Strong"
                : verifiedList.length >= 2
                    ? "Medium"
                    : "Weak";

        setProgress(`${(verifiedList.length / 5) * 100}%`);
        setMessage(strength);

        console.log("verifiedList: ", `${(verifiedList.length / 5) * 100}%`);


    }, [newPass, confirmPass])

    const getActiveColor = (type) => {
        if (type === "Strong") return "#8BC926";
        if (type === "Medium") return "#FEBD01";
        return "red";
    };



    const handleUpdate = async () => {
        if (newPass !== confirmPass) {
            setError('Confirm password not match')
            return
        }
        setError(false)

        const useData = {
            current_pass: currentPass,
            password: newPass
        }

        axios
            .put(`http://localhost:5000/api/v1/user/update/password/${_user?.email}`, { useData })
            .then((res) => {
                // setOnState(onState? false : true);
                alert("Successfully update Password!");
                setOpenChangePass(false);
                setError(false)
            })
            .catch((error) => { 
                let errorMessage =  error?.response?.data?.message
                setError(errorMessage)
               
            });
    }


    const handleClose = () => {
        setCurrentPass('')
        setConfirmPass('')
        setNewPass('')
        setOpenChangePass(false)
    };

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
                            Edit Profile
                        </Typography>
                        <Box>
                            {error && <Typography className="error">{error} !!</Typography>}
                            <from
                                className="d-grid">
                                <label className="mt-2 color-gre" >Current Password </label>
                                <input className="form-control" type="text" required placeholder="Enter crrent password " value={currentPass} onChange={e => setCurrentPass(e.target.value)} />

                                <label className="mt-3 color-gre">New Password</label>
                                <input className="form-control" type="text" required placeholder="New password" onChange={e => setNewPass(e.target.value)} />

                                <label className="mt-3 color-gre">Confirm Password</label>
                                <input className="form-control" type="text" required placeholder="Confirm Password" onBlur={e => setConfirmPass(e.target.value)} />

                                <div className="progress-bg">
                                    <div
                                        className="progress"
                                        style={{
                                            width: progress,
                                            backgroundColor: getActiveColor(message),
                                            marginTop: "5px",
                                            height: "4px ",
                                        }}
                                    ></div>
                                </div>

                                {newPass.length !== 0 ? (
                                    <p className="message" style={{ color: getActiveColor(message), marginBottom: "0px" }}>
                                        Your password is {message}
                                    </p>
                                ) : null}

                                <Box className="add-button-box">
                                    <button className="mt-3 button-add" onClick={handleUpdate} >  <img src={add_icon} alt="logo" className="coles-icon" /> Update </button>

                                    <Button className="button_close mt-3 ml-2" onClick={handleClose}>   <img src={close_icon} alt="logo" className="coles-icon" />  Close</Button>
                                </Box>
                            </from>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
