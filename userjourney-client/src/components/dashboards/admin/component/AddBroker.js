import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import close_icon from "../../../../assets/close.svg";
import delete_svg from "../../../../assets/delete.svg";
import add_icon from "../../../../assets/update.svg";

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




export default function AddBroker({ openBroker, setOpenBroker, brokers, onState, setOnState }) {

    const [broker, setBrokerName] = useState()


    const handleBroker = async () => {
        if (broker) {
            axios
                .post("http://localhost:5000/api/v1/product/add_broker", { broker })
                .then((res) => {
                    setOnState(onState ? false : true);
                    setBrokerName('')
                    alert("Successfully Add Brokers!");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const deleteBroker = async (id) => {
        axios
            .delete(`http://localhost:5000/api/v1/product/delete_broker/${id}`)
            .then((res) => {
                setOnState(onState ? false : true);
                alert("Successfully delete broker!");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleClose = () => setOpenBroker(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openBroker}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openBroker}>
                    <Box sx={style} className="modal-main">
                        <Box>
                            <div
                                className="d-grid">

                                <div>
                                    <h5 className=" color-gre" >Brokers List</h5>
                                    <div>
                                        {
                                            brokers?.map((broker) => (
                                                <div className="d-flex">
                                                    <p className="color-gre" style={{ padding: "0", margin: "0" }}>{broker?.name}</p>
                                                    <button className="broker_button" onClick={e => deleteBroker(broker.id)}> <img src={delete_svg} alt="delete icon" className="delete_icon" /></button>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>


                                <h6 className="mt-2 color-gre" >Add New Brokers </h6>
                                <input className="form-control" type="text" required placeholder="Broker Name" defaultValue={broker} value={broker} onChange={e => setBrokerName(e.target.value)} />



                                <Box className="add-button-box">
                                    <button className="mt-3 button-add" onClick={handleBroker} >  <img src={add_icon} alt="logo" className="coles-icon" /> Add Broker </button>

                                    <Button className="button_close mt-3 ml-2" onClick={handleClose}>   <img src={close_icon} alt="logo" className="coles-icon" />  Close</Button>
                                </Box>
                            </div>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
