import React, { forwardRef } from 'react';
import { matchPath } from 'react-router';
import { NavLink } from 'react-router-dom';
import StyleSheet from 'react-style';

const styles = StyleSheet.create({
  primary: {
    background: 'green'
  },
  warning: {
    background: 'yellow'
  },
  button: {
    padding: '1em'
  },
  // media queries
  '@media (max-width: 200px)': {
    button: {
      width: '100%'
    }
  }
});


const SubNav = props => {
  return(
    <div className={Styles}>
        <NavLink>Something</NavLink>
        <NavLink>Something</NavLink>
        <NavLink>Something</NavLink>
        <NavLink>Something</NavLink>
    </div>
  )
};

export default(SubNav);