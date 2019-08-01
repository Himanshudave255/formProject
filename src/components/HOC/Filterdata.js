import React, { useState, useEffect } from 'react';
import InputField from '../reusableComponents/InputField';
const withUser = WrappedComponent => {
	function Filterdata(props) {
		const [searchValue, updateSearchValue] = useState('');
		const [oldRows, updateOldRows] = useState(props.rows);
		const [filterRows, updateFilterRows] = useState(props.rows);

		useEffect(() => {
			updateFilterRows(props.rows);
			updateOldRows(props.rows);
		}, [props.rows]);

		function searchbarChangeEvent(e) {
			let value = [];
			updateSearchValue(e.target.value);
			updateFilterRows(
				oldRows.filter(it => {
					value = Object.values(it).find(res => {
						if (res.toString().includes(e.target.value)) {
							return it;
						}
					});
					{
						return value;
					}
				})
			);
		}
		let searchBarObj = {
			label: 'Search Bar',
			placeholder: 'search bar',
			disable: false,
			className: 'search-bar-issue',
			name: 'search',
			value: searchValue,
		};
		return (
			<div>
				<InputField onChange={searchbarChangeEvent.bind(this)} config={searchBarObj} />
				<WrappedComponent {...props} rows={filterRows} />
			</div>
		);
	}
	return Filterdata;
};
export default withUser;
