import axios from 'axios';
  
import {
  fetchMyFollowers
  } from '../actions/myFollowersSearchActions'

import {
  fetchReceivedMessages
  } from '../actions/receivedMessagesSearchActions'
    
import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'
  
export const AUTH_HTTP_ERROR = 'AUTH_HTTP_ERROR'
export const AUTH_SESSION_ERROR = 'AUTH_SESSION_ERROR'
export const AUTH_COOKIE_ERROR = 'AUTH_COOKIE_ERROR'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_UNKNOWN_ERROR = 'AUTH_UNKNOWN_ERROR'


export function fetchAuth() {

  return dispatch => {
    //dispatch(requestAuth())
    
      axios.get('https://scbm.amfdev.co.uk/api/auth/', { headers: { "X-Request-App": "scbm" } })
      .then(json => catchAuthSessionError(json.data, dispatch))
      .then(json => catchAuthCookieError(json, dispatch))
      .then(json => doAuthSuccess(json, dispatch))
      .then(json => dispatch(fetchReceivedMessages()))
      .then(json => dispatch(fetchSentMessages()))
      .then(json => dispatch(fetchMyFollowers()))
      .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: AUTH_UNKNOWN_ERROR
                      })  
                }
      });
  }

}


function catchAuthSessionError(json, dispatch) {
    //console.log('catchAuthSessionError')
    if (!json.sessionValid) {
        
          dispatch({
                type: AUTH_SESSION_ERROR
              });
          
        throw Error(json.authError);
    }
    
  return json;
}

function catchAuthCookieError(json, dispatch) {
   //console.log('catchAuthCookieError')
    if (!json.scCookiesValid) {
           dispatch({
                type: AUTH_COOKIE_ERROR
              });
        throw Error(json.authError);
    }
    
  return json;
}


function doAuthSuccess(json, dispatch) {
   //console.log('authSuccess')
    if (json.authSuccess) {
        dispatch({
          type: AUTH_SUCCESS,
          userData: json.userData
        })
        
        fetchMyFollowers()
            
    }
    
  return json;
}
