import React from 'react';
import TextInput from '../utils/TextInput';
import SelectField from '../utils/SelectField';
import { BASE_URL } from '../constants';
import UserMetaData from './UserMetaData';

class UserForm extends React.Component {
	constructor() {
		super()
		this.state = {
			user: {},
			isLoading: true,
			isError: false,
			roles: [],
			entity_key: "",
			entity_value: ''
		}
	}

	userInitialState = () => ({
		first_name: "",
		last_name: "",
		email: ""
	})

	onUserMetaTextChange = (event) => {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value
		})
	}

	componentDidMount() {
		this.fetchRoles()
	}

	fetchRoles = () => {
		fetch(`${BASE_URL}/roles/fetch?role_status=active`)
		.then((response) => (response.json()))
		.then((response) => {
			this.setState({
				roles: response.map((role) => ({label: role.name, value: role.id})),
				isLoading: false
			})
		})
		.catch((err) => {
			this.setState({
				isLoading: false,
				isError: true
			})
		})
	}

	onTextChange = (event) => {
		const { user } = this.state;
		user[event.currentTarget.name] = event.currentTarget.value;
		this.setState({ user })
	}

	onSelectChange = (role) => {
		const { user } = this.state;
		user.role = role;
		this.setState({ user })
	}

	onSubmitUser = () => {
		const { user, errorMessage } = this.state;
		user.role_id = user.role.value;
		fetch(`${BASE_URL}/users`, {
			method: 'post',
			headers: {
				'Accept': 'application/json',
      			'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
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

	addCustomFields = () => {
		const { user, entity_key, entity_value } = this.state;
		const { user_metum_attributes } = user;
		this.setState({
			user: {...user, user_metum_attributes: [...(user_metum_attributes || []), { entity_key, entity_value}]},
			entity_key: "",
			entity_value: ""
		})
	}

	render() {
		const { user, isLoading, isError, roles, entity_key, entity_value, errorMessage } = this.state;
		if(isLoading) {
			return (<div>Data is Loading...</div>)
		} else if(isError) {
			return (<div>Some error occured. please try again later.</div>)
		}
		return(
			<div>
				<TextInput
					name="first_name"
					label="First Name"
					placeholder="Enter you First Name"
					onChange={this.onTextChange}
				/>
				<TextInput
					name="last_name"
					label="Last Name"
					placeholder="Enter you Last Name"
					onChange={this.onTextChange}
				/>
				<TextInput
					name="email"
					label="Email"
					placeholder="Enter you Email"
					onChange={this.onTextChange}
					helpText="This should be unique across the application."
				/>
				<SelectField
					value={user.role}
					onChange={this.onSelectChange}
					options={roles}
				/>
				<UserMetaData userMetaData={user.user_metum_attributes} entity_key={entity_key} entity_value={entity_value} addCustomFields={this.addCustomFields} onUserMetaTextChange={this.onUserMetaTextChange}/>
				<div className="text-danger">{errorMessage}</div>
				<button type="button" onClick={this.onSubmitUser} className="btn btn-primary">Submit User</button>
			</div>)
	}
}

export default UserForm;