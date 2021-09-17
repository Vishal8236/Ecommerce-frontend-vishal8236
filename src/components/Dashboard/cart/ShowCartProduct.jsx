import React, { Component } from 'react'
import { FetchOnePicture } from '../../SharedHooks/FetchOnePicture'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Banner from '../../Shared_component/Banner';

export default class ShowCartProduct extends Component {
    constructor(){
        super();
        this.state = {
            cartProducts: [],
            price: 0,
            cart_products_id: [],
            msg: ''
        }
        this.TotalPriceCount = this.TotalPriceCount.bind(this);
        this.RemoveItem = this.RemoveItem.bind(this);
    }
    componentDidMount(){
        axios.get("http://localhost:3000/user/carts")
        .then((res) => {
            this.setState({
                cartProducts: res.data.products,
                cart_products_id: res.data.cart_product_id
            })
        })
        .catch((err) => console.log(err))
        .finally(()=>{
            let calculate_price = this.TotalPriceCount();
            this.setState({
                price : calculate_price
            })
        })
    }
    TotalPriceCount = () =>{
        if (this.state.cartProducts) {
            let TotalPrice = 0;
            this.state.cartProducts.map((item) =>{
                let getItem = item['price']

                //remove , from price
                let replacePrice = getItem.replace(/,/g, '');

                //convert string to int
                let priceNum = parseInt(replacePrice);

                //add price
                TotalPrice += priceNum;
            });
            return TotalPrice;
        }
    }
    RemoveItem = (itemId) =>{
        console.log(itemId['id'])
        let cart_product_id = itemId['id'];
        axios.delete(`http://localhost:3000/user/carts/${cart_product_id}`)
        .then((res) => {
            this.setState({
                cartProducts: res.data.products,
                cart_products_id: res.data.cart_product_id,
                msg: res.data.msg
            })
        })
        .catch((err) => console.log(err))
        .finally(()=>{
            let calculate_price = this.TotalPriceCount();
            this.setState({
                price : calculate_price
            })
        })
    }
    render() {
        return (
            <div className="">
                {this.state.msg &&
                    <Banner color="success" msg={this.state.msg} />
                }
                <div className="container mt-5">
                    <div className="text-primary h3 text-center">Show cart products</div> 
                    { this.state.cartProducts.map((item, index) => (
                        <div className="shadow rounded py-3 row my-5" key={index}>
                            <div className="col-sm-3 text-center">
                                <img src={`${FetchOnePicture(item['product_image'])}`} alt={item['product_name']} width="121px" height="241px" />
                            </div>
                            <div className="col-sm-6">
                                <div>
                                    <span className="h5">{item['product_name']}</span>
                                </div>
                                <div className="mt-2">
                                    <span>{item['description']}</span>
                                </div>
                                <div>
                                    <span >${item['price']}</span>
                                </div>
                                <div>
                                    <Link to="/"> More details...</Link>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div>
                                    <button className="w-100 btn btn-warning">Buy Now</button>
                                </div>
                                <div className="my-3">
                                    <button type="button" onClick={()=>this.RemoveItem(this.state.cart_products_id[index])} className="w-100 btn btn-danger">Remove Item</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="shadow rounded py-3 my-5 row text-center">
                        <div className="col-sm-6">
                            <span className="h5 text-success">Total Price - </span>
                        </div>
                        <div className="col-sm-6">
                            <span>${this.state.price}</span>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
