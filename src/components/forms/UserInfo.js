import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: null,
      home: false,
      isLoaded: false,
      tokenIdInfo: this.props.token,
      requestInfo: {
        userId: '12345',
        functionType: 'FINDID'
      },
      updateInfo: {
        userId: '12345',
        functionType: 'UPDATE'
      },
      responseInfo: {},

      // Header for all APIs
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      }
    };
  }

  componentDidMount() {
    const headers = this.state.headers;
    const requestInfo = {
      'userId': this.state.requestInfo.userId,
      'functionType': this.state.requestInfo.functionType
    };
    console.log(requestInfo);
    console.log('tokenIdInfo: ' + this.state.tokenIdInfo);
    axios.post('https://59mq2jad5i.execute-api.ap-southeast-2.amazonaws.com/prod/user', requestInfo, { headers })
      .then(result => {
        console.log('Success getUserInfo with token');
        console.log(result.data);
        this.setState({
          isLoaded: true,
          responseInfo: result.data
        });
      })
      .catch(function (error) {
        console.log('Failed getUserInfo with token');
        console.log(error);
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(updateInfo);
    console.log('tokenIdInfo: ' + this.state.tokenIdInfo);
    this.setState({ isLoaded: false });
    // authenticate
    const updateInfo = {
      'username': 'testuser',
      'password': 'testpassword'
    };
    axios.post(
      'https://59mq2jad5i.execute-api.ap-southeast-2.amazonaws.com/prod/user',
      updateInfo,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.props.token
        }
      })
      .then(result => {
        console.log('Success updateUserInfo with token');
        console.log(result.data);
        this.setState({
          isLoaded: true,
          responseInfo: result.data
        });
      })
      .catch(function (error) {
        console.log('Failed updateUserInfo with token');
        console.log(error);
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  handleChange(event) {
    if (event.target.name === "fullName") {
      this.setState({ fullName: event.target.value });
    } else if (event.target.name === "phone") {
      this.setState({ phone: event.target.value });
    } else if (event.target.name === "email") {
      this.setState({ email: event.target.value });
    } else if (event.target.name === "deliveryAddress") {
      this.setState({ deliveryAddress: event.target.value });
    } else if (event.target.name === "note") {
      this.setState({ note: event.target.value });
    }
  }

  render() {
    let addedItems = this.props.items.length;
    const { error, home, isLoaded, responseInfo } = this.state;
    const responseData = responseInfo.data;
    const readOnly = 'readOnly';
    if (home) {
      return <Redirect to='/' />
    } else if (error) {
      return (
        <div className="container">
          <h2>UserInfo</h2>
          <p>Error: {error.message}</p>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="container">
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h2>User Info</h2>
          <p>Status: {responseInfo.status}, Message: {responseInfo.message}</p>
          <label>
            Id:
                <input type="text" readOnly={readOnly} name="id" value={this.state.responseInfo.data.id} onChange={this.handleChange} />
          </label>
          <label>
            Username:
                <input type="text" readOnly={readOnly} name="username" value={this.state.responseInfo.data.username} onChange={this.handleChange} />
          </label>
          <label>
            Password:
                <input type="text" readOnly={readOnly} name="password" value={this.state.responseInfo.data.password} onChange={this.handleChange} />
          </label>
          <label>
            FullName:
                <input type="text" readOnly={readOnly} name="name" value={this.state.responseInfo.data.name} onChange={this.handleChange} />
          </label>
          <label>
            Date Of Birth:
                <input type="text" readOnly={readOnly} name="dateOfBirth" value={this.state.responseInfo.data.dateOfBirth} onChange={this.handleChange} />
          </label>
          <label>
            Gender:
                <input type="text" readOnly={readOnly} name="gender" value={this.state.responseInfo.data.gender} onChange={this.handleChange} />
          </label>
          <p></p>
          {/* <input type="submit" onClick={this.handleSubmit} value="Submit" /> */}
          <button className="waves-effect waves-light btn" onClick={this.handleSubmit}>Update</button>
          <p></p>
          {/* <h5>You have ordered: {addedItems}</h5>
          <button className="waves-effect waves-light btn" onClick={this.handleCheckoutClick}>Checkout</button>
          <button className="waves-effect waves-light btn" onClick={this.handleHomeClick}>Home</button> */}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    userInfo: state.userInfo,
    tokenIdInfo: state.tokenIdInfo,
    token: state.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)