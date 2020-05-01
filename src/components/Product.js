import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, getProduct } from './actions/cartActions'
import ProductReview from './forms/review'
class Product extends Component{

    componentDidMount() {
        const id = this.props.location.pathname.split("/").slice(-1)[0]
        this.props.getProduct(id)
    }

    handleClick = (id) => {
        this.props.addToCart(id);
    }

    render(){
        if (this.props.item) {
           return(
                <div className="container">
                    <div className="card" key={this.props.item.id}>
                        <div className="card-image">
                            <img src={this.props.item.img} alt={this.props.item.title} />
                            <span className="card-title">{this.props.item.title}</span>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { this.handleClick(this.props.item.id) }}><i className="material-icons">add</i></span>
                        </div>

                        <div className="card-content">
                            <p>{this.props.item.desc}</p>
                            <p>{this.props.item.unit}</p>
                            <p><b>Price: {this.props.item.price}$</b></p>
                        </div>
                    </div>
                    <ProductReview  productId={this.props.item.id} />
                </div>
           )
      }
      return null
    }
}


const mapStateToProps = (state)=>{
    return {
        items: state.items,
        item: state.item,
        addedItems: state.addedItems,
        usernameInfo: state.usernameInfo
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        // removeItem: (id)=>{dispatch(removeItem(id))},
        // addQuantity: (id)=>{dispatch(addQuantity(id))},
        // subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
        addToCart: (id) => { dispatch(addToCart(id)) },
        getProduct: (params) => { dispatch(getProduct(params)) }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Product)
