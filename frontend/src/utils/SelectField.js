import React from 'react';
import Select from 'react-select';

const SelectField = ({
	value,
	onChange,
	options
}) => {
	return (
		<Select
			value={value}
			onChange={onChange}
			options={options}
		/>)
}

export default SelectField;