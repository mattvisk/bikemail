import React, { useState, forwardRef } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'

import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
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
  Dialog 
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { StatusBullet } from 'components';
import {
  removemail,
  initstatus,
  setformstatus
} from '../../../../modules/mail'

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
  }
}));

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};
const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
  >
    <NavLink {...props} />
  </div>
));

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
const EmailList = props => {
  const { history, className, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const [remove, setRemove] = React.useState();

  const classes = useStyles();

  const removemail = (id) => {
    setRemove(id)
    setOpen(true);
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
  const editCol = (id) => {
    props.setFormStatus(id)
    history.push('/mail-form')
  }
  const createmail = () => {
    props.setFormStatus('create')
    history.push('/mail-form')
  }
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
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
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
    </Card>
  );
};

const mapStateToProps = ({ user, mail }) => ({
  maillist: mail.maillist,
  status: mail.status,
  isLoggedIn: user.isLoggedIn,
  username: user.username
})


const mapDispatchToProps = dispatch => {
  return {
    removeMail: (id) => removemail(id, dispatch),
    setFormStatus:(status) => setformstatus(status, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailList)