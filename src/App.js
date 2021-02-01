import React from 'react';

import SearchForm from './components/search-form/search-form.component';
import Logo from '../src/assets/images/logo.png';
import './App.scss';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			slips: [],
			searchTerm: '',
			info: '',
			isFetchingSlips: false,
		};
	}

	//get term value from searchbox and set it to state

	onSearchChange = (value) => {
		this.setState({ searchTerm: value });
	};

	searchAdvice = () => {
		//check if search term is added and ammend queryType if needed
		let queryType;
		const slipArray = [];
		this.setState({ isFetchingSlips: true });
		this.state.searchTerm ? (queryType = '/search/') : (queryType = '');

		fetch(
			`https://api.adviceslip.com/advice${queryType}${this.state.searchTerm}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			}
		)
			.then((response) => response.json())
			.then((response) => {
				/*
        check case of response and get objects and add/push to slips
        array
        */

				if (response.slips) {
					this.setState({
						slips: response.slips,
						info: '',
						searchTerm: '',
						isFetchingSlips: false,
					});
				} else if (response.slip) {
					slipArray.push(response.slip);

					this.setState({
						slips: slipArray,
						info: '',
						isFetchingSlips: false,
					});
				} else if (response.message) {
					this.setState({
						info: response.message.text,
						searchTerm: '',
						isFetchingSlips: false,
					});
				}
			});
	};

	onSearchSubmit = (event) => {
		event.preventDefault();
		event.target.reset();
		this.searchAdvice();
	};

	renderSlips() {
		return (
			<ul className="slips-list">
				{this.state.slips.map((slip) => (
					<li key={slip.id}>{slip.advice}</li>
				))}
			</ul>
		);
	}

	render() {
		const { info, isFetchingSlips } = this.state;

		return (
			<div className="App">
				<img className="logo" alt="Get-advice-logo" src={Logo} />

				<SearchForm
					onFormSubmit={this.onSearchSubmit}
					onSearchValueChange={this.onSearchChange}
					searchTermValue={this.state.searchTerm}
					isFetchingSlips={this.state.isFetchingSlips}
					onImFellingLucky={this.searchAdvice}
				/>

				{isFetchingSlips ? (
					<p className="isa_warning">{'Searching for advice...'}</p>
				) : info ? (
					<p className="isa_info">{info}</p>
				) : (
					this.renderSlips()
				)}
			</div>
		);
	}
}

export default App;
