import React from 'react';
import TextInput from '../utils/TextInput';

const UserMetaData = ({
	userMetaData,
	addCustomFields,
	onUserMetaTextChange,
	entity_key,
	entity_value
}) => {
	return(<div>
			{userMetaData && userMetaData.map((metaData) => {
				return(
					<div>
						{metaData.entity_key} {"   "} {metaData.entity_value}
					</div>)
			})}
			<TextInput
				name="entity_key"
				label="Key"
				value={entity_key}
				placeholder="Enter field Property"
				onChange={onUserMetaTextChange}
				helpText="This should be the key used to map."
			/>
			<TextInput
				name="entity_value"
				label="Value"
				value={entity_value}
				placeholder="Enter field Value"
				onChange={onUserMetaTextChange}
				helpText="This should be the value mapped to the key."
			/>
			<button type="button" onClick={addCustomFields} className="btn btn-primary">Add Your Inputs</button>
		</div>)
}

export default UserMetaData;