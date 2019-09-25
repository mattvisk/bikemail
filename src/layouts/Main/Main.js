import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { MainNav, SubNav, Footer } from './components';
import './main.scss';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    [theme.breakpoints.up('sm')]: {
    }
  },
  shiftContent: {
    // paddingLeft: 240,
    zIndex: 1
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;
  const {history} = props
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const handleSidebarOpen = () => {
  };

  return (
    <div>
      <MainNav history = {history} onSidebarOpen={handleSidebarOpen} />
      <SubNav history = {history} />
      <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >

      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
    </div>
  );
};

export default Main;
