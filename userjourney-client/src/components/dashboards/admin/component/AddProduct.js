import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import add_icon from "../../../../assets/add.svg";
import close_icon from "../../../../assets/close.svg";

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

export default function AddProduct({ open, setOpen, onState, setOnState }) {

    const [avatar, setFile] = React.useState()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const formData = {
            product_name: data.product_name,
            product_details: data.product_details
        }; 
        
        axios
            .post("http://localhost:5000/api/v1/product/new_product", { avatar, formData }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then((res) => {
                setOnState(onState ? false : true);
                alert("Successfully create product!");
                setOpen(false);
                reset(); 
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleOnChange = (data) => {
        setFile(data)
    }

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
                            Add New Product
                        </Typography>
                        <Box>
                            <form onSubmit={handleSubmit(onSubmit)} className="d-grid">
                                <label className="mt-2">Product Name </label>
                                <input className="project-add-input" required placeholder="Product Name" {...register("product_name")} />

                                <label className="mt-2">Product Image </label>
                                <input className="project-add-input p-1" required type='file' name="file" onChange={(e) => handleOnChange(e.target.files[0])} />

                                <label className="mt-2">Product Details </label>
                                <textarea className="project-add-textarea" required placeholder="Wright product details" {...register("product_details")} /> 
                                
                                {errors.exampleRequired && <span>This field is required</span>}

                                <Box className="add-button-box">
                                    <button className="mt-3 button-add" type="submit">  <img src={add_icon} alt="logo" className="coles-icon" /> Add Product</button>

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


