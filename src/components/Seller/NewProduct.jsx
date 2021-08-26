import {React, useState} from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import { useParams } from "react-router-dom";

function NewProduct() {
    const { shop_id } = useParams();
    const [get_image_url, setget_image_url] = useState('')
    const formik = useFormik({
        initialValues:{
            product_image: [],
            product_brand_name: '',
            product_name: '',
            product_price: '',
            product_description: '',
            product_stock: ''
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
    const store_image = () =>{
        if(formik.values.product_image.length <= 4)
        {
            formik.values.product_image.push(get_image_url);
            setget_image_url('')
        }
        else{
            window.alert("you can not add more then 5 product image.")
            setget_image_url('')
        }
    }
    return (
        <div className="container mt-5">
            <div>
                <div className="d-flex justify-content-between">
                    <input onChange={(e)=>setget_image_url(e.target.value)} type="text" value={get_image_url} name="product_image" id="" className="form-control w-75" placeholder="Put Product Image url........" />
                    <button className="btn btn-primary mt-2" type="button" onClick={()=>store_image()}>Add Image</button>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    {formik.values.product_image.map((url,index)=>(
                        <div>
                            <img key={index} src={url} alt="product-image" className="img" height="275px" width="155px" />
                        </div>
                    ))}
                </div>
                <form onSubmit={formik.handleSubmit} className="form-group mt-4">
                    <label htmlFor="ProductBrandName">Enter Product Brand Name</label>
                    <input onChange={formik.handleChange} value={formik.values.product_brand_name} type="text" name="product_brand_name" id="" className="form-control" />

                    <br />
                    <label htmlFor="ProductName">Enter Product Name</label>
                    <input onChange={formik.handleChange} value={formik.values.product_name} type="text" name="product_name" id="" className="form-control" />
                    
                    <br />
                    <label htmlFor="ProductPrice">Enter Product Price</label>
                    <input onChange={formik.handleChange} value={formik.values.product_price} type="text" name="product_price" id="" className="form-control" />

                    <br />
                    <label htmlFor="ProductDescription">Enter Product Description</label>
                    <input onChange={formik.handleChange} value={formik.values.product_description} type="text" name="product_description" id="" className="form-control" />

                    <br />
                    <label htmlFor="ProductStock">Enter Product Stocks</label>
                    <input onChange={formik.handleChange} value={formik.values.product_stock} type="text" name="product_stock" id="" className="form-control" />

                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default NewProduct
