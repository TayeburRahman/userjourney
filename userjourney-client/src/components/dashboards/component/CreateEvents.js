import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";

import * as React from "react";
import { useForm } from "react-hook-form";
import "../../css/event.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid rgba(74, 177, 14, 0.97)",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function CreateEvents({ open, setOpen }) {
  const todaysDate = new Date().toLocaleDateString();
  const todaysTime = new Date().getTime();
  const [avatar, setFile] = React.useState()
  const [date, setDate] = React.useState(dayjs(todaysDate));
  const [time, setTime] = React.useState(dayjs(todaysTime));
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const localAuth = localStorage.getItem("auth");
  const { user } = JSON.parse(localAuth); 
  
  const onSubmit = (data) => {
    const formData = {
      title: data.title,
      description: data.description,
      spacesAvailable: data.spacesAvailable,
      time: time,
      date: date,
    };
 
    axios
      .put("http://localhost:5000/api/v1/event/creates", { user, formData, avatar},
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then((res) => { 
          alert("Successfully create Event!");
          setOpen(false);
          reset(); 
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleOnChange = (data)=>{ 
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
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add New Event
            </Typography>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)} className="d-grid">
                <label className="mt-2">Title: </label>
                <input className="event-input" {...register("title")} />

                <label className="mt-2">Spaces Available: </label>
                <input
                  type="number"
                  className="event-input"
                  {...register("spacesAvailable", { required: true })}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <label className="mt-2">Event Date: </label>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      defaultValue={dayjs("2022-04-17")}
                      value={date}
                      className="w-100"
                      onChange={(newValue) => setDate(newValue)}
                      // {...register("date", { required: true })}
                    />
                  </DemoContainer>

                  <label className="mt-2">Event Time: </label>
                  <DemoContainer components={["TimePicker", "TimePicker"]}>
                    <TimePicker
                      className="w-100"
                      onChange={(newValue) => setTime(newValue)}
                      value={time} 
                      // {...register("time", { required: true })}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <label className="mt-2">Description: </label>
                <textarea {...register("description", { required: true })} />

                <label className="mt-2">Event image: </label>
                <input type='file' name="avatar" onChange={(e)=> handleOnChange(e.target.files[0])}/>
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <input className="button-4 mt-3" type="submit" />
              </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
