import React from 'react';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

var bgColors = {
    "Default": "#81b71a",
    "Blue": "#00B1E1",
    "Cyan": "#37BC9B",
    "Green": "#8CC152",
    "Red": "#E9573F",
    "Black": "#000000",
    "Yellow": "#F6BB42",
};

export default class Footer extends React.Component {
    render() {
        return (
            <nav className="nav-wrapper" style={{ backgroundColor: bgColors.Black }}>
                <div className="container">
                    <div className="left">
                        <Link to="/" >CUSTOMER SERVICE</Link>
                        {' | '}
                        <Link to="/" >SITE MAP</Link>
                        {' | '}
                        <Link to="/" >CONTACT US</Link>
                    </div>
                    <div className="right">
                        <SocialIcon url="http://twitter.com/" />
                        <SocialIcon url="https://facebook.com/" />
                        <SocialIcon url="https://instagram.com/" />
                        <SocialIcon url="https://linkedin.com/" />
                        <SocialIcon url="https://github.com/" />
                    </div>
                </div>
            </nav>
        );
    }
}