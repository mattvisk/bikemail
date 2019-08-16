import React ,{ forwardRef }  from 'react';
import {NavLink} from 'react-router-dom';
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import logo from './logo_v1.png';
import './topbar.scss';
import {
  SIGNOUT,
  LOGEDIN
} from '../../../../modules/user'
const headerstyle = {
  zIndex: 5,
};
const useStyles = makeStyles(theme => ({
  active_link: {
    borderBottom: "2px solid #ddd"
  },
  bold: {
    background: '#2229ab',
    borderRadius: 2,
    color: '#fff',
    marginLeft: 10,
    marginRight: 10
  },
  headerLink: {
    marginLeft: 10,
    marginRight: 10

  }
}));
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
  >
    <NavLink {...props} />
  </div>
));
const Topbar = props => {
    const classes = useStyles();


    const signOut = () => {
      props.signout()
      window.location.href='/sign-in'
    }
    return (
        <div>
            <header style={headerstyle}>
                <div className="inner">
                    <NavLink to="/"><img className="logo"  alt="Bikemail Logo" width="" src={logo}/></NavLink>
                    <nav>


                            { props.isLoggedIn == true ?
                              <ul>

                              <li>
                                  <Button
                                      className = {classes.headerLink}
                                      activeClassName = {classes.active_link}
                                      component={CustomRouterLink}
                                      to='/email-templates'
                                    >
                                  Email Templates
                                </Button>
                              </li>
                              <li  className='splitter'><a>|</a></li>
                              <li>
                              <Button
                                className = {classes.headerLink}
                                activeClassName = {classes.active_link}
                                component={CustomRouterLink}
                                to='/account'
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>

                                {props.username}
                              </Button>
                              </li>
                              <li><Button
                                className = {classes.headerLink}
                                onClick={signOut}
                                activeClassName = {classes.active_link}
                                

                              >
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                              </Button>
                              </li>
                              </ul>
                            :
                              <ul>
                              <li>
                                  <Button
                                      className = {classes.headerLink}
                                      activeClassName = {classes.active_link}

                                      component={CustomRouterLink}
                                      to='/products-and-pricing'
                                    >
                                  Pricing
                                </Button>
                              </li>
                              <li className='splitter'><a>|</a></li>
                              <li><Button
                                className = {classes.headerLink}
                                component={CustomRouterLink}
                                activeClassName = {classes.active_link}
                                

                                to='/sign-in'
                              >
                                SignIn
                              </Button>
                              </li>
                              <li>
                                 <Button
                                  className = {classes.bold}
                                  component={CustomRouterLink}
                                  activeClassName = {classes.active_link}

                                  to='/products-and-pricing'
                                >
                                  SignUp
                                </Button>
                              </li>
                              </ul>
                            }

                    </nav>
                </div>
            </header>
        </div>
    );
}
const mapStateToProps = ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
  username: user.username
})


const mapDispatchToProps = dispatch => {
  return {
    signout: () => dispatch({type: SIGNOUT}),
    logedin: (username, email, role) => dispatch({type: LOGEDIN, username: username, email: email, role: role})

  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topbar)
