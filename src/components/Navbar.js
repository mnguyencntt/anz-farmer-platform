import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LogoutButton } from './forms/ButtonUtils';
import { addUsernameInfo } from './actions/cartActions'

function sumQuantity(total, item) {
    return total + item.quantity;
}

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem('username')
        };
    }

    componentDidMount() {
        if (this.state.username !== null) {
            this.props.addUsernameInfo(this.state.username);
        }
    }

    render() {
        let totalItemsCount = this.props.addedItems.reduce(sumQuantity, 0);
        let usernameInfo = this.props.usernameInfo;
        let userInfo = null;
        let logInOutButton = null;
        let manageProductButton = null;

        if (this.state.username) {
            this.props.addUsernameInfo(this.state.username);
            userInfo = (<li><Link to="/userInfo">{usernameInfo}</Link></li>);
            logInOutButton = (<li><LogoutButton props={usernameInfo} /></li>);
            manageProductButton = (<li><Link to="/product-management">Manage Products</Link></li>);
        } else {
            logInOutButton = (<li><Link to="/login">LOGIN</Link></li>);
            {/* <li><Link to="/signup">SIGN UP</Link></li> */ }
        }
        return (
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">Shopping</Link>
                    <ul className="right">
                        <li><Link to="/">Shop</Link></li>
                        <li><Link to="/cart">My cart({totalItemsCount})</Link></li>
                        <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                        <li>|</li>
                        {manageProductButton}
                        {userInfo}
                        {logInOutButton}
                    </ul>
                </div>
            </nav>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        userInfo: state.userInfo,
        items: state.addedItems,
        usernameInfo: state.usernameInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUsernameInfo: (id) => { dispatch(addUsernameInfo(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
