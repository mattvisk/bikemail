import PropTypes from 'prop-types';
import React, { useState, useEffect, memo, useContext, createContext, forwardRef, useRef, useImperativeHandle  } from 'react';
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
import {
  Card,
  CardActions,
  CardContent,
  Button
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({

  cardelement: {
    border: '1px solid #ddd',
    padding: '10px 5px'
  }
}))
const UpdateCreditCard = forwardRef((props, ref)  => {
  console.log('ssss', ref, props)
  const {stripe} = props
  const classes = useStyles();
  const submit = async () => {
    let {token} = await stripe.createToken({name: "Name"});
    console.log(token, stripe)
    const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : ''
    let response = ''
    if(token)
       response = await fetch(`${API_URL}/api/auth/charge/${props.username}/${token.card.exp_month}/${token.card.exp_year}/${token.card.last4}/${props.accountType}` , {
        method: "POST",
        headers: {"Content-Type": "text/plain"},
        body: token.id
      });
    else
       ToastsStore.error('Invalid Credit Card')

    if (response) {
       ToastsStore.success('Customer is Created Successfully')
       console.log('loggined', props)
       props.history.push('/dashboard')
    }
  }
  useImperativeHandle(ref, () => {
    return {  
      submit: submit
    }

  });
  return (
    <div className="checkout">
              <CardElement className={classes.cardelement}/>
      </div>
    )
});

const mapStateToProps = ({ user }) => ({
  username: user.username,
  isLoggedIn: user.isLoggedIn,
  accountType: user.accountType
})


const mapDispatchToProps = dispatch => {
  return {
   
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectStripe(UpdateCreditCard))

