import React, { Component } from 'react'
import { FetchOnePicture } from '../../SharedHooks/FetchOnePicture'
import axios from 'axios'

export default class ShowCartProduct extends Component {
    constructor(){
        super();
        this.state = {
            cartProducts: []
        }
    }
    componentDidMount(){
        axios.get("http://localhost:3000/user/carts")
        .then((res) => {
            this.setState({
                cartProducts: res.data.products
            })
            console.log(res.data.products)

            //check products is loaded or not
            // products.length > 0 ? setisLoading(false) : setisLoading(true) 
        })
        .catch((err) => console.log(err))
    }
    render() {
        return (
            <div className="container mt-5">
                <div className="text-primary h3 text-center">Show cart products</div> 
                { this.state.cartProducts.map((item, index) => (
                    <div className="row my-5" key={index}>
                        <div className="col-sm-3 text-center">
                            <img src={`${FetchOnePicture(item['product_image'])}`} alt={item['product_name']} width="90px" height="180px" />
                        </div>
                        <div className="col-sm-9">
                            <div>
                                <span>{item['product_name']}</span>
                            </div>
                            <div>
                                <span>{item['description']}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}


// import {React ,useState, useEffect} from 'react'
// import { FetchOnePicture } from '../../SharedHooks/FetchOnePicture'

// function ShowCartProduct() {
//     const [products, setproducts] = useState([])
//     const [isLoading, setisLoading] = useState(true)

//     useEffect(() => {
        // axios.get("http://localhost:3000/user/carts")
        // .then((res) => {
        //     setproducts(res.data.products)
        //     console.log(res.data.products)

        //     //check products is loaded or not
        //     products.length > 0 ? setisLoading(false) : setisLoading(true) 
        // })
        // .catch((err) => console.log(err))
//     }, [])
//     return (
//         <div className="container mt-5">
            // <div className="text-primary h3 text-center">Show cart products</div> 
            //     { products.map((item, index) => {
            //         <div className="row">
            //             <div className="col-sm-3">
            //                 <img src={`${FetchOnePicture(item['product_image'])}`} alt={item['product_name']} />
            //             </div>
            //             <div className="col-sm-9">
            //                 <div>
            //                     <span>{item['product_name']}</span>
            //                 </div>
            //                 <div>
            //                     <span>{item['description']}</span>
            //                 </div>
            //             </div>
            //         </div>
            //     })}
//         </div>
//     )
// }

// export default ShowCartProduct
