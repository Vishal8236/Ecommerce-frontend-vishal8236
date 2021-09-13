import React from 'react'
import { Switch ,Route,useRouteMatch} from 'react-router-dom'
import ShowCartProduct from '../cart/ShowCartProduct'
import Dashboard from '../Dashboard'

function UserRoutes() {
    const {path, url} = useRouteMatch()
    console.log('hello')
    return (
        <div>
            <Switch>
                <Route path={`${path}`} exact>
                    <Dashboard />
                </Route>
                <Route path={`${path}/cart`} exact>
                    <ShowCartProduct />
                </Route>
            </Switch>
        </div>
    )
}

export default UserRoutes
