import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import SellerDashboard from './SellerDashboard'
import ShowSellerShop from './ShowSellerShop';
import NewProduct from './NewProduct';

function SellerRoutes() {
    const {path, url} = useRouteMatch()
    // console.log(`path - ${path} , URl - ${url}`)
    return (
        <div>
            <Switch >
                <Route path={`${path}/`} exact>
                    <SellerDashboard />
                </Route>
                <Route path={`${path}/:shop_id`} exact>
                    <ShowSellerShop />
                </Route>
                <Route path={`${path}/:shop_id/new_product`}>
                    <NewProduct />
                </Route>
            </Switch>
        </div>
    )
}

export default SellerRoutes
