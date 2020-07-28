import axios from 'axios';

import {
  fetchMyFollowers
  } from '../actions/myFollowersSearchActions'
 
import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'
  
import {
  fetchReceivedMessages
  } from '../actions/receivedMessagesSearchActions'
  
export const SIGNUP_USERNAME_CHANGE = 'SIGNUP_USERNAME_CHANGE'
export const SIGNUP_PASSWORD_CHANGE = 'SIGNUP_PASSWORD_CHANGE'
export const SIGNUP_SUBMIT_ENABLE = 'SIGNUP_SUBMIT_ENABLE'
export const SIGNUP_SUBMIT_DISABLE = 'SIGNUP_SUBMIT_DISABLE'
export const SIGNUP_SUBMITTED = 'SIGNUP_SUBMITTED'
export const SIGNUP_SC_LOGIN_ERROR = 'SIGNUP_SC_LOGIN_ERROR'
export const SIGNUP_COOKIE_ERROR = 'SIGNUP_COOKIE_ERROR'
export const SIGNUP_UNKNOWN_ERROR = 'SIGNUP_UNKNOWN_ERROR'
export const SIGNUP_USER_CREATED_ERROR = 'SIGNUP_USER_CREATED_ERROR'
export const SIGNUP_USER_ALREADY_EXISTS = 'SIGNUP_USER_ALREADY_EXISTS'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_SWITCH_TO_LOGIN = 'SIGNUP_SWITCH_TO_LOGIN'

export function handleSignupChange(event) {
    
    return (dispatch, getState) => {
        
        const { name, value } = event.target
        
        if (name === 'scUsername') {
            dispatch({
                type: SIGNUP_USERNAME_CHANGE,
                scUsername: value
            })
        } else  if (name === 'scPassword') {
            dispatch({
                type: SIGNUP_PASSWORD_CHANGE,
                scPassword: value
            })
        }
        
        if(getState().scUsername && getState().scUsername.length > 0 && getState().scPassword && getState().scPassword.length > 0) {
            dispatch({
                type: SIGNUP_SUBMIT_ENABLE
          })
        } else {
            dispatch({
                type: SIGNUP_SUBMIT_DISABLE
          })
        }

          
    }
    
}


export function handleSignupSubmit(event) {
    
    return (dispatch, getState) => {

    dispatch({
         type: SIGNUP_SUBMITTED
       });
           
        axios({
            method: 'post',
            url: 'https://scbm.amfdev.co.uk/api/signup/',
            headers: {
                "X-Request-App": "scbm"
                },
            data: {
              scUsername: getState().scUsername,
              scPassword: getState().scPassword
            }
            })
            .then(json => catchSignupUserAlreadyExists(json.data, dispatch))
            .then(json => catchSignupScLoginError(json, dispatch))
            .then(json => catchSignupCookieError(json, dispatch))
            .then(json => catchSignupUserCreatedError(json, dispatch))
            .then(json => doSignupSuccess(json, dispatch))
            .then(json => dispatch(fetchReceivedMessages()))
            .then(json => dispatch(fetchSentMessages()))
            .then(json => dispatch(fetchMyFollowers()))
            .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: SIGNUP_UNKNOWN_ERROR
                      })  
                }
            });
                  
    }
    
}


function catchSignupUserAlreadyExists(json, dispatch) {
    console.log('catchSignupScLoginError')
    console.log(json)
    if (json.userAlreadyExists) {
        dispatch({
                type: SIGNUP_USER_ALREADY_EXISTS
              })
        throw Error(json.error);
    }
    
  return json;
}


function catchSignupScLoginError(json, dispatch) {
    //console.log('catchSignupScLoginError')
    if (!json.scLoginSuccess) {
        dispatch({
                type: SIGNUP_SC_LOGIN_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function catchSignupCookieError(json, dispatch) {
    //console.log('catchSignupCookieError')
    if (!json.scCookiesValid) {
        dispatch({
                type: SIGNUP_COOKIE_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function catchSignupUserCreatedError(json, dispatch) {
    //console.log('catchSignupUserCreatedError')
    if (!json.userCreated) {
        dispatch({
                type: SIGNUP_USER_CREATED_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doSignupSuccess(json, dispatch) {
    //console.log('doSignupSuccess')
        dispatch({
                type: SIGNUP_SUCCESS,
                userData: json.userData
              })
  return json;
}


export function handleSignupSwitchToLogin(event) {
    console.log(event)
     return (dispatch) => {
        
        dispatch({
                type: SIGNUP_SWITCH_TO_LOGIN
        })
        
     }
  
}