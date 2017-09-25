import {
  CHANGE_PASSWORD_PASSWORD_CHANGED,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_CLEANUP
} from '../actions/password/passwordTypes';

const INITIAL_STATE = {
  password: '',
  error: '',
  loading: false,
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case CHANGE_PASSWORD:
      return { ...state, loading: true, error: '', message: '' };
    case CHANGE_PASSWORD_CLEANUP:
      return { ...state, ...INITIAL_STATE };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, ...INITIAL_STATE, message: 'Password successfully updated.' };
    case CHANGE_PASSWORD_FAIL:
      return { ...state, error: action.error || 'Change Password Failed', password: '', loading: false, message: '' };
    default:
      return state;
  }
};
