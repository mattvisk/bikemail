import React,  { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'

import {
  RecipientPropsList
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
     minHeight: '600px'
  }
}));

const RecipientProps = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={12}
         
        >
          <RecipientPropsList />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  userlist: user.userlist,
  isLoggedIn: user.isLoggedIn,
  role: user.role
})


const mapDispatchToProps = dispatch => {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipientProps)