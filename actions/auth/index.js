import axios from "axios";
import {Actions} from 'react-native-router-flux';
import * as EmailValidator from 'email-validator';
import params from '../../auth0-params.json';

import {
  SIGNIN_EMAIL_CHANGED,
  SIGNIN_PASSWORD_CHANGED,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNIN,
  SIGNIN_CLEARDOWN
} from './authTypes';

import apiUtils from '../../utils/apiUtils'

export const cleardown = () => {
  return {type: SIGNIN_CLEARDOWN };
};

export const emailChanged = (text) => {
  return {type: SIGNIN_EMAIL_CHANGED, payload: text};
};

export const passwordChanged = (text) => {
  return {type: SIGNIN_PASSWORD_CHANGED, payload: text};
};

export const signin = ({ email, password}) => {

  if (!EmailValidator.validate(email)) {
    console.log("Illegal email");
    return {
      type: SIGNIN_FAIL,
      error: 'Illegal email'
    }
  }

  if (!password) {
    console.log("Illegal password");
    return {
      type: SIGNIN_FAIL,
      error: 'Illegal password'
    }
  }

  return (dispatch) => {

    dispatch({type: SIGNIN});

    const bodyParams = {
      client_id: params.clientId,
      grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
      username: email,
      password: password,
      realm: params.realm,
      audience: params.apiAudience,
      scope: params.scope
    };

    fetch(`https://${params.domain}/oauth/token`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyParams)
    })
      // .then(apiUtils.checkStatus)
      .then((response) => response.json())
      .then(responseJson => {
        console.log('responseJson', responseJson);
        if (responseJson.error) {
          return dispatch({
            type: SIGNIN_FAIL,
            error: responseJson.error_description || 'Authentication Failed'
          });
        }
        const { id_token, access_token, expires_in } = responseJson;

        Actions.main({type: 'reset'});
        return dispatch({
          type: SIGNIN_SUCCESS,
          payload: {
            idToken: id_token,
            accessToken: access_token,
            expiresIn: expires_in
          }
        });
      })
      .catch(err => {
        console.error(err);
        return dispatch({
          type: SIGNIN_FAIL,
          error: 'Authentication Failed'
        });
      });

  };

};