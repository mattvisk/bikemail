import React from 'react';
import {Link} from 'react-router-dom';
import logo from './assets/images/logo_v1.png'; 

function Nav() {

    return (
        <div>
            <header>
                <div class="inner">
                    <Link to="/"><img class="logo"  alt="Bikemail Logo" width="" src={logo}/></Link>
                    <nav>
                        <ul>
                            <li><Link to="/about">Pricing</Link></li>
                            <li><Link to="/shop">Services</Link></li>
                            <li><Link to="/shop">About</Link></li>
                            <li><Link to="/shop">Contact</Link></li>
                            <li class="bold"><Link to="/shop">Signup</Link></li>
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
