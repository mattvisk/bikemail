/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { CSVLink, CSVDownload } from "react-csv";
import moment from 'moment';
import CSVReader from 'react-csv-reader'
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
  Dialog,
  Table as MTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  },
  m_r_30: {
    marginRight: 30
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
function ImportDialogRaw(props) {
  const { onOk, onClose, open, list, ...other } = props;
  const radioGroupRef = React.useRef(null);
  let datalist = [[],[]], header = []
  if(list.length >= 1){
    datalist = []
    header = list[0]
    for(let index = 1 ; index < list.length; index++)
      datalist.push(list[index])
  }
    
  console.log('here is recpients list:',list);
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
      maxWidth="lg"
      onEntering={handleEntering}
      open={open}
      {...other}>
      <DialogTitle id="confirmation-dialog-title">Import Recipient List</DialogTitle>
      <DialogContent dividers>
      <PerfectScrollbar>
          <div>
            <MTable>
              <TableHead>
                <TableRow>
                  {header.map(hcell => (
                    <TableCell>{hcell}</TableCell>
                  ))}
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {datalist.map(row => (
                  <TableRow
                    hover
                  >
                    {row.map(cell => (
                    <TableCell>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </MTable>
          </div>
        </PerfectScrollbar>
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
  const [importedList, setImportedList] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [importopen, setImportOpen] = React.useState(false);

  const handleImportClose = () => {
    setImportOpen(false);
  };
  const handleImportOk = () => {
    setImportOpen(false);
    let datalist = [];
    for(let index = 1 ; index < importedList.length; index++) {
      let tmp = {}
      for(let jindex = 0; jindex < importedList[index].length; jindex++)
        tmp[importedList[0][jindex]] = importedList[index][jindex]
      let info = {};
      for (let index in props.recipient_props) {
        info[props.recipient_props[index].field] =
          tmp[props.recipient_props[index].field];
        delete tmp[props.recipient_props[index].field];
      }
      delete tmp['_id']
      tmp['info'] = info;
      datalist.push(tmp)
      props.addRecipient(tmp, props.username);
    }
    for(let index = 0; index < rows.length ; index++)
      props.removeRecipient(rows[index]['_id']);
    setRows(datalist);
    // console.log(datalist)

      
    // props.onDelete(props.username)
  };
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
  const handleForce= (resp) => {
    console.log(resp);
    setImportedList(resp);
    setImportOpen(true);

  }
  const handleDarkSideForce= () => {

  }
  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader
        action={
            <div> 
          <Button
            className={classes.m_r_30}
            color="primary"
            size="small"
            variant="outlined">
            <CSVLink  filename={props.username + '_' + moment(new Date()).format('YYYY-MM-DD')+'.csv'} data={rows} headers={headers}>
              Export to CSV
            </CSVLink>
          </Button>
          <Button
            color="primary"
            size="small"
            variant="outlined">
            <CSVReader
              onFileLoaded={handleForce}
              onError={handleDarkSideForce}
            />
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
          <ImportDialogRaw
            id="ringtone-menu"
            keepMounted
            onClose={handleImportClose}
            onOk={handleImportOk}
            open={importopen}
            list={importedList}
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
