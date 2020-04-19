import React from 'react';
import { withRouter } from 'react-router-dom';
import Receipt from './receipt.js'
import PaypalExpressBtn from 'react-paypal-express-checkout';

class PaypalExpress extends React.Component {
	constructor(props){
		super(props)
	}
    render() {
		const onSuccess = (payment) => {
			
			this.props.history.push('/Receipt');

			
		}

		const onCancel = (data) => {
			console.log('Payment cancelled!', data);

		}

		const onError = (err) => {

			console.log("Error!", err);

		}

		let env = 'sandbox'; 
		let currency = 'SGD'; 
		let total = this.props.total ? this.props.total : 0.1; 

		const client = {
			sandbox:    'AQYFFbTHr3KXd9SlfilXO6Keywm0wp2K003E3bQidDkiEKL__2WFhxWOHQHzwVJgC6gOKirKj6bK-Fo5'
		}
        return (
			<div>
				<PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
			</div>
            
        );
    }
}
export default withRouter(PaypalExpress);