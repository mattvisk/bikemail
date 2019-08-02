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

            

                <div class='some-page-wrapper'>
                    <div class='row'>
                        <div class='column'>
                            <div class="left img"></div>
                        </div>
                        <div class='column'>
                            <h1>Automatically communicate with your customers.</h1>
                            <p>Without communication, it's hard to establish a honest relationship with your customers. With Bikemail, you can easily create emails that can be sent in many ways.</p>
                            
                            <h2>Create Mass Emails</h2>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            
                            <h2>Create Mass Emails</h2>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Home;

