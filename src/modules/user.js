import axios from 'axios';
export const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'user/SIGNUP_FAIL'
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'user/LOGIN_FAIL'
export const INIT_STATUS = 'user/INIT_STATUS'
export const GET_USERLIST = 'user/GET_USERLIST'
export const SIGNOUT = 'user/SIGNOUT'
export const LOGEDIN = 'user/LOGEDIN'



const initialState = {
  username: '',
  email: '',
  password: '',
  status: '',
  role: '',
  isLoggedIn: '',
  userlist: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNOUT:
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('role');
      window.localStorage.removeItem('email');
      return {
        ...state,
        isLoggedIn: false
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        status:'User is created successfully.'
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
  axios.get('http://127.0.0.1:4040/api/users/')
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
export const initstatus= (dispatch) => {
  dispatch({
    type: INIT_STATUS
  });
}
export const signup = (username, email, password, dispatch) => {
  console.log(username, email, password);
  axios.post('http://127.0.0.1:4040/api/users/',{
    username: username,
    email: email,
    password: password
  })
    .then( userdata =>{ 
          dispatch({
            type: SIGNUP_SUCCESS
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
  axios.post('http://127.0.0.1:4040/api/auth/login',{
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
