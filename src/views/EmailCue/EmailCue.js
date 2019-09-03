import React,  { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import {
  get_email_cue
} from '../../modules/email_cue'

import {
  EmailCueList
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
     minHeight: '600px'
  }
}));

const EmailCue = props => {
  const classes = useStyles();
  useEffect(() => {
      props.getEmailCue(props.username)
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
          <EmailCueList list={props.email_cue}/>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ user, email_cue}) => ({
  isLoggedIn: user.isLoggedIn,
  username: user.username,
  role: user.role,
  email_cue: email_cue.email_cue
})


const mapDispatchToProps = dispatch => {
  return {
    getEmailCue: (username) => get_email_cue(username, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailCue)