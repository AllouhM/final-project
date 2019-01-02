import React, { Component } from 'react';
import Chart from 'react-google-charts';

class DrawChart extends Component {
	render() {
		return (
			<Chart
				width={'1100px'}
				height={'350px'}
				chartType="LineChart"
				loader={<div>Loading Chart</div>}
				data={this.props.chartData}
				options={{ ...this.props.options, title: this.props.title, colors: this.props.colors }}
			/>
		);
	}
}

export default DrawChart;
