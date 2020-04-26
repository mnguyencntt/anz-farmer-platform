import React, { Component } from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { addUsernameInfo, addTokenIdInfo } from '../actions/cartActions';
import Payment from './Payment.js';

class DeliveryForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: null,
      isLoaded: null,
      isLogin: null,

      auth_id_token: localStorage.getItem('auth_id_token'),
      orderId: 'OrderId12345',
      deliveryType: 'SHIPPING',
      deliveryMethod: 'SHIPPING',
      priceDelivery: '10',
      courierName: 'GoGoVan',
      fullName: '',
      phone: '',
      email: '',
      deliveryAddress: '',
      note: '',
    };
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

  handleSubmit(e) {
    e.preventDefault()
    alert(this.state.deliveryAddress + '-' + this.state.phone + '-' + this.state.email + '-' + !this.state.auth_id_token);
    console.log(this.state.deliveryAddress + '-' + this.state.phone + '-' + this.state.email + '-' + !this.state.auth_id_token);
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

    // this.props.history.push('/payment'); // Payment
  }

  render() {
    const { error, isLoaded, isLogin, isPayment } = this.state;
    if (isLoaded == null) {
      return (
        <div className="container">
          {/* <form onSubmit={this.handleSubmit.bind(this)}> */}
          <h2>Delivery Info</h2>
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

          <p>(to be shifted )</p>
          <div style={{ width: "30%", height: "auto" }} >
            <Payment total={this.props.total} />
          </div>
        </div>
      )
    } else if (!isLoaded) {
      return (
        <div className="container">
          <h2>Delivery Info</h2>
          <p>Submitting Delivery Info...loading...</p>
        </div>
      );
    } else if (error) {
      return (
        <div className="container">
          <h2>Delivery Info</h2>
          <p>Error: {error.message}</p>
        </div>
      );
    } else if (isLoaded) {
      return <Redirect to='/payment' />
    }
  }
}
export default withRouter(DeliveryForm);
