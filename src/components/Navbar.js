import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function sumQuantity(total, item) {
    return total + item.quantity;
}

class Navbar extends React.Component {
    render() {
        let totalItemsCount = this.props.addedItems.reduce(sumQuantity, 0);
        return (
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">Shopping</Link>
                    <ul className="right">
                        <li><Link to="/">Shop</Link></li>
                        <li><Link to="/cart">My cart({totalItemsCount})</Link></li>
                        <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
