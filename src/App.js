import './App.css';
import React, { useEffect, useState } from "react"
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Switch,Route, Redirect } from "react-router-dom";
import Login from './components/session/Login';
import axios from 'axios';
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from './components/Navigation/Navigation';
import Signup from './components/session/Signup';
import DistDashboard from './components/Distributer/DistDashboard';
import SellerRoutes from './components/Seller/SellerRoutes';

function App(props) {
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
            {localStorage.token ? <Redirect push to="/" />: <Login /> }
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/seller">
            {user.user ?  <SellerRoutes user={user.user['id']} /> : <SellerRoutes user="2" /> }
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