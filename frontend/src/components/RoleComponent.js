import React from 'react';
import RoleForm from './RoleForm';
import { BASE_URL } from '../constants';

class RoleComponent extends React.Component {
	constructor() {
		super()
		this.state = {
			roles: [],
			isLoading: true,
			isError: false,
			addRole: false,
			errorMessage: ""
		}
	}

	componentDidMount() {
		this.fetchRoles()
	}

	fetchRoles = () => {
		fetch(`${BASE_URL}/roles/fetch`)
		.then((response) => {
			return response.json()
		})
		.then((response) => {
			this.setState({
				roles: response,
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

	onRoleAddition = () => {
		const { addRole } = this.state;
		this.setState({
			addRole: !addRole
		}, () => {
			this.fetchRoles()
		})
	}

	toggleActiveState = (event) => {
		const { roles, errorMessage, isLoading } = this.state;
		this.setState({
			isLoading: true
		})
		const { roleId } = event.currentTarget.parentElement.dataset;
		const role = roles.find(role => role.id === parseInt(roleId))
		fetch(`${BASE_URL}/roles?id=${roleId}&is_active=${!role.is_active}`, {
			method: "put"
		})
		.then((response) => (response.json()))
		.then((response) => {
			if(response.status && response.status === "failed") {
				this.setState({
					errorMessage: response.message,
					isLoading: false
				})
			} else {
				this.fetchRoles()
			}
		})
		.catch((err) => {
			this.setState({
				isError: true
			})
		})
	}

	render() {
		const { addRole, roles, errorMessage, isLoading, isError } = this.state;
		if(isLoading) {
			return(<div>Data is loading....,</div>)
		} else if(isError) {
			return(<div>Some error Occured please try again later.</div>)
		}
		return(<div>
				<button type="button" onClick={this.onRoleAddition} className="btn btn-primary">{addRole ? "Visit Roles Page" : "Add Role"}</button>
				{addRole ? <RoleForm toggleRoleView={this.onRoleAddition}/> :
					<table className="table">
					  <thead>
					    <tr>
					      <th scope="col">Name</th>
					      <td>Status</td>
					      <td>Actions</td>
					    </tr>
					  </thead>
					  <tbody>
					  {roles.map((role) => (
					  	<tr data-role-id={role.id}>
					      <td>{role.name}</td>
					      <td>{role.is_active ? "Active" : "InActive"}</td>
					      <td onClick={this.toggleActiveState}><button className="btn btn-primary">{role.is_active ? "Set InActive" : "Set Active"}</button></td>
					    </tr>
					  ))}
					  </tbody>
					</table>
				}
				<div className="text-danger">{errorMessage}</div>
			</div>)
	}
}

export default RoleComponent;