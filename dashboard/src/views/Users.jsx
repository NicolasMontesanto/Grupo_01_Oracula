import React, { Component } from 'react';
import '../css/Users.css';
import UsersTable from '../components/UsersTable';
class Users extends Component {
	constructor() {
		super();
		this.state = {
			users: {},
			arrayUsers: [],
			latestUser: '',
		};
	}

	componentDidMount() {
		//Llama a la API que trae todos lxs users
		this.apiCall('http://localhost:3200/api/users', this.saveUsers);
	}

	componentDidUpdate() {
		//Si no hay últimx user, lx trae de la API
		if (this.state.latestUser === '') {
			let latestUserId = this.getLatestUserId(this.state.arrayUsers);
			this.apiCall(
				`http://localhost:3200/api/users/${latestUserId}`,
				this.saveLatestUser
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

	saveUsers = (datos) => {
		this.setState({
			users: datos,
			arrayUsers: datos.users,
		});
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
		return (
			<>
				<h1 className="title">Usuarixs</h1>
				<div className="usersWrapper">
					{/* Mostrar datos del último user en la db */}
					<UsersTable contenido={this.state.arrayUsers} />
				</div>
			</>
		);
	}
}

export default Users;
