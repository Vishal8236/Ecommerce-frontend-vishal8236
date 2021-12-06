import { FetchOnePicture } from '../SharedHooks/FetchOnePicture';
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../Payment/CheckoutForm";
import { useLocation } from 'react-router-dom'
import axios from 'axios';
const stripePromise = loadStripe("");


const successMessage = () => {
  return (
    <div className="success-msg">
      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
      </svg>
      <div className="title">Payment Successful</div>
    </div>
  )
}

const ShowSingleProduct = (product) => {
  return (<React.Fragment>
    <h4 className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-muted">Items</span>
      <span className="badge bg-secondary badge-pill">{1}</span>
    </h4>
    <ul className="list-group mb-3">
        <li className="list-group-item text-center">
          <div>
              <img 
                src={FetchOnePicture(product['product_image'])} 
                alt={`${product['product_name']}`} 
              />
          </div>
        </li>
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">{product.product_name}</h6>
          <small className="text-muted">{product.description}</small>
        </div>
        <span className="text-muted">{product.price}</span>
      </li>
    </ul>
    <li className="list-group-item d-flex justify-content-between">
      <span>Total (INR)</span>
      <strong>₹{product.price}</strong>
    </li>
  </React.Fragment>)
}

const cart = (product, noOfItem, total_price) => {
  return (<React.Fragment>
    <h4 className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-muted">Items</span>
      <span className="badge bg-secondary badge-pill">{noOfItem}</span>
    </h4>
    {product.map((data, index)=>( 
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">{data.product_name}</h6>
            <small className="text-muted">{data.description}</small>
          </div>
          <span className="text-muted">{data.price}</span>
        </li>
      </ul>
    ))}
    <li className="list-group-item d-flex justify-content-between">
      <span>Total (INR)</span>
      <strong>₹{total_price}</strong>
    </li>
  </React.Fragment>)
}

const PaymentPage = () => {
    const [product, setproduct] = useState([])
    const [singleproduct, setsingleproduct] = useState([])
    const [noOfItem, setnoOfItem] = useState(0)
    const location = useLocation()
    const { products } = location.state
    console.log(typeof location.state.products)

    useEffect(() => {
      if (typeof location.state.products == 'number') {
        axios.get(`http://localhost:3000/user/product/${products}`)
        .then((result) => {
          setsingleproduct(result.data.product);
          setnoOfItem(Object.keys(result.data).length);        
        }).catch((err) => {
          console.log(err);
        });
      } else {
        setproduct(location.state.products);
        setnoOfItem(Object.keys(location.state.products).length);        
      }
    }, [])

    const [paymentCompleted, setPaymentCompleted] = useState(false);
    return (
        <div className="container">
            <div className="py-5 text-center">
                <h4>Secure Payment</h4>
            </div>

            <div className="row s-box">
                {paymentCompleted ? successMessage() : <React.Fragment>
                <div className="col-md-5 order-md-2 mb-4">
                    {noOfItem == 1 ? ShowSingleProduct(singleproduct) : cart(product, noOfItem, location.state.total_price)}
                </div>
                <div className="col-md-7 order-md-1">
                    <Elements stripe={stripePromise}>
                    <CheckoutForm amount={location.state.total_price} setPaymentCompleted={setPaymentCompleted} />
                    </Elements>
                </div>
                </React.Fragment>}
            </div>
        </div>
    )
}

export default PaymentPage
