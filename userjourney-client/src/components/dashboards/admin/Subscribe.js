import { Box, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";




function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Subscribe() {

    const [allEmail, setAllEmail] =  useState([]);
    const [csvData, setCsvData] =  useState([]); 

    useEffect(()=>{ 
        axios.get("http://localhost:5000/api/v1/product/get_subscribe")
        .then(res => { 
            setAllEmail(res?.data?.subscribe ) 
          
        })
      },[])

      console.log("allEmail", allEmail)
 
 
 


    return (
        <Box sx={{ width: '100%' }}>
              <Box className='p-3 box_peeper' sx={{ width: '100%', mb: 2, pb:5 }}> 
             <Typography id="transition-modal-title" variant="h6" component="h2">
             Subscribe List
              </Typography>
            <TableContainer >
            <Table   size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow> 
                        <TableCell align="right text-left"> <span className=' '>User</span></TableCell>
                        <TableCell align="right text-left"><span className=' '> Email </span></TableCell>
                        <TableCell align="right"><span className=' '> Send Time </span></TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allEmail?.map((email, idx) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderBottom:"1px solid #bfbfbf"}} 
                        >
                            <TableCell component="th" scope="row">
                               <span className='d-flex-jc-ac'> {email?.name} </span>
                            </TableCell>
                            <TableCell align="text-center"> 
                            <span className='text-center'> {email?.email} </span>
                            </TableCell>
                            <TableCell align="right"> 
                            <span className='d-flex-jc-ac'>{email?.time}</span>
                            </TableCell> 
                        </TableRow>
                    ))}
                </TableBody>
               
            </Table>
        </TableContainer>
        <Box className="mb-4">
        <CSVLink
        className="button-6 mt-4"
         data={allEmail}
       > Download CSV</CSVLink>  
        </Box>
         </Box>
        </Box>
    );
}

// .slice(0, 10)