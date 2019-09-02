import React from 'react';
import {NavLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import './banner.scss';
import envelope from'./envelopes.png';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div id="banner-wrapper">
      <img width="400px" src={envelope} />
      <h1>Automatic Customer Communication.</h1>
      <h2>Talk to your customers one-on-one, at scale.</h2>

      <NavLink className="large-btn" to='/create-an-account'>Create your account</NavLink>

    </div>
  );
};

export default Home;
