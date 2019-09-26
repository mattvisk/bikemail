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
  CircularProgress,
  FormControl,
  ListItemText,
  Input,
  InputLabel,
  Checkbox
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

import {
  getemaillist
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
  },
  formControl: {
    width: '100%',
    marginBottom: 30
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
function CreateCampaignDialogRaw(props) {
  const classes = useStyles();
  const { remove, onSave, onClose, open, ...other } = props;
  const radioGroupRef = React.useRef(null);
  let templates = []
  const [rec_mail, setRecMail] = React.useState([]);
  const [description, setDescription] = React.useState('');
  const [title, setTitle] = React.useState('');


  for(let index in props.templates){
    templates.push(props.templates[index])
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

  function handleSave() {
    setRecMail([]);
    var maillist = []
    for(let i = 0 ; i < rec_mail.length ; i++)
      for(let j = 0 ; j < templates.length ; j++)
        if(rec_mail[i] == templates[j].sender_name + '/' + templates[j].sender_email + '/' + templates[j].subject) {
          maillist.push(templates[j]._id);
          break;
        }
    console.log(maillist);
    onSave(title, description, maillist);
  }
  function descriptionChange(event) {
    setDescription(event.target.value);
  }
  function titleChange(event) {
    setTitle(event.target.value);
  }
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="lg"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Create Campaign</DialogTitle>
      <DialogContent dividers className={classes.dialogcontent}>
          <FormControl className={classes.formControl}>
            <InputLabel >Campaign Title</InputLabel>
            <Input value={title}
              onChange={titleChange}>Email Template</Input>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Campaign Description</InputLabel>
            <Input value={description}
              onChange={descriptionChange}>Email Template</Input>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox">Email Template</InputLabel>
            <Select
              multiple
              value={rec_mail}
              onChange={handleChange}
              input={<Input id="select-multiple-checkbox" />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {templates.map(template => (
                <MenuItem key={template._id} value={template.sender_name + '/' + template.sender_email + '/' + template.subject}>
                  <Checkbox checked={rec_mail.indexOf(template.sender_name + '/' + template.sender_email + '/' + template.subject) > -1} />
                  <ListItemText primary={template.sender_name + '/' + template.sender_email + '/' + template.subject} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Send
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
   useEffect(() => {
    if(props.isLoggedIn) {
      props.getEmailList(props.username)
      props.getCampaigns(props.username);
    }
  }, [props.isLoggedIn]);
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
  const [created, setCreated] = useState(false)
  const [spinner, setSpinner] = useState(false);
console.log(props.campaigns)
  const [open, setOpen] = React.useState(false);
  const [openform, setOpenForm] = React.useState(false);
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSaveForm = (title, description, maillist) => {
    props.addCampaign({
      title,
      description,
      emails: maillist
    }, props.username);
    setCreated(true);
    setOpenForm(false);
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
  const createcampaign = () => {

    setOpenForm(true);
  }
  const changeAddedRows = value => {
    const initialized = value.map(row => (Object.keys(row).length ? row : {}));
    setAddedRows(initialized);
  };
  if (props.status === '') {
    props.getCampaigns(props.username);
  }
  console.log('3333333333333333333333333333333', created);
  if (created && rows.length != props.campaigns.length) {
    setRows(props.campaigns);
    setCreated(false);
    // ToastsStore.success(props.status);
  }
  useEffect(() => {
    if (props.status.includes('loaded')) {
      console.log('222222222222222222222222222', props);
      // props.initStatus()
      setRows(props.campaigns);
      // ToastsStore.success(props.status);
    }
  }, [props.campaigns]);


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
            variant="outlined" onClick={() => {createcampaign()}}>
              Create Campaign
          </Button>
          </div>
        }
        title="Campaigns List"
      />
      <Divider />
      <CardContent className={classes.content}>
        <Paper>
          <Grid columns={state} getRowId={getRowId} rows={rows}>
           
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
          <CreateCampaignDialogRaw
            id="ringtone-menu"
            keepMounted
            onClose={handleCloseForm}
            onSave={handleSaveForm}
            open={openform}
            templates={props.maillist}
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

const mapStateToProps = ({ user, campaign, mail }) => ({
  username: user.username,
  status: campaign.status,
  campaigns: campaign.campaigns,
  maillist: mail.maillist,
  isLoggedIn: user.isLoggedIn,
});

const mapDispatchToProps = dispatch => {
  return {
    getEmailList: (username) => getemaillist(username, dispatch),
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
