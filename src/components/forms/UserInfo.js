import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userInfo: {}
    };
  }

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
          <p>Error: {error.message}</p>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div>
          <p>Loading...</p>
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

const mapStateToProps = (state) => {
  return {
    items: state.username,
    items: state.auth_id_token
  }
}

export default connect(mapStateToProps)(UserInfo)