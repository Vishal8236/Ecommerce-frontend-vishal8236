import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router'

function ProductDescrption() {
    const params = useParams()
    const [product, setproduct] = useState([])
    const [product_image, setproduct_image] = useState([])
    const [dataStatus, setdataStatus] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:3000/seller/shops/${params['shop_id']}/products/${params['id']}`)
        .then((res) => {
            setproduct(res.data.product_desc);
            setproduct_image(res.data.peoduct_image);
            chackStatus(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])
    const chackStatus = (res) =>{
        res.status === 200 ? setdataStatus(true) : setdataStatus(false)
    }
    return (
        <div className="container mt-5">
            {dataStatus ?
                    <div className="row">
                        <div className="col-4">
                            <img src={product_image[0]} alt="product_image" className="img" />
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
                :
                    <div>
                        <span>Loading..............</span>
                    </div>
            }
        </div>
    )
}

export default ProductDescrption
