import axios from 'axios';
export const MAIL_CREATED = 'mail/MAIL_CREATED'
export const GET_MAILLIST = 'mail/GET_MAILLIST'
export const INIT_STATUS = 'mail/INIT_STATUS'


const initialState = {
  status: '',
  maillist: []
}

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : ''
export default (state = initialState, action) => {
  switch (action.type) {
    case MAIL_CREATED:
      return {
        ...state,
        status: 'Mail is Created Successfully.'
      }
    case INIT_STATUS:
      return {
        ...state,
        status:''
      }
    case GET_MAILLIST:
    console.log(action.maillist)
      return {
        ...state,
        maillist: action.maillist,
        status: 'Mail Templates are loaded Successfully.'
      }
    default:
      return state
  }
}
export const getemaillist = (username, dispatch) => {
  
  axios.get(`${API_URL}/api/mail/user/${username}`)
    .then( maildata => { 
          dispatch({
            type: GET_MAILLIST,
            maillist: maildata.data
          })
    })
    .catch( error => {
        console.log(error);
    });
}
export const create_mail = (mail, username, dispatch) => {
  mail.author = username
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
export const initstatus= (dispatch) => {
  dispatch({
    type: INIT_STATUS
  });
}