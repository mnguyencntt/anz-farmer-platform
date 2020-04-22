import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addUsernameInfo } from './actions/cartActions'

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

    componentDidMount() {
        if (this.state.username !== null) {
            this.props.addUsernameInfo(this.state.username);
        }
    }

    handleLogoutClick() {
        console.log('logout: ' + this.state.username)
        localStorage.removeItem('username')
    }

    render() {
        let ulTab;
        let usernameInfo = this.props.usernameInfo;
        // alert(this.state.username);
        if (this.state.username === null) {
            ulTab = <ul className="right">
                <li><Link to="/login">LOGIN</Link></li>
                {/* <li><Link to="/signup">SIGN UP</Link></li> */}
            </ul>;
        } else {
            this.props.addUsernameInfo(this.state.username);
            ulTab = <ul className="right">
                <li><Link to="/userInfo">{this.state.username}({usernameInfo})</Link></li>
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
        usernameInfo: state.usernameInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUsernameInfo: (id) => { dispatch(addUsernameInfo(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)