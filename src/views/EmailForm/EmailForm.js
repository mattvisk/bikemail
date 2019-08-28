import PropTypes from 'prop-types';
import React, { useState, useEffect, memo, forwardRef } from 'react';
import { NavLink, Link as RouterLink, withRouter } from 'react-router-dom';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
import {
  create_mail,
  update_mail,
  initstatus,
  setformstatus

} from '../../modules/mail'
import {ToastsStore} from 'react-toasts';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import $ from 'jquery';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';

const key = 'signup';
const schema = {
  subject: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 5
    }
  },
  mail_status: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  delay: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  sender_name: {
    presence: { allowEmpty: false, message: 'is required' },
  },  
  sender_email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true

  }
};

const useStyles = makeStyles(theme => ({
  label: {
    marginTop: 20
  },
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
  email_content: {
    width: '100%',
    height: 200,
    padding: 20,
    border: '1px solid #ddd'
  },
  contentContainer: {},
  content_main: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '600px',
    margin:'0 auto'
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '600px',
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
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    width: '100%',
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

  policyCheckbox: {
    marginLeft: '-14px'
  },
  createButton: {
    margin: theme.spacing(2, 0),
    width: '90%'
  },
  preview: {
    width: '50%',
    minHeight: 200,
    marginTop: 20,
  },
  gridright: {
    textAlign: 'right'
  }
}));
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
  >
    <NavLink {...props} />
  </div>
));
const EmailForm = props => {
  const { history } = props;
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState('')
  const classes = useStyles();
  const [email, setemail] = useState('')
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  console.log('current props:', props)
  if(props.formStatus == "")
    props.setFormStatus(props.match.params.mailId)

  useEffect(() => {
    console.log(props.status)
    if(props.status){
      ToastsStore.success(props.status)
      props.initStatus()
    }

  }, [props.status]);
  useEffect(() => {
      if(props.formStatus != ''){
        setTitle('Update Mail')
        let tmp = formState;
        tmp.values = props.maildata
        setFormState(tmp)
      }
      else {
        setTitle('Create New Mail')
        let tmp = formState;
        tmp.values = {}
        setFormState(tmp)
      }
  }, [props.formStatus]);
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

  const handleEmailSubmit = event => {
    var tmp = document.createElement("DIV");
     tmp.innerHTML = email
     console.log("aafasdfasfasdf",  tmp.textContent || tmp.innerText || "")

    var mail_content = $(email).find('a')
    var link_list = []
    $(email).find('a').each(function(){
      link_list.push({title: $(this).text(), url: $(this).attr('href')})
    });
    console.log(link_list)
    formState.values.mail_content = tmp.textContent || tmp.innerText || ""
    formState.values.mail_html = email
    console.log(formState)
    if(props.formStatus != '')
      props.onEmailUpdate(formState.values, link_list, props.username)
    else
      props.onEmailCreate(formState.values, link_list, props.username)
    event.preventDefault();
    // history.push('/');
  };

  const handleBack = () => {
    history.goBack();
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  const handleEditorChange = (event) => {
    // setFormState(formState => ({
    //   ...formState,
    //   values: {
    //     ...formState.values,
    //     [event.target.name]:
    //       event.target.type === 'checkbox'
    //         ? event.target.checked
    //         : event.target.value
    //   },
    //   touched: {
    //     ...formState.touched,
    //     [event.target.name]: true
    //   }
    // }));
    setemail(event.target.getContent())
  }



  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        
        <Grid
          className={classes.content_main}
          item
          lg={7}
          xs={7}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
             
              <form
                className={classes.form}
                onSubmit={handleEmailSubmit}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  {title}
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  
                </Typography>

                <FormLabel component="legend" className={classes.label}>Subject</FormLabel>
                <TextField
                  className={classes.textField}
                  error={hasError('subject')}
                  fullWidth
                  helperText={
                    hasError('subject') ? formState.errors.subject[0] : null
                  }
                  name="subject"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.subject || ''}
                  variant="outlined"
                />




                <FormControl component="fieldset" className={classes.textField}>
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup
                    aria-label="gender"

                    name="mail_status"
                    className={classes.group}
                    value={formState.values.mail_status}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                  </RadioGroup>
                </FormControl>

                <FormLabel component="legend" className={classes.label}>Wait x minutes before sending</FormLabel>
                <TextField
                  className={classes.textField}
                  error={hasError('delay')}
                  fullWidth
                  helperText={
                    hasError('delay') ? formState.errors.delay[0] : null
                  }
                  name="delay"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.delay || ''}
                  variant="outlined"
                />

                <FormLabel component="legend" className={classes.label}>Sender Name</FormLabel>
                <TextField
                  className={classes.textField}
                  error={hasError('sender_name')}
                  fullWidth
                  helperText={
                    hasError('sender_name') ? formState.errors.sender_name[0] : null
                  }
                  name="sender_name"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.sender_name || ''}
                  variant="outlined"
                />

                <FormLabel component="legend" className={classes.label}>Sender Email</FormLabel>
                <TextField
                  className={classes.textField}
                  error={hasError('sender_email')}
                  fullWidth
                  helperText={
                    hasError('sender_email') ? formState.errors.sender_email[0] : null
                  }
                  name="sender_email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.sender_email || ''}
                  variant="outlined"
                />

                
                <FormLabel component="legend" className={classes.label}>Email</FormLabel>

                <Editor
                  initialValue={props.maildata.mail_html}
                  init={{
                    plugins: 'link',
                    toolbar: 'link',
                    menubar:false,
                    statusbar: false,
                  }}
                  onChange={handleEditorChange}
                  error={hasError('mail_content')}
                  helperText={
                   hasError('mail_content') ? formState.errors.mail_content[0] : null
                  }
                  name="mail_content"
                  type="text"
                />
                <Grid
                  className={classes.grid}
                  container
                >
                <Grid
                  lg={4}
                >
                <Button
                  className={classes.createButton}
                  color="primary"
                  disabled={!formState.isValid}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Save Email
                </Button>
                </Grid>
                <Grid
                  lg={4}
                >
                  <Button
                    className={classes.createButton}
                    color="primary"
                    disabled={!formState.isValid}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Test Email
                  </Button>
                </Grid>
                <Grid
                  className={classes.gridright}
                  lg={4}
                >
                  <Button
                    className={classes.createButton}
                    color="info"
                    size="large"
                    type="submit"
                    variant="contained"
                    component={CustomRouterLink}
                    to='/email-templates'
                  >
                    Cancel
                  </Button>
                </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
                // <TextField
                //   className={classes.textField}
                //   error={hasError('mail_content')}
                //   fullWidth
                //   helperText={
                //     hasError('mail_content') ? formState.errors.mail_content[0] : null
                //   }
                //   name="mail_content"
                //   onChange={handleChange}
                //   type="text"
                //   value={formState.values.mail_content || ''}
                //   variant="outlined"
                //   multiline
                //   rows="4"
                //   rowsMax='20'
                // />
                // <div className={classes.email_content} contentEditable='true'></div>
const mapStateToProps = ({ user, mail }) => ({
  username: user.username,
  status: mail.status,
  formStatus: mail.formStatus,
  maildata: mail.maildata
})

// <div className={classes.preview}>
//                 // <span dangerouslySetInnerHTML={{__html: formState.values.mail_content}} />
//                 </div>
const mapDispatchToProps = dispatch => {
  return {
    onEmailCreate: (mail, link_list, username) => create_mail(mail, link_list, username, dispatch),
    onEmailUpdate: (mail, link_list, username) => update_mail(mail, link_list, dispatch),
    initStatus: () => initstatus(dispatch),
    setFormStatus:(status) => setformstatus(status, dispatch)

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailForm)