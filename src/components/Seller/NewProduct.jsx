import React from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import { useParams } from "react-router-dom";

function NewProduct() {
    const { shop_id } = useParams();
    console.log(shop_id);
    const formik = useFormik({
        initialValues:{
            product_brand_name: '',
            product_name: '',
            product_price: '',
            product_image: '',
            product_description: ''
        },
        onSubmit : values =>{
            let data = JSON.stringify(values,null, 2)
            axios.post(`http://localhost:3000/seller/shops/${shop_id}/products`,{
                headers: {"Authenticate" : localStorage.token},
                data:{product_data: data} 
            })
            .then((res)=>{
                console.log(res);
            })
        }
    })
    return (
        <div className="container mt-5">
            <div>
                <form onSubmit={formik.handleSubmit} className="form-group">
                    <label htmlFor="ProductBrandName">Enter Product Brand Name</label>
                    <input onChange={formik.handleChange} value={formik.values.product_brand_name} type="text" name="product_brand_name" id="" className="form-control" />

                    <br />
                    <label htmlFor="ProductName">Enter Product Name</label>
                    <input onChange={formik.handleChange} value={formik.values.product_name} type="text" name="product_name" id="" className="form-control" />
                    
                    <br />
                    <label htmlFor="ProductPrice">Enter Product Price</label>
                    <input onChange={formik.handleChange} value={formik.values.product_price} type="text" name="product_price" id="" className="form-control" />

                    <br />
                    <label htmlFor="ProductPrice">Enter Product Image</label>
                    <input onChange={formik.handleChange} value={formik.values.product_image} type="text" name="product_image" id="" className="form-control" />

                    <br />
                    <label htmlFor="ProductPrice">Enter Product Description</label>
                    <input onChange={formik.handleChange} value={formik.values.product_description} type="text" name="product_description" id="" className="form-control" />

                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default NewProduct
