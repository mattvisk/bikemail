import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux'
import {
  signup,
  initstatus
} from '../../modules/user'
import {ToastsStore} from 'react-toasts';

import {
  Button,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
const schema = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
};

const useStyles = makeStyles(theme => ({
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
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
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  label: {
    fontSize: 15,
    marginTop: 10
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    minWidth: 400
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {

  const { history } = props;
  // const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  console.log("Here is signup component", props)
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    username: props.username,
    email: props.email,
    password: props.password,
    status: props.status
  });
  // if(props.match.params.mode == 'free' && props.match.params.mode == '')
  useEffect(() => {
    if(props.status !== ''){
      ToastsStore.success(props.status)
      if(props.match.params.price !== 0)
        history.push('/payment')
      else
        history.push('/dashboard')
      props.initStatus()
    }
  }, [props.status])
  if(props.accountType === '')
    history.push('/products-and-pricing')
  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };


  const handleSignUp = event => {
    console.log(formState.values)
    props.onSubmitSignup(formState.values.username, formState.values.email, formState.values.password)
    event.preventDefault();
    // history.push('/');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      {props.status}
      <div className={classes.content}>
        <div className={classes.contentBody}>
          <form
            className={classes.form}
            onSubmit={handleSignUp}
          >
            <Typography
              className={classes.title}
              variant="h2"
            >
                  Create {props.accountType} account
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
            >
                  Use your email to create new account
            </Typography>


            <Typography
              className={classes.label}
              variant="h2"
            >
                  Username
            </Typography>
            <TextField
              className={classes.textField}
              error={hasError('username')}
              fullWidth
              helperText={
                hasError('username') ? formState.errors.username[0] : null
              }
              name="username"
              onChange={handleChange}
              type="text"
              value={formState.values.username || ''}
              variant="outlined"
            />
            <Typography
              className={classes.label}
              variant="h2"
            >
                  Email address
            </Typography>
            <TextField
              className={classes.textField}
              error={hasError('email')}
              fullWidth
              helperText={
                hasError('email') ? formState.errors.email[0] : null
              }
              name="email"
              onChange={handleChange}
              type="text"
              value={formState.values.email || ''}
              variant="outlined"
            />
            <Typography
              className={classes.label}
              variant="h2"
            >
                  Password
            </Typography>
            <TextField
              className={classes.textField}
              error={hasError('password')}
              fullWidth
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              name="password"
              onChange={handleChange}
              type="password"
              value={formState.values.password || ''}
              variant="outlined"
            />
            <div className={classes.policy}>
              <Checkbox
                checked={formState.values.policy || false}
                className={classes.policyCheckbox}
                color="primary"
                name="policy"
                onChange={handleChange}
              />
              <Typography
                className={classes.policyText}
                color="textSecondary"
                variant="body1"
              >
                    I have read the{' '}
                <Link
                  color="primary"
                  component={RouterLink}
                  to="#"
                  underline="always"
                  variant="h6"
                >
                      Terms and Conditions
                </Link>
              </Typography>
            </div>
            {hasError('policy') && (
              <FormHelperText error>
                {formState.errors.policy[0]}
              </FormHelperText>
            )}
            <Button
              className={classes.signUpButton}
              color="primary"
              disabled={!formState.isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
                  Sign up now
            </Button>
            <Typography
              color="textSecondary"
              variant="body1"
            >
                  Have an account?{' '}
              <Link
                component={RouterLink}
                to="/sign-in"
                variant="h6"
              >
                    Sign in
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  username: user.username,
  email: user.email,
  password: user.password,
  status: user.status,
  accountType: user.accountType
})


const mapDispatchToProps = dispatch => {
  return {
    onSubmitSignup: (username, email, password) => {
      signup(username, email, password, dispatch);
    },
    initStatus: () => initstatus(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)