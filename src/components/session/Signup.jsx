import React, { Component } from 'react'
import * as Icon from 'react-bootstrap-icons';

export default class Signup extends Component {
	constructor(){
		super();
		this.selectRole = this.selectRole.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.sellerDiv = React.createRef();
		this.userDiv = React.createRef();
		this.distributeDiv = React.createRef();
	}
	selectRole = (e) =>{
		let sellerEl = this.sellerDiv.current;
		let userEl = this.userDiv.current;
		let distributeEl = this.distributeDiv.current;
		switch (e) {
			case "seller":
				sellerEl.className = "singup-op signup-active"
				userEl.className = "singup-op"
				distributeEl.className = "singup-op"
				break;

			case "user":
				sellerEl.className = "singup-op"
				userEl.className = "singup-op signup-active"
				distributeEl.className = "singup-op"
				break;

			case "dirst":
				sellerEl.className = "singup-op"
				userEl.className = "singup-op"
				distributeEl.className = "singup-op signup-active"
				break;

			default:
				break;
		}
	}
	handleSubmit = (e) =>{
		e.preventDefault();
		console.log(e);
	}
	render() {
		return (
			<div>
				<div className="container shadow mt-5">
					<div className="py-5">
						<div className="text-primary h3">Signup</div>
						<form onSubmit={()=> this.handleSubmit(this)}>
							<div className="mt-4">
								<div className="row">
									<div className="col-6">
										<input type="text" className="form-control" name="" id="f_name" placeholder="first name" />
									</div>
									<div className="col-6">
										<input type="text" className="form-control" name="" id="l_name" placeholder="last name" />
									</div>
								</div>
								<div className="mt-4">
									<input type="email" name="" id="email" className="form-control" placeholder="enter email" />
								</div>
								<div className="mt-4 row">
									<div className="col-6">
										<input type="password" className="form-control" name="" id="password" placeholder="password" />
									</div>
									<div className="col-6">
										<input type="password" className="form-control" name="" id="c-password" placeholder="confirm password" />
									</div>
								</div>
								<div className="mt-5 d-flex justify-content-evenly align-items-center">
									<div id="seller" ref={this.sellerDiv} className="singup-op" onClick={()=> this.selectRole("seller")}>
										<div className="shadow-sm p-3 rounded">
											<Icon.PersonLinesFill size={50} color={"blue"} />
											<div>
												<span>Seller</span> 
											</div>
										</div>
									</div>
									<div id="user" ref={this.userDiv} className="singup-op signup-active" onClick={()=> this.selectRole("user")}>
										<div className="shadow-sm p-3 rounded">
											<Icon.PeopleFill size={50} color={"blue"} />
											<div>
												<span>User</span> 
											</div>
										</div>
									</div>
									<div ref={this.distributeDiv} className="singup-op">
										<div className="shadow-sm p-3 rounded" onClick={()=> this.selectRole("dirst")}>
											<Icon.GeoAltFill size={50} color={"blue"} />
											<div>
												<span>Distributer</span> 
											</div>
										</div>
									</div>
								</div>
								<div className="mt-5">
									<input type="submit" value="Submit" className="btn btn-primary" />
								</div>
							</div>
						</form>	
					</div>
				</div>
			</div>
		)
	}
}
