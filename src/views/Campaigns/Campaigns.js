import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import {
  CampaignsList
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
     minHeight: '600px'
  }
}));

const Campaigns = props => {
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
          <CampaignsList  history={props.history}/>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
})


const mapDispatchToProps = dispatch => {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campaigns)