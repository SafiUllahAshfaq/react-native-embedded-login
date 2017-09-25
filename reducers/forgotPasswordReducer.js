import {
  FORGOT_PASSWORD_EMAIL_CHANGED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_CLEANUP
} from '../actions/forgot/forgotTypes';

const INITIAL_STATE = {
  email: '',
  error: '',
  loading: false,
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case FORGOT_PASSWORD_CLEANUP:
      return { ...state, ...INITIAL_STATE };
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: '', message: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, ...INITIAL_STATE, message: 'Email sent. Please check your inbox.' };
    case FORGOT_PASSWORD_FAIL:
      return { ...state, error: action.error || 'Forgot Password Failed', email: '', loading: false, message: '' };
    default:
      return state;
  }
};
