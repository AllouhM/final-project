import React, { Component } from 'react';
import Chart from 'react-google-charts';

class DrawChart extends Component {
	render() {
		return (
			<div className="container">
				<Chart
					width={'auto'}
					height={'350px'}
					chartType="LineChart"
					loader={<div>Loading Chart</div>}
					data={this.props.chartData}
					options={{ ...this.props.options, title: this.props.title, colors: this.props.colors }}
				/>
			</div>
		);
	}
}

export default DrawChart;
