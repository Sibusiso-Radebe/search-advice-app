import React from 'react';
import './search-form.styles.scss';

const SearchForm = ({
	onFormSubmit,
	onSearchValueChange,
	searchTermValue,
	onImFellingLucky,
	isFetchingSlips,
}) => (
	<form onSubmit={onFormSubmit} className="search-form">
		<input
			type="text"
			placeholder="Enter advice topic..."
			onChange={(event) => onSearchValueChange(event.target.value)}
		/>
		<div>
			<button disabled={!searchTermValue}>Search</button>
			<button onClick={onImFellingLucky} disabled={isFetchingSlips}>
				I'm feeling lucky
			</button>
		</div>
	</form>
);

export default SearchForm;
