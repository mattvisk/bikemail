import axios from 'axios';
export const MAIL_CREATED = 'mail/MAIL_CREATED'
export const MAIL_REMOVED = 'mail/MAIL_REMOVED'
export const MAIL_UPDATED = 'mail/MAIL_UPDATED'

export const GET_MAILLIST = 'mail/GET_MAILLIST'
export const INIT_STATUS = 'mail/INIT_STATUS'
export const GET_MAIL = 'mail/GET_MAIL'
export const SET_FORM_STATUS = 'mail/SET_FORM_STATUS'




const initialState = {
  status: '',
  maillist: [],
  formStatus: '',
  maildata: {}
}

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : ''
export default (state = initialState, action) => {
  switch (action.type) {
    case MAIL_CREATED:
      return {
        ...state,
        status: 'Mail is Created Successfully.'
      }
    case MAIL_UPDATED:
      return {
        ...state,
        status: 'Mail is Updated Successfully.'
      }
    case SET_FORM_STATUS:
      return {
        ...state,
        formStatus: action.formStatus,
        maildata: action.maildata
      }
    case MAIL_REMOVED:
      return {
        ...state,
        status: 'Mail is removed Successfully.'
      }
    case INIT_STATUS:
      return {
        ...state,
        status:''
      }
    case GET_MAILLIST:
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
export const removemail = (mail, dispatch) => {
  axios.delete(`${API_URL}/api/mail/${mail}`)
    .then( userdata =>{ 
          dispatch({
            type: MAIL_REMOVED
          })
    })
    .catch( error => {
        console.log(error);
    });
}
export const update_mail = (mail, dispatch) => {
  axios.put(`${API_URL}/api/mail/${mail._id}`, mail)
    .then( userdata =>{ 
          dispatch({
            type: MAIL_UPDATED
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
export const setformstatus= (formStatus, dispatch) => {

  if(formStatus != 'create')
    axios.get(`${API_URL}/api/mail/${formStatus}`)
    .then( maildata =>{ 
      console.log('getting now', maildata.data)
          dispatch({
            type: SET_FORM_STATUS,
            formStatus: formStatus,
            maildata: maildata.data
          });
    })
    .catch( error => {
        console.log(error);
    });
  else 
    dispatch({
      type: SET_FORM_STATUS,
      formStatus: formStatus,
      maildata: {}
    });
}