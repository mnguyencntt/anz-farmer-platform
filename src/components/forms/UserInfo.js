import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.state = {
      error: null,
      home: false,
      isLoaded: false,

      userId: '12345',
      findFunctionType: 'FINDID',
      updateFunctionType: 'UPDATE',

      id: '',
      username: '',
      password: '',
      name: '',
      dateOfBirth: '',
      gender: '',
      imageAvatarUrl: '',
      phoneNumber: '',
      email: '',
      fullAddress: '',
      postcode: '',

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
      'userId': this.state.userId,
      'functionType': this.state.findFunctionType
    };
    console.log(requestInfo);
    console.log('tokenIdInfo: ' + this.props.token);
    axios.post('https://59mq2jad5i.execute-api.ap-southeast-2.amazonaws.com/prod/user', requestInfo, { headers })
      .then(result => {
        console.log('Success getUserInfo with token');
        const response = result.data;
        const responseData = response.data;
        console.log(responseData);

        const baseAddress = JSON.parse(responseData.baseAddress);

        this.setState({
          isLoaded: true,
          id: responseData.id,
          username: responseData.username,
          password: responseData.password,
          name: responseData.name,
          dateOfBirth: responseData.dateOfBirth,
          gender: responseData.gender,
          imageAvatarUrl: responseData.imageAvatarUrl,
          phoneNumber: baseAddress.phoneNumber,
          email: baseAddress.email,
          fullAddress: baseAddress.fullAddress,
          postcode: baseAddress.postcode
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

  handleUserSubmit(e) {
    e.preventDefault();
    const headers = this.state.headers;
    const baseAddress = {
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      fullAddress: this.state.fullAddress,
      postcode: this.state.postcode
    };
    const updateInfo = {
      "id": "12345",
      "username": "testuser",
      "password": "testpassword",
      "name": this.state.name,
      "dateOfBirth": this.state.dateOfBirth,
      "gender": this.state.gender,
      "isActivated": "TRUE",
      "userType": "SELLER",
      "imageAvatarUrl": "https://www.google.com/MinhNguyenAvatar.png",
      "baseAddress": baseAddress,

      "functionType": "UPDATE"
    };
    console.log(updateInfo);
    console.log('tokenIdInfo: ' + this.props.token);
    this.setState({ isLoaded: false });
    // authenticate
    axios.post('https://59mq2jad5i.execute-api.ap-southeast-2.amazonaws.com/prod/user', updateInfo, { headers })
      .then(result => {
        console.log('Success updateUserInfo with token');
        const response = result.data;
        console.log(responseData);
        const responseData = response.data;
        console.log(responseData);
        this.setState({
          isLoaded: true,
          //responseData: responseData
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

  handleUserChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    let addedItems = this.props.items.length;
    const { error, home, isLoaded } = this.state;
    const readOnly = 'readOnly';
    const userInfoStyle = { minHeight: "700px" };

    if (home) {
      return <Redirect to='/' />
    } else if (error) {
      return (
        <div className="container" style={userInfoStyle}>
          <h2>User Info</h2>
          <p>Error: {error.message}</p>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="container" style={userInfoStyle}>
          <h2>User Info</h2>
          <p>Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="container" style={userInfoStyle}>
          <h2>User Info</h2>
          <label>Id:            <input type="text" readOnly={readOnly} name="id" value={this.state.id} onChange={this.handleUserChange} /></label>
          <label>Username:      <input type="text" readOnly={readOnly} name="username" value={this.state.username} onChange={this.handleUserChange} /></label>
          {/* <label>Password:      <input type="text" readOnly={readOnly} name="password" value={this.state.password} onChange={this.handleUserChange} /></label>
          <label>Avatar:        <input type="text" readOnly={readOnly} name="gender" value={this.state.imageAvatarUrl} onChange={this.handleUserChange} /></label> */}
          <label>FullName:      <input type="text" name="name" value={this.state.name} onChange={this.handleUserChange} /></label>
          <label>Date Of Birth: <input type="text" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleUserChange} /></label>
          <label>Gender:        <input type="text" name="gender" value={this.state.gender} onChange={this.handleUserChange} /></label>
          <label>Phone:         <input type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleUserChange} /></label>
          <label>Email:         <input type="text" name="email" value={this.state.email} onChange={this.handleUserChange} /></label>
          <label>Address:       <input type="text" name="fullAddress" value={this.state.fullAddress} onChange={this.handleUserChange} /></label>
          <label>Postcode:       <input type="text" name="postcode" value={this.state.postcode} onChange={this.handleUserChange} /></label>
          <p></p>
          <button className="waves-effect waves-light btn" onClick={this.handleUserSubmit}>Update</button>
          <p></p>
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