import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, getProducts, addUsernameInfo } from './actions/cartActions'

class Home extends Component {

    componentDidMount() {
        this.props.getProducts(null)

        if (!this.props.usernameInfo) {
            this.props.addUsernameInfo('MinhNguyenUserInit');
        }
    }

    handleClick = (id) => {
        this.props.addToCart(id);
    }

    render() {
        let itemList = []
        if (this.props.items) {
            itemList = this.props.items.map(item => {
                return (
                    <div className="card" key={item.id}>
                        <div className="card-image">
                            <a href={"/product/" + item.id}>
                              <img src={item.img} alt={item.title} />
                            </a>
                            <span className="card-title">{item.title}</span>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { this.handleClick(item.id) }}><i className="material-icons">add</i></span>
                        </div>

                        <div className="card-content">
                            <p>{item.desc}</p>
                            <p>{item.unit}</p>
                            <p><b>Price: {item.price}$</b></p>
                        </div>
                    </div>

                )
            })
        }

        return (
            <div className="container">
                <h3 className="center">Our items</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items,
        usernameInfo: state.usernameInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
        addUsernameInfo: (id) => { dispatch(addUsernameInfo(id)) },
        getProducts: (params) => { dispatch(getProducts(params)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
