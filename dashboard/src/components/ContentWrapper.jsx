import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Home from '../views/Home.jsx';

function ContentWrapper() {
	return (
		<div className="contentWrapper" id="contentWrapper">
			<Switch>
				<Route path="/" exact>
                    <Home/>
				</Route>
				<Route path="/usuarixs"></Route>
				<Route path="/productos"></Route>
			</Switch>
		</div>
	);
}

export default ContentWrapper;