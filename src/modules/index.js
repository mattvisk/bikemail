import { combineReducers } from 'redux'
import user from './user'
import mail from './mail'
import recipient from './recipient'
import recipient_props from './recipient_props'

export default combineReducers({
  user,
  mail,
  recipient,
  recipient_props
})
