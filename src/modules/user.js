import axios from 'axios';
export const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'user/SIGNUP_FAIL'
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'user/LOGIN_FAIL'
export const INIT_STATUS = 'user/INIT_STATUS'
export const GET_USERLIST = 'user/GET_USERLIST'
export const SIGNOUT = 'user/SIGNOUT'
export const LOGEDIN = 'user/LOGEDIN'
export const SET_ACCOUNT_TYPE = 'user/SET_ACCOUNT_TYPE'
export const USER_UPDATED = 'user/USER_UPDATED'
export const USER_DELETED = 'user/USER_DELETED'
export const USER_DUPLICATED = 'user/USER_DUPLICATED'
export const GET_ACCOUNT_TYPE = 'user/GET_ACCOUNT_TYPE'
export const STORE_BLOCKED_URL = 'user/STORE_BLOCKED_URL'

const initialState = {
  username: '',
  email: '',
  password: '',
  status: '',
  role: '',
  isLoggedIn: '',
  userlist: [],
  accountType: '',
  changed: '',
  accountTypeList: [],
  blockedUrl: ''
}

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : ''
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_TYPE:
      return {
        ...state,
        accountTypeList: action.accountlist
      }
    case STORE_BLOCKED_URL:
      return {
        ...state,
        blockedUrl: action.url
      }
    case USER_DELETED:
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('role');
      window.localStorage.removeItem('email');
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        email: '',
        password: '',
        status:'Your account is deleted successfully.'

      }
    case USER_UPDATED:
      console.log('user_updated')
      window.localStorage.setItem('username', action.userdata.username);
      window.localStorage.setItem('role', action.userdata.role);
      window.localStorage.setItem('email', action.userdata.email);
      return {
        ...state,
        isLoggedIn: true,
        username: action.userdata.username,
        email: action.userdata.username,
        password: action.userdata.username,
        status:'Your account is updated Successfully.'
      }
    case USER_DUPLICATED:
      return {
        ...state,
        status:'Username is Duplicated.',
      }
    case SET_ACCOUNT_TYPE:
      return {
        ...state,
        accountType: action.accountType
      }
    case SIGNOUT:
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('role');
      window.localStorage.removeItem('email');
      return {
        ...state,
        isLoggedIn: ''
      }
    case SIGNUP_SUCCESS:
      window.localStorage.setItem('username', action.userdata.username);
      window.localStorage.setItem('role', action.userdata.role);
      window.localStorage.setItem('email', action.userdata.email);
      return {
        ...state,
        status:'User is created successfully.',
        username: action.userdata.username,
        role: action.userdata.role,
        email: action.userdata.email,
        isLoggedIn: true
      }
    case INIT_STATUS:
      return {
        ...state,
        status:''
      }
    case LOGEDIN:
      console.log('logedin', action)
      return  {
        ...state,
        username: action.username,
        role: action.role,
        email: action.email,
        isLoggedIn: true
      }
    case LOGIN_SUCCESS:
      window.localStorage.setItem('username', action.username);
      window.localStorage.setItem('role', action.role);
      window.localStorage.setItem('email', action.email);
      return {
        ...state,
        username: action.username,
        role: action.role,
        email: action.email,
        status: 'Login Successfully',
        isLoggedIn: true
      }
    case LOGIN_FAIL:
      return {
        ...state,
        status: action.error,
        isLoggedIn: false
      }
    case GET_USERLIST:
      return {
        ...state,
        userlist: action.userlist
      }
    default:
      return state
  }
}
export const getuserlist = (dispatch) => {
  axios.get(`${API_URL}/api/users/`)
    .then( userdata =>{ 
          dispatch({
            type: GET_USERLIST,
            userlist: userdata.data
          })
    })
    .catch( error => {
        console.log(error);
    });
}
export const get_account_type = (dispatch) => {
  axios.get(`${API_URL}/api/users/account-type`)
    .then( accountlist =>{ 
          dispatch({
            type: GET_ACCOUNT_TYPE,
            accountlist: accountlist.data
          })
    })
    .catch( error => {
        console.log(error);
    });
}
export const initstatus= (dispatch) => {
  dispatch({
    type: INIT_STATUS
  });
}
export const set_account_type= (account_type,dispatch) => {
  dispatch({
    type: SET_ACCOUNT_TYPE,
    accountType: account_type
  });
}
export const signup = (username, email, password, dispatch) => {
  console.log(username, email, password);
  axios.post(`${API_URL}/api/users/`,{
    username: username,
    email: email,
    password: password
  })
    .then( userdata =>{ 
          dispatch({
            type: SIGNUP_SUCCESS,
            userdata: userdata.data
          })
       }
        
    )
    .catch( error => {
        console.log(error);
    });
  return dispatch => {
  }
}


export const signin = (username, password, dispatch) => {
  axios.post(`${API_URL}/api/auth/login`, {
    username: username,
    password: password
  })
    .then( userdata =>{ 

        if(userdata.data.error){
          dispatch({
            type: LOGIN_FAIL,
            error: userdata.data.error
          })
        }
        else{
          dispatch({
            type: LOGIN_SUCCESS,
            username: userdata.data.username,
            email: userdata.data.email,
            role: userdata.data.role
          })
        }
       }
        
    )
    .catch( error => {
        console.log(error);
    });
  return dispatch => {
  }
}

export const updateuser = (oldname, username, email, password, dispatch) => {
  axios.put(`${API_URL}/api/users/${oldname}`,{
    username: username,
    email: email,
    password: password
  })
    .then( userdata =>{ 
          dispatch({
            type: USER_UPDATED,
            userdata: userdata.data
          })
       }
    )
    .catch( error => {
        dispatch({
          type: USER_DUPLICATED,
        })
    });
  return dispatch => {
  }
}

export const deleteuser = (oldname, dispatch) => {
  axios.delete(`${API_URL}/api/users/${oldname}`)
    .then( userdata =>{ 
          dispatch({
            type: USER_DELETED,
          })
       }
    )
    .catch( error => {
        console.log(error);
    });
  return dispatch => {
  }
}
