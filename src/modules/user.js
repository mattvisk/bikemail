import axios from 'axios';

export const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'user/SIGNUP_FAIL'
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'user/LOGIN_SUCCESS'
const initialState = {
  username: '',
  email: '',
  password: '',
  status: '',
  role: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        status:'User is created successfully.'
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        username: action.username,
        role: action.role,
        email: action.email
      }
    default:
      return state
  }
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
        if(userdata)
          dispatch({
            type: LOGIN_SUCCESS,
            username: userdata.username,
            email: userdata.email,
            role: userdata.role
          })
       }
        
    )
    .catch( error => {
        console.log(error);
    });
  return dispatch => {
  }
}
