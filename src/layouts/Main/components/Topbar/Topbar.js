import React ,{ forwardRef }  from 'react';
import {NavLink} from 'react-router-dom';
import {  Button } from '@material-ui/core';
import logo from './logo_v1.png'; 
const headerstyle = {
  zIndex: 5,
};
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
  >
    <NavLink {...props} />
  </div>
));
const Topbar = props => {
    const {history} = props
    console.log('Topbar',history);
    return (
        <div>
            <header style={headerstyle}>
                <div className="inner">
                    <NavLink to="/"><img className="logo"  alt="Bikemail Logo" width="" src={logo}/></NavLink>
                    <nav>
                        <ul>
                            <li><Button
                                activeClassName="bold"
                                className = 'headerlink'
                                component={CustomRouterLink}
                                to='/shop'
                              >
                                Shop
                              </Button></li>
                            <li>
                                <Button
                                    activeClassName="bold"
                                    className = 'headerlink'

                                    component={CustomRouterLink}
                                    to='/pricing'
                                  >
                                Pricing
                              </Button>
                            </li>
                            <li><a>|</a></li>
                            <li><Button
                                activeClassName="bold"
                                className = 'headerlink'
                                component={CustomRouterLink}
                                to='/sign-in'
                              >
                                SignIn
                              </Button>
                            </li>
                            <li>
                               <Button
                                activeClassName="bold"
                                className = 'headerlink'
                                component={CustomRouterLink}
                                to='/sign-up'
                              >
                                SignUp
                              </Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="header-spacer">
                
            </div>
        </div>
    );
}
// { !props.isLoggedIn ? 
//                                 <>
//                                     <li><NavLink to="/sign-in">Signin</NavLink></li>
//                                     <li className="bold"><NavLink to="/sign-up">Signup</NavLink></li>
//                                 </>
//                             :
//                                 <li><NavLink to="/">Logout</NavLink></li>
//                             }
export default Topbar;
