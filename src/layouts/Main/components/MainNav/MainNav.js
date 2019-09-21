/* eslint-disable indent */
import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import SendIcon from '@material-ui/icons/Send';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import logo from './logo_v1.png';
import './topbar.scss';
import { SIGNOUT, LOGEDIN } from '../../../../modules/user';
const headerstyle = {
  zIndex: 5
};
// eslint-disable-next-line react/no-multi-comp
const MainNav = props => {
  const signOut = () => {
    props.signout();
    window.location.href = '/';
  };
  return (
    <div>
      <header style={headerstyle}>
        <div className="inner">
          <NavLink className="logo" to="/">
            <img alt="Bikemail Logo" width="" src={logo} />
          </NavLink>
          {props.isLoggedIn === true ? (
            <nav>
              <div className="main-links">
                <NavLink to="/email-cue"> <SendIcon /> Dashboard </NavLink>
                <NavLink to="/email-templates"> <AlternateEmailIcon /> Emails </NavLink>
                <NavLink to="/recipients"><GroupIcon /> Recipients</NavLink>
                <NavLink to="/settings"> <SettingsIcon />Settings </NavLink>
              </div>
              <div className="small-links">
                <NavLink to="/account"> {props.username} </NavLink>
                <NavLink onClick={signOut}>Logout</NavLink>
              </div>
            </nav>
          ) : (
            <nav>
              <div className="main-links">
                <NavLink to="/" exact> Home </NavLink>
                <NavLink to="/products-and-pricing"> Pricing </NavLink>
                <NavLink to="/faq"> About </NavLink>
                <NavLink to="/sign-in"> Login </NavLink>
              </div>
              <div className="small-links">
                <NavLink to="/create-an-account" className='special'> Sign Up </NavLink>
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};
const mapStateToProps = ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
  username: user.username
});

const mapDispatchToProps = dispatch => {
  return {
    signout: () => dispatch({ type: SIGNOUT }),
    logedin: (username, email, role) =>
      dispatch({ type: LOGEDIN, username: username, email: email, role: role })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainNav);
