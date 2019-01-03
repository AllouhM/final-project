import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/UA-Structur/Home';
import Contribute from './components/Contribute';
import Navigationbar from './components/UA-Structur/Navbar';
import Readme from './components/UA-Structur/Readme';
import CityChart from './components/chart/CityChart';
import DisplayHouses from './components/show-cities/DisplayHouses';
import Details from './components/show-cities/Details';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Navigationbar />
					<Route exact path="/" component={Home} />
					<Route path="/contribute" component={Contribute} />
					<Route path="/readme" component={Readme} />
					<Route path="/houses" component={DisplayHouses} />
					<Route path="/citychart" component={CityChart} />
					<Route path="/details" component={Details} />
				</div>
			</Router>
		);
	}
}

export default App;
