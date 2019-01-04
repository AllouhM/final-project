import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import SelectList from '../chart/SelectList';
import MDSpinner from 'react-md-spinner';
import moment from 'moment';
import House from './House';
moment().format();

class DisplayHouses extends Component {
	state = {
		options: [],
		selectedOption: 'Athens-Center',
		houses: [],
		page: 1,
		callNext: false
	};

	updateState = (statsArray) => {
		statsArray.forEach((item) => {
			item.market_date = moment(new Date(item.market_date)).format('YYYY-MM-DD');
			item.images = item.images.split(',');

			return [ { ...item } ];
		});

		this.setState({
			houses: statsArray
		});
	};

	componentDidMount() {
		this.handleSelectChange({ value: 'Athens-Center' });
	}

	handleSelectChange = (selectedOption) => {
		this.setState({
			page: 1,
			selectedOption
		});

		setTimeout(() => {
			fetch(`http://localhost:3120/searchcity?city=${selectedOption.value}&page=${this.state.page}`)
				.then((res) => res.json())
				.then((data) => {
					this.updateState(data.arr);
					this.setState({ callNext: data.callNext });
				})
				.catch((err) => console.log(err));
		}, 10);
	};
	next = (cityValue) => {
		const page = this.state.page + 1;
		fetch(`http://localhost:3120/searchcity?city=${cityValue}&page=${page}`)
			.then((res) => res.json())
			.then((data) => {
				this.updateState(data.arr);
				this.setState({ callNext: data.callNext });
			})
			.catch((err) => console.log(err));
		this.setState({ page });
	};

	render() {
		const { houses } = this.state;
		if (!houses.length) {
			return <MDSpinner className="spinner" size={40} />;
		}
		const renderNextButton = this.state.callNext ? (
			<Button onClick={() => this.next(this.state.selectedOption.value)}>Next</Button>
		) : null;
		const renderingData = houses.length ? (
			<House houses={houses} />
		) : (
			<p className="no-data">Currently there are no houses available</p>
		);

		return (
			<div className="container">
				<SelectList className="select" changeHandler={this.handleSelectChange} />
				{renderingData}
				{renderNextButton}
			</div>
		);
	}
}

export default DisplayHouses;
