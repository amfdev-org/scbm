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

import {
  fetchRecentCommentersSearches
  } from '../actions/commentersSearchActions'

import {
  fetchRecentFollowersSearches
  } from '../actions/followersSearchActions'
  
const API_URL = process.env.REACT_APP_API_URL;

export function handleSignupChange(event, context) {
        
        const dispatch = context.dispatch;
        const state = context.state;
        
        const { name, value } = event.target
        
        if (name === 'scUsername') {
            dispatch({
                type: "SIGNUP_USERNAME_CHANGE",
                scUsername: value
            })
        } else  if (name === 'scPassword') {
            dispatch({
                type: "SIGNUP_PASSWORD_CHANGE",
                scPassword: value
            })
        }
        
        if(state.scUsername && state.scUsername.length > 0 && state.scPassword && state.scPassword.length > 0) {
            dispatch({
                type: "SIGNUP_SUBMIT_ENABLE"
          })
        } else {
            dispatch({
                type: "SIGNUP_SUBMIT_DISABLE"
          })
        }

          

}


export function handleSignupSubmit(event, context) {

    const dispatch = context.dispatch;
    const state = context.state;
        
    dispatch({
         type: "SIGNUP_SUBMITTED"
       });
           
        axios({
            method: 'post',
            url: API_URL + '/signup/',
            headers: {
                "X-Request-App": "scbm"
                },
            data: {
              scUsername: state.scUsername,
              scPassword: state.scPassword
            }
            })
            .then(json => catchSignupUserAlreadyExists(json.data, dispatch))
            .then(json => catchSignupScLoginError(json, dispatch))
            .then(json => catchSignupCookieError(json, dispatch))
            .then(json => catchSignupUserCreatedError(json, dispatch))
            .then(json => doSignupSuccess(json, dispatch))
            .then(json => fetchReceivedMessages(false, dispatch))
            .then(json => fetchSentMessages(dispatch))
            .then(json => fetchMyFollowers(dispatch))
            .then(json => fetchRecentCommentersSearches(dispatch))
            .then(json => fetchRecentFollowersSearches(dispatch))
            .catch(error => {

                if (error.response) {   
                      context.dispatch({
                          type: "SIGNUP_UNKNOWN_ERROR"
                      })  
                }
            });
                  
    
}


function catchSignupUserAlreadyExists(json, dispatch) {
    //console.log('catchSignupScLoginError')
    //console.log(json)
    if (json.userAlreadyExists) {
        dispatch({
                type: "SIGNUP_USER_ALREADY_EXISTS"
              })
        throw Error(json.error);
    }
    
  return json;
}


function catchSignupScLoginError(json, dispatch) {
    //console.log('catchSignupScLoginError')
    if (!json.scLoginSuccess) {
        dispatch({
                type: "SIGNUP_SC_LOGIN_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function catchSignupCookieError(json, dispatch) {
    //console.log('catchSignupCookieError')
    if (!json.scCookiesValid) {
        dispatch({
                type: "SIGNUP_COOKIE_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function catchSignupUserCreatedError(json, dispatch) {
    //console.log('catchSignupUserCreatedError')
    if (!json.userCreated) {
        dispatch({
                type: "SIGNUP_USER_CREATED_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function doSignupSuccess(json, dispatch) {
    //console.log('doSignupSuccess')
        dispatch({
                type: "SIGNUP_SUCCESS",
                userData: json.userData,
                userSettings: JSON.parse(json.userData.userSettings)
              })
  return json;
}


export function handleSignupSwitchToLogin(dispatch) {

        dispatch({
                type: "SIGNUP_SWITCH_TO_LOGIN"
        })
        
  
}