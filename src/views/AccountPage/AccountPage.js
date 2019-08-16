import PropTypes from 'prop-types';
import React, { useState, useEffect, memo } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  updateuser,
  deleteuser,
  initstatus
} from '../../modules/user'
import {ToastsStore} from 'react-toasts';

import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog 
} from '@material-ui/core';
const key = 'accountpage';
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
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
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
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },

  signUpButton: {
    margin: theme.spacing(2, 0),
    marginRight: 20
  }
}));

function ConfirmationDialogRaw(props) {
  const { onOk, onClose, open, ...other } = props;
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
    }
  }, [open]);

  function handleEntering() {  
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  }

  function handleCancel() {
    onClose();
  }

  function handleOk() {
    onOk();
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Delete email</DialogTitle>
      <DialogContent dividers>
          Do you want to delete this email?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const AccountPage = props => {

  const { history } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: {username: props.username, email: props.email, password: props.password},
    touched: {},
    errors: {},
    username: props.username,
    email: props.email,
    password: props.password,
    status: props.status
  });
  
  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);
  useEffect(() => {
    if(props.status != '') {
      if(props.status.includes('dupl'))
        ToastsStore.error(props.status)
      else if(props.status.includes('deleted')){
        ToastsStore.success(props.status)
        window.location.href='/sign-in'
      }
      else
        ToastsStore.success(props.status)
      props.initStatus()
    }
  }, [props.status]);
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

  const handleBack = () => {
    history.goBack();
  };

  const handleSave = event => {
    console.log(formState.values)
    props.onSave(props.username, formState.values.username, formState.values.email, formState.values.password)
    event.preventDefault();
    // history.push('/');
  };

  const handleDelete = event => {
    console.log(formState.values)
    setOpen(true);

    event.preventDefault();
    // history.push('/');
  };
  const handleClose = () => {
    setOpen(false);
  }
  const handleOk = () => {
    setOpen(false);
    
    props.onDelete(props.username)
    
  }
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  
  // if(props.isLoggedIn) {
  //   formState.values.username = props.username
  //   formState.values.email = props.email
  //   setFormState(formState);
  // }

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
              <form
                className={classes.form}
                onSubmit={handleSave}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  My Account
                </Typography>

                <TextField
                  className={classes.textField}
                  error={hasError('username')}
                  fullWidth
                  helperText={
                    hasError('username') ? formState.errors.username[0] : null
                  }
                  label="Username"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.username || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={!formState.isValid}
                  
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Save
                </Button>
                <Button
                  className={classes.signUpButton}
                  color="secondary"
                  size="large"
                  onClick={handleDelete}
                  variant="contained"
                >
                  Delete
                </Button>
                        <ConfirmationDialogRaw
                    classes={{
                      paper: classes.paper,
                    }}
                    id="ringtone-menu"
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    onOk={handleOk}
                  />
              
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  username: user.username,
  email: user.email,
  password: user.password,
  status: user.status,
  accountType: user.accountType,
  isLoggedIn: user.isLoggedIn
})


const mapDispatchToProps = dispatch => {
  return {
    onSave: (oldname, username, email, password) => {
      updateuser(oldname, username, email, password, dispatch);
    },
    onDelete: (oldname) => {
      deleteuser(oldname, dispatch);
    },
    initStatus: () => initstatus(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPage)