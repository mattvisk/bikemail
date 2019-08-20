import axios from 'axios';
export const RECIPIENT_CREATED = 'recipient/RECIPIENT_CREATED'




const initialState = {
  status: '',
  maillist: [],
  formStatus: '',
  maildata: {}
}

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : ''
export default (state = initialState, action) => {
  switch (action.type) {
    case RECIPIENT_CREATED:
      return {
        ...state,
        status: 'Recipient is Created Successfully.'
      }
   
    default:
      return state
  }
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
