import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
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
  CardHeader,
  CardContent,
  Divider,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog 
} from '@material-ui/core';
import { connect } from 'react-redux'
import {ToastsStore} from 'react-toasts';

import {
  get_recipient_props,
  create_recipient_prop,
  edit_recipient_prop,
  remove_recipient_prop,
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
  },
  container: {
    margin: '0 auto',
    marginTop: 100,
    marginRight: 100,
    marginLeft: 100
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
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Delete RecipientProp</DialogTitle>
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
  const [columns] = useState([
    { name: '_id', title: 'ID' },
    { name: 'field', title: 'PropName' },
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
    props.removeRecipientProp(deleted[0])

     console.log(deleted)
    // props.onDelete(props.username)
    
  }
  const changeAddedRows = (value) => {
    const initialized = value.map(row => (Object.keys(row).length ? row : { }));
    setAddedRows(initialized);
  };
  if(props.status === '')
    props.getRecipientProps(props.username)

  useEffect(() => {
    if(props.status.includes('loaded')){
      // props.initStatus()
      setRows(props.recipient_props)
      console.log(props.recipient_props, props)
      ToastsStore.success(props.status)
    }
        
  }, [props.recipient_props]);
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1]._id + 1 : 0;
      props.addRecipientProp(added[0], props.username)
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
        if(changedRows[i]._id === Object.keys(changed)[0])
          changedRow = changedRows[i]
      console.log('changed:', changed, changedRows, Object.keys(changed)[0])
      
      setRows(changedRows);
      props.editRecipientProp(changedRow)
    }
    if (deleted) {
      
      setDeleted(deleted)
      setOpen(true)

    }
  };
  // const customFields = () => {
  //   history.push('/recipient-props')
  // }
  return (
    <Card
      className={classes.container}
    >
      <CardHeader
        
        title="Recipient Custom Fields"
      />
      <Divider />
      <CardContent className={classes.content}>
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

const mapStateToProps = ({ user, recipient_props}) => ({
  username: user.username,
  status: recipient_props.status,
  recipient_props: recipient_props.recipient_props
})


const mapDispatchToProps = dispatch => {
  return {
    addRecipientProp : (recipient, user) => create_recipient_prop(recipient, user, dispatch),
    editRecipientProp: (recipient) => edit_recipient_prop(recipient, dispatch),
    removeRecipientProp: (rid) => remove_recipient_prop(rid, dispatch),
    getRecipientProps : (username) => get_recipient_props(username, dispatch),
    initStatus: () => initpropstatus(dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipientList)