import './App.css';
import React, { useEffect, useState } from "react"
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import Login from './components/session/Login';
import axios from 'axios';
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from './components/Navigation/Navigation';
import Signup from './components/session/Signup';
import SellerDashboard from './components/Seller/SellerDashboard';
import DistDashboard from './components/Distributer/DistDashboard';
import ShowSellerShop from './components/Seller/ShowSellerShop';
import NewProduct from './components/Seller/NewProduct';

function App() {
  const [user, setuser] = useState([])
  useEffect(() => {
    if(localStorage.getItem("token"))
		{
			axios.get('http://localhost:3000/login',{
				headers: {"Authenticate" : localStorage.token}
			})
			.then(res => {
				setuser(res.data)
			})
		}	
  }, [])

  return (
    <div className="App1">
      <Router>
        {user.user ?  <Navigation user={user.user['name']} /> : <Navigation user="user" /> }
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/seller_dashboard">
            {user.user ?  <SellerDashboard user={user.user['id']} /> : <SellerDashboard user="2" /> }
          </Route>
          <Route path="/seller/:shop_id">
            <ShowSellerShop />
          </Route>
          <Route path="/seller/:shop_name/new_product">
            <NewProduct />
          </Route>
          <Route path="/dist_dashboard">
            <DistDashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;