import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Seller/style.css';
import * as Icon from 'react-bootstrap-icons';
const cors = require('cors');

export default class SellerDashboard extends Component {
    constructor(props)
	{
		super();
		this.state= {
			shop_info: [],
            shop_name: '',
            shop_create_res: undefined
		};
        this.createShop = this.createShop.bind(this);
        this.offHover = this.offHover.bind(this);
        this.onHover = this.onHover.bind(this);
        this.delete_shop = this.delete_shop.bind(this);
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
    onHover = (id_name) =>{
        document.getElementById(id_name).classList.add("shop-shadow");
    }
    offHover = (id_name) =>{
        document.getElementById(id_name).classList.remove("shop-shadow");
    }
    delete_shop = (shop_name) =>{
        console.log(shop_name);
        axios.delete(`http://localhost:3000/seller/delete_shop/${shop_name}`)
        .then((res)=>{
            console.log(res.data.shops)
        })
    }
    render() {
        return (
            <div className="mt-5 mx-5">
                <div className="row mt-5">
                    <div className="col-8">
                        <div className="px-1 py-4 mx-5">
                            {this.state.shop_info.length == 0 &&
                                <div className="text-danger">No shop is created till now.</div>
                            }
                            {this.state.shop_info &&
                                this.state.shop_info.map((data) => (
                                    <div className="my-4 text-left row align-items-center p-2 rounded" key={data.id} id={data.id} onMouseOver={(e)=>{this.onHover(data.id)}} onMouseOut={(e)=>{this.offHover(data.id)}}>
                                        <div className="col-1">
										    <Icon.Shop color="royalblue" size={25} className="coursor-pointer" />
                                        </div>
                                        <div className="col-11 row">
                                            <div className="col-8">
                                                <Link className="text-primary shop-name" to={{
                                                    pathname: `/seller/${data['name']}`,
                                                    state: {shop: data}
                                                }} >{data['name']}</Link>
                                            </div>
                                            <div className="col-3 d-flex justify-content-end">
                                                <div className="mx-2" title="Edit shop">
                                                    <Icon.PencilSquare color="" size={25} className="coursor-pointer"  />
                                                </div>
                                                <div className="mx-2" title="Delete Shop" >
                                                    <Icon.Trash color="red" size={25} className="coursor-pointer" onClick={()=>this.delete_shop(data['name'])}  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-4 mt-5">
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
