import React, { Component } from 'react';
import Panels from '../components/Panels.jsx';
import LastUser from '../components/LastUser.jsx';
import LastProduct from '../components/LastProduct.jsx';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			products: '',
			users: '',
		};
	}

	componentDidMount() {
		this.apiCall('http://localhost:3200/api/products', this.saveProducts);
		this.apiCall('http://localhost:3200/api/users', this.saveUsers);
	}

	apiCall = (url, consecuencia) => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				consecuencia(data);
			})
			.catch((error) => console.log(error));
	};

	saveProducts = (datos) => {
		this.setState({
			products: datos,
			arrayProducts: datos.products,
		});
	};
	
    saveUsers = (datos) => {
		this.setState({
			users: datos,
			arrayUsers: datos.users,
		});
	};

	render() {
        let usersCount;
        let productsCount;
        let categories=[];
        let categoryCount;
        let nombresCategorias = ["Juegos", "Literatura", "Baratijas", "Multimedia"];
        if (this.state.users !== ''){
            usersCount = this.state.users.count
        }
        if (this.state.products !== ''){
            productsCount = this.state.products.count
            categoryCount = this.state.products.countByCategory.length
            categories = this.state.products.countByCategory
            categories.map((category, index) => {
                category.nombre = nombresCategorias[index];
            })
        }
		return (
			<>
				<h1 className="title">Dashboard General</h1>
				<div className="home__panel-wrapper">
					<Panels title="Total de productos" number={productsCount} />
                    <Panels title="Total de usuarixs" number={usersCount} />
					<Panels title="Total de categorias" number={categoryCount} />
				</div>
                <div className="home__panel-wrapper">
					{categories.map((category, index) => (
                        <Panels key={category.nombre + index} title={`Total en ${category.nombre}`} number={category.cantidad} />

                    ))}
				</div>
				<div className="home__card-wrapper">
					<LastUser />
					<LastProduct />
				</div>
			</>
		);
	}
}

export default Home;
