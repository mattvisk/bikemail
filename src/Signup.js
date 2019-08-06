import React from 'react';
import {Link} from 'react-router-dom';
import './assets/css/animations.css';

function Signup() {
    return (
        <div class="container">
            <div class="center title">
                <h1>Create an Account</h1>
            </div>
            <form class="center-form signup">
                <p>
                    <label>Name</label>
                    <input name="name"/>
                </p>
                <p>
                    <label>Email</label>
                    <input name="email"/>
                </p>
                <p>
                    <label>Create Password</label>
                    <input type="password" name="password"/>
                </p>
                <button class="btn" type="submit">Get Started!</button>
            </form>
        </div>
    );
}

export default Signup;

