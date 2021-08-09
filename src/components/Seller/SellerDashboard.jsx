import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Seller/style.css';
export default class SellerDashboard extends Component {
    constructor(props)
	{
		super();
		this.state= {
			shop_info: [],
            shop_name: undefined,
            shop_create_res: undefined
		};
        this.createShop = this.createShop.bind(this);
	}
	componentDidMount(){
		axios.post('http://localhost:3000/seller/all_shop',{
            user_id: "2"
        })
		.then(res => {
			this.setState({
				shop_info : res.data.shops
			})
		})
        .catch((err)=>{
            console.log(err);
        })
	}
    createShop(){
        console.log(this.state.shop_name);

        axios.post('http://localhost:3000/seller/create_shop',{
            shop_infos: {shop_name: this.state.shop_name, user_id: this.props.user}
        })
        .then(res => {
            this.setState({
                shop_info : res.data.shops,
                shop_create_res: res.data.message
            })
            console.log(res.data.shops)
        })
        .catch(err =>{
            console.log(err);
        })
    }
    render() {
        return (
            <div className="mt-5 mx-5">
                <div className="text-primary text-center h3">Welcome to in eCommerce platform!</div>
                <div className="row mt-5">
                    <div className="col-8">
                        <div className="px-1 py-4 mx-5">
                            {this.state.shop_info.length == 0 &&
                                <div className="text-danger">No shop is created till now.</div>
                            }
                            {this.state.shop_info &&
                                this.state.shop_info.map((data) => (
                                    <div className="mb-3 text-left" key={data.id} id={data.id}>
                                        <Link className="text-primary" to={{
                                            pathname: `/seller/${data['name']}`,
                                            state: {shop: data}
                                        }} >{data['name']}</Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="shadow-lg px-3 py-4 mx-5">
                            <div className="col-sm-10">
                                <input type="text" 
                                    className="create-shop-textbox" 
                                    placeholder="Create a new shop by enter name" 
                                    value={this.state.shop_name}
                                    onChange={(e)=>{this.setState({shop_name: e.target.value})}} />
                            </div>
                            <div className="mt-4">
                                <button className="btn btn-info" onClick={()=>this.createShop()}>Create Shop</button>
                            </div>
                            <div className="mt-4">
                                <div className="text-secondary">👇 Remamber below points 👇</div>
                                <ul className="mt-2">
                                    <li>Shop name Should be unique.</li>
                                    <li>Maximum 250 characters.</li>
                                    <li>Minimum 20 characters.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
