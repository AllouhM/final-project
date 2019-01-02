import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Navigationbar extends Component {
	render() {
		return (
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/readme">Read me</Link>
					</Navbar.Brand>
				</Navbar.Header>

				<Nav pullRight>
					<NavItem eventKey={1} componentClass={Link} href="/" to="/">
						Home
					</NavItem>
					<NavItem eventKey={3} componentClass={Link} href="/houses" to="/houses">
						Properties
					</NavItem>
					<NavItem eventKey={2} componentClass={Link} href="/contribute" to="/contribute">
						Contribute
					</NavItem>

					<NavItem eventKey={4} componentClass={Link} href="/citychart" to="/citychart">
						Price trend
					</NavItem>
				</Nav>
			</Navbar>
		);
	}
}
export default Navigationbar;
