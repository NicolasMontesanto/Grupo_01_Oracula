import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../views/Home.jsx';
import Users from '../views/Users.jsx';

function ContentWrapper() {
	return (
		<div className="contentWrapper" id="contentWrapper">
			<Switch>
				<Route path="/" exact>
                    <Home/>
				</Route>
				<Route path="/usuarixs">
                    <Users/>
                </Route>
				<Route path="/productos"></Route>
			</Switch>
		</div>
	);
}

export default ContentWrapper;