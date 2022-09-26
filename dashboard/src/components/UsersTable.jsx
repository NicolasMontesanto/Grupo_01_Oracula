import React, { Component } from 'react';
import {Link} from "react-router-dom"

class UsersTable extends Component {
	constructor() {
		super();
		this.state = {
			array: '',
		};
	}
	componentDidUpdate() {
		if (this.state.array === '') {
			this.setArray();
		}
	}
	setArray() {
		this.setState({
			array: this.props.contenido,
		});
	}
	render() {
		let array;
		if (this.state.array === '') {
			array = [];
		} else {
			array = this.state.array;
		}
		return (
			<table className="usersTable">
				<tbody>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Email</th>
						<th>Detalle</th>
					</tr>
					{array.map((user, index) => (
						<tr key={index}>
							<td key={user.id + 1}>{user.id}</td>
							<td key={user.id + 2}>{user.name}</td>
							<td key={user.id + 3}>{user.email}</td>
							<td key={user.id + 4}><Link to={`/users/${user.id}`}><i className="fa-solid fa-circle-info"></i></Link></td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default UsersTable;
