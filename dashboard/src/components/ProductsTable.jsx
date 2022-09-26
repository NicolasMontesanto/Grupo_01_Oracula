import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductsTable extends Component {
	constructor() {
		super();
		this.state = {
			array: '',
		};
	}
	componentDidUpdate() {
		if (this.state.array !== this.props.contenido) {
			this.setArray();
		}
	}
	setArray() {
		if (this.props.contenido) {
			this.setState({
				array: this.props.contenido,
			});
		}
	}
	setGeneros(producto) {
		let generos = '';
		producto.genre.forEach((genero) => {
			generos += genero.nombre + ' ';
		});
		return generos;
	}
	setSubcategory(producto) {
		let subcategorias = [
			'',
			'Juego de Mesa',
			'Videojuego',
			'Libro',
			'Audiolibro',
			'Ropa',
			'Coleccionable',
			'Accesorio',
			'Película',
			'Soundtrack',
		];
		let subcategoria = subcategorias[producto.subcategoryId];
		return subcategoria;
	}
	render() {
		let array = [];
		if (this.state.array !== '') {
			array = this.state.array;
		}
		return (
			<table className="productsTable">
				<tbody>
					<tr className="productsTable__headerRow">
						<th>ID</th>
						<th>Nombre</th>
						<th className="productsTable__large-header">Descripción</th>
						<th>Géneros</th>
						<th>Subcategoría</th>
						<th>Detalle</th>
					</tr>
					{array.map((product, index) => (
						<tr key={index}>
							<td key={product.id + 1}>{product.id}</td>
							<td key={product.id + 2}>{product.name}</td>
							<td key={product.id + 3}>{product.description}</td>
							<td key={product.id + 4}>{this.setGeneros(product)}</td>
							<td key={product.id + 5}>
								{this.setSubcategory(product)}
							</td>
							<td className='productsTable--centerText' key={product.id + 6}>
								<Link to={`/productos/${product.id}`}>
									<i className="fa-solid fa-circle-info"></i>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

export default ProductsTable;
