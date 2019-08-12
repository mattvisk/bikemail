import React, { useState, forwardRef } from 'react';
import {NavLink} from 'react-router-dom';

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
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
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
const EmailList = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  // const [orders] = useState(mockData);

  const mails = props.list
  console.log("Mails:",mails)
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
            component={CustomRouterLink}
            to='/create-mail'
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
                  <TableCell>Slug</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Delay</TableCell>
                  <TableCell>Sender Name</TableCell>
                  <TableCell>Sender email</TableCell>
                  <TableCell>Filter Id</TableCell>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {mails.map(mail => (
                  <TableRow
                    hover
                    key={mail.id}
                  >
                    <TableCell>{mail.subject}</TableCell>
                    <TableCell>{mail.slug}</TableCell>
                    <TableCell>{mail.mail_status}</TableCell>
                    <TableCell>{mail.delay}</TableCell>
                    <TableCell>{mail.sender_name}</TableCell>
                    <TableCell>{mail.sender_email}</TableCell>
                    <TableCell>{mail.filter_id}</TableCell>
                    <TableCell>{mail.mail_content}</TableCell>
                    <TableCell>
                      {moment(mail.createdAt).format('DD/MM/YYYY')}
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
    </Card>
  );
};

EmailList.propTypes = {
  className: PropTypes.string
};

export default EmailList;
