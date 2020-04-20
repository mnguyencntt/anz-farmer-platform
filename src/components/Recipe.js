import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Payment from '../components/forms/payment.js'

class Recipe extends Component{
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleDeliveryClick.bind(this);
    }

    componentWillUnmount() {
         if(this.refs.shipping.checked)
              this.props.substractShipping()
    }

    handleChecked = (e)=>{
        if(e.target.checked){
            this.props.addShipping();
        }
        else{
            this.props.substractShipping();
        }
    }

    handleDeliveryClick() {
        if (localStorage.getItem('username') === null) {
            alert('handleDeliveryClick-redirect-to-login');
            return <Redirect to='/login' />
        } else {
            alert('handleDeliveryClick-redirect-to-delivery');
            return <Redirect to='/delivery' />
        }
    }
    
    render(){
  
        return(
            <div className="container">
                <div className="collection">
                    <li className="collection-item">
                            <label>
                                <input type="checkbox" ref="shipping" onChange= {this.handleChecked} />
                                <span>Shipping(+6$)</span>
                            </label>
                        </li>
                        <li className="collection-item"><b>Total: {this.props.total} $</b></li>
                    </div>
                    <div className="checkout">
                        <button className="waves-effect waves-light btn" onClick={this.handleDeliveryClick}>Checkout-Delivery</button>
                    </div>
                    <p>(to be shifted )</p>
                    <div style={{width:"30%",height:"auto"}} >
                    <Payment total={this.props.total} />
                    </div>
                 </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
