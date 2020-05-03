import React from 'react';
import axios from "axios";
import Select from 'react-select';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import ReactCreditCards from './ReactCreditCards.js';
import PaypalExpress from '../Paypal.js';
import { Redirect } from 'react-router-dom';
import { generateId, getCurrentTime, isEmpty } from '../ButtonUtils.js';
import { addUsernameInfo, addTokenIdInfo, addPaymentInfo, addDeliveryInfo, addNotificationInfo, addOrderInfo, clearCart } from '../../actions/cartActions';

// Step1: Submit Payment Info
// Step2: Submit Delivery Info
// Step3: Submit Notification Info
// Step4: Submit Order Info
// Step5: Redirect to show Receipt Info
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeliveryChange = this.handleDeliveryChange.bind(this);
    this.handlePaymentDropdownChange = this.handlePaymentDropdownChange.bind(this);

    this.handleCheckoutSubmit = this.handleCheckoutSubmit.bind(this);
    this.handlePaymentSubmit = this.handlePaymentSubmit.bind(this);
    this.handleDeliverySubmit = this.handleDeliverySubmit.bind(this);
    this.handleNotificationSubmit = this.handleNotificationSubmit.bind(this);
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
    this.formatProductForOrder = this.formatProductForOrder.bind(this);
    this.clearShoppingCart = this.clearShoppingCart.bind(this);
    this.state = {
      // Page Info
      error: null,
      isPaymentLoaded: null,
      isDeliveryLoaded: null,
      isNotificationLoaded: null,
      isOrderLoaded: null,

      // Payment Info
      paymentInputMessage: null,
      cvv: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
      //
      selectedOption: null,
      paymentOptionMessage: null,
      paymentOptionList: [
        { label: "Paypal", value: 1 },
        { label: "VISA/MASTER/AMEX", value: 2 }
      ],

      // Delivery Info
      deliveryInputMessage: null,
      deliveryId: "DELIVERYID_" + getCurrentTime() + '_' + generateId(15),
      orderId: 'OrderId12345',
      deliveryType: 'SHIPPING',
      deliveryMethod: 'SHIPPING',
      priceDelivery: '10',
      courierName: 'GoGoVan',
      //
      fullName: '',
      phone: '',
      email: '',
      deliveryAddress: '',
      postcode: '',
      note: '',

      // Header for all APIs
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.token
      }
    };
  }

  componentDidMount() {
    // TODO - Initialize Data
  }

  handlePaymentInputFocus = (e, id) => {
    if (id == "name") this.setState({ focus: e.target.name });
    if (id == "card") this.setState({ focus: e.target.number });
    if (id == "cvv") this.setState({ focus: e.target.cvv });
    if (id == "expiry") this.setState({ focus: e.target.expiry });
  }

  handlePaymentDropdownChange = (selectedOption) => {
    console.log(selectedOption.value + '-' + selectedOption.label);
    this.setState({ selectedOption });
  }

  handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleDeliveryChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleCheckoutSubmit(e) {
    e.preventDefault();

    var isValidSelectionInput = false;
    const { selectedOption } = this.state;
    if (isEmpty(selectedOption) || isEmpty(selectedOption.value)) {
      this.setState({ paymentOptionMessage: '***' });
      isValidSelectionInput = false;
    } else {
      this.setState({ paymentOptionMessage: null });
      isValidSelectionInput = true;
    }

    var isValidPaymentInput = false;
    const { number, name, expiry, cvv } = this.state;
    if (isEmpty(number) || isEmpty(name) || isEmpty(expiry) || isEmpty(cvv)) {
      this.setState({ paymentInputMessage: '***' });
      isValidPaymentInput = false;
    } else {
      this.setState({ paymentInputMessage: null });
      isValidPaymentInput = true;
    }

    var isValidDeliveryInput = false;
    const { fullName, phone, email, deliveryAddress, postcode } = this.state;
    if (isEmpty(fullName) || isEmpty(phone) || isEmpty(email) || isEmpty(deliveryAddress) || isEmpty(postcode)) {
      this.setState({ deliveryInputMessage: '***' });
      isValidDeliveryInput = false;
    } else {
      this.setState({ deliveryInputMessage: null });
      isValidDeliveryInput = true;
    }

    if (isValidSelectionInput && isValidPaymentInput && isValidDeliveryInput) {
      const products = this.props.addedItems.map(this.formatProductForOrder);
      let amount = 0;
      products.forEach(function (product, index) {
           amount += product.totalPrice;
      });
      const orderInfo = {
        "products": products,
        "deliveryId": this.state.deliveryId
      };
      // Payment
      this.handlePaymentSubmit(amount);
      // Delivery
      this.handleDeliverySubmit(e);
      // Notification
      this.handleNotificationSubmit(e);
      // Order
      this.handleOrderSubmit(orderInfo);
      // Clear Shopping Cart
      this.clearShoppingCart(orderInfo);
    } else {
      console.log('Inputs are invalid. ' + isValidSelectionInput + ' - ' + isValidPaymentInput + ' - ' + isValidDeliveryInput);
    }
  }

  handlePaymentSubmit(amount) {
    // e.preventDefault();
    this.setState({ isPaymentLoaded: false });
    const headers = this.state.headers;
    const data = {
      paymentMethod: 'Master',
      amount: amount
    };
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
  }

  handleDeliverySubmit(e) {
    // e.preventDefault();
    this.setState({ isDeliveryLoaded: false });
    const headers = this.state.headers;
    const deliveryinfo = {
      "deliveryId": this.state.deliveryId,
      "orderId": "OrderId12345",
      "deliveryType": "SHIPPING",
      "deliveryMethod": "SHIPPING",
      "priceDelivery": "10$",
      "courierName": "GoGoVan",
      "pickupAddress": {
        "fullName": this.state.fullName,
        "fullAddress": this.state.deliveryAddress,
        "postcode": this.state.postcode,
        "phoneNumber": this.state.phone,
        "email": this.state.email
      },
      "deliveryAddress": {
        "fullName": this.state.fullName,
        "fullAddress": this.state.deliveryAddress,
        "postcode": this.state.postcode,
        "phoneNumber": this.state.phone,
        "email": this.state.email
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
    // e.preventDefault();
    this.setState({ isNotificationLoaded: false });
    const headers = this.state.headers;
    const notificationInfo = {
      "senderId": "UIB12345",
      "orderId": "OI12345",
      "deliveryId": this.state.deliveryId,
      "eventStatus": "ORDER_CREATED",
      "recieverId": "UIS12345",
      "_smsNumber": "+65" + this.state.phone,
      "sesEmail": this.state.email,
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

  formatProductForOrder(product) {
      var total = product.price * product.quantity;
      return {
          productId: product.id,
          productTitle: product.title,
          sellerId: product.sellerId || "",
          quantity: product.quantity,
          totalPrice: total
      }
  }
  handleOrderSubmit(orderInfo) {
    // e.preventDefault();
    this.setState({ isOrderLoaded: false });
    const headers = this.state.headers;
    axios.post('https://j2eh3z4v2j.execute-api.ap-southeast-1.amazonaws.com/prod/order', orderInfo, { headers })
      .then(res => {
        console.log('success create order with token');
        this.setState({ isOrderLoaded: true });
        const orderResponseData = res.data;
        console.log(orderResponseData);
        this.props.addOrderInfo(orderResponseData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  clearShoppingCart(orderInfo) {
      this.props.clearCart(orderInfo.products, this.props.token);
  }

  render() {
    const { error, isPaymentLoaded, isDeliveryLoaded, isNotificationLoaded, isOrderLoaded, selectedOption } = this.state;
    // let { usernameInfo, passwordInfo, tokenIdInfo } = this.props;
    let paymentStyle = { paddingTop: "2%", paddingBottom: "2%" };
    let paymentDivForm = null;
    if (selectedOption === null || selectedOption.value === null) {
      paymentDivForm = (<div></div>);
    } else if (selectedOption.value === 1) {
      paymentDivForm =
        (<div style={paymentStyle}>
          <h5>Paypal Express</h5>
          <PaypalExpress total={this.props.total} />
        </div>);
    } else if (selectedOption.value === 2) {
      paymentDivForm =
        (<div style={paymentStyle}>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <h5>VISA / MASTER / AMEX</h5>
                  <form onSubmit={this.handleCheckoutSubmit} style={{ paddingBottom: "1%" }} >
                    <label style={{ color: 'red' }}>{this.state.paymentInputMessage}</label>
                    <input type="tel" name="number" onChange={this.handlePaymentInputChange} onFocus={this.handlePaymentInputFocus} placeholder="*Card Number" maxLength="16" />
                    <input type="tel" name="name" onChange={this.handlePaymentInputChange} onFocus={this.handlePaymentInputFocus} placeholder="*Name On Card" />
                    <input type="tel" name="expiry" onChange={this.handlePaymentInputChange} onFocus={this.handlePaymentInputFocus} placeholder="*expiry" />
                    <input type="tel" name="cvv" onChange={this.handlePaymentInputChange} onFocus={this.handlePaymentInputFocus} placeholder="*cvv" />
                    <input type="submit" value="CHECKOUT" className="waves-effect waves-light btn" />
                  </form>
                </td>
                <td>
                  <ReactCreditCards number={this.state.number} name={this.state.name} cvc={this.state.cvv} expiry={this.state.expiry} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>);
    }

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
            {/* {this.state.fullName} - {this.state.phone} - {this.state.email} */}
            <label style={{ color: 'red' }}>{this.state.deliveryInputMessage}</label>
            <label><input type="text" name="fullName" value={this.state.fullName} onChange={this.handleDeliveryChange} placeholder="*Full Name" /></label>
            <label><input type="text" name="phone" value={this.state.phone} onChange={this.handleDeliveryChange} placeholder="*Phone" /></label>
            <label><input type="text" name="email" value={this.state.email} onChange={this.handleDeliveryChange} placeholder="*Email" /></label>
            <label><input type="text" name="deliveryAddress" value={this.state.deliveryAddress} onChange={this.handleDeliveryChange} placeholder="*Delivery Address" /></label>
            <label><input type="text" name="postcode" value={this.state.postcode} onChange={this.handleDeliveryChange} placeholder="*Postcode" /></label>
            <label><input type="text" name="note" value={this.state.note} onChange={this.handleDeliveryChange} placeholder="Note" /></label>
            <p></p>
            {/* <input type="submit" onClick={this.handleDeliverySubmit} value="Submit" class="waves-effect waves-light btn" /> */}
            {/* </form> */}
          </div>
          <div>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>*Please select your payment method <label style={{ color: 'red' }}>{this.state.paymentOptionMessage}</label></td>
                  <td><Select options={this.state.paymentOptionList} onChange={this.handlePaymentDropdownChange} /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="PaymentForm" >
            {paymentDivForm}
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
    addedItems: state.addedItems,
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
    addOrderInfo: (id) => { dispatch(addOrderInfo(id)) },
    clearCart: (id, token) => { dispatch(clearCart(id, token)) },
  }
}

// export default withRouter(CheckoutForm)
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
