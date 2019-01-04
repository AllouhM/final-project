import React, { Component } from 'react';
import { Carousel, Button, PanelGroup, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Details extends Component {
	addDecimal = (num) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	};
	addM2 = (value) => {
		if (value) {
			return value + ' m2';
		} else {
			return 'Not available';
		}
	};

	render() {
		const { house } = this.props.location.state;
		const priceWithDecimal = this.addDecimal(house.price_value);
		const processSold = house.sold ? 'YES' : 'NO';
		const imageItem = house['images'].map((image, i) => {
			const key = image + i;
			const ImageAlt = 'house photo number' + (i + 1);

			return (
				<Carousel.Item>
					<img className="image" width={600} height={500} key={key} alt={ImageAlt} src={image} />
				</Carousel.Item>
			);
		});
		return (
			<div className="container">
				<div className="slider-main">
					<Carousel>{imageItem}</Carousel>
				</div>
				<PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="3">
					<Panel className="panel1-width" eventKey="1">
						<Panel.Heading>
							<Panel.Title toggle> House location</Panel.Title>
						</Panel.Heading>
						<Panel.Body collapsible>
							<span className="list-item-title">Country: </span> {house.location_country}
						</Panel.Body>
						<Panel.Body collapsible>
							<span className="list-item-title">City: </span> {house.location_city}
						</Panel.Body>
						<Panel.Body collapsible>
							<span className="list-item-title">Address: </span> {house.location_address}
						</Panel.Body>
						<Panel.Body collapsible>
							<Panel.Heading>
								<span className="list-item-title">Coordinates: </span>
							</Panel.Heading>

							<ListGroup>
								<ListGroupItem>
									<span className="list-item-title">lat:</span>
									{house.location_coordinates_lat}
								</ListGroupItem>
								<ListGroupItem>
									{' '}
									<span className="list-item-title">lng:</span> {house.location_coordinates_lng}
								</ListGroupItem>
							</ListGroup>
						</Panel.Body>
					</Panel>
					<Panel className="panel2-width" eventKey="2">
						<Panel.Heading>
							<Panel.Title toggle>House price</Panel.Title>
						</Panel.Heading>
						<Panel.Body collapsible>
							<span className="list-item-title">Price: </span> {priceWithDecimal}
						</Panel.Body>
						<Panel.Body collapsible>
							<span className="list-item-title">Currency: </span> {house.price_currency}
						</Panel.Body>
					</Panel>
					<Panel className="panel3-width" eventKey="3">
						<Panel.Heading>
							<Panel.Title toggle>House area</Panel.Title>
						</Panel.Heading>
						<Panel.Body collapsible>
							<span className="list-item-title">Parcel Sqrm: </span> {this.addM2(house.size_parcelm2)}
						</Panel.Body>
						<Panel.Body collapsible>
							<span className="list-item-title">Gross Sqrm: </span> {this.addM2(house.size_grossm2)}
						</Panel.Body>
						<Panel.Body collapsible>
							<span className="list-item-title">Net Sqrm: </span> {this.addM2(house.size_netm2)}
						</Panel.Body>
						<Panel.Body collapsible>
							<span className="list-item-title">Number of rooms: </span> {house.size_rooms}
						</Panel.Body>
					</Panel>
					<Panel className="panel4-width" eventKey="4">
						<Panel.Heading>
							<Panel.Title toggle>Other info</Panel.Title>
						</Panel.Heading>
						<Panel.Body collapsible>
							<span className="list-item-title">Available since: </span> {house.market_date}
						</Panel.Body>
						<Panel.Body collapsible>
							<span className="list-item-title">Sold: </span> {processSold}
						</Panel.Body>
						<Panel.Body collapsible>
							<span className="list-item-title">Link: </span> {house.link}
						</Panel.Body>
					</Panel>
				</PanelGroup>
				<h4 className="description"> Property description...</h4>
				<p className=" description-par"> {house.description}</p>
				<Link to="/houses">
					<Button bsStyle="danger">Back to houses list</Button>
				</Link>
			</div>
		);
	}
}
export default Details;
