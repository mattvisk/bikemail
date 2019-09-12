import React from 'react';
import {NavLink} from 'react-router-dom';
import './banner.scss';
import envelope from'./envelopes.png';

const Home = () => {

  return (
    <div id="banner-wrapper">
      <img width="400px" alt="envelope" src={envelope} />
      <h1>Automatic Customer Communication.</h1>
      <h2>Talk to your customers one-on-one, at scale.</h2>
      <NavLink className="large-btn" to='/create-an-account'>Create your account</NavLink>
    </div>
  );
};

export default Home;
