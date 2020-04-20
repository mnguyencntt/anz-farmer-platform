import React, { Component } from "react";
import axios from 'axios';

export default class UserInfo extends Component {
  state = {
    error: null,
    isLoaded: false,
    userInfo: {}
  };

  componentDidMount() {
    axios.get(
      'https://pecnupsocd.execute-api.ap-southeast-2.amazonaws.com/send/testnotification',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('auth_id_token')
        }
      })
      .then(result => {
        console.log('Success testnotification with token');
        console.log(result.data);
        this.setState({
          isLoaded: true,
          userInfo: result.data
        });
      })
      .catch(function (error) {
        console.log('Failed testnotification with token');
        console.log(error);
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    const { error, isLoaded, userInfo } = this.state;
    if (error) {
      return (
        <div>
          <h2>UserInfo</h2>
          <text>Error: {error.message}</text>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div>
          <text>Loading...</text>
        </div>
      );
    } else {
      return (
        <div>
          <h2>UserInfo</h2>
          <p>Status: {userInfo.status}</p>
          <p>Message: {userInfo.message}</p>
        </div>
      );
    }
  }
}
