import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import image from '../../.././assets/image-d.png';
import { productListGet } from '../../../features/auth/authSlice';

function ProductsDashboard() {
    const [data, setProducts] = useState([])
    const dispatch = useDispatch()
    const {id} = useParams();
    const {products}   = useSelector((state) => state.auth);
    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/product/get_product`)
            .then(res => {
                setProducts(res.data.product) 
                console.log(res.data)
                dispatch(productListGet(res.data.product))    
            })
    }, [id, products])

    return (
        <div className='w-100' >
            <div>
                {
                    products?.map((product, idx) => (
                        <div key={idx} className='product_card mb-3'>
                            <div className='product_image_box p-3'>
                                <h5 className='product_name_text text-left display_none_button mb-3'>{product?.name}</h5>
                                <img
                                    alt={product?.name}
                                    className="product_image "
                                    src={`${product?.image ? `http://localhost:5000/${product?.image}` : image
                                        }`}
                                />
                            </div>
                            <div className='product_text_box mr-2 mt-2 '>
                                <div className='product_card_right'>
                                    <div className='ml-2'>
                                        <div className='card_text_box_top '>
                                            <h5 className='product_name_text display_block_button'>{product?.name}</h5>
                                            <div className='product_view_box pl-4 pr-4 display_none_button'>
                                                <Link to={`/dashboard/products/${product?.id}`} className='product_button_link'>View Product</Link>
                                            </div>
                                        </div>
                                        <p className='product_details_text pb-2'>{product?.details}</p>
                                    </div>
                                    <div className='product_view_box pl-4 pr-4 mt-3 mb-4 display_block_button'>
                                        <Link to={`/dashboard/products/${product?.id}`} className='product_button_link'>View Product</Link>
                                    </div> 
                                </div> 
                            </div>
                        </div>
                    ))
                }
            </div> 
        </div>
    )
}

export default ProductsDashboard
