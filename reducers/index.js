import { combineReducers } from 'redux';
import forgotPasswordReducer from './forgotPasswordReducer';
import changePasswordReducer from './changePasswordReducer';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  forgot: forgotPasswordReducer,
  password: changePasswordReducer,
});
