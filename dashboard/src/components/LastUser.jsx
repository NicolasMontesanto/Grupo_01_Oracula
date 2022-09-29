import React, { Component } from 'react';
import '../css/Users.css';
import Button from './Button';

class LastUser extends Component {
	constructor() {
		super();
		this.state = {
			latestUser: '',
		};
	}

	componentDidMount() {
		//Llama a la API que trae todos lxs users
		this.apiCall('http://localhost:3200/api/users', this.getLatestUser);
	}

	apiCall = (url, consecuencia) => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				consecuencia(data);
			})
			.catch((error) => console.log(error));
	};

	getLatestUser = (data) => {
		let latestUserId = this.getLatestUserId(data.users);
		this.apiCall(
			`http://localhost:3200/api/users/${latestUserId}`,
			this.saveLatestUser
		);
	};

	saveLatestUser = (user) => {
		this.setState({
			latestUser: user,
		});
	};

	getLatestUserId(array) {
		let ids = [];
		let latestUserId;
		array.forEach((user) => {
			ids.push(user.id);
		});
		latestUserId = Math.max(...ids);
		return latestUserId;
	}

	render() {
		//Mostrar todos lxs users en una tabla
		let latestUserImg = `http://localhost:3200${this.state.latestUser.imagen}`;
		return (
			<div className="latestUser">
				{/* Mostrar datos del último user en la db */}
				<h1 className="latestUser__title">Últimx usuarix</h1>
				<img
					className="latestUser__image"
					src={latestUserImg}
					alt="user avatar"
				></img>
				<h3 className="latestUser__label">Nombre y apellido:</h3>
				<h3 className="latestUser__value">
					{this.state.latestUser.nombre} {this.state.latestUser.apellido}
				</h3>
				<h3 className="latestUser__label">Email:</h3>
				<h3 className="latestUser__value">{this.state.latestUser.email}</h3>
				<Button url={`/users/${this.state.latestUser.id}`} name="Detalle" />
			</div>
		);
	}
}

export default LastUser;
