import React from 'react'
import { Link } from 'react-router-dom';
import './style.css';
function Navigation(props) {
	return (
		<div className="w-100 shadow-lg nav-bg" style={{padding: "2px 0px"}}>
			<div className="d-flex nav-root eco-container">
				<div className="nav-root d-flex">
					<div className="nav-option">
						<Link to="/dashboard" className="nav-link text-white">Home</Link>
					</div>
					<div className="nav-option">
						<Link to="/about" className="nav-link text-white">About</Link>
					</div>
					<div className="nav-option">
						<Link to="/contact" className="nav-link text-white">Contact</Link>
					</div>
					<div className="nav-option">
						<Link to="/offer" className="nav-link text-white">Offer</Link>
					</div>
				</div>
				<div>
					<input type="text" className="form-control" style={{width:'520px'}} placeholder="Search Product" />
				</div>
				<div className="d-flex align-items-center">
					<div className="nav-option">
						<span>Hello {props.user}!</span>
					</div>
					<div className="px-4">
						<Link to="/cart"><i className="fa fa-shopping-cart text-white" style={{fontSize: '35px'}}></i></Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navigation
