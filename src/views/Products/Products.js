import PropTypes from 'prop-types';
import React, { useState, useEffect, memo } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  set_account_type,
  get_account_type
} from '../../modules/user'
import {ToastsStore} from 'react-toasts';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';


import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  Card,
  CardActions,
  CardContent
} from '@material-ui/core';
const key = 'products';

const useStyles = makeStyles(theme => ({
  card: {
    width: 240,
    borderRadius: 25,
    padding: 20,
    marginRight: 20
  },
  cardtitle: {
    fontWeight: '700',
    margin: 0,
    fontSize: 60,
    lineHeight: 1.2
  },
  cardprice: {
    margin: 0,
    textTransform: 'uppercase',
    fontWeight: '200',
    fontSize: 20,
    letterSpacing: '.1em',
    marginBottom: 6,

  },
  cardfreedate: {
    display: 'block',
    fontWeight: 400
  },
  cardcontent: {
    padding: 0
  },
  gopro: {
     background: 'linear-gradient(to right,#5f69b1,#6441a5)',
     width: 200,
     height: 200,
     borderRadius: 25,
     padding: '55px 0',
     textAlign: 'center',
     color: 'white',
     cursor: 'pointer'
  },
  gofree: {
     background: '#222',
     width: 200,
     height: 200,
     borderRadius: 25,
     padding: '55px 0',
     textAlign: 'center',
     color: 'white',
     cursor: 'pointer'
  },
  providedservices: {
    display: 'block',
    margin: '30px 0',
    padding: 0,
    listStyle: 'none'
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 5
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    padding: 0
  },
  grid: {
    height: '100%'
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '600px'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  }
}));

const Products = props => {

  const { history } = props;
  // const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  console.log('Products', props)
  if(props.accountTypeList.length == 0)
    props.getAccountType()
  

  useEffect(() => {
    if(props.status != ''){
      // ToastsStore.success(props.status)
    }
  }, [props.status])

  const goSignUp = (type, price) => {
    props.setAccountType(type)
    history.push('/sign-up/' + type + '/' + price)

  }
  return (
    <div className={classes.root}>
      {props.status}
      <Grid
        className={classes.grid}
        container
      >
        
        <Grid
          className={classes.content}
          item
          lg={12}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              {props.accountTypeList.map(atype => (
                <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                  <div className={atype.price == 0 ? classes.gofree: classes.gopro} onClick={() => goSignUp(atype.slug, atype.price)}>
                      <h2 className={classes.cardtitle}>{atype.title}</h2>
                      <h3 className={classes.cardprice}>
                        { atype.price == 0 ? '' : '$' + atype.price + ' monthly' }
                      </h3>
                      <small className={classes.cardfreedate}>
                      { atype.price == 0 ? '' : atype.free + ' Days Free' }</small>
                  </div>
                  <ul className={classes.providedservices}>
                    <li>
                    <CheckCircleIcon className={classes.icon}/>
                      <strong>1000</strong> uploads
                    </li>
                    <li>
                    <CheckCircleIcon className={classes.icon}/>
                    Embed Capabilities</li>
                  </ul>
                  
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
                ))}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  accountTypeList: user.accountTypeList
})


const mapDispatchToProps = dispatch => {
  return {
    setAccountType: ( type ) => set_account_type(type, dispatch),
    getAccountType: ( ) => get_account_type(dispatch)
   
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)