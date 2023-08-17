import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Box } from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

function EventLike({event, setStatus, status}) {
    const [existUser, setExistUser] = useState()
    const localAuth= localStorage.getItem('auth')
    const {user} = JSON.parse(localAuth); 
    const email = user?.email



    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/event/like/user/${event?._id}/${email}`)
          .then(res => { 
            setExistUser(res.data?.exist) 
            console.log('res.data?.exist',res.data?.exist)
          })
      }, [event, status])



    const HandleLike =(id)=>{ 

      console.log('id',email)
        axios.put(`http://localhost:5000/api/v1/event/likeEvent/${id}`, { email, available: event?.spacesAvailable })
        .then(res => {
          if (res.status === 200) {  
            setStatus(status === 1 ? 0 : 1)
          } 
          if (res.status === 201) {  
            setStatus(status === 1 ? 0 : 1)
          }
        })
    }
    return (
        <Fragment>
            <Box className="d-flex">
            <button onClick={(e)=>HandleLike(event._id)} className='likeButton' >{existUser? <ThumbUpIcon className='likeicon'/> :<ThumbUpOffAltIcon className='likeicon'/>} <span> </span></button> 
             <Box className="font-weight-bold"><h6 className='likeCount'>{event?.like.length}</h6></Box>
            </Box>
        </Fragment>
    )
}

export default EventLike
