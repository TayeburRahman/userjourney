import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import delete_svg from '../../../assets/delete.svg';
import edit_svg from '../../../assets/ep_edit.svg';
import { myUsersGet } from '../../../features/auth/authSlice';
import useAdmin from '../../../hooks/useAdmin';
import useUsers from '../../../hooks/useUsers';
import AddProject from './AddProject';
import AddUsers from './AddUsers';
import DeleteUser from './DeleteUser';
import EditUsers from './EditUser';
 

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

 
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
];

function EnhancedTableHead() {


  return (
    <TableHead>
      <TableRow>
      
          <TableCell 
            className='border-left border-top'
          >
            <TableSortLabel className='hed-title' >
              Name
            </TableSortLabel>
          </TableCell> 

          <TableCell 
            className='border-left border-top'
          >
            <TableSortLabel className='hed-title'>
            Trading
            </TableSortLabel>
          </TableCell> 

          <TableCell 
            className='border-left border-top account'
          >
            <TableSortLabel className='hed-title' >
             Accounts Email
            </TableSortLabel>
          </TableCell> 

          <TableCell 
            className='border-left border-top platform'
          >
            <TableSortLabel className='hed-title  ' >
             Broker
            </TableSortLabel>
          </TableCell> 
          
          <TableCell 
            className='border-left border-right border-top'
          >
            <TableSortLabel className='hed-title' >
            Action
            </TableSortLabel>
          </TableCell> 
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {

  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};




export default function UserListTable() {
  const [page, setPage] = useState(0); 
  const [onState, setOnState] = useState(false)
  const [mOpen, setMOpen] = useState(false); 
  const [openEditUser, setOpenEditUser] = useState(false); 
  const [openRemove, setOpenRemove] = useState(false); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [myUsers, setSubUser] = useState([])
  const [editData, setEditData] = useState([]) 
  const [removeData, setRemoveData] = useState([]) 
 
  const localAuth = localStorage?.getItem("_user");
  const _user  = JSON.parse(localAuth); 
  const {users: rows}   = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const isAdmin = useAdmin()
  const isUsers = useUsers()
 

  // console.log("rows", rows);
  
  
  useEffect(() => { 
    if(isAdmin){
       axios.get(`http://localhost:5000/api/v1/user/sub_user`)
      .then(res => { 
        setSubUser(res.data.users)  
        dispatch(myUsersGet(res.data.users))    
      })
    } 
    
    if(isUsers){
      axios.get(`http://localhost:5000/api/v1/user/sub_user/${_user?.email}`)
     .then(res => { 
     setSubUser(res.data.users)  
     dispatch(myUsersGet(res.data.users))    
     })
   }
    
    }, [onState])
 

  // page select top 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (num) => {
    setAnchorEl(null);
    setRowsPerPage(num)
  };

  const handleOpen = () => {
    setMOpen(true);
  } 
  const handleOpenEditUser = (data) => {
    setOpenEditUser(true);
    setEditData(data)
  }

  const handleOpenRemove = (data) => {
    setOpenRemove(true);
    setRemoveData(data)
  }

 
  // ----------------- 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }; 


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator())?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box className='p-3 box_peeper' sx={{ width: '100%', mb: 2 }}>

           <Box className="dp_sh_flex_box">
            <Typography className='add_project_text'>My Users</Typography>

            <button onClick={handleOpen} className='add_project_button'> Add Users</button>   
           </Box> 
           <AddProject open={mOpen} setOpen={setMOpen} onState={onState} setOnState={setOnState}/>
           <Box className="dp_sh_flex_box p-1 mb-3">
           <Box className="df_ai">
           <Typography className='entries'>Show</Typography>
           <div>
            <button
              id="basic-button"
              className="basic_button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {rowsPerPage} 
              <ExpandMoreIcon/>
            </button>
            <Menu
              id="basic-menu"
              className="basic_menu"
              anchorEl={anchorEl}
              open={open} 
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >

              {
                rows?.length < 51 && (
                  <Fragment> 
                    <MenuItem onClick={e => handleClose(10)}>10</MenuItem>
                    <MenuItem onClick={e => handleClose(25)}>25</MenuItem>
                    <MenuItem onClick={e => handleClose(50)}>50</MenuItem>
                  </Fragment>
                )
              }

              {
                rows?.length > 251 && (
                  <Fragment>
                    <MenuItem onClick={e => handleClose(100)}>100</MenuItem>
                    <MenuItem onClick={e => handleClose(150)}>150</MenuItem>
                    <MenuItem onClick={e => handleClose(250)}>250</MenuItem>
                  </Fragment>
                )
              }

              {
                rows?.length > 1001 && (
                  <Fragment>
                    <MenuItem onClick={e => handleClose(500)}>500</MenuItem>
                    <MenuItem onClick={e => handleClose(700)}>700</MenuItem>
                    <MenuItem onClick={e => handleClose(1000)}>1000</MenuItem>
                  </Fragment>
                )
              }

              {
                rows?.length > 2001 && (
                  <Fragment>
                    <MenuItem onClick={e => handleClose(1500)}>1500</MenuItem>
                    <MenuItem onClick={e => handleClose(2000)}>2000</MenuItem>
                  </Fragment>
                )
              }

              {
                rows?.length > 3001 && (
                  <Fragment>
                    <MenuItem onClick={e => handleClose(3000)}>3000</MenuItem>
                  </Fragment>
                )
              }
              {
                rows?.length > 4001 && (
                  <Fragment>
                    <MenuItem onClick={e => handleClose(4000)}>4000</MenuItem>
                  </Fragment>
                )
              }
              {
                rows?.length > 4001 && (
                  <Fragment>
                    <MenuItem onClick={e => handleClose(5000)}>5000</MenuItem>
                  </Fragment>
                )
              }

            </Menu>
          </div>

          <Typography className='entries'>Entries</Typography>
           </Box>
           <Box>

           <Search className='search_table'>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

           </Box>
           </Box> 

        <TableContainer className=' '>  
          <Table aria-labelledby="tableTitle"   >
            <EnhancedTableHead />
            <TableBody>
              {visibleRows?.map((row, index) => {

                return (
                  <TableRow
                    key={row.id}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      className='border-left pl-3'
                    >
                      {row?.name}
                    </TableCell>
                    <TableCell align="right" className='border-left'>{row?.project_name?.length}</TableCell>
                    <TableCell align="right" className='border-left account'>{row?.email}</TableCell>
                    <TableCell align="right" className='border-left platform'>{row?.broker}</TableCell>
                    <TableCell align="right" className='border-left border-right'> 
                     <Box className="w-100 d-flex dp_c_sa">
                       <button className='edit_button' onClick={e =>handleOpenEditUser(row)}> 
                         <img src={edit_svg} alt="login" className="edit_icon" />
                         <Typography className='edit_text button_name pl-2' >Edit</Typography> 
                       </button>
                       <button className='delete_button' onClick={e =>handleOpenRemove(row)}> 
                         <img src={delete_svg} alt="delete icon" className="delete_icon" />
                         <Typography className='delete_text button_name'>Remove</Typography>
                       </button>
                     </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow   >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Box>  
       <AddUsers open={mOpen} setOpen={setMOpen} onState={onState} setOnState={setOnState}/>
        <EditUsers openEditUser={openEditUser} setOpenEditUser={setOpenEditUser} editData={editData} onState={onState} setOnState={setOnState} />
        <DeleteUser openRemove={openRemove} setOpenRemove={setOpenRemove} userData={removeData} onState={onState} setOnState={setOnState} />
    </Box>
  );
}
