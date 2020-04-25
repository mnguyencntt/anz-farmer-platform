import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Payment from '../components/forms/payment.js'
import Delivery from './forms/DeliveryForm.js'

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
        this.handleDeliveryClick = this.handleDeliveryClick.bind(this);
        this.state = {
            isCartDetail: true,
            isLogin: null,
            isCheckout: null,
            isDelivery: null
        };
    }

    componentWillUnmount() {
        if (this.state.isCartDetail && this.refs.shipping.checked)
            this.props.substractShipping()
    }

    handleChecked = (e) => {
        if (e.target.checked) {
            this.props.addShipping();
        }
        else {
            this.props.substractShipping();
        }
    }

    handleCheckoutClick() {
        console.log('handleCheckoutClick');
    }

    handleDeliveryClick() {
        if (localStorage.getItem('username') === null) {
            alert('handleDeliveryClick-redirect-to-login');
            this.setState({
                isCartDetail: false,
                isLogin: true,
                isCheckout: null,
                isDelivery: null
            });
            //return <Redirect to='/login' />
        } else {
            alert('handleDeliveryClick-redirect-to-delivery');
            this.setState({
                isCartDetail: false,
                isLogin: null,
                isCheckout: null,
                isDelivery: true
            });
            //return <Redirect to='/delivery' />
        }
    }

    render() {
        const { isCartDetail, isLogin, isCheckout, isDelivery } = this.state;
        if (isCartDetail !== null && isCartDetail) {
            return (
                <div className="container">
                    <div className="collection">
                        <li className="collection-item">
                            <label>
                                <input type="checkbox" ref="shipping" onChange={this.handleChecked} />
                                <span>Shipping(+6$)</span>
                            </label>
                        </li>
                        <li className="collection-item"><b>Total: {this.props.total} $</b></li>
                    </div>
                    <div className="checkout">
                        <button className="waves-effect waves-light btn" onClick={this.handleCheckoutClick}>Checkout</button>
                        <button className="waves-effect waves-light btn" onClick={this.handleDeliveryClick}>Delivery</button>
                    </div>
                    <p>(to be shifted )</p>
                    <div style={{ width: "30%", height: "auto" }} >
                        <Payment total={this.props.total} />
                    </div>
                </div>
            )
        } else if (isLogin !== null && isLogin) {
            return <Redirect to='/login' />
        } else if (isCheckout !== null && isCheckout) {
            return <Redirect to='/cart' />
        } else if (isDelivery !== null && isDelivery) {
            return <Redirect to='/delivery' />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addShipping: () => { dispatch({ type: 'ADD_SHIPPING' }) },
        substractShipping: () => { dispatch({ type: 'SUB_SHIPPING' }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
