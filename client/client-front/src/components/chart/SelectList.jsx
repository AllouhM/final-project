import React, { Component } from 'react';
import Select from 'react-select';

class SelectList extends Component {
	state = {
		options: [],
		selectedOption: 'Athens-Center'
	};
	componentDidMount() {
		this.getCitiesName();
	}

	groupCitiesForSelect = (citiesList) => {
		const groupedCities = [];
		for (let i = 0; i < citiesList.length; i++) {
			if (groupedCities.indexOf(citiesList[i].location_city) === -1) {
				groupedCities.push(citiesList[i].location_city);
			}
		}
		const optionsObj = groupedCities.map((option) => ({ value: option, label: option }));
		this.setState({
			options: [ { value: 'total', label: 'Total' }, ...optionsObj ]
		});
	};

	getCitiesName = () => {
		fetch(`http://localhost:3120/cityname`).then((res) => res.json()).then((res) => this.groupCitiesForSelect(res));
	};
	render() {
		return (
			<Select
				className="select"
				value={this.state.selectedOption}
				onChange={this.props.changeHandler}
				options={this.state.options}
			/>
		);
	}
}
export default SelectList;
