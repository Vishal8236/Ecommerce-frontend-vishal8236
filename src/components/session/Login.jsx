import React, { Component } from 'react'
import '../session/Style.css';
import axios from 'axios';
export default class Login extends Component {
	constructor(){
		super();
		this.state={
			username:'',
			password:'',
			user:undefined,
			error:undefined
		}
		this.submitForm = this.submitForm.bind(this);
	}
	componentDidUpdate(){
		if(this.state.user)
		{
			window.location = "/dashboard"
			// console.log(this.state.user)
		}
	}
	submitForm = () =>{
		axios.post('http://localhost:3000/login', {
			headers: {"content-type":"application/json"},
			user:{ username: this.state.username, password: this.state.password }
		})
		.then(res => {
			localStorage.setItem("token", res.data.token)
			this.setState({error: res.data.error})
			this.setState({user: res.data.user})
			if(res.data.error)
			{
				this.setState({
					username: '',
					password: ''
				})
			}
		})
	}
	render() {
		return (
			<div className="container">
				<div className="row d-flex justify-content-center vertical-center ">
					<div className="col-8 rounded shadow py-5">
						<h2>Login</h2>
						<div className="mt-5">
							{this.state.error &&
								<div className="mb-3">
									<div className="alert alert-danger" role="alert">
										Invalid email and password!
									</div>
								</div>
							}
							<div className="">
								<input type="email" name="email" id="" placeholder="Username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
							</div>
							<div className="mt-5">
								<input type="password" name="password" id="" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
							</div>
							<div className="login-button mt-5">
								<input type="submit" name="loginbtn" id="" className="shadow" onClick={this.submitForm} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
