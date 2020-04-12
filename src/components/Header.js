import React from 'react';
import { Link } from 'react-router-dom'

var bgColors = { "Default": "#81b71a",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Black": "#000000",
                    "Yellow": "#F6BB42",
};

const Header = ()=>{
    return(
        <nav className="nav-wrapper" style={{backgroundColor: bgColors.Black}}>
            <div className="container">
                <ul className="right">
                    <li><Link to="/">Shop</Link></li>
                    <li><Link to="/cart">My cart</Link></li>
                    <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                </ul>
            </div>
        </nav>
    )
}
export default Header;
