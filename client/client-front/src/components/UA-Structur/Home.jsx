import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Jumbotron, Button } from 'react-bootstrap';

class Home extends Component {
	render() {
		return (
			<div className="container">
				<Grid>
					<Jumbotron>
						<h1>Welcome to our Properties open source platform</h1>
					</Jumbotron>
					<Link to="/houses">
						<Button bsStyle="primary"> See properties per city </Button>
					</Link>
				</Grid>
			</div>
		);
	}
}
export default Home;
