import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import RedirectComponent from './RedirectComponent';
import { HomeButton } from './ButtonUtils';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userInfo: {
        status: '000',
        message: 'MinhTesting-UserInfo'
      }
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
    let addedItems = this.props.items.length;
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
        <div className="container">
          <h2>User Info</h2>
          <p>Status: {userInfo.status} item(s)</p>
          <p>Message: {userInfo.message}</p>
          <h5>You have ordered: {addedItems}</h5>
          <hr />
          <RedirectComponent />
          <HomeButton />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)