import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from './assets/images/logo_v1.png'; 

function Nav() {

    return (
        <div>
            <header>
                <div class="inner">
                    <NavLink to="/"><img class="logo"  alt="Bikemail Logo" width="" src={logo}/></NavLink>
                    <nav>
                        <ul>
                            <li><NavLink activeClassName='cur' to="/shop">Shop</NavLink></li>
                            <li><NavLink activeClassName='cur' to="/pricing">Pricing</NavLink></li>
                            <li class="bold"><NavLink activeClassName='cur' to="/signup">Signup</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div class="header-spacer">
                
            </div>
        </div>
    );
}

export default Nav;
