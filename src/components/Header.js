import React from 'react';
import { Link } from 'react-router-dom'

var bgColors = {
    "Black": "#000000"
};

export default class Header extends React.Component {
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
        // alert(this.state.username);
        if (this.state.username === null) {
            ulTab = <ul className="right">
                <li><Link to="/login">LOGIN</Link></li>
                {/* <li><Link to="/signup">SIGN UP</Link></li> */}
            </ul>;
        } else {
            ulTab = <ul className="right">
                <li><Link to="/userInfo">{this.state.username}</Link></li>
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