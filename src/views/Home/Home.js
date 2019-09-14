import React from 'react';
import {NavLink} from 'react-router-dom';
import './banner.scss';
import envelope from'./envelopes.png';

const Home = () => {

  return (
    <div id="home-wrapper">
      <div id="banner-wrapper">
        <img width="400px" alt="envelope" src={envelope} />
        <h1>Automatic Customer Communication.</h1>
        <h2>Talk to your customers one-on-one, at scale.</h2>
        <NavLink className="large-btn" to='/create-an-account'>Create your account</NavLink>
      </div>

      <div class="squares">
        <div>
          <h2>Send email courses</h2>
          <ul>
            <li>Create several emails to be delivered automatically.</li>
            <li>Send on timed schedule, or when user completes an action.</li>
          </ul>

        </div>
        <div>
          <h2>Custom Forms</h2>
          <ul>
            <li>Create custom forms.</li>
            <li>Show form on your website, or ours.</li>
            <li>Collect info and payments with a link to your form.</li>
          </ul>
        </div>
        <div>
          <h2>Send now!</h2>
          <ul>
            <li>Send multiple mass emails at once.</li>
            <li>Choose to send to all.</li>
            <li>Choose to send to specific segments.</li>
          </ul>
        </div>


      </div>



    </div>
  );
};

export default Home;
