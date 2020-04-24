import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, getProducts } from './actions/cartActions'

class Product extends Component{

    componentDidMount() {
        const id = this.props.location.pathname.split("/").slice(-1)[0]
        this.props.getProducts({ _id: id })
    }

    handleClick = (id) => {
        this.props.addToCart(id);
    }

    render(){
       return(
            <div className="container">
                <div className="card" key={this.props.items[0].id}>
                    <div className="card-image">
                        <img src={this.props.items[0].img} alt={this.props.items[0].title} />
                        <span className="card-title">{this.props.items[0].title}</span>
                        <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { this.handleClick(this.props.items[0].id) }}><i className="material-icons">add</i></span>
                    </div>

                    <div className="card-content">
                        <p>{this.props.items[0].desc}</p>
                        <p>{this.props.items[0].unit}</p>
                        <p><b>Price: {this.props.items[0].price}$</b></p>
                    </div>
                </div>
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return {
        items: state.items,
        usernameInfo: state.usernameInfo
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        // removeItem: (id)=>{dispatch(removeItem(id))},
        // addQuantity: (id)=>{dispatch(addQuantity(id))},
        // subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
        addToCart: (id) => { dispatch(addToCart(id)) },
        getProducts: (params) => { dispatch(getProducts(params)) }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Product)
