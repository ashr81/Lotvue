import React from 'react';
import TextInput from '../utils/TextInput';
import UserForm from './UserForm';
import { BASE_URL } from '../constants';
import SelectField from '../utils/SelectField';


const SORT_OPTIONS = [{
			label: "First Name",
			value: "first_name"
		}, {
			label: "Last Name",
			value: "last_name"
		}, {
			label: "Email",
			value: "email"
		}]

		const SORT_ORDER = [{
								label: "Descending",
								value: "desc"
							}, {
								label: "Ascending",
								value: "asc"
							}]
class UserComponent extends React.Component {
	constructor() {
		super()
		this.state = {
			users: [],
			isLoading: true,
			isError: false,
			addUser: false,
			sortBy: SORT_OPTIONS[0],
			sortOrder: SORT_ORDER[0],
			pageNo: 0,
			perPage: 10
		}
	}

	componentDidMount() {
		this.fetchUsers()
	}

	fetchUsers = () => {
		const { sortBy, pageNo, perPage, sortOrder } = this.state;
		fetch(`${BASE_URL}/users/fetch?sortBy=${sortBy.value}&sortOrder=${sortOrder.value}&perPage=${perPage}&pageNo=${pageNo}`)
		.then((response) => {
			return response.json()
		})
		.then((response) => {
			this.setState({
				users: response,
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
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value
		}, () => {
			this.fetchUsers()
		})
	}

	onUserAddition = () => {
		const { addUser } = this.state;
		this.setState({
			addUser: !addUser
		})
	}

	onSortByChange = (option) => {
		this.setState({
			sortBy: option
		}, () => {
			this.fetchUsers()
		})
	}

	onSortOrderChange = (option) => {
		this.setState({
			sortOrder: option
		}, () => {
			this.fetchUsers()
		})	
	}

	render() {
		const { users, addUser, sortBy, pageNo, perPage, sortOrder } = this.state;
		return(
			<div>
				<div className="row">
					<div className="col-md-2">Sort By</div>
					<div className="col-md-4">
						<SelectField
							value={sortBy}
							onChange={this.onSortByChange}
							options={SORT_OPTIONS}
						/>
						<SelectField
							value={sortOrder}
							onChange={this.onSortOrderChange}
							options={SORT_ORDER}
						/>
					</div>
					<div className="col-md-2">
						<TextInput
							label="Page No."
							value={pageNo}
							name="pageNo"
							type="number"
							onChange={this.onTextChange}
							placeholder="Page No."
							helpText="Present page number"
						/>
					</div>
					<div className="col-md-2">
						<TextInput
							name="perPage"
							label="Entries per page"
							value={perPage}
							type="number"
							onChange={this.onTextChange}
							placeholder="Entries per Page."
							helpText="Records per page."
						/>
					</div>
				</div>
				<button type="button" onClick={this.onUserAddition} className="btn btn-primary">{addUser ? "Visit Users Page" : "Add User"}</button>
				{addUser ? <UserForm toggleUserView={this.onUserAddition}/> :
					<table className="table">
					  <thead>
					    <tr>
					      <th scope="col">First Name</th>
					      <th scope="col">Last Name</th>
					      <th scope="col">Email</th>
					      <th scope="col">Role</th>
					    </tr>
					  </thead>
					  <tbody>
					  {users.map(user => (
					  	<tr>
					      <td>{user.first_name}</td>
					      <td>{user.last_name}</td>
					      <td>{user.email}</td>
					      <td>{user.role}</td>
					    </tr>
					  ))}
					  </tbody>
					</table>
				}
			</div>
		)
	}
}

export default UserComponent;