import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ContactUs() {

    const [contacts, setContacts]= useState()
    useEffect(() => { 
          axios.get(`http://localhost:5000/api/v1/user/get_contact`)
          .then(res => { 
            setContacts(res.data?.contact)   
          }) 
 
      }, []) 

      console.log('contacts', contacts)
    return (
        <Box sx={{ width: '100%' }}>
        <Box className='p-3 box_peeper' sx={{ width: '100%', mb: 2, pb:5 }}> 
       <Typography id="transition-modal-title  " variant="h6" component="h2">
          Contact Message
        </Typography>
       <div className='mt-5 mb-4'>
       <div className='row'>
            {
                contacts && contacts?.map((contact) => ( 
                    <div className='col-md-6 col-lg-6 col-sm-12 mb-2'>
                    <div className='box_us '> 
                        <div className='name_box_us'>
                          <Typography className='label_input_text wh-50'> Name: {contact?.name}</Typography>
                          {
                            contact?.company_name && (
                                <Typography className='label_input_text wh-50'>Company name:{contact?.company_name} </Typography>
                            )
                          }
                         
                        </div>
                        <div className='name_box_us '>
                          <Typography className='label_input_text wh-50'> Email: {contact?.email} </Typography>
                          <Typography className='label_input_text wh-50' > Phone:{contact?.phone} </Typography>
                        </div>
                        <Typography className='text-left mt-3'> Message: <span onChange="label_input_text">{contact?.massage} </span></Typography> 
                    </div> 
                    </div>  
                ))
            }
        
        </div>
       </div>
        </Box>
        </Box>

    )
}

export default ContactUs
