import React from 'react';
import {NavLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import './banner.scss';
import envelope from'./envelopes.png';
import { connect } from 'react-redux'

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = (props) => {
  const {history} = props
  const classes = useStyles();
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