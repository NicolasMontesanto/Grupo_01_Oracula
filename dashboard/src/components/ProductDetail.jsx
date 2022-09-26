import React, { Component } from 'react';

class ProductDetail extends Component {
	constructor() {
		super();
		this.state = {
			product: '',
		};
	}

	componentDidMount() {
		this.forceUpdate();
	}
	componentDidUpdate() {
		if (this.state.product === '') {
			this.apiCall(
				`http://localhost:3200/api/products/${this.props.match.params.id}`,
				this.saveProduct
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
	saveProduct = (product) => {
		this.setState({
			product: product,
		});
	};
	getAttributes(atributo) {
		let content;
		if (atributo) {
            content = (
				<>
					<h3 className="latestProduct__label">{atributo.nombre}:</h3>
					<h3 className="latestProduct__value">{atributo.AttributeProduct.valor}</h3>
				</>
			);
		}
		return content;
	}

	render() {
		let product;
		let img = '';
		let attributes = [];
		if (this.state.product !== '') {
			product = this.state.product;
			img = `http://localhost:3200${product.image[0].url}`;
			attributes = product.attribute;
		} else {
			product = ['Product not found'];
		}
		console.log(img);
		return (
			<div className="latestProduct">
				{/* Mostrar datos del último user en la db */}
				<h1 className="latestProduct__title">Detalle del producto </h1>
				<img
					className="latestProduct__image"
					src={img}
					alt="imagen de producto"
				></img>
				<h3 className="latestProduct__label">Nombre:</h3>
				<h3 className="latestProduct__value">{product.nombre}</h3>
				<h3 className="latestProduct__label">Descripcion:</h3>
				<h3 className="latestProduct__value">{product.descripcion}</h3>
				<h3 className="latestProduct__label">Precio:</h3>
				<h3 className="latestProduct__value">{product.precio}</h3>
				{attributes.map((item) => this.getAttributes(item))}
			</div>
		);
	}
}

export default ProductDetail;
