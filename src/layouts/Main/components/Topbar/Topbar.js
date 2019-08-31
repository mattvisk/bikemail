/* eslint-disable indent */
import React, { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import logo from './logo_v1.png';
import './topbar.scss';
import { SIGNOUT, LOGEDIN } from '../../../../modules/user';
const headerstyle = {
  zIndex: 5
};
const useStyles = makeStyles(theme => ({
}));
const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref}>
    <NavLink {...props} />
  </div>
));
// eslint-disable-next-line react/no-multi-comp
const Topbar = props => {
  const classes = useStyles();
  const signOut = () => {
    props.signout();
    window.location.href = '/';
  };
  return (
    <div>
      <header style={headerstyle}>
        <div className="inner">
          <NavLink to="/">
            <img className="logo" alt="Bikemail Logo" width="" src={logo} />
          </NavLink>
          {props.isLoggedIn == true ? (
            <nav>
              <NavLink to="/recipients">Recipients</NavLink>
              <NavLink to="/email-templates"> Email Templates </NavLink>
              <a> &nbsp; | &nbsp; </a>
              <NavLink to="/account"> {props.username} </NavLink>
              <NavLink onClick={signOut}>Logout</NavLink>
            </nav>
          ) : (
            <nav>
              <NavLink to="/create-an-account" className='special'> Create an account </NavLink>
              <NavLink to="/products-and-pricing"> Pricing </NavLink>
              <NavLink to="/contact"> Contact </NavLink>
              <a> | </a>
              <NavLink to="/sign-in"> Login </NavLink>
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
)(Topbar);
