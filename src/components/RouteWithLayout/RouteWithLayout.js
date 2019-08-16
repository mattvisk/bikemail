import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { history } from '../../store'
import {
  LOGEDIN
} from '../../modules/user'
const RouteWithLayout = props => {
  const { path, layout: Layout, auth, component: Component, ...rest } = props;
  console.log('route', props)
  if(props.isLoggedIn == ''){
      if(window.localStorage.getItem('username')){
         props.logedin(window.localStorage.getItem('username'),
           window.localStorage.getItem('email'),
           window.localStorage.getItem('role'))
      }
    }
  let role = window.localStorage.getItem('role')
  if(path != '/sign-in' && 
    ((role != 'user' && role !='admin') && auth == 'user') || (auth == 'admin' && role != 'admin')){
      history.push('/sign-in')
    }

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

const mapStateToProps = ({ user }) => ({
  role: user.role,
  isLoggedIn: user.isLoggedIn
})


const mapDispatchToProps = dispatch => {
  return {
    logedin: (username, email, role) => dispatch({type: LOGEDIN, username: username, email: email, role: role})

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteWithLayout)