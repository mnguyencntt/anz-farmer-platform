import React from 'react';
import { connect } from 'react-redux';
import { addUsernameInfo, addTokenIdInfo, addPaymentInfo, addDeliveryInfo, addNotificationInfo, addOrderInfo } from '../actions/cartActions';

class Receipt extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let usernameInfo = this.props.usernameInfo;
        let passwordInfo = this.props.passwordInfo;
        let tokenIdInfo = this.props.tokenIdInfo;
        let paymentInfo = this.props.paymentInfo;
        let deliveryInfo = this.props.deliveryInfo;
        let deliveryAddress = JSON.parse(deliveryInfo.deliveryAddress);
        //let deliveryAddress = JSON.parse(JSON.stringify(deliveryInfo.deliveryAddress));
        let notificationInfo = this.props.notificationInfo;
        let orderInfo = this.props.orderInfo;
        const receiptStyle = { minHeight: "700px", textAlign: "center" };
        return (
            <div className="container" style={receiptStyle}>
                {/* <h6>Check redux working</h6>
                <h6>usernameInfo: {usernameInfo}</h6>
                <h6>passwordInfo: {passwordInfo}</h6>
                <h6>tokenIdInfo: {tokenIdInfo}</h6> */}
                <hr />
                <h4>Thank you for your order</h4>
                <h6>Order Number is: {deliveryInfo.orderId}</h6>
                <h6>You will receive an email confirmation shortly at {deliveryAddress.email}</h6>
                <h6>You will receive an SMS confirmation shortly at {deliveryAddress.phoneNumber}</h6>
                <hr />
                <h4>Shipping/Delivery Information:</h4>
                <h6>orderId: {deliveryInfo.orderId}</h6>
                <h6>deliveryId: {deliveryInfo.id}</h6>
                <h6>createdTime: {deliveryInfo.createdTime}</h6>
                <h6>deliveryMethod: {deliveryInfo.deliveryMethod}</h6>
                <h6>deliveryMethod: {deliveryInfo.courierName}</h6>
                {/* <h6>deliveryAddress: {deliveryInfo.deliveryAddress}</h6> */}
                <h6>deliveryAddress: {deliveryAddress.phoneNumber}</h6>
                <h6>deliveryAddress: {deliveryAddress.email}</h6>
                <h6>deliveryAddress: {deliveryAddress.postcode}</h6>
                <h6>deliveryAddress: {deliveryAddress.fullAddress}</h6>
                <hr />
                <h4>Payment Information:</h4>
                <h6>receiptId: {paymentInfo.receiptId}</h6>
                <h6>paymentMethod: {paymentInfo.paymentMethod}</h6>
                <h6>amount: {paymentInfo.amount} {paymentInfo.currency_code}</h6>
                <h6>paymentDate: {paymentInfo.paymentDate}</h6>
                <hr />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        usernameInfo: state.usernameInfo,
        passwordInfo: state.passwordInfo,
        tokenIdInfo: state.tokenIdInfo,
        paymentInfo: state.paymentInfo,
        deliveryInfo: state.deliveryInfo,
        notificationInfo: state.notificationInfo,
        orderInfo: state.orderInfo
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

// export default Receipt
export default connect(mapStateToProps, mapDispatchToProps)(Receipt)