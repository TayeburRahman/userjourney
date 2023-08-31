import { Select } from "@material-ui/core";
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
import PhoneInput from "react-phone-input-2";
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

function getStyles(name, projectName, theme) {
    return {
        fontWeight:
            projectName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}



export default function EditUsers({ openEditUser, setOpenEditUser, editData, onState, setOnState }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
 
    const [projectName, setProjectName] = useState([]);
    const [project, setProject] = useState([]);
    const [phoneNum, setPhoneNum] = useState('254 ');

    const theme = useTheme();

    const localAuth = localStorage?.getItem("_user");
    const _user = JSON.parse(localAuth);


    useEffect(() => {
        reset()
        // ---------------
        axios.get(`http://localhost:5000/api/v1/projects/get_project/${_user?.email}`)
            .then(res => {
                setProject(res.data.project)
            })
        // ------------ 
        setPhoneNum(editData?.phone_num ? editData?.phone_num : '254 ') 
        
    }, [editData, onState])

    const onSubmit = (data) => {

        const projects = projectName? projectName : editData?.project_name

        const formData = {
            name: data.name,
            old_name: editData?.name,
            password: data.password,
            broker: data.broker,
            email: data.email,
            user_email: _user?.email,
            phone_num: phoneNum,
            trading_account_number: data.trading_account_number,
            customer_email: _user?.email,
            project_name: projects,
        };

        axios
            .put(`http://localhost:5000/api/v1/user/sub_user/update/${editData?.email}`, { formData })
            .then((res) => {  
                    setOnState(onState ? false : true);
                    alert("Successfully update project!");
                    setOpenEditUser(false);
                    reset();  
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setProjectName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


  

    const handleClose = () => setOpenEditUser(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openEditUser}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openEditUser}>
                    <Box sx={style} className="modal-main">
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit New User
                        </Typography>
                        <Box>
                            <form onSubmit={handleSubmit(onSubmit)} className="d-grid">
                                <label className="label_input_text" style={{ marginBottom: "0" }}>User Name </label>
                                <input className="project-add-input" defaultValue={editData?.name} placeholder="User name" {...register("name")} />

                                <label className="label_input_text" style={{ marginBottom: "0" }}>User Email </label>
                                <input className="project-add-input" type="email" defaultValue={editData?.email} placeholder="User email" {...register("email")} />

                                <label className="label_input_text" style={{ marginBottom: "0" }}>Phone Number </label>
                                <PhoneInput
                                    className="profile_phone "
                                    placeholder="Enter phone number"
                                    defaultValue={phoneNum}
                                    value={phoneNum}
                                    required
                                    onChange={phone => setPhoneNum(phone)} />

                                <label className="label_input_text" style={{ marginBottom: "0" }}>User Password </label>
                                <input className="project-add-input" defaultValue={editData?.password} placeholder="User password" {...register("password")} />

                                <label className="label_input_text" style={{ marginBottom: "0" }}>Broker Name</label>
                                <input className="project-add-input" defaultValue={editData?.broker} placeholder="Enter broker name" {...register("broker")} />

                                <label className="label_input_text" style={{ marginBottom: "0" }}>Trading account login number </label>
                                <input className="project-add-input" defaultValue={editData?.trading_account_number} placeholder="Enter trading account number" {...register("trading_account_number")} />


                                <label className="mt-2">Projects</label>
                                <Select
                                    className="project-add-input_multiple"
                                    multiple
                                    required
                                    value={projectName?.length ? projectName : editData?.project_name}
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
                                    {project?.map((data) => (
                                        <MenuItem
                                            key={data?.id}
                                            value={data?.project_name}
                                            style={getStyles(data?.project_name, projectName, theme)}
                                        >
                                            {data?.project_name}
                                        </MenuItem>
                                    ))}
                                </Select>


                                {errors.exampleRequired && <span>This field is required</span>}

                                <Box className="add-button-box">
                                    <button className="mt-3 button-add  " type="submit">  <img src={add_icon} alt="logo" className="coles-icon" /> Update </button>

                                    <Button className="button_close mt-3 ml-2" onClick={handleClose}>   <img src={close_icon} alt="logo" className="coles-icon" />  Close</Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
