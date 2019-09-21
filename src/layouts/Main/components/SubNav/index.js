import React, { forwardRef } from 'react';
import { matchPath } from 'react-router';
import { NavLink } from 'react-router-dom';
import Styles from './subnav.scss';


const SubNav = props => {
  return(
    <div className={Styles}>
        <ul>
            <NavLink to="email-campaigns">Series<small>Courses, Newsletters, Etc.</small></NavLink>
            <NavLink to="email-campaigns">One Time<small>Courses, Newsletters, Etc.</small></NavLink>
            <NavLink to="email-campaigns">Action<small>Courses, Newsletters, Etc.</small></NavLink>
        </ul>
    </div>
  )
};

export default(SubNav);