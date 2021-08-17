import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import SellerDashboard from './SellerDashboard'
import ShowShopProduct from './ShowShopProduct';
import NewProduct from './NewProduct';
import SellerHome from './SellerHome';

function SellerRoutes(props) {
    const {path, url} = useRouteMatch()
    // console.log(`path - ${path} , URl - ${url}`)
    return (
        <div>
            <Switch >
                <Route path={`${path}`} exact>
                    <SellerHome user={props.user} path={path} />
                </Route>
                <Route path={`${path}/shops`} exact>
                    <SellerDashboard user={props.user} />
                </Route>
                <Route path={`${path}/shops/:shop_id`} exact>
                    <ShowShopProduct />
                </Route>
                <Route path={`${path}/shops/:shop_id/new_product`} exact>
                    <NewProduct />
                </Route>
            </Switch>
        </div>
    )
}

export default SellerRoutes
