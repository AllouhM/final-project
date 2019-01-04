import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
				<div className="each-house" key={key}>
					<h5 className="house-title">{house.title}</h5>
					<ul className="list-group">
						<li className="list-item">
							{' '}
							<span className="list-item-title">Countey:</span> {house.location_country}
						</li>
						<li className="list-item">
							<span className="list-item-title">City:</span> {house.location_city}
						</li>
						<li className="list-item">
							<span className="list-item-title">Address:</span> {house.location_address}
						</li>
						<li className="list-item">
							<span className="list-item-title">Price:</span> {priceDecimal} {house.price_currency}
						</li>
					</ul>
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
				</div>
				// </div>
			);
		});
		return <div id="show-houses-container">{eachHouse}</div>;
	}
}
export default House;
