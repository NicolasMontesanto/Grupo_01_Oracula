import React from 'react';
import Panels from '../components/Panels.jsx';

function Home() {
	return (
		<div className='home__wrapper'>
            <h1 className='home__title'>Dashboard General</h1>
			<div className="home__panel-wrapper">
				<Panels title="Total de películas" number="40" />
				<Panels title="Total de películas" number="40" />
				<Panels title="Total de películas" number="40" />
			</div>
		</div>
	);
}

export default Home;
