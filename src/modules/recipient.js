import axios from 'axios';
export const RECIPIENT_CREATED = 'recipient/RECIPIENT_CREATED'
export const RECIPIENT_UPDATED = 'recipient/RECIPIENT_UPDATED'
export const RECIPIENT_REMOVED = 'recipient/RECIPIENT_REMOVED'
export const GET_RECIPIENTS = 'recipient/GET_RECIPIENTS'
export const INIT_STATUS = 'recipient/INIT_STATUS'




const initialState = {
  status: '',
  recipients: {}
}

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : ''
export default (state = initialState, action) => {
  switch (action.type) {
     case INIT_STATUS:
      return {
        ...state,
        status:''
      }
    case RECIPIENT_CREATED:
      return {
        ...state,
        status: 'Recipient is Created Successfully.'
      }
    case GET_RECIPIENTS:
      return {
        ...state,
        recipients: action.recipients,
        status: 'Recipients are loaded Successfully.'
      }
    case RECIPIENT_UPDATED:
      return {
        ...state,
        status: 'Recipients are updated Successfully.'
      }
    case RECIPIENT_REMOVED:
      return {
        ...state,
        status: 'Recipients are removed Successfully.'
      }
    default:
      return state
  }
}
export const initstatus= (dispatch) => {
  dispatch({
    type: INIT_STATUS
  });
}
export const create_recipient = (recipient, username, dispatch) => {
  recipient.user = username
  axios.post(`${API_URL}/api/recipient/`, recipient)
    .then( recipientdata =>{
        dispatch({
          type: RECIPIENT_CREATED
        })
    })
    .catch( error => {
        console.log(error);
    });
}

export const remove_recipient = (rid, dispatch) => {
  axios.delete(`${API_URL}/api/recipient/${rid}`)
    .then( recipientdata =>{
        dispatch({
          type: RECIPIENT_REMOVED
        })
    })
    .catch( error => {
        console.log(error);
    });
}


export const edit_recipients = (recipient, dispatch) => {
  axios.post(`${API_URL}/api/recipient/update`, recipient)
    .then( recipientdata =>{
        dispatch({
          type: RECIPIENT_UPDATED
        })
    })
    .catch( error => {
        console.log(error);
    });
}


export const get_recipients = (username, dispatch) => {
  axios.get(`${API_URL}/api/recipient/list/${username}`)
    .then( recipientdata =>{
        // var recipients = {}
        // for(var i = 0 ; i < recipientdata.data.length ; i++)
        //   recipients[recipientdata.data[i]._id] = recipientdata.data[i]
        dispatch({
          type: GET_RECIPIENTS,
          recipients: recipientdata.data
        })
    })
    .catch( error => {
        console.log(error);
    });
}
