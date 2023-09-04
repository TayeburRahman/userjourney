import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from "@mui/material/Modal";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import close_icon from "../../../assets/close.svg";




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






export default function CreditAccount({ openAccount, setOpenAccount }) {

    const [value, setValue] =  useState('Paypal');
    const [phoneNum, setPhoneNum] = useState('254 ');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleOnClick = (data) => {
    }; 

    const handleClose = () => setOpenAccount(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openAccount}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openAccount}>
                    <Box sx={style} className="modal-main-credit">
                        <Box className="d-flex justify-content">
                            <Typography className="model_title" id="transition-modal-title"  >
                                Credit Account
                            </Typography> 
                            <Button className="button_close_auto mt-3 ml-2" onClick={handleClose}>   <img src={close_icon} alt="logo" className="coles-icon" /> </Button>
                        </Box>
                        <Box>
                            <Box >
                                <h6 className="mb-3">Please select channel of payment</h6>
                                <div>
                                    <FormControl className="w-100">
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={value}
                                            onChange={handleChange}
                                            className="d-flex w-100"
                                        >
                                            <div className="d-flex justify-content w-100" >
                                                <FormControlLabel className="radio_pay" id={`${value === "M-Pesa" && "background_change"}`} value="M-Pesa" control={<Radio />} label="M-Pesa" />
                                                <FormControlLabel className="radio_pay" id={`${value === "Paypal" && "background_change"}`} value="Paypal" control={<Radio />} label="Paypal" />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </Box>

                            {
                                value === "Paypal" && (
                                    <Box className="mt-3">
                                        <label className="mt-2 text-amount-filed">Amount to be credited</label>
                                        <input className="pay-add-input" required placeholder="Amount" />
                                    </Box>
                                )
                            }

                            {value === "M-Pesa" && (
                                <Box className="mt-3">
                                    <label className="mt-2 text-amount-filed">Amount to be credited</label>
                                    <input className="pay-add-input" required placeholder="Amount" />

                                    <label className=" text-amount-filed mt-4">M-Pesa Phone Number</label>
                                    <PhoneInput
                                        className="profile_phone "
                                        placeholder="Enter phone number"
                                        defaultValue={phoneNum}
                                        value={phoneNum}
                                        required
                                        onChange={phone => setPhoneNum(phone)} />
                                </Box>
                            )
                            }
                            <Box className="add-button-box">
                                <button onClick={handleOnClick} className="mt-3 button-add" >  { value === "Paypal" ? "Next":  "Make Payment"}</button>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
