import React from 'react';
import { NavLink } from 'react-router-dom';

import Styles from './subnav.scss';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import GroupIcon from '@material-ui/icons/Group';


const SubNav = props => {

  let content;

  const currentpath = localStorage.getItem('currentpath')
  console.log('333333333333333333333333333333333', props)
  return( <div>
  	{currentpath == '/email-templates' || currentpath == '/email-cue' || currentpath == '/email-campaign'?
  	<div className={Styles}>
		<ul>
        <NavLink to="email-templates"><GroupIcon/> <span>One Time<small>Courses, Newsletters, Etc.</small></span></NavLink>
        <NavLink activeClassName="active" to="email-campaigns"><ViewComfyIcon/><span>Series<small>Courses, Newsletters, Etc.</small></span></NavLink>
        <NavLink to="email"><GroupIcon/> <span>Action<small>Courses, Newsletters, Etc.</small></span></NavLink>
      </ul>
    </div> : <div></div>
	}
	</div>
  )
};

export default SubNav;