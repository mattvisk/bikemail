import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Divider,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog 
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux'
import {ToastsStore} from 'react-toasts';
import {
  create_recipient,
  get_recipients,
  edit_recipients,
  remove_recipient,
  initstatus
} from '../../../../modules/recipient'
import {
  get_recipient_props,
  initpropstatus
} from '../../../../modules/recipient_props'
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


const getRowId = row => row._id;
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
      <DialogTitle id="confirmation-dialog-title">Delete Recipient</DialogTitle>
      <DialogContent dividers>
          Do you want to delete this recipient?
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
const RecipientList = props => {
  const { history, className, ...rest } = props;
  const classes = useStyles();
  let state = [
    { name: '_id', title: 'ID' },
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    { name: 'email', title: 'Email' },
    { name: 'phone', title: 'Phone' },
    { name: 'unsubscribed', title: 'Unsubscribed' },
  ]
  for(let index in props.recipient_props)
    state.push({name: props.recipient_props[index].field, title: props.recipient_props[index].field})

  const [columns] = useState(state);
  const [deleted, setDeleted] = useState()
  const [rows, setRows] = useState([]);
  const [tableColumnExtensions] = useState([
    { columnName: '_id', width: 200 },
  ]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [editingStateColumnExtensions] = useState([
    { columnName: '_id', editingEnabled: false },
  ]);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  }
  const handleOk = () => {
    setOpen(false);
    let changedRows;
    const deletedSet = new Set(deleted);
    changedRows = rows.filter(row => !deletedSet.has(row._id))
    setRows(changedRows);
    props.removeRecipient(deleted[0])

     console.log(deleted)
    // props.onDelete(props.username)
    
  }
  const changeAddedRows = (value) => {
    const initialized = value.map(row => (Object.keys(row).length ? row : { }));
    setAddedRows(initialized);
  };
  if(props.status == ''){
    props.getRecipientProps(props.username)
    props.getRecipients(props.username)
  }
  if(props.props_status.includes('updated')){
      props.getRecipientProps(props.username)
      props.initPropStatus()
  }
  useEffect(() => {
    if(props.status.includes('loaded')){
      // props.initStatus()
      setRows(props.recipients)
      console.log(props.recipients, props)
      ToastsStore.success(props.status)
    }
        
  }, [props.recipients]);
  useEffect(() => {
  }, [props.recipient_props]);
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1]._id + 1 : 0;
      let info = {};
      for(let index in props.recipient_props){
        info[props.recipient_props[index].field] = added[0][props.recipient_props[index].field];
        delete added[0][props.recipient_props[index].field];
      }
      added[0]['info'] = info;
      console.log(added[0])
      props.addRecipient(added[0], props.username)
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          _id: startingAddedId + index,
          ...row,
        })),
      ];
      setRows(changedRows);

    }
    if (changed) {

      changedRows = rows.map(row => (changed[row._id] ? { ...row, ...changed[row._id] } : row));
      let changedRow;
      for(var i = 0 ; i < changedRows.length ; i++)
        if(changedRows[i]._id == Object.keys(changed)[0])
          changedRow = changedRows[i]
      console.log('changed:', changed, changedRows, Object.keys(changed)[0])
      
      setRows(changedRows);
      let info = {};
      for(let index in props.recipient_props){
        info[props.recipient_props[index].field] = changedRow[props.recipient_props[index].field];
        // delete changedRow[props.recipient_props[index].field];
      }
      changedRow['info'] = info;
      console.log(changedRow)
      props.editRecipient(changedRow)
    }
    if (deleted) {
      
      setDeleted(deleted)
      setOpen(true)

    }
  };
  const customFields = () => {
    history.push('/recipient-props')
  }
  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            size="small"
            variant="outlined"
            to='/recipient-props'
            onClick={customFields}
          >
            Custom Fields
          </Button>
        }
        title="Recipient List"
      />
      <Divider />
      <CardContent className={classes.content}>
        <Paper>
          <Grid
            rows={rows}
            columns={state}
            getRowId={getRowId}
          >
            <EditingState
              editingRowIds={editingRowIds}
              onEditingRowIdsChange={setEditingRowIds}
              rowChanges={rowChanges}
              onRowChangesChange={setRowChanges}
              addedRows={addedRows}
              onAddedRowsChange={changeAddedRows}
              onCommitChanges={commitChanges}
              columnExtensions={editingStateColumnExtensions}
            />
            <Table
              columnExtensions={tableColumnExtensions}
            />
            <TableHeaderRow />
            <TableEditRow />
            <TableEditColumn
              showAddCommand={!addedRows.length}
              showEditCommand
              showDeleteCommand
            />
          </Grid>
          <ConfirmationDialogRaw
            id="ringtone-menu"
            keepMounted
            open={open}
            onClose={handleClose}
            onOk={handleOk}
          />
        </Paper>
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
    </Card>
  );
};

const mapStateToProps = ({ user, recipient, recipient_props}) => ({
  username: user.username,
  status: recipient.status,
  props_status: recipient_props.status,
  recipients: recipient.recipients,
  recipient_props: recipient_props.recipient_props

})


const mapDispatchToProps = dispatch => {
  return {
    addRecipient : (recipient, user) => create_recipient(recipient, user, dispatch),
    getRecipientProps : (username) => get_recipient_props(username, dispatch),
    getRecipients : (username) => get_recipients(username, dispatch),
    editRecipient: (recipient) => edit_recipients(recipient, dispatch),
    removeRecipient: (rid) => remove_recipient(rid, dispatch),
    initStatus: () => initstatus(dispatch),
    initPropStatus: () => initpropstatus(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipientList)