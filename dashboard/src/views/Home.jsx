import React from 'react';
import Panels from '../components/Panels.jsx';
import LastUser from '../components/LastUser.jsx';
import LastProduct from '../components/LastProduct.jsx';

function Home() {
	return (
		<>
			<h1 className="title">Dashboard General</h1>
			<div className="home__panel-wrapper">
				<Panels title="Total de películas" number="40" />
				<Panels title="Total de películas" number="40" />
				<Panels title="Total de películas" number="40" />
			</div>
			<div className="home__card-wrapper">
				<LastUser />
				<LastProduct />
			</div>
		</>
	);
}

export default Home;
