import React, { Component } from 'react';
import SelectList from '../chart/SelectList';
import moment from 'moment';
import House from './House';
moment().format();

class DisplayHouses extends Component {
	state = {
		options: [],
		selectedOption: 'Athens-Center',
		houses: [],
		searchCity: 'Athens-Center'
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
		this.setState({ selectedOption });

		fetch(`http://localhost:3120/searchcity?city=${selectedOption.value}`)
			.then((res) => res.json())
			.then((data) => this.updateState(data))
			.catch((err) => console.log(err));
	};

	render() {
		const { houses } = this.state;
		const renderingData = houses.length ? (
			<House houses={houses} />
		) : (
			<p className="no-data">Currently there are no houses available</p>
		);

		return (
			<div className="container">
				<SelectList className="select" changeHandler={this.handleSelectChange} />
				{renderingData}
			</div>
		);
	}
}

export default DisplayHouses;
