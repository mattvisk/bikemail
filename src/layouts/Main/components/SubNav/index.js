import React, { forwardRef } from 'react';
import { matchPath } from 'react-router';
import { NavLink } from 'react-router-dom';
import Styles from './subnav.scss';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import GroupIcon from '@material-ui/icons/Group';


const SubNav = props => {
  return(
    <div className={Styles}>
      <ul>
        <NavLink to="email-campaigns"><ViewComfyIcon/><span>Series<small>Courses, Newsletters, Etc.</small></span></NavLink>
        <NavLink to="email-campaigns"><GroupIcon/> <span>One Time<small>Courses, Newsletters, Etc.</small></span></NavLink>
        <NavLink to="email-campaigns"><GroupIcon/> <span>Action<small>Courses, Newsletters, Etc.</small></span></NavLink>
      </ul>
    </div>
  )
};

export default(SubNav);