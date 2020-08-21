import axios from 'axios';

import { fetchAuth } from '../actions/authActions'

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

export function handleLoginChange(event, context) {
  
        const dispatch = context.dispatch;
        const state = context.state;
        
        //console.log('actions handleLoginChange:')

        const { name, value } = event.target
        
        if (name === 'scUsername') {
          console.log('scUsername dispatch '+value)
            dispatch({
                type: "LOGIN_USERNAME_CHANGE",
                scUsername: value
            })
            
            
        } else  if (name === 'scPassword') {
          //console.log('scPassword dispatch '+value)
            dispatch({
                type: "LOGIN_PASSWORD_CHANGE",
                scPassword: value
            })
        }
        
        if(state.scUsername && state.scUsername.length > 0 && state.scPassword && state.scPassword.length > 0) {
            dispatch({
                type: "LOGIN_SUBMIT_ENABLE"
          })
        } else {
            dispatch({
                type: "LOGIN_SUBMIT_DISABLE"
          })
        }

}



export function handleLoginSubmit(context) {
  
        //console.log('actions handleLoginSubmit')
        
        const dispatch = context.dispatch;
        const state = context.state;
               
        //console.log(state.scUsername);
         //console.log(state.scPassword);
        dispatch({type: "LOGIN_SUBMITTED"});
        
        axios({
            method: 'post',
            url: API_URL + '/login/',
            headers: {}, 
            data: {
              scUsername: state.scUsername,
              scPassword: state.scPassword
            }
            })
            .then(json => catchLoginUserNotFoundError(json.data, dispatch))
            .then(json => catchLoginCookieError(json, dispatch))
            .then(json => doLoginSuccess(json, dispatch))
            .then(json => fetchReceivedMessages(false, dispatch))
            .then(json => fetchSentMessages(dispatch))
            .then(json => fetchMyFollowers(dispatch))
            .then(json => fetchRecentCommentersSearches(dispatch))
            .then(json => fetchRecentFollowersSearches(dispatch))
             .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "LOGIN_UNKNOWN_ERROR"
                      })  
                }
              });
                  
    
}


export function handleLoginSwitchToSignup(dispatch) {     
        dispatch({
                type: "LOGIN_SWITCH_TO_SIGNUP"
        });  
}
  
  
function catchLoginUserNotFoundError(json, dispatch) {
    //console.log('catchLoginUserNotFound')
    if (!json.userFound) {
        dispatch({
                type: "LOGIN_USER_NOT_FOUND_ERROR"
              })
        throw Error(json.loginError);
    }
    
  return json;
}


function catchLoginCookieError(json, dispatch) {
    //console.log('catchLoginCookieError')
    if (!json.scCookiesValid) {
        dispatch({
                type: "LOGIN_COOKIE_ERROR"
              })
        throw Error(json.loginError);
    }
    
  return json;
}


function doLoginSuccess(json, dispatch) {
    //console.log('doLoginSuccess')
        dispatch({
                type: "LOGIN_SUCCESS",
                userData: json.userData,
                userSettings: JSON.parse(json.userData.userSettings)
              })
  return json;
}


export function handleLogoutSubmit(context) {
    
    const dispatch = context.dispatch;
        
    //console.log('logout')

        axios({
            method: 'get',
            url: API_URL + '/logout/'
            })
            .then(json => doLogout(json.data, context))
            .then(json => fetchAuth(dispatch))
             .catch(error => console.log(error));   
    
}


function doLogout(json, context) {
  
    const dispatch = context.dispatch;
    const initialState = context.initialState;
    
    if (json.logoutSuccess) {
        dispatch({
                type: "LOGOUT_SUCCESS",
                initialState: initialState
              })
    } else {
        throw Error("Logout error");
    }
    
  return json;
}
