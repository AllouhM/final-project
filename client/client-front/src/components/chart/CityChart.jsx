import React, { Component } from 'react';
import SelectList from './SelectList';
import DrawChart from './DrawChart';
import moment from 'moment';
moment().format();

class CityChart extends Component {
	state = {
		options: {
			legend: {
				position: 'right'
			},
			hAxis: {
				title: 'date',
				gridlines: {
					count: -1
				},
				titleTextStyle: {
					color: 'gray',
					fontSize: 19
				}
			},
			vAxis: {
				title: 'Avg Price',
				gridlines: {
					count: -1
				},
				titleTextStyle: {
					color: 'gray',
					fontSize: 17
				}
			}
		},
		selectedOption: 'Athens-Center',

		priceData: [],
		sqrmData: []
	};
	componentDidMount() {
		this.handleSelectChange({ value: 'Athens-Center' });
	}

	updateState = (sourceData) => {
		const avgPriceSqrArray = [];
		const UpdateSqrmData = [];
		const updatedPriceData = [];

		const sqrmData = sourceData.map((el) => {
			const { avgprice_sqrm, storing_date } = el;
			const date = moment(storing_date).subtract(1, 'days').format('YYYY-MM-DD');
			return { date, avgprice_sqrm };
		});
		avgPriceSqrArray.push(sqrmData);

		const houseData = sourceData.map((el) => {
			const { avg_price, storing_date } = el;
			const date = moment(storing_date).subtract(1, 'days').format('YYYY-MM-DD');
			return { date, avg_price };
		});
		avgPriceSqrArray.push(houseData);

		const currentDay = new Date();

		let daysRangeDisplayed = moment(currentDay).subtract(11, 'd').format('YYYY-MM-DD');

		const days = [];
		while (moment(daysRangeDisplayed).isBefore(currentDay)) {
			days.push(daysRangeDisplayed);
			daysRangeDisplayed = moment(daysRangeDisplayed).add(1, 'days').format('YYYY-MM-DD');
		}
		avgPriceSqrArray.forEach((avgArray, index) => {
			let lastAvgSqr = null;
			let lastAvgPrice = null;
			let currentIndex = 0;

			const min = days[0];
			const max = days[days.length - 1];

			for (let day = min; day <= max; day = moment(day).add(1, 'days').format('YYYY-MM-DD')) {
				if (day >= avgArray[currentIndex].date) {
					lastAvgSqr = avgArray[currentIndex].avgprice_sqrm;
					lastAvgPrice = avgArray[currentIndex].avg_price;

					if (currentIndex < avgArray.length - 1) currentIndex++;
				}
				index === 0 ? UpdateSqrmData.push([ day, lastAvgSqr ]) : updatedPriceData.push([ day, lastAvgPrice ]);
			}
		});

		this.setState({
			priceData: [ [ 'storingDate', 'AvgPrice' ], ...updatedPriceData ],
			sqrmData: [ [ 'storingDate', 'avgSqrmPrice' ], ...UpdateSqrmData ]
		});
	};

	handleSelectChange = (selectedOption) => {
		this.setState({ selectedOption });

		fetch(`http://localhost:3120/citychart?city=${selectedOption.value}`)
			.then((res) => res.json())
			.then((data) => this.updateState(data))
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<div>
				<SelectList className="select" changeHandler={this.handleSelectChange} />
				<h2>{`Price trend in ${this.state.selectedOption.value}`}</h2>
				<DrawChart
					chartData={this.state.priceData}
					options={this.state.options}
					title={`Avg price for the last 30 days in ${this.state.selectedOption.value}`}
					colros={'red'}
				/>
				<DrawChart
					chartData={this.state.sqrmData}
					options={this.state.options}
					title={`Avg price per sqrm for the last 30 days in ${this.state.selectedOption.value}`}
					colros={'blue'}
				/>{' '}
			</div>
		);
	}
}
export default CityChart;
