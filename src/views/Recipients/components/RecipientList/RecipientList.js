/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { CSVLink, CSVDownload } from "react-csv";
import moment from 'moment';

import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from '@devexpress/dx-react-grid-material-ui';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog
} from '@material-ui/core';
import { connect } from 'react-redux';
import { ToastsStore } from 'react-toasts';
import {
  create_recipient,
  get_recipients,
  edit_recipients,
  remove_recipient,
  initstatus
} from '../../../../modules/recipient';
import {
  get_recipient_props,
  initpropstatus
} from '../../../../modules/recipient_props';
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
      aria-labelledby="confirmation-dialog-title"
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      open={open}
      {...other}>
      <DialogTitle id="confirmation-dialog-title">Delete Recipient</DialogTitle>
      <DialogContent dividers>
        Do you want to delete this recipient?
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleOk}>
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
    { name: 'unsubscribed', title: 'Unsubscribed' }
  ];

  const headers = [
    { label: '_id', key: '_id' },
    { label: 'firstName', key: 'firstName' },
    { label: 'lastName', key: 'lastName' },
    { label: 'email', key: 'email' },
    { label: 'phone', key: 'phone' },
    { label: 'unsubscribed', key: 'unsubscribed' }
  ];
  for (let index in props.recipient_props){
    state.push({
      name: props.recipient_props[index].field,
      title: props.recipient_props[index].field
    });
    headers.push({
      label: props.recipient_props[index].field,
      key: props.recipient_props[index].field
    })
  }
  const [deleted, setDeleted] = useState();
  const [rows, setRows] = useState([]);
  const [tableColumnExtensions] = useState([{ columnName: '_id', width: 200 }]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [editingStateColumnExtensions] = useState([
    { columnName: '_id', editingEnabled: false }
  ]);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setOpen(false);
    let changedRows;
    const deletedSet = new Set(deleted);
    changedRows = rows.filter(row => !deletedSet.has(row._id));
    setRows(changedRows);
    props.removeRecipient(deleted[0]);

    console.log(deleted);
    // props.onDelete(props.username)
  };
  const changeAddedRows = value => {
    const initialized = value.map(row => (Object.keys(row).length ? row : {}));
    setAddedRows(initialized);
  };
  if (props.status === '') {
    props.getRecipientProps(props.username);
    props.getRecipients(props.username);
  }
  if (props.props_status.includes('updated')) {
    props.getRecipientProps(props.username);
    props.initPropStatus();
  }
  useEffect(() => {
    if (props.status.includes('loaded')) {
      // props.initStatus()
      setRows(props.recipients);
      console.log(props.recipients, props);
      ToastsStore.success(props.status);
    }
  }, [props.recipients]);
  useEffect(() => {}, [props.recipient_props]);
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1]._id + 1 : 0;
      let info = {};
      for (let index in props.recipient_props) {
        info[props.recipient_props[index].field] =
          added[0][props.recipient_props[index].field];
        delete added[0][props.recipient_props[index].field];
      }
      added[0]['info'] = info;
      console.log(added[0]);
      props.addRecipient(added[0], props.username);
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          _id: startingAddedId + index,
          ...row
        }))
      ];
      setRows(changedRows);
    }
    if (changed) {
      changedRows = rows.map(row =>
        changed[row._id] ? { ...row, ...changed[row._id] } : row
      );
      let changedRow;
      for (var i = 0; i < changedRows.length; i++)
        if (changedRows[i]._id === Object.keys(changed)[0])
          changedRow = changedRows[i];
      console.log('changed:', changed, changedRows, Object.keys(changed)[0]);

      setRows(changedRows);
      let info = {};
      for (let index in props.recipient_props) {
        info[props.recipient_props[index].field] =
          changedRow[props.recipient_props[index].field];
        // delete changedRow[props.recipient_props[index].field];
      }
      changedRow['info'] = info;
      console.log(changedRow);
      props.editRecipient(changedRow);
    }
    if (deleted) {
      setDeleted(deleted);
      setOpen(true);
    }
  };
  const customFields = () => {
    history.push('/recipient-props');
  };

  const data = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
  ];
  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader
        action={
            <div> 
          <Button
            color="primary"
            size="small"
            variant="outlined">
            <CSVLink  filename={props.username + '_' + moment(new Date()).format('YYYY-MM-DD')+'.csv'} data={rows} headers={headers}>
              Export to CSV
            </CSVLink>
          </Button>
          
          </div>
        }
        title="Recipient List"
      />
      <Divider />
      <CardContent className={classes.content}>
        <Paper>
          <Grid columns={state} getRowId={getRowId} rows={rows}>
            <EditingState
              addedRows={addedRows}
              columnExtensions={editingStateColumnExtensions}
              editingRowIds={editingRowIds}
              onAddedRowsChange={changeAddedRows}
              onCommitChanges={commitChanges}
              onEditingRowIdsChange={setEditingRowIds}
              onRowChangesChange={setRowChanges}
              rowChanges={rowChanges}
            />
            <Table columnExtensions={tableColumnExtensions} />
            <TableHeaderRow />
            <TableEditRow />
            <TableEditColumn
              showAddCommand={!addedRows.length}
              showDeleteCommand
              showEditCommand
            />
          </Grid>
          <ConfirmationDialogRaw
            id="ringtone-menu"
            keepMounted
            onClose={handleClose}
            onOk={handleOk}
            open={open}
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

const mapStateToProps = ({ user, recipient, recipient_props }) => ({
  username: user.username,
  status: recipient.status,
  props_status: recipient_props.status,
  recipients: recipient.recipients,
  recipient_props: recipient_props.recipient_props
});

const mapDispatchToProps = dispatch => {
  return {
    addRecipient: (recipient, user) =>
      create_recipient(recipient, user, dispatch),
    getRecipientProps: username => get_recipient_props(username, dispatch),
    getRecipients: username => get_recipients(username, dispatch),
    editRecipient: recipient => edit_recipients(recipient, dispatch),
    removeRecipient: rid => remove_recipient(rid, dispatch),
    initStatus: () => initstatus(dispatch),
    initPropStatus: () => initpropstatus(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipientList);
