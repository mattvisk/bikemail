import React from 'react';
import {NavLink} from 'react-router-dom';

import logo from './logo_v1.png'; 
const headerstyle = {
  zIndex: 5,
};
function Topbar() {

    return (
        <div>
            <header style={headerstyle}>
                <div className="inner">
                    <NavLink to="/"><img className="logo"  alt="Bikemail Logo" width="" src={logo}/></NavLink>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Shop</NavLink></li>
                            <li><NavLink to="/pricing">Pricing</NavLink></li>
                            <li><a>|</a></li>
                            <li><NavLink to="/sign-in">Signin</NavLink></li>
                            <li className="bold"><NavLink to="/sign-up">Signup</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="header-spacer">
                
            </div>
        </div>
    );
}

export default Topbar;
