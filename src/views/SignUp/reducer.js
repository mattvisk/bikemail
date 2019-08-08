/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { SIGNUP } from './constants';

// The initial state of the App
export const initialState = {
  status: ''
};

/* eslint-disable default-case, no-param-reassign */
const signupReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGNUP:
        // Delete prefixed '@' from the github username
        // draft.username = action.username.replace(/@/gi, '');
        break;
    }
  });

export default signupReducer;
