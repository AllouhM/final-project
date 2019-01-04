import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class Contribute extends Component {
	state = {
		houses: [],
		api: '',
		postResponse: { processed: 0, valid: 0 }
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
			.then((res) => res.json())
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
				})
					.then((res) => res.json())
					.then((res) => this.setState({ postResponse: res }));
			})
			.catch((err) => {
				console.log(err);
			});
		this.setState({ api: '' });
	};
	render() {
		const report =
			this.state.postResponse.processed === 0 ? null : (
				<div className="cont-report">
					<h3 className="cont-report-header"> Contribution report</h3>
					<p className="report-p">
						Thank you for ypur contribution. Some of the provided houses doesn't meet our contribution
						conditions. Click button below to read more{' '}
					</p>
					<ul className="report-list">
						<li className="report-item">
							Number of houses provided : {this.state.postResponse.processed} houses
						</li>
						<li className="report-item">
							Number of <span className="valid">valid</span> houses:
							{this.state.postResponse.valid} houses
						</li>
					</ul>

					<Link to="/readme">
						<Button bsStyle="info" bsSize="large" block>
							Read contribution instructions
						</Button>
					</Link>
				</div>
			);
		return (
			<div className="container">
				{report}
				<Form className="file-form" onSubmit={this.addHouses}>
					<FormGroup />
					<ControlLabel className="file-form-label"> Valid json file</ControlLabel>
					<FormControl
						className="file-form-control"
						type="textarea"
						value={this.state.houses}
						placeholder="Enter JSON file"
						onChange={this.housesHandler}
					/>
					<Button bsStyle="success" type="submit">
						Add contribution{' '}
					</Button>
				</Form>

				<Form className="api-form">
					<FormGroup />
					<ControlLabel className="api-form-label"> Valid json API</ControlLabel>
					<FormControl
						className="api-form-control"
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
