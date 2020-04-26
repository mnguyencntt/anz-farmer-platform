import React from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import ReactCreditCards from './ReactCreditCards.js';

class PaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cvv: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputFocus = (e, id) => {
    if (id == "name") this.setState({ focus: e.target.name });
    if (id == "card") this.setState({ focus: e.target.number });
    if (id == "cvv") this.setState({ focus: e.target.cvv });
    if (id == "expiry") this.setState({ focus: e.target.expiry });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (localStorage.auth_id_token) {
      // fake aws payment API
      const data = {
        paymentMethod: 'Master',
        amount: 250
      }
      axios.post('https://3yappv0hpg.execute-api.ap-southeast-1.amazonaws.com/prod/pay',
        data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.auth_id_token
          // 'Authorization' : 'eyJraWQiOiJQZCtjOGtGSzZBSXRnb3RrU2w4dmtkcnIyS0o5eXdSdEVmVzVudmFGOGZBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNmU3ODMyYi1lNTNhLTQyY2MtYTM3NS04MDM5ZWQxYjNhMjIiLCJhdWQiOiIzOG9jcTNvc2N0ZXQydnZ0N2gwM2RqamU5NSIsImV2ZW50X2lkIjoiNDZjNWEwM2EtODU5OS00YjZkLWJiMDgtZjdmODEwNmE1NzM4IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1ODc0NzU4NzEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMi5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMl9JWnVoaHhTZnciLCJjb2duaXRvOnVzZXJuYW1lIjoidGVzdHVzZXIiLCJleHAiOjE1ODc0Nzk0NzEsImlhdCI6MTU4NzQ3NTg3MX0.VcnMFvxeaNNr6X1bNXYifTX7BkwgZI5qr-H2CgW-CYrDvbvKKJYxIT2riXaYqHz7C-T1gzOcixW2MRIatBMOlS6cOUNGOXCfULfu8R8o8USX-3XSl38gsuePmpVHUjivQmYR1mAQTlsKbqjwrV6rqmJG1AluxKhuffrLY-dmCd87aSI1lLnQ38zk4ycx8a7Sf9ZY_dE_gMOsO25SYWXMw72AWgSFE_chVJs4BTYug_2gwMSVqQMHzqmHvUo0qXCZa6ez6frHXcRyKY8rK-7zqtQdOfVyzJGh9uNqLFEIg9b5t9RPthuVwykUoc0vatP1CgAdr535XKJp5TE10HQZwA'
        }
      })
        .then(res => {
          this.props.history.push('/Receipt');
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
      alert("Please login.")
    }

  }

  render() {
    return (
      <div id="PaymentForm" >
        <ReactCreditCards number={this.state.number} name={this.state.name} cvc={this.state.cvv} expiry={this.state.expiry} />
        <form onSubmit={this.handleSubmit} style={{ paddingBottom: "1%" }} >
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            maxLength="16"
          />
          <input
            type="tel"
            name="name"
            placeholder="Name On Card"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />

          <input
            type="tel"
            name="expiry"
            placeholder="expiry"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <input type="submit" value="CHECKOUT" style={{ width: "150px", height: "30px", borderRadius: '3px' }} />
        </form>
      </div>
    );
  }
}

export default withRouter(PaymentForm)