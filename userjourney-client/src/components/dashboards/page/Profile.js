import { Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import email from "../../../assets/email.svg";
import w_edit_icon from "../../../assets/ep_edit.svg";
import logo from "../../../assets/profile.avif";
import edit_icon from "../../../assets/update.svg";
import "../../../components/css/profile.css";
import ChangePassword from "../component/ChangePassword";
import UpdateProfile from "../component/UpdateProfile";

const Profile = () => { 
  const [eventStatus, setEventStatus] = useState(1); 
  const [openEdit, setOpenEdit] = useState(false); 
  const [openChangePass, setOpenChangePass] = useState(false); 
  
  const { user, friendList, userInfo, likedEvent, allEvents } = useSelector(
    (state) => state.auth
  );

  const localAuth = localStorage?.getItem("_user");
  const _user  = JSON.parse(localAuth); 
  
  const DeleteEvent = (id) => {
    axios
      .delete(`http://localhost:5000/api/v1/event/delete/${id}`)
      .then((res) => {
        alert("Successfully delete Event!");
        setEventStatus(eventStatus === 1 ? 0 : 1);
      });
  };
  const handleOnChange = (avatar, popupState)=>{ 
    axios.put(`http://localhost:5000/api/v1/user/update/profile/${userInfo?.email}`, { avatar},
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then((res) => { 
          alert("Successfully Update Profile Image!"); 
      
          popupState?.close()
      })
      .catch((error) => {
        console.log(error);
      });
} 

const handleChangePassword = () =>{
  setOpenChangePass(true)
}

const handleUpdate = () =>{
  setOpenEdit(true)
}



  return (
  
       <div className="w-100" >

        <div className="profile_bg_top">
           <div row className="details_box ">
             <div className=" p-3 row">
             <div className="d-flex property_end col-sm-12 col-md-6 col-lg-6">
               <img src={logo} alt="logo" className="profile_image" />
               <div className="d-grid ml-1" >
                <Typography className="profile_title"  >
                       {_user?.name}
                </Typography>
                <div className="d-flex mt-1">
                <img src={email} alt="logo" className="noto_rocket" />
                <Typography className="email_text mt-1"  >
                       {_user?.email}
                </Typography>
                </div>
                
             </div>
             </div>

             <div className="d-flex mt-3 col-sm-12 col-md-6 col-lg-6">
              <button className="  button-change mr-2" onClick={handleChangePassword} >  <img src={w_edit_icon} alt="logo" className="icon_edit_profile"  /> Change Password </button>
                <button className="button_edit_profile" onClick={handleUpdate} >  <img src={edit_icon} alt="logo" className="icon_edit_profile" /> Edit Profile </button>  
             </div> 
             </div> 
           </div>
        </div>

        <div>
            <div className=" p-3 row mt-5">
                <div className=" col-sm-12 col-md-6 col-lg-6 mt-3">
                  <Typography className="phone_text">Phone Number</Typography> 
                  <Typography className="show_p_number">+000 0000000000</Typography> 
                </div>

                <div className=" col-sm-12 col-md-6 col-lg-6 mt-3">
                  <Typography className="phone_text">Whatsapp Phone Number</Typography> 
                  <Typography className="show_p_number">+000 0000000000</Typography> 
                </div>
             </div> 
        </div>
        <UpdateProfile setOpenEdit={setOpenEdit} openEdit={openEdit} />
        <ChangePassword openChangePass={openChangePass} setOpenChangePass={setOpenChangePass} />

       </div> 
  );
};

export default Profile;
