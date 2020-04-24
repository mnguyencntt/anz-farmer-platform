import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { addUsernameInfo, addTokenIdInfo } from '../actions/cartActions'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'testuser',
      password: 'testpassword',
      id_token: 'empty token - not login yet'
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
        console.log('Success authenticate with username: ' + this.state.username);
        const authentication = res.data;
        this.setState({ authentication: authentication });
        this.setState({ auth_id_token: authentication.id_token });
        localStorage.setItem('username', this.state.username)
        localStorage.setItem('password', this.state.password)
        localStorage.setItem('auth_status', authentication.status)
        localStorage.setItem('auth_user_id', authentication.user_id)
        localStorage.setItem('auth_id_token', authentication.id_token)
        console.log(authentication);
      })
      .catch(function (error) {
        console.log('Failed authenticate with username: ' + this.state.username);
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        {/* <form onSubmit={this.handleSubmit}> */}
        <h1>Login</h1>
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

const mapStateToProps = (state) => {
  return {
    usernameInfo: state.username,
    passwordInfo: state.password,
    tokenIdInfo: state.auth_id_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUsernameInfo: (id) => { dispatch(addUsernameInfo(id)) },
    addTokenIdInfo: (id) => { dispatch(addTokenIdInfo(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)