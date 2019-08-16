import React,  { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import {ToastsStore} from 'react-toasts';
import {
  getemaillist,
  initstatus
} from '../../modules/mail'

import {
  EmailList
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
     minHeight: '600px'
  }
}));

const EmailTemplates = props => {
  const { history } = props;
  const classes = useStyles();
  useEffect(() => {
    if(props.status != ''){
      ToastsStore.success(props.status)
      console.log(props.status,props.status.includes('removed'))
      if(props.status.includes('removed'))
        props.getEmailList(props.username)
      props.initStatus()
    }

  }, [props.status]);
  useEffect(() => {
    if(props.isLoggedIn)
      props.getEmailList(props.username)
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
          <EmailList list={props.maillist} history={history}/>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ user, mail }) => ({
  maillist: mail.maillist,
  status: mail.status,
  isLoggedIn: user.isLoggedIn,
  username: user.username
})


const mapDispatchToProps = dispatch => {
  return {
    getEmailList: (username) => getemaillist(username, dispatch),
    initStatus: () => initstatus(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailTemplates)