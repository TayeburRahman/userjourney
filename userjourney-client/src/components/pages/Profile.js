import axios from "axios";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import "../../components/css/profile.css";

const Profile = () => { 
  const [eventStatus, setEventStatus] = useState(1); 
  
  const { user, friendList, userInfo, likedEvent, allEvents } = useSelector(
    (state) => state.auth
  );
  
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




  return (
    <Fragment>
    
    </Fragment>
  );
};

export default Profile;
