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

export const signup = () => {
  return dispatch => {
    // dispatch({
    //   type: INCREMENT_REQUESTED
    // })

    // dispatch({
    //   type: INCREMENT
    // })
  }
}
