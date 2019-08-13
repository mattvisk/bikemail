import React from 'react';
import {NavLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import './banner.scss';
import envelope from'./envelopes.png';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div id="banner-wrapper">
      <img width="400px" src={envelope} />
      <h1>Automatic Customer Communication.</h1>
      <h2>Talk to your customers one-on-one, at scale.</h2>

      <NavLink class="large-btn" to='/sign-up'>Create your account</NavLink>

    </div>
  );
};
// <div className={classes.root}>
//       <Grid
//         container
//         spacing={4}
//       >
//         <Grid
//           item
//           lg={3}
//           sm={6}
//           xl={3}
//           xs={12}
//         >
//           <Budget />
//         </Grid>
//         <Grid
//           item
//           lg={3}
//           sm={6}
//           xl={3}
//           xs={12}
//         >
//           <TotalUsers />
//         </Grid>
//         <Grid
//           item
//           lg={3}
//           sm={6}
//           xl={3}
//           xs={12}
//         >
//           <TasksProgress />
//         </Grid>
//         <Grid
//           item
//           lg={3}
//           sm={6}
//           xl={3}
//           xs={12}
//         >
//           <TotalProfit />
//         </Grid>
//         <Grid
//           item
//           lg={8}
//           md={12}
//           xl={9}
//           xs={12}
//         >
//           <LatestSales />
//         </Grid>
//         <Grid
//           item
//           lg={4}
//           md={6}
//           xl={3}
//           xs={12}
//         >
//           <UsersByDevice />
//         </Grid>
//         <Grid
//           item
//           lg={4}
//           md={6}
//           xl={3}
//           xs={12}
//         >
//           <LatestProducts />
//         </Grid>
//         <Grid
//           item
//           lg={8}
//           md={12}
//           xl={9}
//           xs={12}
//         >
//           <LatestOrders />
//         </Grid>
//       </Grid>
//     </div>
export default Dashboard;
