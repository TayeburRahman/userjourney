import axios from 'axios'
import { default as React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import line_ch from '../../../assets/trend-up.svg'
import { creditsListGet, myUsersGet, productListGet, projectListGet } from '../../../features/auth/authSlice'
import useAdmin from '../../../hooks/useAdmin'
import useUsers from '../../../hooks/useUsers'
import '../../css/project.css'
import UserListTable from '../component/UserListTable'

function MyUsers() {
    const localAuth = localStorage?.getItem("_user");
    const _user  = JSON.parse(localAuth); 
    const isAdmin = useAdmin()
    const isUsers = useUsers() 

    const {project, products, users, credits}   = useSelector((state) => state.auth);
  
    const dispatch = useDispatch()
    useEffect(() => {  

        axios.get(`http://localhost:5000/api/v1/product/get_product`)
        .then(res => { 
            dispatch(productListGet(res.data?.product))    
        })

        if(isAdmin){
            axios.get(`http://localhost:5000/api/v1/user/sub_user`)
           .then(res => {  
             dispatch(myUsersGet(res.data.users))    
           })

           axios.get(`http://localhost:5000/api/v1/projects/admin/credits`)
           .then(res => {  
             dispatch(creditsListGet(res.data?.data))     
           })

           axios.get(`http://localhost:5000/api/v1/projects/get_project`)
           .then(res => {   
             dispatch(projectListGet(res.data.project))  
           })
         }else if(isUsers){
           axios.get(`http://localhost:5000/api/v1/user/sub_user/${_user?.email}`)
          .then(res => {  
          dispatch(myUsersGet(res.data.users))    
          })  
          axios.get(`http://localhost:5000/api/v1/projects/users/credits/${_user?.email}`)
          .then(res => {  
            dispatch(creditsListGet(res.data.data))     
          })
          axios.get(`http://localhost:5000/api/v1/projects/get_project/${_user?.email}`)
          .then(res => {  
            dispatch(projectListGet(res.data.project))  
          } )
        }else{
            axios.get(`http://localhost:5000/api/v1/user/sub_user/details/${_user?.email}`)
            .then(res => {   
              dispatch(projectListGet(res.data.project))  
            } )
        } 
    },[project])

    const active = project?.filter((data)=> data.status === "active");

    return (
        <div className='w-100' > 
            <div className='row mb-3' >
            <div className='sort_details col-6 col-md-3 col-lg-3 mb-2'  >
                <div className='sub_sort_details w-100 ' >
                    <h6 className='details_hed'>{isAdmin? "All": "My"} Active Project </h6>
                    <h4 className='result_total'>{active?.length}</h4> 
                     
                </div> 
            </div>  
            <div className='sort_details col-6 col-md-3 col-lg-3 mb-2'  >
                <div className='sub_sort_details w-100 ' >
                    <h6 className='details_hed'>{isAdmin? "All": "My"} Users</h6>
                    <h4 className='result_total'>{users?.length}</h4> 
                    <div className='content_a_c' >
                     <img src={line_ch} alt="logo" className="line_ch" />
                     <h6 className='present_total'>0.50%</h6> 
                     <h6 className='result_day'>Since yesterday</h6> 
                    </div>
                </div> 
            </div>
            <div className='sort_details col-6 col-md-3 col-lg-3 mb-2'  >
                <div className='sub_sort_details w-100 ' >
                    <h6 className='details_hed'>Platform Credits</h6>
                    <h4 className='result_total'>{credits?.length}</h4> 
                    <div className='content_a_c' >
                     <img src={line_ch} alt="logo" className="line_ch" />
                     <h6 className='present_total'>0.50%</h6> 
                     <h6 className='result_day'>Since yesterday</h6> 
                    </div>
                </div> 
            </div>
            <div className='sort_details col-6 col-md-3 col-lg-3 mb-2'  >
                <div className='sub_sort_details w-100 ' >
                    <h6 className='details_hed'>Platform of Product</h6>
                    <h4 className='result_total'>{products?.length}</h4> 
                    <div className='content_a_c' >
                     <img src={line_ch} alt="logo" className="line_ch" />
                     <h6 className='present_total'>0.50%</h6> 
                     <h6 className='result_day'>Since yesterday</h6> 
                    </div>
                </div> 
            </div>
         </div>
          <div className='mt-3'>
            <UserListTable  />
          </div>
            
        </div>
    )
}

export default MyUsers
