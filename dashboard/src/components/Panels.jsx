import React from 'react';

function Panels(props) {
	return (
		<>
			<article className="dashboard__panel">
				<div className='panel__title-number-wrapper'>
					<h2 className="panel__title">{props.title}</h2>
					<p className="panel__number">{props.number}</p>
				</div>
				<i className="fa-solid fa-info panel__icon"></i>
			</article>
		</>
	);
}

export default Panels;
