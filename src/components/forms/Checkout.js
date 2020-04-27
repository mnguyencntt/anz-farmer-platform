import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import PaypalExpress from './Paypal.js'
import CheckoutForm from './cardInput/CheckoutForm.js'

class Checkout extends React.Component {
    constructor(props) {
        super(props)
        // this.state ={
        //     ModalShow: false
        // }
        // this.handleClose = this.handleClose.bind(this);
        // this.handleShow = this.handleShow.bind(this);
    }
    // handleShow =() =>{
    //     this.setState({ModalShow: true});
    // }
    // handleClose =()=>{
    //     this.setState({ModalShow: false});
    // }

    render() {
        // const show = this.state.ModalShow;
        return (
            <div className="container">
                {/* <div >
                    <h5>Paypal Express Checkout:</h5>
                    <br />
                    <PaypalExpress total={this.props.total} />
                </div> */}
                <div >
                    <CheckoutForm total={this.props.total} />
                </div>
            </div>
        )
    }
}

export default Checkout