import {
  SIGNIN_EMAIL_CHANGED,
  SIGNIN_PASSWORD_CHANGED,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNIN,
  SIGNIN_CLEARDOWN
} from '../actions/auth/authTypes';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  loading: false,
  access_token: '',
  expiresIn: '',
  idToken: '',
  accessToken: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNIN_CLEARDOWN:
      return { ...state, ...INITIAL_STATE };
    case SIGNIN_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case SIGNIN_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case SIGNIN:
      return { ...state, loading: true, error: '' };
    case SIGNIN_SUCCESS:
      const { idToken, accessToken, expiresIn } = action.payload;
      return { ...state, ...INITIAL_STATE, idToken, accessToken, expiresIn };
    case SIGNIN_FAIL:
      return { ...state, error: action.error || 'Authentication Failed', password: '', loading: false };
    default:
      return state;
  }
}
