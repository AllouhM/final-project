'use strict';
const moment = require('moment');
moment().format();
const validator = require('validator');

const validateData = (propertyData, i) => {
	if (
		typeof propertyData['link'] == 'undefined' ||
		propertyData['link'] == '' ||
		typeof propertyData['location'].city == 'undefined' ||
		propertyData['location'].city == '' ||
		typeof propertyData['location'].country == 'undefined' ||
		propertyData['location'].country == '' ||
		typeof propertyData['size'].rooms == 'undefined' ||
		propertyData['size'].rooms == '' ||
		typeof propertyData['price'].value == 'undefined' ||
		propertyData['price'].value == '' ||
		typeof propertyData['price'].currency == 'undefined' ||
		propertyData['price'].currency == '' ||
		typeof propertyData['location'].coordinates == 'undefined' ||
		/^$/.test(propertyData['location'].city) ||
		/^$/.test(propertyData['location'].country) ||
		/^$/.test(propertyData['link']) ||
		/^$/.test()
	) {
		return false;
	}

	if (!validator.isURL(propertyData['link'])) {
		return false;
	}
	if (typeof propertyData['market_date'] == 'undefined') {
		return (propertyData['market_date'] = new Date());
	}

	if (isNaN(propertyData['price'].value)) {
		return false;
	}
	return true;
};

const validateEntries = (data) => {
	return data.filter(validateData);
};
const normalizeRow = (data, i) => {
	if (
		!/^[0-9]*(\.[0-9]{1,15})?$/.test(data['location'].coordinates.lng) ||
		/^$/.test(data['location'].coordinates.lng) ||
		!/^[0-9]*(\.[0-9]{1,15})?$/.test(data['location'].coordinates.lat) ||
		/^$/.test(data['location'].coordinates.lat)
	) {
		data['location'].coordinates.lat = null;
		data['location'].coordinates.lng = null;
	} else {
		data['location'].coordinates.lat = Number(data['location'].coordinates.lat);
		data['location'].coordinates.lng = Number(data['location'].coordinates.lng);
	}

	if (data['market_date'] == '') {
		data['market_date'] = new Date();
	}

	if (moment(data['market_date'], 'MM-DD-YYYY', true).isValid()) {
		data['market_date'] = moment(data['market_date'], 'MM-DD-YYYY').format('YYYY-MM-DD');
	}
	if (moment(data['market_date'], 'DD-MM-YYYY', true).isValid()) {
		data['market_date'] = moment(data['market_date'], 'DD-MM-YYYY').format('YYYY-MM-DD');
	}
	if (moment(data['market_date'], 'DD/MM/YYYY', true).isValid()) {
		data['market_date'] = moment(data['market_date'], 'DD/MM/YYYY').format('YYYY-MM-DD');
	}
	if (moment(data['market_date'], 'MM/DD/YYYY', true).isValid()) {
		data['market_date'] = moment(data['market_date'], 'MM/DD/YYYY').format('YYYY-MM-DD');
	}
	if (moment(data['market_date'], moment.ISO_8601, true).isValid()) {
		data['market_date'] = moment(data['market_date'], 'YYYY-MM-DD').format('YYYY-MM-DD');
	}

	data['location'].city = data['location'].city.replace(/\s/g, '');

	return {
		...data,
		link: data['link'].trim(),

		size_grossm2: Number(data['size'].gross_m2),
		size_rooms: Number(data['size'].rooms),
		title: data['title'].trim(),
		description: data['description'].replace(/\r?\n|\r/g, ' '),
		images: data['images'].toString()
	};
};
const getCitiesStatsObj = (obj) => {
	let statsPerCity = {
		city: '',
		storingDate: '',
		propertiesCount: 0,
		sumPrice: 0,
		avgPrice: 0,
		avgPricePerSqrM: 0,
		currency: ''
	};
	let statisticsAllCities = [];

	for (let city in obj) {
		let prices = [];
		let housesSqrM = [];

		obj[city].forEach((house) => {
			prices.push(Number(house.price.value));
			housesSqrM.push(Number(house.size.gross_m2));
		});

		const totalPriceValue = prices.reduce((a, b) => a + b, 0);
		const totalSqrM = housesSqrM.reduce((a, b) => a + b, 0);
		const avgSqrMValue = Number((totalPriceValue / totalSqrM).toFixed(2));
		const avgPriceValue = Math.round(totalPriceValue / obj[city].length);

		statisticsAllCities.push({
			...statsPerCity,
			city: city,
			storingDate: new Date(),
			// storingDate: '2018-12-30',
			propertiesCount: obj[city].length,
			sumPrice: totalPriceValue,
			avgPrice: avgPriceValue,
			avgPricePerSqrM: avgSqrMValue,
			currency: obj[city][0].price.currency
		});
	}
	return statisticsAllCities;
};

module.exports = { validateEntries, normalizeRow, getCitiesStatsObj };
