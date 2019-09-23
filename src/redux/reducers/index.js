import { combineReducers } from 'redux'
import global from './global';
import loginPage from './loginPage';
import registerPage from './registerPage';

export default combineReducers({
  global,
  loginPage,
  registerPage
})