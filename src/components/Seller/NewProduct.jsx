import React from 'react'
import {useFormik, Form} from 'formik'
function NewProduct() {
    const formik = useFormik({
        initialValues:{
            product_brand_name: '',
            product_name: '',
            product_price: ''
        },
        onSubmit : values =>{
            alert(JSON.stringify(values,null, 2))
        }
    })
    return (
        <div className="container mt-5">
            <div>
                <Form onSubmit={()=>formik.handleSubmit()} className="form-group">
                    <label htmlFor="ProductBrandName">Enter Product Brand Name</label>
                    <input onChange={formik.handleChange} value={formik.values.product_brand_name} type="text" name="product_brand_name" id="" className="form-control" />

                    <br />
                    <label htmlFor="ProductName">Enter Product Name</label>
                    <input onChange={formik.handleChange} value={formik.values.product_name} type="text" name="product_name" id="" className="form-control" />

<br />
                    <label htmlFor="ProductPrice">Enter Product Price</label>
                    <input onChange={formik.handleChange} value={formik.values.product_price} type="text" name="product_price" id="" className="form-control" />

                    <button className="btn btn-primary">Submit</button>
                </Form>
            </div>
        </div>
    )
}

export default NewProduct
