import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../views/Home.jsx';
import Users from '../views/Users.jsx';
import UserDetail from './UserDetail.jsx';
import Products from '../views/Products.jsx';
import ProductDetail from './ProductDetail.jsx';

function ContentWrapper() {
	return (
		<div className="contentWrapper" id="contentWrapper">
			<Switch>
				<Route path="/" exact>
                    <Home/>
				</Route>
				<Route path="/users" exact>
                    <Users/>
                </Route>
                <Route path="/users/:id" component={UserDetail} />
				<Route path="/productos" exact>
                    <Products/>
                </Route>
                <Route path="/productos/page/:page" exact component={Products} />
                <Route path="/productos/:id" exact component={ProductDetail} />
			</Switch>
		</div>
	);
}

export default ContentWrapper;