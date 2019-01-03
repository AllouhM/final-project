'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { validateEntries, normalizeRow, getCitiesStatsObj } = require('./validate-normalize');

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1980',
	database: 'fake'
});

app.post('/upload', (req, res) => {
	try {
		// return console.log(req.body.houses);
		const data = validateEntries(req.body.houses);

		res
			.json({
				processed: req.body.houses.length,
				valid: data.length
			})
			.end();

		const normalizedData = data.map(normalizeRow);

		if (normalizedData.length) {
			const sql =
				'REPLACE INTO houses (link, market_date, sold, location_country, location_city, location_address, location_coordinates_lat, location_coordinates_lng, size_grossm2, size_rooms, price_value, price_currency, description, title, images) values ?';
			db.query(
				sql,
				[
					normalizedData.map((house) => [
						house['link'],
						house['market_date'],
						house['sold'],
						house['location'].country,
						house['location'].city,
						house['location'].address,
						house['location'].coordinates.lat,
						house['location'].coordinates.lng,
						house['size'].gross_m2,
						house['size'].rooms,
						house['price'].value,
						house['price'].currency,
						house['description'],
						house['title'],
						house['images']
					])
				],
				(error, result) => {
					if (error) {
						throw error;
					}
					console.log('OK', result);
				}
			);
		}
		let groupedByCity = {};

		normalizedData.forEach((house) => {
			groupedByCity[house['location'].city]
				? groupedByCity[house['location'].city].push(house)
				: ((groupedByCity[house['location'].city] = []), groupedByCity[house['location'].city].push(house)); // create a new array and push
		});

		const cityStats = getCitiesStatsObj(groupedByCity);

		if (cityStats.length) {
			const sql2 =
				'INSERT INTO city_stats (city, storing_date, properties_count, sum_price, avg_price, avgprice_SqrM, currency) values ? ';
			db.query(
				sql2,
				[
					cityStats.map((city) => [
						city.city,
						city.storingDate,
						city.propertiesCount,
						city.sumPrice,
						city.avgPrice,
						city.avgPricePerSqrM,
						city.currency
					])
				],
				(error, result) => {
					if (error) {
						throw error.message;
					}
					console.log('YES', result);
				}
			);
		}
	} catch (err) {
		console.log('mood', err.message);
		res.status(400).end();
	}
});

app.get(`/citychart`, (req, res) => {
	const city = req.query.city || null;
	let queryWhere = '';

	if (city) {
		queryWhere = `WHERE city = "${city}"`;
	}
	db.query(
		`select city, storing_date, avg_price, avgprice_sqrm, currency from city_stats ${queryWhere};`,
		(err, result, fields) => {
			if (err) {
				res.send(err).end();
			}
			res.json(result);
		}
	);
});
app.get(`/searchcity`, (req, res) => {
	const city = req.query.city || null;
	let queryWhere = '';

	if (city) {
		queryWhere = `WHERE location_city = "${city}"`;
	}
	db.query(`select * from houses ${queryWhere} limit 20;`, (err, result, fields) => {
		if (err) {
			res.status(400).end();
		}
		res.json(result);
	});
});

app.get(`/cityname`, (req, res) => {
	db.query(`select location_city from houses;`, (err, result, fields) => {
		if (err) {
			res.status(400).end();
		}
		res.json(result);
	});
});

const port = process.env.PORT || 3120;
db.connect((error) => {
	if (error) {
		return error;
	}
	app.listen(port, (err) => {
		console.log(`db is up, app is running at http://localhost:${port}`);
	});
});
