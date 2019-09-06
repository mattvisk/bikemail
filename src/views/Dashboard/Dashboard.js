import React from 'react';
import { connect } from 'react-redux'


const Dashboard = (props) => {
  return (
    <div id="banner-wrapper">
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  isLoggedIn: user.isLoggedIn
})


const mapDispatchToProps = dispatch => {
  return {
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)