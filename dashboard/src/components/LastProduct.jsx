import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Products.css';
import Button from './Button';

class LastProduct extends Component {
	constructor() {
		super();
		this.state = {
			latestProduct: '',
		};
	}

	componentDidMount() {
		//Llama a la API que trae todos lxs users
		this.apiCall('http://localhost:3200/api/products', this.getLatestProduct);
        console.log("Last Product");
	}

	apiCall = (url, consecuencia) => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				consecuencia(data);
			})
			.catch((error) => console.log(error));
	};

	getLatestProduct = (data) => {
		let latestProductId = this.getLatestProductId(data.products);
		this.apiCall(
			`http://localhost:3200/api/products/${latestProductId}`,
			this.saveLatestProduct
		);
	};

	saveLatestProduct = (product) => {
		this.setState({
			latestProduct: product,
		});
	};

	getLatestProductId(array) {
		let ids = [];
		let latestProductId;
		array.forEach((product) => {
			ids.push(product.id);
		});
		latestProductId = Math.max(...ids);
		return latestProductId;
	}

	render() {
		//Mostrar todos lxs users en una tabla
        let product;
		let img = '';
		let attributes = [];
		if (this.state.latestProduct !== '') {
			product = this.state.latestProduct;
			img = `http://localhost:3200${product.image[0].url}`;
			attributes = product.attribute;
		} else {
			product = ['Product not found'];
		}
		return (
			<div className="latestProduct">
				{/* Mostrar datos del último user en la db */}
				<h1 className="latestProduct__title">Último producto</h1>
				<img
					className="latestProduct__image"
					src={img}
					alt="imagen de producto"
				></img>
				<h3 className="latestProduct__label">Nombre:</h3>
				<h3 className="latestProduct__value">
					{product.nombre}
				</h3>
				<h3 className="latestProduct__label">Descripción:</h3>
				<h3 className="latestProduct__value">{product.descripcion}</h3>
				<h3 className="latestProduct__label">Precio:</h3>
				<h3 className="latestProduct__value">{product.precio}</h3>
				<Button url={`/productos/${product.id}`} name="Detalle" />
			</div>
		);
	}
}

export default LastProduct;
