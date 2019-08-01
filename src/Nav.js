import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav() {

    const navStyle = {
        color: 'white'
    };

    return (
        <nav>
            <Link to="/"><h1>Logo</h1></Link>
            <ul>
                <Link to="/about"><li>About</li></Link>
                <Link to="/shop"><li>Shop</li></Link>
            </ul>
        </nav>
    );
}

export default Nav;
