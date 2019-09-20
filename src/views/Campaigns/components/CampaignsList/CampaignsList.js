/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { 
  EditingState,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { CSVLink } from "react-csv";
import moment from 'moment';
import CSVReader from 'react-csv-reader'

import {
  Grid, 
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel
} from '@devexpress/dx-react-grid-material-ui';
import {
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
  CircularProgress 
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { ToastsStore } from 'react-toasts';
import {
  create_campaign,
  get_campaigns,
  edit_campaign,
  remove_campaign,
  initstatus
} from '../../../../modules/campaign';

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

const CampaignsList = props => {
  const { history, className, ...rest } = props;
  const classes = useStyles();
  let state = [
    { name: 'title', title: 'Title' },
    { name: 'emails', title: 'Emails' },
  ];

  const [deleted, setDeleted] = useState();
  const [rows, setRows] = useState([]);
  const [tableColumnExtensions] = useState([{ columnName: '_id', width: 200 }]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [pageSizes] = useState([5, 10, 15, 0]);
  const [editingStateColumnExtensions] = useState([
    { columnName: '_id', editingEnabled: false }
  ]);
  const [spinner, setSpinner] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setOpen(false);
    let changedRows;
    const deletedSet = new Set(deleted);
    changedRows = rows.filter(row => !deletedSet.has(row.email));
    setRows(changedRows);
    props.removeCampaign(deleted[0]);

    // props.onDelete(props.username)
  };
  const changeAddedRows = value => {
    const initialized = value.map(row => (Object.keys(row).length ? row : {}));
    setAddedRows(initialized);
  };
  if (props.status === '') {
    props.getCampaigns(props.username);
  }

  useEffect(() => {
    if (props.status.includes('loaded')) {
      // props.initStatus()
      setRows(props.campaigns);
      ToastsStore.success(props.status);
    }
  }, [props.campaigns]);
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].email + 1 : 0;

      props.addCampaign(added[0], props.username);
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

      props.editCampaign(changedRow);
    }
    if (deleted) {
      setDeleted(deleted);
      setOpen(true);
    }
  };

  return (
    <Card className={clsx(classes.root, className)}>

      {spinner && <Card className={classes.spinner}>
              <CircularProgress disableShrink className={classes.progress}/>
          </Card>
      }
      <CardHeader
        action={
            <div> 
          </div>
        }
        title="Campaigns List"
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
            
            <PagingState
              defaultCurrentPage={0}
              defaultPageSize={5}
            />
            <IntegratedPaging />
            <Table columnExtensions={tableColumnExtensions} />

            <TableHeaderRow />
            <PagingPanel
              pageSizes={pageSizes}
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

const mapStateToProps = ({ user, campaign }) => ({
  username: user.username,
  status: campaign.status,
  campaigns: campaign.campaigns,
});

const mapDispatchToProps = dispatch => {
  return {
    addCampaign: (campaign, user) =>
    create_campaign(campaign, user, dispatch),
    getCampaigns: username => get_campaigns(username, dispatch),
    editCampaign: campaign => edit_campaign(campaign, dispatch),
    removeCampaign: rid => remove_campaign(rid, dispatch),
    initStatus: () => initstatus(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignsList);
