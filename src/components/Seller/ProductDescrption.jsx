import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router'

function ProductDescrption() {
    const params = useParams()
    const [product, setproduct] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/seller/shops/${params['shop_id']}/products/${params['id']}`)
        .then((res) => {
            setproduct(res.data.product_desc);
            console.log(res.data.product_desc)
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-4">
                    <img src={getFirstImage(product['product_image'])} alt="product_image" className="img" />
                </div>
                <div className="col-8">
                    <div>
                        <div className="h2 text-secondary">{product['product_name']}</div>
                        <div>
                            <span className="text-muted">{product['description']}</span>
                            <br />
                            <span className="text-success">${product['price']}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDescrption
