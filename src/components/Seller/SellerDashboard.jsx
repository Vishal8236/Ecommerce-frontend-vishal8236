import React, { Component } from 'react'
import axios from 'axios'
export default class SellerDashboard extends Component {
    constructor()
	{
		super();
		this.state= {
			shop_info: []
		}
	}
	componentDidMount(){
		axios.post('http://localhost:3000/seller/all_shop',{
            user_id: "2"
        })
		.then(res => {
			this.setState({
				shop_info : res.data.shops
			})
			console.log("shop data = ",this.state.shop_info)
		})
	}
    render() {
        return (
            <div className="mt-5">
                <div className="text-primary text-center h3">Welcome to in eCommerce platform!</div>
                <div className="container">
                    <div className="mt-5">
                        <input type="text" className="form-control" placeholder="Create a new shop" />
                    </div>
                    <div className="mt-5">
                        {this.state.shop_info.length == 0 &&
                            <div className="text-danger">No shop is created till now.</div>
                        }
                        {this.state.shop_info &&
                            this.state.shop_info.map((data) => (
                                <div className="mb-3 text-left">
                                    <div className="text-primary">{data['name']}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}
