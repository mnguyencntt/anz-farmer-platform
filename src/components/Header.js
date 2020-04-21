import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

var bgColors = {
    "Black": "#000000"
};

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            username: localStorage.getItem('username')
        };
    }

    handleLogoutClick() {
        console.log('logout: ' + this.state.username)
        localStorage.removeItem('username')
    }

    render() {
        let ulTab;
        let addedItems = this.props.items.length;
        // alert(this.state.username);
        if (this.state.username === null) {
            ulTab = <ul className="right">
                <li><Link to="/login">LOGIN</Link></li>
                {/* <li><Link to="/signup">SIGN UP</Link></li> */}
            </ul>;
        } else {
            ulTab = <ul className="right">
                <li><Link to="/userInfo">{this.state.username}({addedItems})</Link></li>
                <li><Link to="/"><a onClick={this.handleLogoutClick}>Logout</a></Link></li>
            </ul>;
        }
        return (
            <nav className="nav-wrapper" style={{ backgroundColor: bgColors.Black }}>
                <div className="container">
                    {ulTab}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)