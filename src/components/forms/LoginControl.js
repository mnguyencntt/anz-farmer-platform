import React from 'react';

export default class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLoggedIn: false,
      username: localStorage.getItem('username')
    };
  }

  handleLoginClick() {
    localStorage.setItem('username', 'MinhNguyen111')
    this.setState({ isLoggedIn: true })
    alert('login');
  }

  handleLogoutClick() {
    localStorage.removeItem('username')
    this.setState({ isLoggedIn: false })
    alert('logout');
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <a onClick={this.handleLogoutClick}>Logout</a>;
    } else {
      button = <a onClick={this.handleLoginClick}>Login</a>;
    }

    return (
      <div>
        <a>Username: {this.state.username}</a>
        <br />
        <a>Username: {localStorage.getItem('username')}</a>
        <br />
        <a>Status: {isLoggedIn}</a>
        <br />
        {button}
      </div>
    );
  }
}