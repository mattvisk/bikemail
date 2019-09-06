import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux'
import { CardElement, injectStripe } from 'react-stripe-elements';

import {ToastsStore} from 'react-toasts';
import {
  Card,
  CardActions,
  CardContent,
  Button
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  comment: {
    textAlign: 'center',
    fontSize: 14
  },
  checkformcard: {
    padding: '30px 30px 40px 30px',
    width: 420
  },
  checkouttitle: {
    fontSize: 50,
    margin: '0 0 5px',
    lineHeight: 1,
    textAlign: 'center'
  },
  checkoutsubtitle: {
    fontSize: 15,
    lineHeight: '1.6em',
    marginTop: 40,
    marginBottom: 0
  },
  purhcase: {
    background: 'linear-gradient(to right,#5b1d82,#0c0b54)',    
    fontSize: 18,
    padding: '14px 30px',
    marginBottom: 8,
    marginTop: 30,
    color: 'white',
    fontWeight: '300',
    margin: 'auto',
    display: 'block'
  },
  cardelement: {
    border: '1px solid #ddd',
    padding: '10px 5px'
  }
}))
const CheckoutForm = props => {
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
  return (
    <div className="checkout">
        <Card className={classes.checkformcard}>
            <CardContent>
              <h1 className={classes.checkouttitle}>Payment Info</h1>
              <p className={classes.checkoutsubtitle}>Credit Card</p>
              <CardElement className={classes.cardelement}/>
              <Button onClick={submit} className={classes.purhcase}>Purchase Now</Button>
              <p className={classes.comment}>You will be charged at the end of your 10-Day Trial. <br />Don't worry, you can cancel at any time.</p>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        
      </div>
    )
}

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
)(injectStripe(CheckoutForm))

