import axios from "axios";
import * as EmailValidator from 'email-validator';
import {
  FORGOT_PASSWORD_EMAIL_CHANGED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_CLEANUP
} from './forgotTypes';
import params from '../../auth0-params.json';

export const emailChanged = (text) => {
  return {type: FORGOT_PASSWORD_EMAIL_CHANGED, payload: text};
};

export const cleanup = () => {
  return { type: FORGOT_PASSWORD_CLEANUP };
}

export const forgotPassword = ({ email }) => {

  if (!EmailValidator.validate(email)) {
    console.log("Illegal email");
    return {
      type: FORGOT_PASSWORD_FAIL,
      error: 'Illegal email'
    }
  }

  return (dispatch) => {

    dispatch({type: FORGOT_PASSWORD});

    console.log(`sending password reset for: ${email}`);

    const bodyParams = {
      client_id: params.clientId,
      email: email,
      connection: params.realm
    };

    fetch(`https://${params.domain}/dbconnections/change_password`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyParams)
    })
      // .then(apiUtils.checkStatus)
      .then((response) => response.text())
      .then(responseText => {
        console.log('responseText', responseText);
        if (`We've just sent you an email to reset your password.` !== responseText) {
          console.log("forgot password failure");
          return dispatch({
            type: FORGOT_PASSWORD_FAIL,
            error: 'Error sending password reset email'
          });
        }
        console.log("forgot password success");
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: responseText
        });
      })
      .catch(error => {
        console.log("forgot password failure");
        console.error(error);
        const errorMsg = 'Error sending password reset email';
        dispatch({
          type: FORGOT_PASSWORD_FAIL,
          error: 'Error sending password reset email'
        });
      });

  };

};
