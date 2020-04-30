import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import ReactCreditCards from './ReactCreditCards.js';
import PaypalExpress from '../Paypal.js';
import { Redirect } from 'react-router-dom';
import { addUsernameInfo, addTokenIdInfo, addPaymentInfo, addDeliveryInfo, addNotificationInfo, addOrderInfo } from '../../actions/cartActions';

// Step1: Submit Payment Info
// Step2: Submit Delivery Info
// Step3: Submit Notification Info
// Step4: Submit Order Info
// Step5: Redirect to show Receipt Info
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeliveryChange = this.handleDeliveryChange.bind(this);
    this.handleDeliverySubmit = this.handleDeliverySubmit.bind(this);
    this.handlePaymentSubmit = this.handlePaymentSubmit.bind(this);
    this.handleNotificationSubmit = this.handleNotificationSubmit.bind(this);
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
    this.state = {
      // Page Info
      error: null,
      isPaymentLoaded: null,
      isDeliveryLoaded: null,
      isNotificationLoaded: null,
      isOrderLoaded: null,

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
      note: '',

      // Header for all APIs
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      }
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
    this.setState({ isPaymentLoaded: false });
    const headers = this.state.headers;
    const data = { paymentMethod: 'Master', amount: 250 };
    // Payment fake aws API
    axios.post('https://3yappv0hpg.execute-api.ap-southeast-1.amazonaws.com/prod/pay', data, { headers })
      .then(res => {
        console.log('success submit payment with token');
        this.setState({ isPaymentLoaded: true });
        const paymentResponses = JSON.parse(res.data.body).payment;
        const paymentResponse = paymentResponses[0];
        this.props.addPaymentInfo(paymentResponse);
        console.log(paymentResponse);
        //this.props.history.push('/receipt');
      })
      .catch(error => {
        console.log(error);
      });
    // Delivery
    this.handleDeliverySubmit(e);
    // Notification
    this.handleNotificationSubmit(e);
    // Order
    this.handleOrderSubmit(e);
  }

  handleDeliveryChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleDeliverySubmit(e) {
    //e.preventDefault();
    this.setState({ isDeliveryLoaded: false });
    const headers = this.state.headers;
    const deliveryinfo = {
      "orderId": "OrderId12345",
      "deliveryType": "SHIPPING",
      "deliveryMethod": "SHIPPING",
      "priceDelivery": "10$",
      "courierName": "GoGoVan",
      "pickupAddress": {
        "fullAddress": "#01-111, 145 Mei Ling Street",
        "postcode": "140145",
        "phoneNumber": "93767012",
        "email": "m.nguyencntt7891@gmail.com"
      },
      "deliveryAddress": {
        "fullAddress": "#01-111, 145 Mei Ling Street",
        "postcode": "140145",
        "phoneNumber": "93767012",
        "email": "m.nguyencntt7891@gmail.com"
      },
      "functionType": "CREATE"
    };
    axios.post('https://gplxchp4hc.execute-api.ap-southeast-2.amazonaws.com/prod/delivery', deliveryinfo, { headers })
      .then(res => {
        console.log('success create delivery with token');
        this.setState({ isDeliveryLoaded: true });
        const deliveryResponse = res.data;
        const deliveryResponseData = deliveryResponse.data;
        this.props.addDeliveryInfo(deliveryResponseData);
        console.log(deliveryResponseData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleNotificationSubmit(e) {
    //e.preventDefault();
    this.setState({ isNotificationLoaded: false });
    const headers = this.state.headers;
    const notificationInfo = {
      "senderId": "UIB12345",
      "orderId": "OI12345",
      "deliveryId": "DI12345",
      "eventStatus": "ORDER_CREATED",
      "recieverId": "UIS12345",
      "_smsNumber": "+6593767011",
      "sesEmail": "m.nguyencntt7891@gmail.com",
      "functionType": "SEND"
    };
    axios.post('https://95irmdf572.execute-api.ap-southeast-2.amazonaws.com/prod/send', notificationInfo, { headers })
      .then(res => {
        console.log('success send notification with token');
        this.setState({ isNotificationLoaded: true });
        const notificationResponse = res.data;
        const notificationResponseData = notificationResponse.data;
        this.props.addNotificationInfo(notificationResponseData);
        console.log(notificationResponseData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleOrderSubmit(e) {
    //e.preventDefault();
    this.setState({ isOrderLoaded: false });
    const headers = this.state.headers;
    const orderInfo = {
      "products": [
        {
          "productId": "asd123",
          "quantity": 1,
          "sellerId": "sdf459",
          "totalPrice": 456
        },
        {
          "productId": "asd456",
          "quantity": 3,
          "sellerId": "qwer459",
          "totalPrice": 456
        }
      ],
      "deliveryId": "asfoiur123123"
    };
    axios.post('https://j2eh3z4v2j.execute-api.ap-southeast-1.amazonaws.com/prod/order', orderInfo, { headers })
      .then(res => {
        console.log('success create order with token');
        this.setState({ isOrderLoaded: true });
        const orderResponseData = res.data;
        this.props.addOrderInfo(orderResponseData);
        console.log(orderResponseData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { error, isPaymentLoaded, isDeliveryLoaded, isNotificationLoaded, isOrderLoaded } = this.state;
    let usernameInfo = this.props.usernameInfo;
    let passwordInfo = this.props.passwordInfo;
    let tokenIdInfo = this.props.tokenIdInfo;
    if (isPaymentLoaded == null && isDeliveryLoaded == null && isNotificationLoaded == null && isOrderLoaded == null) {
      return (
        <div className="">
          <div id="DeliveryForm" >
            {/* <form onSubmit={this.handleSubmit.bind(this)}> */}
            <h5>Delivery Info</h5>
            {/* <h6>Check redux working</h6>
            <h6>usernameInfo: {usernameInfo}</h6>
            <h6>passwordInfo: {passwordInfo}</h6>
            <h6>tokenIdInfo: {tokenIdInfo}</h6> */}
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
            {/* <input type="submit" onClick={this.handleDeliverySubmit} value="Submit" class="waves-effect waves-light btn" /> */}
            {/* </form> */}
          </div>

          <div id="PaymentForm" >
            <h5>Paypal Express</h5>
            <PaypalExpress total={this.props.total} />
            <hr />

            <h5>VISA / MASTER / AMEX</h5>
            <ReactCreditCards number={this.state.number} name={this.state.name} cvc={this.state.cvv} expiry={this.state.expiry} />
            <form onSubmit={this.handlePaymentSubmit} style={{ paddingBottom: "1%" }} >
              <input type="tel" name="number" placeholder="Card Number" maxLength="16"
                onChange={this.handlePaymentInputChange} onFocus={this.handlePaymentInputFocus} />
              <input type="tel" name="name" placeholder="Name On Card"
                onChange={this.handlePaymentInputChange} onFocus={this.handlePaymentInputFocus} />
              <input type="tel" name="expiry" placeholder="expiry"
                onChange={this.handlePaymentInputChange} onFocus={this.handlePaymentInputFocus} />
              <input type="submit" value="CHECKOUT" class="waves-effect waves-light btn" />
            </form>
          </div>
        </div>
      )
    } else if (!isPaymentLoaded) {
      return (
        <div className="container">
          <h2>Checkout Info</h2>
          <p>Submitting Payment Info...loading...</p>
        </div>
      );
    } else if (!isDeliveryLoaded) {
      return (
        <div className="container">
          <h2>Checkout Info</h2>
          <p>Creating Delivery Info...loading...</p>
        </div>
      );
    } else if (!isNotificationLoaded) {
      return (
        <div className="container">
          <h2>Checkout Info</h2>
          <p>Sending Notification Info...loading...</p>
        </div>
      );
    } else if (!isOrderLoaded) {
      return (
        <div className="container">
          <h2>Checkout Info</h2>
          <p>Creating Order Info...loading...</p>
        </div>
      );
    }
    // else if (!isOrderLoaded) {
    //   return (
    //     <div className="container">
    //       <h2>Checkout Info</h2>
    //       <p>Submitting Order Info...loading...</p>
    //     </div>
    //   );
    // }
    else if (error) {
      return (
        <div className="container">
          <h2>Checkout</h2>
          <p>Error: {error.message}</p>
        </div>
      );
    } else {
      return <Redirect to='/receipt' />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    usernameInfo: state.usernameInfo,
    passwordInfo: state.passwordInfo,
    tokenIdInfo: state.tokenIdInfo,
    paymentInfo: state.paymentInfo,
    deliveryInfo: state.deliveryInfo,
    orderInfo: state.orderInfo,
    token: state.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUsernameInfo: (id) => { dispatch(addUsernameInfo(id)) },
    addTokenIdInfo: (id) => { dispatch(addTokenIdInfo(id)) },
    addPaymentInfo: (id) => { dispatch(addPaymentInfo(id)) },
    addDeliveryInfo: (id) => { dispatch(addDeliveryInfo(id)) },
    addNotificationInfo: (id) => { dispatch(addNotificationInfo(id)) },
    addOrderInfo: (id) => { dispatch(addOrderInfo(id)) }
  }
}

// export default withRouter(CheckoutForm)
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)