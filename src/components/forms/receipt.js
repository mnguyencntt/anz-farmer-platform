import React from 'react'


class Receipt extends React.Component{

    constructor(props){
        super(props)
        
    }

    render(){
        return(
            <div style={{textAlign:"center"}}>
            <h4>Thank you for your order</h4>
            <h6>Order Number is</h6> {this.props.ordernumber}
            <h6 style={{paddingBottom:'1%'}}>You will receive an email confirmation shortly at xxxxx@email.com</h6>
            <hr/>
            <h4 style={{paddingTop:'1%'}} >Shipping information:</h4>
           
            <h6>Delivery address:xxxxxxxxxxx Singapore 1233455</h6>
            
            
            </div>
        )
    }
}
export default Receipt