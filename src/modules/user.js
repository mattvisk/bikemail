import axios from 'axios';

export const SIGNUP = 'user/SIGNUP'
const initialState = {
  username: '',
  email: '',
  password: '',
  status: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state
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
    .then( userdata => 
        console.log(userdata)
    )
    .catch( error => {
        console.log(error);
    });
  return dispatch => {
    // dispatch({
    //   type: INCREMENT_REQUESTED
    // })

    // dispatch({
    //   type: INCREMENT
    // })
  }
}
