import axios from 'axios';
import {React, useState, useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";

export default function ShowSellerShop() {
    const { state } = useLocation();
    const [product, setproduct] = useState([])
    useEffect(() => {
        axios.post(`http://localhost:3000/seller/${state.shop.id}/products`,{
            shop_id : state.shop.id
        })
        .then((res) => {
            setproduct(res.data.product);
        })
        console.log(state)
    }, [])
    return (
        <div className="text-center mt-5 container">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-muted">{state.shop.name}</h2> 
                <Link className="btn btn-sm btn-primary" to={{
                    pathname : `seller/${state.shop.name}/new_product`,
                    // state: {shop: state}
                }} >Add New Product</Link>
            </div>
            <hr className="text-muted" />   
            <div>
                {product.map((data)=>(
                    <div className="p-3 shadow-sm rounded col-3" key={data['id']}>
                        <div className="image-show">
                            <img src={data['product_image']} alt=""  height="147px" width="73px" className="img" />
                        </div>  
                        <div className="text-success mt-3">
                            <span className="h5">{data['product_name']}</span>
                        </div>
                        <div className="mt-2">
                            <span>${data['price']}</span>
                        </div>
                    </div>
                ))}
            </div>        
        </div>
    )
}
