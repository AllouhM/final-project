import React, { Component } from 'react';
import { Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class Contribute extends Component {
	state = {
		houses: [],
		api: ''
	};

	housesHandler = (e) => {
		this.setState({ houses: e.target.value });
	};
	addHouses = (event) => {
		event.preventDefault();

		const parseUserInput = JSON.parse(this.state.houses);
		fetch('http://localhost:3120/upload', {
			method: 'POST',
			body: JSON.stringify({ houses: parseUserInput }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => this.setState({ postResponse: res }))
			.catch((err) => console.log(err));
		this.setState({ houses: [] });
	};
	apiInputHandler = (e) => {
		this.setState({ api: e.target.value });
	};

	readJsonApi = async (event) => {
		event.preventDefault();

		await fetch(this.state.api)
			.then((res) => res.json())
			.then((data) => {
				fetch('http://localhost:3120/upload', {
					method: 'POST',
					body: JSON.stringify({ houses: data }),
					headers: {
						'Content-Type': 'application/json'
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});
		this.setState({ api: '' });
	};
	render() {
		return (
			<div>
				<Form className="form" onSubmit={this.addHouses}>
					<FormGroup />
					<ControlLabel className="form-label"> Valid json file</ControlLabel>
					<FormControl
						className="form-control"
						type="textarea"
						value={this.state.houses}
						placeholder="Enter JSON file"
						onChange={this.housesHandler}
					/>
					<Button bsStyle="success" type="submit">
						Add contribution{' '}
					</Button>
				</Form>

				<Form className="form">
					<FormGroup />
					<ControlLabel className="form-label"> Valid json API</ControlLabel>
					<FormControl
						className="form-control"
						type="textarea"
						value={this.state.api}
						placeholder="Enter JSON API"
						onChange={this.apiInputHandler}
					/>
					<Button bsStyle="success" onClick={this.readJsonApi}>
						Add contribution{' '}
					</Button>
				</Form>
			</div>
		);
	}
}
export default Contribute;
