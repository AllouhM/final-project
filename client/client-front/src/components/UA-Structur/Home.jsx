import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {
	render() {
		return (
			<div className="container">
				<div className="home-jumbotron">
					<Jumbotron>
						<h1>We are dedicated to helping you find your dream house</h1>
					</Jumbotron>
					<Link to="/houses">
						<Button bsStyle="info"> See properties per city </Button>
					</Link>
				</div>
			</div>
		);
	}
}
export default Home;
