import React, { useState } from 'react';
import { Link , withRouter } from 'react-router-dom';
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
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import mockData from './data';
import { StatusBullet } from 'components';

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
  pending: {
    backgroundColor: '#1e88e5',
    display:'inline-block',
    marginRight: 8,
    width: 10,
    height: 10,
    borderRadius: 10
  }
}));

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};

const EmailCueList = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  // const [orders] = useState(mockData);
  console.log('email_cue', props.list)
  const email_cue = []
  for(let x in props.list)
    email_cue.push(props.list[x])
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Email Cue"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Recipient</TableCell>
                  <TableCell>Mail</TableCell>
                  <TableCell>Status</TableCell>

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
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Sent_At
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Failed_At
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {email_cue.map(cue => (
                  <TableRow
                    hover
                    key={cue._id}
                  >
                    <TableCell>{cue.recipient_id}</TableCell>
                    <TableCell><Link to={'/mail-form/' + cue.mail_id}>{cue.mail_id}</Link></TableCell>
                    <TableCell>
                      <span className={cue.status == 'PENDING'? classes.pending : classes.sent}>
                      </span>
                        {cue.status}
                      
                    </TableCell>
                    <TableCell>
                      {moment(cue.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {cue.send_at ? moment(cue.send_at).format('DD/MM/YYYY'): ''}
                    </TableCell>
                    <TableCell>
                      {cue.failed_at ? moment(cue.failed_at).format('DD/MM/YYYY'): ''}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

EmailCueList.propTypes = {
  className: PropTypes.string
};

export default EmailCueList;
