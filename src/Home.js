import React from 'react';
import {Link} from 'react-router-dom';
import './assets/css/animations.css';

function Home() {
    return (
        <div class="container">
            <div id="banner">
                <div class="lines">
                    <div class="line left"></div>
                    <div class="line"></div>
                    <div class="line right"></div>
                </div>
            </div>
            <div id="content">
                <div class='row'>
                    <div class='column'>
                        <div class="left img"></div>
                    </div>
                    <div class='column pad-y'>
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

