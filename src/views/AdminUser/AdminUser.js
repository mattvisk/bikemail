import React,  { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import {
  getuserlist
} from '../../modules/user'

import {
  UserList
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
     minHeight: '600px'
  }
}));

const AdminUser = props => {
  const classes = useStyles();
  useEffect(() => {
    if(props.isLoggedIn && props.role == 'admin')
      props.getUserList()
  }, [props.isLoggedIn]);
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
          <UserList list={props.userlist}/>
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
    getUserList: () => getuserlist(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUser)