import React from 'react';
import ReactCreditCards from './ReactCreditCards.js';
export default class PaymentForm extends React.Component {
  constructor(props){
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

  handleInputFocus = (e,id) => {
    if(id=="name")this.setState({ focus: e.target.name });
    if(id=="card")this.setState({ focus: e.target.number });
    if(id=="cvv")this.setState({ focus: e.target.cvv });
    if(id=="expiry")this.setState({ focus: e.target.expiry });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  
  handleSubmit = (e) =>{  
  e.preventDefault();
    
  }

  render() {
    return (
      <div id="PaymentForm" >
        <ReactCreditCards number={this.state.number} name={this.state.name} cvc={this.state.cvv} expiry={this.state.expiry}   />   
        <form onSubmit={this.handleSubmit}>
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
          <input type="submit" style={{width:"150px", height:"30px", borderRadius:'3px' }}   />
        </form>
      </div>
    );
  }
}