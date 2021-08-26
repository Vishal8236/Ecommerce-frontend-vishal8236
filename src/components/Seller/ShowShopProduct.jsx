import axios from 'axios';
import {React, useState, useEffect} from 'react'
import { Link, useLocation, useParams } from "react-router-dom";

export default function ShowShopProduct() {
    const { shop_id } = useParams();
    const [product, setproduct] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3000/seller/shops/${shop_id}/products?shop_id=${shop_id}`)
        .then((res) => {
            setproduct(res.data.products);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])
    const getFirstImage = (getData) =>{
        const getImage = JSON.parse(getData);
        return getImage[0];
    }
    return (
        <div className="text-center mt-5 container">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-muted">{shop_id}</h2> 
                <Link className="btn btn-sm btn-primary" to={{
                    pathname : `${shop_id}/new_product`,
                    state: {shop_id: shop_id}
                }} >Add New Product</Link>
            </div>
            <hr className="text-muted" />   
            <div>
                {product.map((data)=>(
                    <div className="p-3 shadow-sm rounded col-3" key={data['id']}>
                        <div className="image-show">
                            <img src={getFirstImage(data['product_image'])} alt=""  height="157px" width="73px" className="img" />
                        </div>  
                        <div className="text-success mt-3">
                            <span className="h5">{data['product_name']}</span>
                        </div>
                        <div className="mt-2">
                            <Link to={{
                                pathname: `${shop_id}/products/${data['id']}`
                            }}>More Details</Link>
                        </div>
                        <div className="bg-warning mt-2 py-1 rounded">
                            <span>There is <strong>{data['avaliable']}</strong> in the stocks.</span>
                        </div>
                    </div>
                ))}
            </div>        
        </div>
    )
}
