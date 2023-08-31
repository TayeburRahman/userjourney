import SwapVertIcon from '@mui/icons-material/SwapVert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import image from '../../../assets/image-d.png';
import { productListGet } from '../../../features/auth/authSlice';

function ViewProject() {
    const {id} = useParams();
    const {products}   = useSelector((state) => state.auth);
    const [product, setProduct] = useState()
    const dispatch = useDispatch()

    console.log(products)

     useEffect(() => {  

      axios.get(`http://localhost:5000/api/v1/product/get_product`)
      .then(res => { 
          dispatch(productListGet(res.data.product))    
      })
 
      const productData = products?.find(product => product.id === id)
      setProduct(productData)
        
      }, [products])

    return (
        <div className='viewProduct p-3 mb-2'>
            <div className='d-flex df-center-center mt-3 mr-4'>
               <Link to="/dashboard/products" className='link_up'>  <SwapVertIcon/> </Link>
            </div>

            <div>
              <img className="product_image_views"
                               src={`${product?.image ? `http://localhost:5000/${product?.image}` : image
                            }`}
                            />
                    
            </div>
            <div>
            <h5 className='text_large_green mt-4 mb-3'>{product?.name}</h5>
            <p className='product_details_text pb-5 text-left'>{product?.details}</p>
            </div>
            
        </div>
    )
}

export default ViewProject
