import axios from 'axios';
export const MAIL_CREATED = 'mail/MAIL_CREATED'



const initialState = {
  status: ''
}

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : ''
export default (state = initialState, action) => {
  switch (action.type) {
    case MAIL_CREATED:
      return {
        ...state,
        status: 'Mail is Created Successfully.'
      }
    
    default:
      return state
  }
}
export const create_mail = (mail, dispatch) => {
  axios.post(`${API_URL}/api/mail/`, mail)
    .then( userdata =>{ 
          dispatch({
            type: MAIL_CREATED
          })
    })
    .catch( error => {
        console.log(error);
    });
}
