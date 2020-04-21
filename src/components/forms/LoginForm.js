import React from 'react';
import axios from "axios";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'testuser',
      password: 'testpassword',

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === "username") {
      this.setState({ username: event.target.value });
    } else if (event.target.name === "password") {
      this.setState({ password: event.target.value });
    }
  }

  handleSubmit(event) {
    console.log('[username: ' + this.state.username + ', password: ' + this.state.password + ']');
    // authenticate
    const userinfo = {
      'username': this.state.username,
      'password': this.state.password
    };
    axios.post(
      'https://gpew1dlmkg.execute-api.ap-southeast-2.amazonaws.com/prod/authenticate',
      userinfo,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log('success authenticate with token');
        const authentication = res.data;
        this.setState({ authentication: authentication });
        localStorage.setItem('username', this.state.username)
        localStorage.setItem('password', this.state.password)
        localStorage.setItem('auth_status', authentication.status)
        localStorage.setItem('auth_user_id', authentication.user_id)
        localStorage.setItem('auth_id_token', authentication.id_token)
        console.log(authentication);
      });
    // notification
    axios.get(
      'https://pecnupsocd.execute-api.ap-southeast-2.amazonaws.com/send/testnotification',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('auth_id_token')
        }
      })
      .then(res => {
        console.log('success testnotification with token');
        const notification = res.data;
        this.setState({ notification: notification });
        console.log(notification);
      });
      //window.location.reload()
  }

  render() {
    return (
      <div className="container">
        {/* <form onSubmit={this.handleSubmit}> */}
        <h1>Login {this.state.username} {this.state.password}</h1>
        <label>
          Username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Password:
            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <p></p>
        <input type="submit" onClick={this.handleSubmit} value="Submit" />
        {/* </form> */}
      </div>
    );
  }
}