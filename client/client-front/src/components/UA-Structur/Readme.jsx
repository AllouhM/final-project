import React from 'react';

function Readme() {
	const houseObi = [
		{
			link: '',
			market_date: '',
			sold: false,
			title: '',
			location: {
				country: 'Greece',
				city: 'Athens-Center',
				address: '',
				coordinates: { lat: '', lng: '' }
			},
			size: {
				parcel_m2: '',
				gross_m2: '',
				net_m2: '',
				rooms: ''
			},
			price: {
				value: '',
				currency: ''
			},
			description: '',
			images: ''
		}
	];
	const jsonExample = JSON.stringify(houseObi, null, 2);

	return (
		<React.Fragment>
			<div className="container">
				<h1 className="readme-header"> Contributions Guide</h1>
				<p className="readme-paragraph">
					{' '}
					The more properties we have to provide as free data to developers and users the better.
					<br />We are glad with your contribution to our open source project!
				</p>
				<h3 className="instructions-header"> Instructios.... </h3>
				<ol className="readme-ordered">
					<li className="ordered-item"> We accept contributions for all cities.</li>
					<li className="ordered-item">
						{' '}
						Your contribution can be either a couple of houses in a JSON file structure or you can
						contribute via a JSON api{' '}
					</li>
					<li className="ordered-item">
						{' '}
						The following properties can't be null.{' '}
						<ul className="readme-unordered">
							<li className="unordered-item">link</li>
							<li className="unordered-item">country</li>
							<li className="unordered-item">city</li>
							<li className="unordered-item">rooms</li>
							<li className="unordered-item">value</li>
							<li className="unordered-item">currency</li>
						</ul>
					</li>
					<li className="ordered-item"> Date format "YYYY-MM-DD.</li>
					<li className="ordered-item"> Rooms, Price, Size, Coordinates should be numeric value. </li>
					<li className="ordered-item">Images property is a string of images URLs separated by commas.</li>
					<li className="ordered-item">
						{' '}
						For size property, if you don't have detailed size so the living area considered to be the
						gross_m2.
					</li>
				</ol>
				<code>
					<pre className="JSON">{jsonExample}</pre>
				</code>
				<p className="readme-end"> Thank you for supporting us .....</p>
			</div>
		</React.Fragment>
	);
}
export default Readme;
