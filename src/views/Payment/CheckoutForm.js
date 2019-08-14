import PropTypes from 'prop-types';
import React, { useState, useEffect, memo, useContext, createContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {CardElement, injectStripe, Elements, StripeProvider} from 'react-stripe-elements';
import {
  signup,
  initstatus
} from '../../modules/user'
import {ToastsStore} from 'react-toasts';

const CheckoutForm = props => {
  const {stripe} = props
  
  const submit = async () => {
    let {token} = await stripe.createToken({name: "Name"});
    console.log(token, stripe)
    const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : ''

    let response = await fetch(`${API_URL}/api/auth/charge/${props.username}/${token.card.exp_month}/${token.card.exp_year}/${token.card.last4}` , {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });

    if (response.ok) console.log("Purchase Complete!")
  }
  return (
    <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={submit}>Send</button>
      </div>
    )
}

const mapStateToProps = ({ user }) => ({
  username: user.username
})


const mapDispatchToProps = dispatch => {
  return {
   
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectStripe(CheckoutForm))

