import React from 'react'
import line_ch from '../../../assets/trend-up.svg'
import '../../css/project.css'
import UserCredits from '../component/UserCredits'

function Credits() {

 


    return (
        <div className='w-100' > 
         <div className='row mb-3' >
            <div className='sort_details col-6 col-md-3 col-lg-3 mb-2'  >
                <div className='sub_sort_details w-100 ' >
                    <h6 className='details_hed'>My Active Project </h6>
                    <h4 className='result_total'>20K</h4> 
                     
                </div> 
            </div>  
            <div className='sort_details col-6 col-md-3 col-lg-3 mb-2'  >
                <div className='sub_sort_details w-100 ' >
                    <h6 className='details_hed'>My Active Project </h6>
                    <h4 className='result_total'>20K</h4> 
                    <div className='content_a_c' >
                     <img src={line_ch} alt="logo" className="line_ch" />
                     <h6 className='present_total'>0.50%</h6> 
                     <h6 className='result_day'>Since yesterday</h6> 
                    </div>
                </div> 
            </div>
            <div className='sort_details col-6 col-md-3 col-lg-3 mb-2'  >
                <div className='sub_sort_details w-100 ' >
                    <h6 className='details_hed'>My Active Project </h6>
                    <h4 className='result_total'>20K</h4> 
                    <div className='content_a_c' >
                     <img src={line_ch} alt="logo" className="line_ch" />
                     <h6 className='present_total'>0.50%</h6> 
                     <h6 className='result_day'>Since yesterday</h6> 
                    </div>
                </div> 
            </div>
            <div className='sort_details col-6 col-md-3 col-lg-3 mb-2'  >
                <div className='sub_sort_details w-100 ' >
                    <h6 className='details_hed'>My Active Project </h6>
                    <h4 className='result_total'>20K</h4> 
                    <div className='content_a_c' >
                     <img src={line_ch} alt="logo" className="line_ch" />
                     <h6 className='present_total'>0.50%</h6> 
                     <h6 className='result_day'>Since yesterday</h6> 
                    </div>
                </div> 
            </div>
         </div>
          <div className=''>
            <UserCredits  />
          </div>
            
        </div>
    )
}

export default Credits
