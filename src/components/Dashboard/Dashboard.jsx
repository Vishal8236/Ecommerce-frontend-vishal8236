import React, { Component } from 'react';
import BrandNav from './BrandNav';
import '../Dashboard/style.css';
import ItemsCategory from './ItemsCategory';
import ShowProduct from './ShowProduct';
export default class Dashboard extends Component {
	// componentDidMount()
	// {
	// 	if(localStorage.getItem("token"))
	// 	{
	// 		axios.get('http://localhost:3000/login',{
	// 			headers: {"Authenticate" : localStorage.token}
	// 		})
	// 		.then(user => {
	// 			console.log(user)
	// 		})
	// 	}	
	// }
	render() {
		return (
			<div>
				<div className="mt-5">
					<BrandNav />	
				</div>
				<div className="mt-4 border p-5 shadow">
					<ItemsCategory />
				</div>
				<div className="mt-4">
					<ShowProduct />
				</div>
			</div>
		)
	}
}
