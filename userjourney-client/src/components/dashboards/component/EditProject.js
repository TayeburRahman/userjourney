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
import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import storage from "../../../Firebase/ConficStorage";
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

function getStyles(name, accountName, theme) {
    return {
        fontWeight:
            accountName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}



export default function EditProject({ openEdit, setOpenEdit, editData, onState, setOnState }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [file, setFile] = useState()
    const [fileName, setFileName] = useState()
    const [accountName, setAccountName] = useState([]);
    const [names, setSubUser] = useState([])
    const theme = useTheme();

    const localAuth = localStorage?.getItem("_user");
    const _user = JSON.parse(localAuth);
    const updateAccount = accountName.length ? accountName : editData?.account_name

    useEffect(() => {
        reset()
        setAccountName('')

        axios.get(`http://localhost:5000/api/v1/user/sub_user/${_user?.email}`)
            .then(res => {
                setSubUser(res.data.users)
            })
    }, [editData])

    useEffect(() => {
        const fine_name = file ? file?.name : editData?.file_name
        setFileName(fine_name)
    }, [file])


    const onSubmit = (data) => {



        const formData = {
            project_name: data.project_name,
            bot_platform: data.bot_platform,
            expected_sales: data.expected_sales,
            account_name: updateAccount,
            user_email: _user.email,
            status: editData?.status,
            file_name: fileName,
        };

        axios
            .put(`http://localhost:5000/api/v1/projects/update_project/${editData?.id}`, { formData })
            .then((res) => {

                if (file && data?.project_name === editData?.project_name) {
                    const desertRef = ref(storage, `/project/${_user?.email}/${data?.project_name}/${editData?.file_name}`);
                    deleteObject(desertRef).then(() => {
                        const storageRef = ref(storage, `/project/${_user?.email}/${data?.project_name}/${file?.name}`)
                        const uploadTask = uploadBytesResumable(storageRef, file);
                        if (uploadTask) {
                        } else {
                            alert("Error can't upload file2, Please check you file!");
                            return;
                        }
                    })

                }

                if (file && data?.project_name !== editData?.project_name) {
                    const storageRef = ref(storage, `/project/${_user?.email}/${data?.project_name}/${file?.name}`)
                    const uploadTask = uploadBytesResumable(storageRef, file);
                    if (uploadTask) {
                    } else {
                        alert("Error can't upload file2, Please check you file!");
                        return;
                    }
                }

                setOnState(onState ? false : true);
                alert("Successfully update project!");
                setOpenEdit(false);
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
        setAccountName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    const handleOnChange = (data) => {
        setFile(data)
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
                            Edit New Project
                        </Typography>
                        <Box>
                            <form onSubmit={handleSubmit(onSubmit)} className="d-grid">
                                <label className="mt-2">Project Name </label>
                                <input className="project-add-input" defaultValue={editData?.project_name} required placeholder="Project Name" {...register("project_name")} />

                                <label className="mt-2">Expected sales </label>
                                <select className="project-add-input" defaultValue={editData?.expected_sales} required placeholder="Expected sales per month" {...register("expected_sales")} >
                                <option value="0-300">0-300</option>
                                    <option value="other">300-1000</option>
                                    <option value="1000 - 10000">1000 - 10000</option>
                                    <option value="10000 and above">10000 and above</option> 
                                </select>

                                <label className="mt-2">Bot Platform </label>
                                <select {...register("bot_platform")} defaultValue={editData?.bot_platform} required className="project-add-input">  
                                    <option value="MT5">MT5</option>
                                    <option value="MT4">MT4</option>
                                    <option value="other">Python</option>
                                </select> 

                                <label className="mt-2">Bot File existing:  <span style={{color:"#f1c93b", fontWeight:"500"}}>{editData?.file_name} </span> </label>
                                <input className="project-add-input p-1" type='file' name="file" onChange={(e) => handleOnChange(e.target.files[0])} />


                                <label className="mt-2">Accounts</label>
                                <Select
                                    className="project-add-input_multiple"
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
