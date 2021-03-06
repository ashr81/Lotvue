import React from 'react';

const TextInput = ({
	label,
	type="text",
	placeholder,
	onChange,
	helpText,
	name,
	value,
}) => {
	return(
		<div className="form-group">
    		<label>{label}</label>
    		<input type={type} name={name} className="form-control" onChange={onChange} value={value} aria-describedby="emailHelp" placeholder={placeholder}/>
    		{helpText && <small id="emailHelp" className="form-text text-muted">{helpText}</small>}
  		</div>
	)
}

export default TextInput;