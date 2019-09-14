/* eslint-disable react/no-multi-comp */
import 'date-fns';
import React from 'react';
import { connect } from 'react-redux'

import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';

import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers'

import DateFnsUtils from "@date-io/date-fns"; // import
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from '@material-ui/core';
import {
  removemail,
  setformstatus
} from '../../../../modules/mail'
import {
  get_recipients,
} from '../../../../modules/recipient'
import {
  create_email_cue,
} from '../../../../modules/email_cue'
const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  clickabletd: {
    cursor: 'pointer'
  },
  formControl: {
    width: '100%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  dialogcontent: {
    overflowY: 'unset'
  },
  picker: {
    width: '50%'
  }
}));


function ConfirmationDialogRaw(props) {
  const { remove, onOk, onClose, open, ...other } = props;
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
    onOk(remove);
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function SendmailDialogRaw(props) {
  const classes = useStyles();
  const { remove, onSend, onClose, open, ...other } = props;
  const radioGroupRef = React.useRef(null);
  let recipients = []
  const [rec_mail, setRecMail] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  for(let index in props.recipients){
    recipients.push(props.recipients[index])
  }
  function handleChange(event) {
    setRecMail(event.target.value);
  }
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

  function handleSend() {
    setRecMail([]);
    onSend(rec_mail, selectedDate);
  }
  function handleDateChange(date) {
    setSelectedDate(date);
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
      <DialogTitle id="confirmation-dialog-title">Send Email</DialogTitle>
      <DialogContent dividers className={classes.dialogcontent}>
          Please select the recipients you want to send this email.
          
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Recipient's Email</InputLabel>
            <Select
              multiple
              value={rec_mail}
              onChange={handleChange}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {recipients.map(recipient => (
                <MenuItem key={recipient._id} value={recipient.email}>
                  <Checkbox checked={rec_mail.indexOf(recipient.email) > -1} />
                  <ListItemText primary={recipient.email} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              className={classes.picker}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time"
              value={selectedDate}
              onChange={handleDateChange}
              className={classes.picker}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSend} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
const EmailList = props => {
  const { history, className, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const [open_send, setOpenSend] = React.useState(false);
  const [remove, setRemove] = React.useState();
  const [currentmail, setCurrentMail] = React.useState('')
  const classes = useStyles();

  const removemail = (id) => {
    setRemove(id)
    setOpen(true);
  }
  const sendmail = (id) => {
    setCurrentMail(id)
    setOpenSend(true);
  }
  const mails = props.list
  console.log("Mails:",mails)

  const handleClose = () => {
    setOpen(false);
  }
  const handleOk = (remove) => {
    setOpen(false);
    props.removeMail(remove)
  }
  const handleCloseSend = () => {
    setOpenSend(false);
  }
  const handleSend = (rec_mail, selectedDate) => {
    console.log(rec_mail, props.username, currentmail);
    props.createEmailCue({
      mail_id: currentmail,
      member_id: props.username,
      recipeintlist: rec_mail,
      send_at: selectedDate
    })
    setOpenSend(false);
  }
  const editCol = (id) => {
    props.setFormStatus(id)
    history.push('/mail-form/' + id)
  }
  const createmail = () => {
    props.setFormStatus('')
    history.push('/mail-form')
  }

  if(props.recp_status === '')
    props.getRecipients(props.username)
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
            to='/mail-form'
            onClick={createmail}
          >
            Create email
          </Button>
        }
        title="Mail List"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Delay</TableCell>
                  <TableCell>Sender Name</TableCell>
                  <TableCell>Sender email</TableCell>
                  <TableCell>Mail</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Created_At
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Action</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {mails.map(mail => (
                  <TableRow
                    hover
                    key={mail._id}
                    className={classes.clickabletd}
                    
                  >
                    <TableCell onClick={()=>editCol(mail._id)}>{mail.subject}</TableCell>
                    <TableCell onClick={()=>editCol(mail._id)}>{mail.mail_status}</TableCell>
                    <TableCell onClick={()=>editCol(mail._id)}>{mail.delay}</TableCell>
                    <TableCell onClick={()=>editCol(mail._id)}>{mail.sender_name}</TableCell>
                    <TableCell onClick={()=>editCol(mail._id)}>{mail.sender_email}</TableCell>
                    <TableCell onClick={()=>editCol(mail._id)}>{mail.mail_content}</TableCell>
                    <TableCell onClick={()=>editCol(mail._id)}>
                      {moment(mail.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <Button 
                        color='primary' 
                        onClick={() => {sendmail(mail._id)}}>
                          Send
                      </Button>
                      <Button 
                        color='primary' 
                        onClick={() => {removemail(mail._id)}}>
                          Remove
                      </Button>
                      
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      {/* <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions> */}
      <ConfirmationDialogRaw
          classes={{
            paper: classes.paper,
          }}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          onOk={handleOk}
          remove={remove}
        />
      <SendmailDialogRaw
          classes={{
            paper: classes.paper,
          }}
          id="ringtone-menu"
          keepMounted
          open={open_send}
          onClose={handleCloseSend}
          onSend={handleSend}
          recipients={props.recipients}
        />
    </Card>
  );
};

const mapStateToProps = ({ user, mail, recipient }) => ({
  maillist: mail.maillist,
  status: mail.status,
  isLoggedIn: user.isLoggedIn,
  username: user.username,
  recp_status: recipient.status,
  recipients: recipient.recipients,
})


const mapDispatchToProps = dispatch => {
  return {
    removeMail: (id) => removemail(id, dispatch),
    setFormStatus:(status) => setformstatus(status, dispatch),
    getRecipients : (username) => get_recipients(username, dispatch),
    createEmailCue : (email_cue) => create_email_cue(email_cue)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailList)