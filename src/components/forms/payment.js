import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import PaypalExpress from './Paypal.js'
import PaymentForm from './cardInput/index.js'

class Payment extends React.Component {
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
            <div >
                <div >
                    <h5>Paypal Express</h5>
                    <br />
                    <PaypalExpress total={this.props.total} />
                </div>
                <br />
                <hr />
                <br />
                <h5>VISA / MASTER / AMEX</h5>
                <div >
                    <PaymentForm />
                </div>
            </div>
        )
    }
}

export default Payment