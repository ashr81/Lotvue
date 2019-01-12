import React from 'react';
import TextInput from '../utils/TextInput';
import SelectField from '../utils/SelectField';
import { BASE_URL } from '../constants';

class RoleForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			role: {},
			isLoading: false,
			isError: false,
			errorMessage: "",
			roles: []
		}
	}

	userInitialState = () => ({
		name: ""
	})

	onTextChange = (event) => {
		const { role } = this.state;
		role[event.currentTarget.name] = event.currentTarget.value;
		this.setState({ role })
	}

	onSubmitRole = () => {
		const { role } = this.state;
		fetch(`${BASE_URL}/roles`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
      			'Content-Type': 'application/json'
			},
			body: JSON.stringify(role)
		})
		.then((response) => (response.json()))
		.then((response) => {
			if(response.status && response.status === "failed") {
				this.setState({
					errorMessage: response.message
				})
			} else {
				this.props.toggleRoleView()
			}
		})
		.catch((err) => {
			this.setState({
				isError: true,
				isLoading: false
			})
		})
	}

	render() {
		const { role, isLoading, isError, errorMessage } = this.state;
		if(isLoading) {
			return (<div>Data is Loading...</div>)
		} else if(isError) {
			return (<div>Some error occured. please try again later.</div>)
		}
		return(
			<div>
				<TextInput
					name="name"
					label="Name"
					placeholder="Enter Name of the Role"
					onChange={this.onTextChange}
				/>
				<div className="text-danger">{errorMessage}</div>
				<button type="button" onClick={this.onSubmitRole} className="btn btn-primary">Submit Role</button>
			</div>)
	}
}

export default RoleForm;