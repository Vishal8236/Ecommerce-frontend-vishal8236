import React from 'react'
import { Link } from 'react-router-dom'

export default function SellerHome(props) {
    return (
        <div>
            <div className="container mt-5">
                <h1 className="text-primary">This is Seller Home page.</h1>
                <Link to={`${props.path}/shops`}>My Shops</Link>
            </div>
        </div>
    )
}
