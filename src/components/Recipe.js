import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.handleDeliveryClick = this.handleDeliveryClick.bind(this);
        this.state = {
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

    handleDeliveryClick() {
        if (localStorage.getItem('username') === null) {
            console.log('handleDeliveryClick-redirect-to-login');
            this.setState({
                isDelivery: false
            });
        } else {
            console.log('handleDeliveryClick-redirect-to-checkout');
            this.setState({
                isDelivery: true
            });
        }
    }

    render() {
        const { isCartDetail, isLogin, isCheckout, isDelivery } = this.state;
        if (isDelivery === null) {
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
                        <button className="waves-effect waves-light btn" onClick={this.handleDeliveryClick}>Checkout</button>
                        <p></p>
                    </div>
                </div>
            )
        } else if (!isDelivery) {
            return <Redirect to='/login' />
        } else if (isDelivery) {
            return <Redirect to='/checkout' />
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
