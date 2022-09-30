import React, { Component } from 'react';

class UserDetail extends Component {
	constructor() {
		super();
		this.state = {
			user: '',
		};
	}
    componentDidMount(){
        this.forceUpdate();
    }
	componentDidUpdate() {
        console.log("update");
		if (this.state.user === '') {
			this.apiCall(
				`http://localhost:3200/api/users/${this.props.match.params.id}`,
				this.saveUser
			);
		}
	}
	apiCall = (url, consecuencia) => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				consecuencia(data);
			})
			.catch((error) => console.log(error));
	};
	saveUser = (user) => {
		this.setState({
			user: user,
		});
	};

	render() {
		let user;
		let userImg;
		if (this.state.user !== '') {
			user = this.state.user;
			userImg = `http://localhost:3200${user.imagen}`;
		} else {
			user = ['User not found'];
		}
		console.log(userImg);
		return (
			<div className="latestUser">
				{/* Mostrar datos del último user en la db */}
				<h1 className="latestUser__title">Detalle de usuarix </h1>
				<img
					className="latestUser__image"
					src={userImg}
					alt="user avatar"
				></img>
				<h3 className="latestUser__label">Nombre y apellido:</h3>
				<h3 className="latestUser__value">
					{user.nombre} {user.apellido}
				</h3>
				<h3 className="latestUser__label">Email:</h3>
				<h3 className="latestUser__value">{user.email}</h3>
				<h3 className="latestUser__label">Dirección:</h3>
				<h3 className="latestUser__value">{user.direccion}</h3>
				<h3 className="latestUser__label">Teléfono:</h3>
				<h3 className="latestUser__value">{user.telefono}</h3>
			</div>
		);
	}
}

export default UserDetail;
