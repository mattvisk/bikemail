import React from 'react';
import { NavLink } from 'react-router-dom';

import Styles from './subnav.scss';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import GroupIcon from '@material-ui/icons/Group';


const SubNav = props => {
  return(
    <div className={Styles}>
      <ul>
        <NavLink to="email-templates"><GroupIcon/> <span>One Time<small>Courses, Newsletters, Etc.</small></span></NavLink>
        <NavLink activeClassName="active" to="email-campaigns"><ViewComfyIcon/><span>Series<small>Courses, Newsletters, Etc.</small></span></NavLink>
        <NavLink to="email"><GroupIcon/> <span>Action<small>Courses, Newsletters, Etc.</small></span></NavLink>
      </ul>
    </div>
  )
};

export default SubNav;