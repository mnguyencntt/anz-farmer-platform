import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addUsernameInfo } from './actions/cartActions'
import { LogoutButton } from './forms/ButtonUtils';

var bgColors = {
    "Black": "#000000"
};

class Header extends React.Component {
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
                <li><Link to="/userInfo">{usernameInfo}</Link></li>
                <li><LogoutButton props={usernameInfo} /></li>
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