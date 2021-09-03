import axios from 'axios';
import {React, useState, useEffect} from 'react'
import { Link, useLocation, useParams } from "react-router-dom";
import ProductsFilter from './ProductsFilter';

export default function ShowShopProduct() {
    //state use by this component
    const { shop_id } = useParams();
    const [product, setproduct] = useState([])
    const [cloneProduct, setcloneProduct] = useState([])
    // const [Filter_products, setFilter_products] = useState([])
    const [brand_filter, setfilter] = useState([])

    //api call for fetch all products on page load
    useEffect(() => {
        axios.get(`http://localhost:3000/seller/shops/${shop_id}/products?shop_id=${shop_id}`)
        .then((res) => {
            setproduct(res.data.products);
            setcloneProduct(res.data.products);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    useEffect(() => {
        if (brand_filter) {
            var Fproduct = [];
            for (let i = 0; i < brand_filter.length; i++) {
                var temp = cloneProduct.filter((data)=>{
                    return data["brand_name"] === brand_filter[i] 
                });
                Array.prototype.push.apply(Fproduct,temp);
            }
            setproduct(Fproduct)
        }else{
            setproduct(cloneProduct)
        }
    }, [brand_filter])

    //get first image of product because there is 4 image of product
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
                <ProductsFilter filter_func={setfilter} filter_array={brand_filter}  />
            </div>
            <hr className="text-muted" />   
            <div className="parent">
                {product.map((data)=>(
                    <div className="p-3 shadow-sm rounded col-3 product-item" key={data['id']}>
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
