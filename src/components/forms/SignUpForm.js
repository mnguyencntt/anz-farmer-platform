import React from 'react';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
    alert('[username: ' + this.state.username + ', password: ' + this.state.password + ']');
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up {this.state.username} {this.state.password}</h1>
        <label>
          Username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Password:
            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <p></p>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SignUpForm;