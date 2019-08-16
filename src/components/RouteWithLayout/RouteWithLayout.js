import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { history } from '../../store'
const RouteWithLayout = props => {
  const { path, layout: Layout, auth, component: Component, ...rest } = props;
  if(path != '/sign-in' && (auth == 'user'&& !props.isLoggedIn) || (auth == 'admin' && props.role != 'admin'))
      history.push('/sign-in')
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteWithLayout)