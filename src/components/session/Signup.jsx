import axios from 'axios';
import React, { Component } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export default class Signup extends Component {
	constructor(){
		super();
		this.state = {
			user: '',
			error: '',
			f_name: '',
			l_name: '',
			email: '',
			phone: '',
			password: undefined,
			c_password: undefined,
			role: 'user',
			form_valid: true
		}
		this.selectRole = this.selectRole.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.sellerDiv = React.createRef();
		this.userDiv = React.createRef();
		this.distributeDiv = React.createRef();
	}
	componentDidUpdate(){
		if(this.state.user)
		{
			window.location = "/dashboard"
		}
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
				this.setState({role: "seller"})
				break;

			case "user":
				sellerEl.className = "singup-op"
				userEl.className = "singup-op signup-active"
				distributeEl.className = "singup-op"
				this.setState({role: "user"})
				break;

			case "dirst":
				sellerEl.className = "singup-op"
				userEl.className = "singup-op"
				distributeEl.className = "singup-op signup-active"
				this.setState({role: "distributor"})
				break;

			default:
				break;
		}
	}
	handleSubmit = () =>{
		let full_name = this.state.f_name.concat(this.state.l_name);
		axios.post("http://localhost:3000/signup", {
			headers: {"content-type":"application/json"},
			user:{ name: full_name, email: this.state.email, phone: this.state.phone ,password: this.state.password, role: this.state.role }
		})
		.then((res)=>{
			localStorage.setItem("token", res.data.token)
			this.setState({error: res.data.error})
			this.setState({user: res.data.user})
			if(res.data.error)
			{
				this.setState({
					f_name: '',
					l_name: '',
					email: '',
					phone: '',
					password: '',
					c_password: '',
					role: 'user',
					form_valid: true
				})
			}
		})
		.catch(err => console.log(err))
	}
	check_confirm_password = () =>{
		if(this.state.password)
		{
			if (this.state.password === this.state.c_password) {
				this.setState({form_valid : false})
			}
			else{
				this.setState({form_valid : true})
			}
		}
	}
	render() {
		return (
			<div>
				<div className="container shadow mt-5">
					<div className="py-5">
						{ this.state.error &&
							<div class="alert alert-warning" role="alert">
								{this.state.error}
							</div>
						}
						<div className="text-primary h1">SIGN UP</div>
						<div className="mt-4">
							<div className="row">
								<div className="col-6">
									<input type="text" className="form-control" name="" id="f_name" placeholder="first name" value={this.state.f_name} onChange={(e)=>{this.setState({f_name:e.target.value})}} />
								</div>
								<div className="col-6">
									<input type="text" className="form-control" name="" id="l_name" placeholder="last name" value={this.state.l_name} onChange={(e)=>{this.setState({l_name:e.target.value})}} />
								</div>
							</div>
							<div className="mt-4 row">
								<div className="col-6">
									<input type="email" name="" id="email" className="form-control" placeholder="enter email" value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} />
								</div>
								<div className="col-6">
									<input type="phone" name="" id="phone" className="form-control" placeholder="phone number" value={this.state.phone} onChange={(e)=>{this.setState({phone:e.target.value})}} />
								</div>
							</div>
							<div className="mt-4 row">
								<div className="col-6">
									<input type="password" className="form-control" name="" id="password" placeholder="password" value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} />
								</div>
								<div className="col-6">
									<input type="password" className="form-control" name="" id="c-password" placeholder="confirm password" value={this.state.c_password} onChange={(e)=>{this.setState({c_password:e.target.value});}} onBlur={()=>this.check_confirm_password()} />
								</div>
							</div>
							<div className="mt-5 d-flex justify-content-evenly align-items-center">
								<input type="hidden" name="role" value={this.state.role} />
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
								<div id="distributor" ref={this.distributeDiv} className="singup-op">
									<div className="shadow-sm p-3 rounded" onClick={()=> this.selectRole("dirst")}>
										<Icon.GeoAltFill size={50} color={"blue"} />
										<div>
											<span>Distributor</span> 
										</div>
									</div>
								</div>
							</div>
							<div className="mt-5 row">
								<div className="col-sm-6">
									<Link to="/dashboard" className="btn btn-danger btn-sm w-75">cancel</Link>
								</div>
								<div className="col-sm-6">
									<input type="submit" value="Submit" className="btn btn-primary btn-sm w-75" onClick={()=>this.handleSubmit()} disabled={this.state.form_valid} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
