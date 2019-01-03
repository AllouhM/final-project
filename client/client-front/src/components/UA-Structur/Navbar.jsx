import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Navigationbar extends Component {
	render() {
		return (
			<div className="container">
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/readme">Read me</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							<NavItem eventKey={1} componentClass={Link} href="/" to="/">
								Home
							</NavItem>
							<NavItem eventKey={3} componentClass={Link} href="/houses" to="/houses">
								Houses
							</NavItem>
							<NavItem eventKey={2} componentClass={Link} href="/contribute" to="/contribute">
								Contribute
							</NavItem>
							<NavItem eventKey={4} componentClass={Link} href="/citychart" to="/citychart">
								Price trend
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}
export default Navigationbar;
