import React, { Component } from 'react';
import UserComponent from './components/UserComponent';
import RoleComponent from './components/RoleComponent';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      view: "user"
    }
  }

  onClickPageChange = (event) => {
    const { dataset } = event.currentTarget;
    this.setState({
      view: dataset.page
    })
  }

  render() {
    const { view } = this.state;
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand navbar-link" onClick={this.onClickPageChange} data-page="user">Users</a>
          <a className="navbar-brand navbar-link" onClick={this.onClickPageChange} data-page="role">Roles</a>
        </nav>
          {view === 'user' ? <UserComponent/> : <RoleComponent/>}
      </div>
    );
  }
}

export default App;
