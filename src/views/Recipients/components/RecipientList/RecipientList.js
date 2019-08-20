import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog 
} from '@material-ui/core';
import { connect } from 'react-redux'
import {ToastsStore} from 'react-toasts';
import {
  create_recipient,
  get_recipients,
  edit_recipients,
  remove_recipient,
  initstatus
} from '../../../../modules/recipient'

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
  const [columns] = useState([
    { name: '_id', title: 'ID' },
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    { name: 'email', title: 'Email' },
    { name: 'phone', title: 'Phone' },
    { name: 'unsubscribed', title: 'Unsubscribed' },
  ]);
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
  if(props.status == '')
    props.getRecipients(props.username)

  useEffect(() => {
    if(props.status.includes('loaded')){
      // props.initStatus()
      setRows(props.recipients)
      console.log(props.recipients, props)
      ToastsStore.success(props.status)
    }
        
  }, [props.recipients]);
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1]._id + 1 : 0;
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
props.editRecipient(changedRow)
    }
    if (deleted) {
      
      setDeleted(deleted)
      setOpen(true)

    }
  };

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
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
  );
};

const mapStateToProps = ({ user, recipient}) => ({
  username: user.username,
  status: recipient.status,
  recipients: recipient.recipients
})


const mapDispatchToProps = dispatch => {
  return {
    addRecipient : (recipient, user) => create_recipient(recipient, user, dispatch),
    getRecipients : (username) => get_recipients(username, dispatch),
    editRecipient: (recipient) => edit_recipients(recipient, dispatch),
    removeRecipient: (rid) => remove_recipient(rid, dispatch),
    initStatus: () => initstatus(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipientList)