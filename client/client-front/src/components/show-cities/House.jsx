import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class House extends Component {
	addDecimal = (num) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	};
	render() {
		const { houses } = this.props;
		const eachHouse = houses.map((house, i) => {
			let key = house.link + i;
			let priceDecimal = this.addDecimal(house.price_value);

			return (
				<Jumbotron className="jumbo-container" key={key}>
					<h3>{house.title}</h3>
					<ListGroup className="list-group">
						<ListGroupItem className="list-item">
							<span className="list-item-title">Countey:</span> {house.location_country}
						</ListGroupItem>
						<ListGroupItem className="list-item">
							<span className="list-item-title">City:</span> {house.location_city}{' '}
						</ListGroupItem>
						<ListGroupItem className="list-item">
							<span className="list-item-title">Address:</span> {house.location_address}{' '}
						</ListGroupItem>
						<ListGroupItem className="list-item">
							<span className="list-item-title">Price:</span> {priceDecimal} {house.price_currency}
						</ListGroupItem>
					</ListGroup>
					<p className=" description-par">
						{' '}
						<span className="LI-span">About property :</span> {house.description}
					</p>
					<Link
						to={{
							pathname: '/Details',
							state: {
								house: house
							}
						}}
					>
						<Button bsStyle="danger">More details about property</Button>
					</Link>
				</Jumbotron>
			);
		});
		return <div className="container">{eachHouse}</div>;
	}
}
export default House;
