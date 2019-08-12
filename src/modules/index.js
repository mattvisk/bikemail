import { combineReducers } from 'redux'
import user from './user'
import mail from './mail'

export default combineReducers({
  user,
  mail
})
