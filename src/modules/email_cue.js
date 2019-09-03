import axios from 'axios';
export const EMAIL_CUE_CREATED = 'email-cue/EMAIL_CUE_CREATED'
export const EMAIL_CUE_UPDATED = 'email-cue/EMAIL_CUE_UPDATED'
export const EMAIL_CUE_REMOVED = 'email-cue/EMAIL_CUE_REMOVED'
export const GET_EMAIL_CUE = 'email-cue/EMAIL_CUE_PROPS'
export const INIT_STATUS = 'email-cue/INIT_STATUS'




const initialState = {
  status: '',
  email_cue: {}
}

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : ''
export default (state = initialState, action) => {
  switch (action.type) {
     case INIT_STATUS:
      return {
        ...state,
        status:''
      }
    case EMAIL_CUE_CREATED:
      return {
        ...state,
        status: 'Recipient Prop is Created Successfully.'
      }
    default:
      return state
  }
}
export const initpropstatus= (dispatch) => {
  dispatch({
    type: INIT_STATUS
  });
}
export const create_email_cue = (email_cue, dispatch) => {
  axios.post(`${API_URL}/api/email-cue/`, email_cue)
    .then( emailcuedata =>{
        dispatch({
          type: EMAIL_CUE_CREATED
        })
    })
    .catch( error => {
        console.log(error);
    });
}

// export const remove_recipient_prop = (rid, dispatch) => {
//   axios.delete(`${API_URL}/api/recipient-props/${rid}`)
//     .then( recipientdata =>{
//         dispatch({
//           type: RECIPIENT_PROP_REMOVED
//         })
//     })
//     .catch( error => {
//         console.log(error);
//     });
// }


// export const edit_recipient_prop = (recipient_prop, dispatch) => {
//   axios.post(`${API_URL}/api/recipient-props/update`, recipient_prop)
//     .then( recipientdata =>{
//         dispatch({
//           type: RECIPIENT_PROP_UPDATED
//         })
//     })
//     .catch( error => {
//         console.log(error);
//     });
// }


// export const get_recipient_props = (username, dispatch) => {
//   axios.get(`${API_URL}/api/recipient-props/list/${username}`)
//     .then( recipientdata =>{
//         // var recipients = {}
//         // for(var i = 0 ; i < recipientdata.data.length ; i++)
//         //   recipients[recipientdata.data[i]._id] = recipientdata.data[i]
//         dispatch({
//           type: GET_RECIPIENT_PROPS,
//           recipient_props: recipientdata.data
//         })
//     })
//     .catch( error => {
//         console.log(error);
//     });
// }
