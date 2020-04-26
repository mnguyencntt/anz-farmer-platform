import React from 'react';
import axios from "axios";
import { Button, Modal } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import ReactCreditCards from './ReactCreditCards.js';
import PaypalExpress from '../Paypal.js'

// Step1: Submit Delivery Info
// Step2: Submit Payment Info
// Step3: Submit Order Info
// Step4: Redirect to show Receipt Info
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeliveryChange = this.handleDeliveryChange.bind(this);
    this.handleDeliverySubmit = this.handleDeliverySubmit.bind(this);
    this.handlePaymentSubmit = this.handlePaymentSubmit.bind(this);
    this.state = {
      // Page Info
      error: null,
      isLoaded: null,
      isLogin: null,
      auth_id_token: localStorage.auth_id_token,

      // Payment Info
      cvv: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',

      // Delivery Info
      orderId: 'OrderId12345',
      deliveryType: 'SHIPPING',
      deliveryMethod: 'SHIPPING',
      priceDelivery: '10',
      courierName: 'GoGoVan',
      fullName: '',
      phone: '',
      email: '',
      deliveryAddress: '',
      note: ''
    };
  }

  handlePaymentInputFocus = (e, id) => {
    if (id == "name") this.setState({ focus: e.target.name });
    if (id == "card") this.setState({ focus: e.target.number });
    if (id == "cvv") this.setState({ focus: e.target.cvv });
    if (id == "expiry") this.setState({ focus: e.target.expiry });
  }

  handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handlePaymentSubmit = (e) => {
    e.preventDefault();
    // fake aws payment API
    const data = {
      paymentMethod: 'Master',
      amount: 250
    }
    axios.post('https://3yappv0hpg.execute-api.ap-southeast-1.amazonaws.com/prod/pay',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.auth_id_token
        }
      })
      .then(res => {
        this.props.history.push('/receipt');
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDeliveryChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // if (e.target.name === "fullName") {
    //   this.setState({ fullName: e.target.value });
    // } else if (e.target.name === "phone") {
    //   this.setState({ phone: e.target.value });
    // } else if (e.target.name === "email") {
    //   this.setState({ email: e.target.value });
    // } else if (e.target.name === "deliveryAddress") {
    //   this.setState({ deliveryAddress: e.target.value });
    // } else if (e.target.name === "note") {
    //   this.setState({ note: e.target.value });
    // }
  }

  handleDeliverySubmit(e) {
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
  }

  render() {
    const { error, isLoaded, isLogin, isPayment } = this.state;
    if (isLoaded == null) {
      return (
        <div className="">
          <div id="DeliveryForm" >
            {/* <form onSubmit={this.handleSubmit.bind(this)}> */}
            <h5>Delivery Info</h5>
            <label>
              Full Name:
                <input type="text" name="fullName" value={this.state.fullName} onChange={this.handleDeliveryChange} />
            </label>
            <label>
              Phone:
                <input type="text" name="phone" value={this.state.phone} onChange={this.handleDeliveryChange} />
            </label>
            <label>
              Email:
                <input type="text" name="email" value={this.state.email} onChange={this.handleDeliveryChange} />
            </label>
            <label>
              DeliveryAddress:
                <input type="text" name="deliveryAddress" value={this.state.deliveryAddress} onChange={this.handleDeliveryChange} />
            </label>
            <label>
              Note:
                <input type="text" name="note" value={this.state.note} onChange={this.handleDeliveryChange} />
            </label>
            <p></p>
            {/* <input type="submit" onClick={this.handleDeliverySubmit} value="Submit" /> */}
            {/* </form> */}
          </div>

          <div id="PaymentForm" >
            <h5>Paypal Express</h5>
            <PaypalExpress total={this.props.total} />
            <hr />

            <h5>VISA / MASTER / AMEX</h5>
            <ReactCreditCards number={this.state.number} name={this.state.name} cvc={this.state.cvv} expiry={this.state.expiry} />
            <form onSubmit={this.handlePaymentSubmit} style={{ paddingBottom: "1%" }} >
              <input
                type="tel"
                name="number"
                placeholder="Card Number"
                onChange={this.handlePaymentInputChange}
                onFocus={this.handlePaymentInputFocus}
                maxLength="16"
              />
              <input
                type="tel"
                name="name"
                placeholder="Name On Card"
                onChange={this.handlePaymentInputChange}
                onFocus={this.handlePaymentInputFocus}
              />
              <input
                type="tel"
                name="expiry"
                placeholder="expiry"
                onChange={this.handlePaymentInputChange}
                onFocus={this.handlePaymentInputFocus}
              />
              <input type="submit" value="CHECKOUT" class="waves-effect waves-light btn" />
            </form>
          </div>
        </div>
      )
    } else if (!isLoaded) {
      return (
        <div className="container">
          <h2>Checkout Info</h2>
          <p>Submitting Checkout Info...loading...</p>
        </div>
      );
    } else if (error) {
      return (
        <div className="container">
          <h2>Checkout</h2>
          <p>Error: {error.message}</p>
        </div>
      );
    }
    // else if (isLoaded) {
    //   return <Redirect to='/receipt' />
    // }
  }
}

export default withRouter(CheckoutForm)