/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import {Link} from 'react-router-dom';
import './animation.css';
import './app.css';

function Home() {
    return (
        <div className="container">
            <div id="banner">
                <div className="lines">
                    <div className="line left"></div>
                    <div className="line"></div>
                    <div className="line right"></div>
                </div>
            </div>
            <div id="content">
                <div className='row'>
                    <div className='column'>
                        <div className="left img"></div>
                    </div>
                    <div className='column pad-y'>
                        <h1>Automate Customer Communication</h1>
                        <p>Automatically send emails based on the actions your customer's take.</p>
                        <h2>Contact all your customers at once!</h2>
                        <p>Easily create and send mass emails to all of your users. Use filters to specify which users receive your emails. </p>
                        
                        <h2>Create polls or other fun interactive bits for your emails.</h2>
                        <p>Create interactive emails. We can track the results for your here!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

