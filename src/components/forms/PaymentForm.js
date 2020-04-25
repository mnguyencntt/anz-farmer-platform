import React, { Component } from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import { addUsernameInfo, addTokenIdInfo } from '../actions/cartActions'

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: null,
      isLoaded: null,
      isLogin: null,

      auth_id_token: localStorage.getItem('auth_id_token'),
      cardId: '1234-5678-9999-1111',
      fullName: 'Nguyen Van Minh',
      expireDate: '02/22',
    };
  }

  handleChange(event) {
    if (event.target.name === "cardId") {
      this.setState({ fullName: event.target.value });
    } else if (event.target.name === "fullName") {
      this.setState({ phone: event.target.value });
    } else if (event.target.name === "expireDate") {
      this.setState({ email: event.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    alert(this.state.cardId + '-' + this.state.fullName + '-' + this.state.expireDate + '-' + !this.state.auth_id_token);
    console.log(this.state.cardId + '-' + this.state.fullName + '-' + this.state.expireDate + '-' + !this.state.auth_id_token);
    this.setState({ isLoaded: false });
    // authenticate
    const userinfo = {
      'username': 'testuser',
      'password': 'testpassword'
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
        console.log('Success authenticate with username: testuser');
        const authentication = res.data;
        this.setState({
          isLoaded: true
        });
        console.log(authentication);
      });

    //this.props.history.push('/notification'); // Notification
  }

  render() {
    const { error, isLoaded, isLogin, isPayment } = this.state;
    if (isLoaded == null) {
      return (
        <div className="container">
          {/* <form onSubmit={this.handleSubmit.bind(this)}> */}
          <h2>Payment Info</h2>
          <label>
            Full Name:
                <input type="text" name="fullName" value={this.state.fullName} onChange={this.handleChange} />
          </label>
          <label>
            Phone:
                <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
          </label>
          <label>
            Email:
                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            DeliveryAddress:
                <input type="text" name="deliveryAddress" value={this.state.deliveryAddress} onChange={this.handleChange} />
          </label>
          <label>
            Note:
                <input type="text" name="note" value={this.state.note} onChange={this.handleChange} />
          </label>
          <p></p>
          <input type="submit" onClick={this.handleSubmit} value="Submit" />
          {/* </form> */}
        </div>
      )
    } else if (!isLoaded) {
      return (
        <div className="container">
          <h2>Payment Info</h2>
          <p>Submitting Payment Info...loading...</p>
        </div>
      );
    } else if (error) {
      return (
        <div className="container">
          <h2>Payment Info</h2>
          <p>Error: {error.message}</p>
        </div>
      );
    } else if (isLoaded) {
      return <Redirect to='/' /> // Notification
    }
  }
}
export default withRouter(PaymentForm);