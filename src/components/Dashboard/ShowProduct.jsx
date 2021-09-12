import axios from 'axios';
import React, { Component } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { FetchOnePicture } from '../SharedHooks/FetchOnePicture';
import { StoreProductToCart } from '../SharedHooks/StoreProductToCart';

export default class ShowProduct extends Component {
	constructor()
	{
		super();
		this.state= {
			products: []
		}
	}
	componentDidMount(){
		axios.get('http://localhost:3000/user/products')
		.then(res => {
			this.setState({
				products : res.data.products
			})
			console.log(res.data.products)
		})
	}
	render() {
		return (
			<div className="px-3 mt-5">
				<div className="text-primary h3 text-left d-flex">Show all products</div>
				<div className="d-flex mt-3 px-3">
					<div className="user-parent">
						{this.state.products.map((data)=>(
							<div className="py-2 shadow text-center rounded" id={data['id']}> 
								<div className="product-like-share row align-items-center">
									<div className="col-6 ">
										<Icon.Share color="royalblue" size={25} className="coursor-pointer" />
									</div>
									<div className="col-6">
										<Icon.Heart color="royalblue" size={25} className="coursor-pointer" />
									</div>
								</div>
								<div className="product-img mt-3">
									<img src={FetchOnePicture(data['product_image'])} alt="product-image" className="img" height="147px" width="73px" />
								</div>
								<div className="product-details mt-3">
									<div className="col">
										<span className="text-primary h6">{data['product_name']}</span>
									</div>
									<div>
										<span>${data['price']}</span>
									</div>
									<hr />
									<div className="buy-add row text-center d-flex">
										<div className="col-6">
											<button className="btn btn-primary btn-sm">Buy Now</button>
										</div>
										<div className="col-6">
											<button type="button" className="btn btn-warning btn-sm" onClick={()=>StoreProductToCart(data['product_name'], data['price'])} >Add Cart</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
}
