import React, { Component } from 'react'
import '../session/Style.css';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

export default class Login extends Component {
	constructor(props){
		super();
		this.state={
			username:'',
			password:'',
			user:undefined,
			error:undefined
		}
		this.submitForm = this.submitForm.bind(this);
		this.responseGoogle = this.responseGoogle.bind(this);
	}
	componentDidUpdate(){
		if(this.state.user)
		{
			console.log(this.state.user['work_roles_id'])
			if(this.state.user['work_roles_id'] === 1){
				window.location = "/dashboard"
			}
			else if(this.state.user['work_roles_id'] === 2){
				window.location = "/seller"
				// this.props.history.push('/seller');
			}
			else if(this.state.user['work_roles_id'] === 3){
				window.location = "/dist_dashboard"
			}
		}
	}
	submitForm = () =>{
		axios.post('http://localhost:3000/login', {
			headers: {"content-type":"application/json"},
			user:{ username: this.state.username, password: this.state.password, provider:"greenlite" }
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
	signup(res) {
		const googleresponse = {
			Name: res.profileObj.name,
			email: res.profileObj.email,
			token: res.googleId,
			Image: res.profileObj.imageUrl,
			provider: 'google'
		};
		console.log(googleresponse);
		// axios.post('http://localhost:3000/login', googleresponse)
		// 	.then((result) => {
		// 	let responseJson = result;
		// 	sessionStorage.setItem("userData", JSON.stringify(result));
		// 	// this.props.history.push('/Dashboard')
		// });
	};
	responseGoogle = (response) => {
		console.log(response);
		var res = response.profileObj;
		console.log(res);
		this.signup(response);
	}
	render() {
		return (
			<div className="container text-center">
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
								<input className="w-50" type="email" name="email" id="" placeholder="Username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
							</div>
							<div className="mt-5">
								<input  className="w-50" type="password" name="password" id="" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
							</div>
							<div className="login-button mt-5">
								<input type="submit" name="loginbtn" id="" className="shadow" onClick={this.submitForm} className="w-50" />
							</div>
							<div className="mt-3">
								<GoogleLogin
									clientId={process.env.REACT_APP_GOOGLE_LOGIN_KEY}								
									buttonText="Signin with Google"
									onSuccess={this.responseGoogle}
									onFailure={this.responseGoogle} 
									className="w-50 text-center"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}