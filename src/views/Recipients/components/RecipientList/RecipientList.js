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
  View,
  Select,
  MenuItem,
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
  TableSortLabel,
  CircularProgress 
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { ToastsStore } from 'react-toasts';
import {
  create_recipient,
  get_recipients,
  edit_recipients,
  remove_recipient,
  import_recipients,
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
  },
  selectHeader: {
    width: '100%'
  },
  spinner: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      backgroundColor: "rgb(243,243,243,0.6)",
      zIndex: 11
  },
  progress: {
    marginTop: '20%',
    marginLeft: '50%'
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
  const { onOk, onClose, open, list, props_headers, ...other } = props;
  const radioGroupRef = React.useRef(null);
  const classes = useStyles();
  let datalist = [[],[]];
  let [header, setHeader] = useState({data: [], status: true})
  if(list.length >= 1){
    datalist = []
    if(header.data.length == 0)
      setHeader({data: list[0], status: true})
    
    for(let index = 1 ; index < list.length; index++)
      datalist.push(list[index])
  }

  let static_headers = []
  if(props_headers) static_headers = props_headers;

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
    let changedHeader = header.data;
    let sheader = []
    for(let index in static_headers)
      sheader.push(static_headers[index]['key'])
    for(let index in changedHeader) {
      if(!sheader.includes(changedHeader[index]))
        changedHeader[index] = ''
      if(changedHeader[index] != '') {
        let count = 0;
        for(let jindex in changedHeader)
          if(changedHeader[jindex] == changedHeader[index])
            count++;
        if(count >= 2){
          ToastsStore.error("Fields are duplicated.")
          return
        }
      }
    }
    onOk(changedHeader);
  }
  function handleChange(event, index) {
    setHeader(oldValues => {
      oldValues.data[index] = event.target.value
      let newstatus = !oldValues.status
      return {data: oldValues.data, status: newstatus};
    });
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
                  {header.data.map((hcell,index) => (
                    <TableCell>
                      <Select
                        value={header.data[index]}
                        displayEmpty
                        name={header.data[index]}
                        onChange={(event) => handleChange(event, index)}
                        className={classes.selectHeader}
                      >
                        <MenuItem value="None">
                          <em>None</em>
                        </MenuItem>
                        {static_headers.map((scell,index) => (
                          <MenuItem value={scell['key']}>{scell['label']}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  ))}
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {datalist.map(row => (
                  <TableRow
                    hover
                  >
                    {row.map(cell => (
                    <TableCell>{cell == 'NULL' || cell == null ? '' : cell}</TableCell>
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
  const [spinner, setSpinner] = useState(false);
  const [importedList, setImportedList] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [importopen, setImportOpen] = React.useState(false);

  const handleImportClose = () => {
    setImportOpen(false);
  };
  const handleImportOk = (changedHeader) => {
    setImportOpen(false);
    setSpinner(true);
    console.log('start', new Date())
    setTimeout(() => {
      let datalist = [];
      for(let index = 1 ; index < importedList.length; index++) {
        let tmp = {}
        for(let jindex = 0; jindex < importedList[index].length; jindex++){
          if(changedHeader[jindex] != '')
            tmp[changedHeader[jindex]] = importedList[index][jindex] == 'NULL' || importedList[index][jindex] == 'null' || importedList[index][jindex] == null ? '' : importedList[index][jindex]
          else
            tmp[changedHeader[jindex]] = ''
        }

        let info = {};
        for (let index in props.recipient_props) {
          info[props.recipient_props[index].field] =
            tmp[props.recipient_props[index].field];
          delete tmp[props.recipient_props[index].field];
        }
        delete tmp['_id']
        tmp['info'] = info;
        tmp['user'] = props.username;
        datalist.push(tmp)
      }
      props.importRecipients(datalist, props.username)
      console.log('end', new Date())

    })
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setOpen(false);
    let changedRows;
    const deletedSet = new Set(deleted);
    changedRows = rows.filter(row => !deletedSet.has(row.email));
    setRows(changedRows);
    props.removeRecipient(deleted[0]);

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
      setSpinner(false)
      ToastsStore.success(props.status);
    }
  }, [props.recipients]);
  useEffect(() => {}, [props.recipient_props]);
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].email + 1 : 0;
      let info = {};
      for (let index in props.recipient_props) {
        info[props.recipient_props[index].field] =
          added[0][props.recipient_props[index].field];
        delete added[0][props.recipient_props[index].field];
      }
      added[0]['info'] = info;
      props.addRecipient(added[0], props.username);
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          email: startingAddedId + index,
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

      setRows(changedRows);
      let info = {};
      for (let index in props.recipient_props) {
        info[props.recipient_props[index].field] =
          changedRow[props.recipient_props[index].field];
        // delete changedRow[props.recipient_props[index].field];
      }
      changedRow['info'] = info;
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
  const [importdata, setImportData] = useState();
  const handleForce= (resp) => {
    // setImportData(resp)
    setImportedList(resp);
    setImportOpen(true);
    // setSpinner(false);
  }
  useEffect(() => {
    if(importedList.length > 0) {
      setSpinner(false)
    }
  }, [importedList]);
  const handleDarkSideForce= () => {

  }
  return (
    <Card className={clsx(classes.root, className)}>

      {spinner && <Card className={classes.spinner}>
              <CircularProgress disableShrink className={classes.progress}/>
          </Card>
      }
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
              onClick={()=>alert(123)}
              onFileLoaded={(resp)=>{
                setSpinner(true);
                setTimeout(() => {
                  handleForce(resp);
                })
              }}
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
            props_headers = {headers}
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
    importRecipients: (recipients, user) =>
      import_recipients(recipients, user, dispatch),
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
