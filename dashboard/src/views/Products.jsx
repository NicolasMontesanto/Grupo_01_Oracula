import React, { Component } from 'react';
import '../css/Products.css';
import ProductsTable from '../components/ProductsTable';
import Button from '../components/Button';

class Products extends Component {
	constructor() {
		super();
		this.state = {
			products: '',
			arrayProducts: '',
		};
	}

	componentDidMount() {
		//Llama a la API que trae todos lxs users
		this.apiCall('http://localhost:3200/api/products', this.saveProducts);
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

	getPrevious() {
		let previous;
		if (this.state.products.previous) {
			previous = this.state.products.previous;
			previous = previous.slice(previous.indexOf('?') + 1);
			return (
				<div
					onClick={(e) =>
						this.apiCall(this.state.products.previous, this.saveProducts)
					}
				>
					<Button url={`/productos/page/${previous}`} name="Anterior" />
				</div>
			);
		}
		return <></>;
	}
	getNext() {
		let next;
		if (this.state.products.next) {
			next = this.state.products.next;
			next = next.slice(next.indexOf('?') + 1);
			return (
				<div
					onClick={(e) =>
						this.apiCall(this.state.products.next, this.saveProducts)
					}
				>
					<Button url={`/productos/page/${next}`} name="Siguiente" />
				</div>
			);
		}
		return <></>;
	}

	render() {
		if (
			window.location.href === 'http://localhost:3000/productos' &&
			this.state.products.previous
		) {
			this.apiCall('http://localhost:3200/api/products', this.saveProducts);
		}
		return (
			<>
				<h1 className="title">Productos</h1>
				<div className="buttonWrapper">
					{this.getPrevious()}
					{this.getNext()}
				</div>
				<div className="productsWrapper">
					<ProductsTable contenido={this.state.arrayProducts} />
				</div>
				<div className="buttonWrapper">
					{this.getPrevious()}
					{this.getNext()}
				</div>
			</>
		);
	}
}
export default Products;
