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
import add_icon from "../../../assets/add.svg";
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



export default function AddUsers({ open, setOpen, onState, setOnState }) {
    
    const [error, setError] = useState('')
    const [phoneNum, setPhoneNum] = useState('254 ');
    const [projectName, setProjectName] =  useState([]);
    const [projects, setAllProject] = useState([])
    const [brokers, setBrokers]= useState()
    const theme = useTheme(); 
    const {
        register,
        handleSubmit, 
        reset,
        control,
        formState: { errors },
    } = useForm();

    const localAuth = localStorage?.getItem("_user");
    const _user  = JSON.parse(localAuth); 


    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/projects/get_project/${_user?.email}`)
          .then(res => { 
            setAllProject(res.data?.project)  
          })

          axios.get(`http://localhost:5000/api/v1/product/get_broker`)
          .then(res => { 
            setBrokers(res.data?.brokers)   
          }) 
 
      }, [onState]) 

      
    const onSubmit = (data) => { 
    
        const formData = {
            name: data.name,
            password: data.password,
            broker: data.broker, 
            email: data.email,  
            user_email: _user?.email,
            phone_num: phoneNum,
            trading_account_number: data.trading_account_number,
            customer_email: _user?.email,
            project_name: projectName,
        };
 
 
        axios
            .post("http://localhost:5000/api/v1/user/create/sub_user", { formData })
            .then((res) => {   
                    setOnState(onState? false : true);   
                    setError(false);
                    alert("Successfully add a new user!");
                    setOpen(false);
                    reset();  
                 
            })
            .catch((error) => {
                setError(error?.response?.data?.error );
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


 

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style} className="modal-main">
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                        Add New Users
                        </Typography>
                        <Box>
                          {error && <Typography className="error">{error} !!</Typography>}
                            <form onSubmit={handleSubmit(onSubmit)} className="d-grid">
                                <label className="label_input_text" style={{ marginBottom: "0"}}>User Name </label>
                                <input className="project-add-input" required placeholder="User name" {...register("name")} />

                                <label className="label_input_text" style={{ marginBottom: "0"}}>User Email </label>
                                <input className="project-add-input" type="email" required placeholder="User email" {...register("email")} />

                                <label className="label_input_text" style={{ marginBottom: "0"}}>Phone Number </label>
                                <PhoneInput
                                className="profile_phone "  
                                placeholder="Enter phone number"
                                defaultValue={phoneNum} 
                                value={phoneNum}
                                required
                                onChange={phone=> setPhoneNum(phone)}/>

                                <label className="label_input_text" style={{ marginBottom: "0"}}>User Password </label>
                                <input className="project-add-input" required placeholder="User password" {...register("password")} /> 

                                <label className="label_input_text" style={{ marginBottom: "0"}}>Broker Name</label>
                                <select className="project-add-input" required placeholder="Select broker name" {...register("broker")} >
                                    {
                                        brokers?.map(broker => (
                                            <option value={broker?.name}> {broker?.name}</option>
                                        ))
                                    }
                                   
                                    
                                </select>
                             
                             
                             
                                {/* <input className="project-add-input" required placeholder="Enter broker name" {...register("broker")} />  */}

                                <label className="label_input_text" style={{ marginBottom: "0"}}>Trading account login number </label>
                                <input className="project-add-input" required placeholder="Enter trading account number" {...register("trading_account_number")} />

                                <label className="label_input_text" style={{ marginBottom: "0"}}>Projects</label> 
                                <Select 
                                    className="project-add-input_multiple" 
                                    multiple 
                                    value={projectName}
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
                                    {projects?.map((project) => (
                                        <MenuItem
                                            key={project?.id}
                                            value={project?.project_name}
                                            style={getStyles(project?.project_name, projectName, theme)}
                                        >
                                            {project?.project_name}
                                        </MenuItem>
                                    ))}
                                </Select> 
                                

                                {errors?.exampleRequired && <span>This field is required</span>}

                                <Box className="add-button-box"> 
                                 <button className="mt-3 button-add" type="submit">  <img src={add_icon} alt="logo" className="coles-icon" />Add User</button>  
                               
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

 