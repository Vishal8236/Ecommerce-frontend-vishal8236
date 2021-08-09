import axios from 'axios';
import {React, useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";

export default function ShowSellerShop() {
    const { state } = useLocation();
    const [product, setproduct] = useState([])
    useEffect(() => {
        axios.post(`http://localhost:3000/seller/${state.shop.id}/products`,{
            shop_id : state.shop.id
        })
        .then((res) => {
            setproduct(res.data.product);
            console.log(product);
            console.log(res.data.product);
        })
    }, [])
    return (
        <div className="text-center mt-5 container">
            <h2 className="text-muted">{state.shop.name}</h2>            
            <hr className="text-muted" />   
            <div>
                {product.map((data)=>(
                    <div className="p-3 shadow-sm rounded col-3" key={data['id']}>
                        <div className="image-show">
                            <img src={data['product_image']} alt=""  height="147px" width="73px" className="img" />
                        </div>  
                        <div className="text-success mt-3">
                            <span>{data['product_name']}</span>
                        </div>
                    </div>
                ))}
            </div>        
        </div>
    )
}
