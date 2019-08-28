import axios from 'axios';
export const RECIPIENT_PROP_CREATED = 'recipient-props/RECIPIENT_PROP_CREATED'
export const RECIPIENT_PROP_UPDATED = 'recipient-props/RECIPIENT_PROP_UPDATED'
export const RECIPIENT_PROP_REMOVED = 'recipient-props/RECIPIENT_PROP_REMOVED'
export const GET_RECIPIENT_PROPS = 'recipient-props/GET_RECIPIENT_PROPS'
export const INIT_STATUS = 'recipient-props/INIT_STATUS'




const initialState = {
  status: '',
  recipient_props: {}
}

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : ''
export default (state = initialState, action) => {
  switch (action.type) {
     case INIT_STATUS:
      return {
        ...state,
        status:''
      }
    case RECIPIENT_PROP_CREATED:
      return {
        ...state,
        status: 'Recipient Prop is Created Successfully.'
      }
    case GET_RECIPIENT_PROPS:
      return {
        ...state,
        recipient_props: action.recipient_props,
        status: 'Recipient Prop is loaded Successfully.'
      }
    case RECIPIENT_PROP_UPDATED:
      return {
        ...state,
        status: 'Recipient Prop is updated Successfully.'
      }
    case RECIPIENT_PROP_REMOVED:
      return {
        ...state,
        status: 'Recipient Prop is removed Successfully.'
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
export const create_recipient_prop = (recipient_prop, username, dispatch) => {
  recipient_prop.user = username
  axios.post(`${API_URL}/api/recipient-props/`, recipient_prop)
    .then( recipientdata =>{
        dispatch({
          type: RECIPIENT_PROP_CREATED
        })
    })
    .catch( error => {
        console.log(error);
    });
}

export const remove_recipient_prop = (rid, dispatch) => {
  axios.delete(`${API_URL}/api/recipient-props/${rid}`)
    .then( recipientdata =>{
        dispatch({
          type: RECIPIENT_PROP_REMOVED
        })
    })
    .catch( error => {
        console.log(error);
    });
}


export const edit_recipient_prop = (recipient_prop, dispatch) => {
  axios.post(`${API_URL}/api/recipient-props/update`, recipient_prop)
    .then( recipientdata =>{
        dispatch({
          type: RECIPIENT_PROP_UPDATED
        })
    })
    .catch( error => {
        console.log(error);
    });
}


export const get_recipient_props = (username, dispatch) => {
  axios.get(`${API_URL}/api/recipient-props/list/${username}`)
    .then( recipientdata =>{
        // var recipients = {}
        // for(var i = 0 ; i < recipientdata.data.length ; i++)
        //   recipients[recipientdata.data[i]._id] = recipientdata.data[i]
        dispatch({
          type: GET_RECIPIENT_PROPS,
          recipient_props: recipientdata.data
        })
    })
    .catch( error => {
        console.log(error);
    });
}
