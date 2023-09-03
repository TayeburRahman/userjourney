import { Select } from "@material-ui/core";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ManIcon from '@mui/icons-material/Man';
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import Fade from "@mui/material/Fade";
import MenuItem from '@mui/material/MenuItem';
import Modal from "@mui/material/Modal";
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import close_icon from "../../../assets/close.svg";
import paypal from '../../../assets/paypal.png';
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



export default function AddCredits({ openEdit, setOpenEdit, editData, onState, setOnState }) {
    const [valuePay, setValuePay] = useState('manual')
    const { 
        reset,
        formState: { errors },
    } = useForm();

    const [file, setFile] = useState()
    const [fileName, setFileName] = useState()
    const [accountName, setAccountName] = useState([]);
    const [names, setSubUser] = useState([])
    const [rateProject, setProjectRate] = useState(10)
    const [rateParson, setParsonRate] = useState(5)
    const [totalAmount, setTotalAmount] = useState()
    const [totalParson, setTotalParson] = useState() 

    const theme = useTheme();
    const [userName, setUserName] = useState('');
    const localAuth = localStorage?.getItem("_user");
    const _user = JSON.parse(localAuth);


    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/user/get/all`)
            .then(res => {
                setSubUser(res.data)
            })

    }, [editData])

    useEffect(() => {
        if (editData?.account_name) {
            setAccountName(editData?.account_name)
        }
    }, [openEdit])



    useEffect(() => {
        let parsonAmount = accountName?.length * rateParson;
        setTotalParson(Number(parsonAmount))
        setTotalAmount(Number(parsonAmount) + Number(rateProject))
    }, [rateParson, accountName, rateProject])



    const handleAdd = async () => {

        const formData = {
            project_id: editData.id,
            project_name: editData.project_name,
            project: editData,
            account_name: accountName,
            amount: totalAmount,
            user_email: editData.user_email,
        };

        axios
            .post(`http://localhost:5000/api/v1/projects/add/credits`, { formData })
            .then((res) => {
                setOnState(onState ? false : true);
                alert("Successfully update project!");
                setOpenEdit(false);
                reset();
            })
            .catch((error) => {
                console.log(error);
            });
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
                            Add a new Credits
                        </Typography>
                        <Box>

                            <div className='row model_box_cr'>
                                <div className='col-md-6 col-lg-6 col-sm-12 p-2'>
                                    <div
                                        className="d-grid">
                                        <label className=" color-gre m-0  " >Project Name: </label>
                                        <input className="form-control" disabled type="text" required placeholder="Project Name" defaultValue={userName} onBlur={e => setUserName(e.target.value)} />

                                        <label className="color-gre m-0 pt-1  ">Email: </label>
                                        <input className="form-control" disabled type="text" required placeholder="Project Name" defaultValue={_user?.email} />

                                        <label className="mt-3 color-gre" >Rate per project</label>
                                        <div className='d-flex'>
                                            <AttachMoneyIcon />
                                            <input className="form-control" type="number" required placeholder="Rate per project" value={rateProject} onChange={e => setProjectRate(e.target.value)} />
                                        </div>

                                        <label className="mt-3 color-gre" >Rate per person</label>
                                        <div className='d-flex'>
                                            <ManIcon />
                                            <input className="form-control" type="number" required placeholder="Rate per person" value={rateParson} onChange={e => setParsonRate(e.target.value)} />
                                        </div>



                                        <label className="mt-2">Accounts</label>
                                        <Select
                                            className=" "
                                            multiple
                                            value={accountName}
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
                                        <div className='payment_box'>
                                            <h6 className=" m-0 mt-2 ps-2" >Payment method</h6>
                                            <div className='d-flex mt-3' style={{ alignItems: "center", justifyContent: "center" }}>
                                                <button className='pay_button mr-2'
                                                    id={`${valuePay === "manual" && "pay_button_on"}`}
                                                    onClick={e => setValuePay("manual")}>Pay Manual</button>

                                                <button className='pay_button'
                                                    id={`${valuePay === "paypal" && "pay_button_on"}`}
                                                    onClick={e => setValuePay("paypal")}>
                                                    <img src={paypal}
                                                        className='paypal_image' /> </button>
                                            </div>

                                            <div className='hight_50 d_f_pay' id={`${valuePay === "manual" && "display_block"}`}>
                                                <button className='papal_pay_open'>Pay With PayPal</button>
                                            </div>

                                            <div className='hight_50 ps-2' id={`${valuePay === "paypal" && "display_block"}`}>
                                                <div>
                                                    <label className="mt-2 color-gre">Proof of payment :</label>
                                                    <textarea className="form-control" type="text" placeholder="Type how the payment was taken" />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="payment_box mt-3 p-2">
                                            <h6 className="mt-2 pb-2">Credits Summary</h6>
                                            <div className="d-flex space_between">
                                                <p className="m-0">Project Rate</p> <p className="m-0"> ${rateProject}</p>
                                            </div>
                                            <div className="d-flex space_between">
                                                <p className=" ">Person Rate ({accountName?.length} ac) </p> <p className=" "> {accountName?.length} * ${rateParson}</p>
                                            </div>
                                            <div className="d-flex space_between mb-2">
                                                <p className="m-0 ">Total Amount </p> <p className="m-0"> {totalParson} + {rateProject} = ${totalAmount}</p>
                                            </div> 
                                        </div> 
                                    </div> 
                                </div>
                            </div>

                            <Box className="add-button-box">
                                <button className="mt-3 button-add" onClick={handleAdd} >  <img src={add_icon} alt="logo" className="coles-icon" /> Update </button>

                                <Button className="button_close mt-3 ml-2" onClick={handleClose}>   <img src={close_icon} alt="logo" className="coles-icon" />  Close</Button>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
