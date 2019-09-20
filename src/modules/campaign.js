import axios from 'axios';
export const CAMPAIGN_CREATED = 'campaign/CAMPAIGN_CREATED'
export const CAMPAIGN_IMPORTED = 'campaign/CAMPAIGN_IMPORTED'
export const CAMPAIGN_UPDATED = 'campaign/CAMPAIGN_UPDATED'
export const CAMPAIGN_REMOVED = 'campaign/CAMPAIGN_REMOVED'
export const GET_CAMPAIGNS = 'campaign/GET_CAMPAIGNS'
export const INIT_STATUS = 'campaign/INIT_STATUS'




const initialState = {
  status: '',
  campaigns: {}
}

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4040' : ''
export default (state = initialState, action) => {
  switch (action.type) {
     case INIT_STATUS:
      return {
        ...state,
        status:''
      }
    case CAMPAIGN_CREATED:
      return {
        ...state,
        status: 'Campaign is Created Successfully.'
      }
    case GET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.campaigns,
        status: 'Campaigns are loaded Successfully.'
      }
    case CAMPAIGN_UPDATED:
      return {
        ...state,
        status: 'Campaigns are updated Successfully.'
      }
    case CAMPAIGN_REMOVED:
      return {
        ...state,
        status: 'Campaigns are removed Successfully.'
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
export const create_campaign = (campaign, username, dispatch) => {
  campaign.user = username
  axios.post(`${API_URL}/api/campaign/`, campaign)
    .then( campaigndata =>{
        dispatch({
          type: CAMPAIGN_CREATED
        })
    })
    .catch( error => {
        console.log(error);
    });
}

export const import_campaigns = (campaigns, username, dispatch) => {
  let data = {campaigns: campaigns, user: username}
  axios.post(`${API_URL}/api/campaign/import`, data)
    .then( campaigndata =>{
        dispatch({
          type: GET_CAMPAIGNS  ,
          recipients: campaigndata.data
        })
    })
    .catch( error => {
        console.log(error);
    });
}

export const remove_campaign = (rid, dispatch) => {
  axios.delete(`${API_URL}/api/campaign/${rid}`)
    .then( campaigndata =>{
        dispatch({
          type: CAMPAIGN_REMOVED
        })
    })
    .catch( error => {
        console.log(error);
    });
}


export const edit_campaign = (campaign, dispatch) => {
  axios.post(`${API_URL}/api/campaign/update`, campaign)
    .then( campaigndata =>{
        dispatch({
          type: CAMPAIGN_UPDATED
        })
    })
    .catch( error => {
        console.log(error);
    });
}


export const get_campaigns = (username, dispatch) => {
  axios.get(`${API_URL}/api/campaign/list/${username}`)
    .then( campaigndata =>{

        dispatch({
          type: GET_CAMPAIGNS,
          campaigns: campaigndata.data
        })
    })
    .catch( error => {
        console.log(error);
    });
}
