import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Seller/style.css';
import * as Icon from 'react-bootstrap-icons';
import Banner from '../Shared_component/Banner';

export default class SellerDashboard extends Component {
    constructor(props)
	{
		super();
		this.state= {
			shop_info: [],
            shop_name: '',
            shop_create_res: '',
            edit_shop_name: undefined
		};
        this.createShop = this.createShop.bind(this);
        this.offHover = this.offHover.bind(this);
        this.onHover = this.onHover.bind(this);
        this.delete_shop = this.delete_shop.bind(this);
	}
    
	componentDidMount(){
		axios.get(`http://localhost:3000/seller/shops?user_id=${"2"}`)
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
        axios.delete(`http://localhost:3000/seller/delete_shop/${shop_name}`)
        .then((res)=>{
            this.setState({
                shop_info : res.data.shops,
                shop_create_res: res.data.msg,
            })
        })
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(event);
    }
    render() {
        return (
            <div className="mt-5 mx-5">
                {this.state.shop_create_res &&
                    <Banner color="success" msg={this.state.shop_create_res} />
                }
                <div className="row mt-5">
                    <div className="col-8">
                        <div className="px-1 py-4 mx-5">
                            {this.state.shop_info.length === 0 &&
                                <div className="text-danger">No shop is created till now.</div>
                            }
                            {this.state.shop_info &&
                                this.state.shop_info.map((data) => (
                                    <div className="my-4 text-left row align-items-center p-2 rounded" key={data.id} id={data.id} onMouseOver={(e)=>{this.onHover(data.id)}} onMouseOut={(e)=>{this.offHover(data.id)}}>
                                        <div className="col-1">
										    <Icon.Shop color="royalblue" size={25} className="coursor-pointer" />
                                        </div>
                                        <div className="col-11 row align-items-center">
                                            <div className="col-8">
                                                {data['shop_verify'] ?
                                                    <Link className="text-primary shop-name" to={{
                                                        pathname: `/seller/shops/${data['name']}`,
                                                        state: {shop: data}
                                                    }} >{data['name']}</Link>
                                                :
                                                    <Link className="text-primary shop-name" to={{
                                                        pathname: `/seller/shops/${data['name']}/verify-shop`,
                                                        state: {shop: data}
                                                    }} >{data['name']}</Link>
                                                }
                                            </div>
                                            {data['shop_verify'] ?
                                                <div className="col-3 d-flex justify-content-end">
                                                    <div className="mx-2" title="Edit shop">
                                                        <Icon.PencilSquare data-bs-toggle="modal" data-bs-target="#exampleModal" color="" size={25} className="coursor-pointer" onClick={(e)=>{this.setState({edit_shop_name: data['name']})}}  />
                                                    </div>
                                                    <div className="mx-2" title="Delete Shop" >
                                                        <Icon.Trash color="red" size={25} className="coursor-pointer" onClick={()=>this.delete_shop(data['name'])}  />
                                                    </div>
                                                </div>
                                            :
                                                <div className="col-3 d-flex justify-content-end">
                                                    <span className='text-danger'>Please Verify shop first</span>       
                                                </div>
                                            }
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
                {/* shop edit Modal */}
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Shop Name</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={(e)=>this.mySubmitHandler(e)}>
                                <div className="modal-body my-4">
                                    <div className="text-muted">
                                        Current Shop Name :- <strong>{this.state.edit_shop_name}</strong>
                                    </div>
                                    <input type="text" name="" className="form-control mt-3" id="" placeholder="enter new name here..." required  />        
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary btn-sm" value="Save" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
