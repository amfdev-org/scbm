import axios from 'axios';

import { initialState } from '../store/configureStore';
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
  
  
export const LOGIN_HTTP_ERROR = 'LOGIN_HTTP_ERROR'
export const LOGIN_USERNAME_CHANGE = 'LOGIN_USERNAME_CHANGE'
export const LOGIN_PASSWORD_CHANGE = 'LOGIN_PASSWORD_CHANGE'
export const LOGIN_SUBMIT_ENABLE = 'LOGIN_SUBMIT_ENABLE'
export const LOGIN_SUBMIT_DISABLE = 'LOGIN_SUBMIT_DISABLE'
export const LOGIN_USER_NOT_FOUND_ERROR = 'LOGIN_USER_NOT_FOUND_ERROR'
export const LOGIN_COOKIE_ERROR = 'LOGIN_COOKIE_ERROR'
export const LOGIN_UNKNOWN_ERROR = 'LOGIN_UNKNOWN_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGIN_SWITCH_TO_SIGNUP = 'LOGIN_SWITCH_TO_SIGNUP'
export const LOGIN_SUBMITTED = 'LOGIN_SUBMITTED'


export function handleLoginChange(event) {
    
    return (dispatch, getState) => {
        
        const { name, value } = event.target
        
        if (name === 'scUsername') {
            dispatch({
                type: LOGIN_USERNAME_CHANGE,
                scUsername: value
            })
        } else  if (name === 'scPassword') {
            dispatch({
                type: LOGIN_PASSWORD_CHANGE,
                scPassword: value
            })
        }
        
        if(getState().scUsername && getState().scUsername.length > 0 && getState().scPassword && getState().scPassword.length > 0) {
            dispatch({
                type: LOGIN_SUBMIT_ENABLE
          })
        } else {
            dispatch({
                type: LOGIN_SUBMIT_DISABLE
          })
        }

          
    }
    
}


export function handleLoginSubmit(event) {
    
    return (dispatch, getState) => {

        dispatch({type: LOGIN_SUBMITTED});
        
        axios({
            method: 'post',
            url: 'https://scbm.amfdev.co.uk/api/login/',
            headers: {}, 
            data: {
              scUsername: getState().scUsername,
              scPassword: getState().scPassword
            }
            })
            .then(json => catchLoginUserNotFoundError(json.data, dispatch))
            .then(json => catchLoginCookieError(json, dispatch))
            .then(json => doLoginSuccess(json, dispatch))
            .then(json => dispatch(fetchReceivedMessages()))
            .then(json => dispatch(fetchSentMessages()))
            .then(json => dispatch(fetchMyFollowers()))
            .then(json => dispatch(fetchRecentCommentersSearches()))
            .then(json => dispatch(fetchRecentFollowersSearches()))
             .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: LOGIN_UNKNOWN_ERROR
                      })  
                }
              });
                  
    }
    
}


export function handleLoginSwitchToSignup(event) {
    
     return (dispatch) => {
        
        dispatch({
                type: LOGIN_SWITCH_TO_SIGNUP
        })
        
     }
  
}
  
  
function catchLoginUserNotFoundError(json, dispatch) {
    //console.log('catchLoginUserNotFound')
    if (!json.userFound) {
        dispatch({
                type: LOGIN_USER_NOT_FOUND_ERROR
              })
        throw Error(json.loginError);
    }
    
  return json;
}


function catchLoginCookieError(json, dispatch) {
    //console.log('catchLoginCookieError')
    if (!json.scCookiesValid) {
        dispatch({
                type: LOGIN_COOKIE_ERROR
              })
        throw Error(json.loginError);
    }
    
  return json;
}


function doLoginSuccess(json, dispatch) {
    //console.log('doLoginSuccess')
 
        dispatch({
                type: LOGIN_SUCCESS,
                userData: json.userData,
                userSettings: JSON.parse(json.userData.userSettings)
              })
  return json;
}


export function handleLogoutSubmit(event) {
    
    console.log('logout')
    return (dispatch, getState) => {

        axios({
            method: 'get',
            url: 'https://scbm.amfdev.co.uk/api/logout/'
            })
            .then(json => doLogout(json.data, dispatch))
            .then(json => dispatch(fetchAuth()))
             .catch(error => console.log(error));   
    }
    
}


function doLogout(json, dispatch) {
  
    if (json.logoutSuccess) {
        dispatch({
                type: LOGOUT_SUCCESS,
                initialState: initialState
              })
    } else {
        throw Error("Logout error");
    }
    
  return json;
}
