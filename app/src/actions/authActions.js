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

import {
  fetchRecentCommentersSearches
  } from '../actions/commentersSearchActions'

import {
  fetchRecentFollowersSearches
  } from '../actions/followersSearchActions'
  
const API_URL = process.env.REACT_APP_API_URL;

export function fetchAuth(dispatch) {
    //dispatch(requestAuth())
    
    //console.log('fetchAuth')
      
      axios.get(API_URL + '/auth/', { headers: { "X-Request-App": "scbm" } })
      .then(json => catchAuthSessionError(json.data, dispatch))
      .then(json => catchAuthCookieError(json, dispatch))
      .then(json => doAuthSuccess(json, dispatch))
      .then(json => fetchReceivedMessages(false, dispatch))
      .then(json => fetchSentMessages(dispatch))
      .then(json => fetchMyFollowers(dispatch))
      .then(json => fetchRecentCommentersSearches(dispatch))
      .then(json => fetchRecentFollowersSearches(dispatch))
      .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "AUTH_UNKNOWN_ERROR"
                      })  
                }
      });
  
}



function catchAuthSessionError(json, dispatch) {
  //console.log(json)
    //console.log('catchAuthSessionError')

    if (!json.sessionValid) {
        
          dispatch({
                type: "AUTH_SESSION_ERROR"
              });
          
        throw Error(json.authError);
    }
    
  return json;
}

function catchAuthCookieError(json, dispatch) {
   //console.log('catchAuthCookieError')
    if (!json.scCookiesValid) {
           dispatch({
                type: "AUTH_COOKIE_ERROR"
              });
        throw Error(json.authError);
    }
    
  return json;
}


function doAuthSuccess(json, dispatch) {
  //console.log("authActions doAuthSuccess - JSON.parse(json.userData.userSettings): ")
  //console.log(JSON.parse(json.userData.userSettings))
    if (json.authSuccess) {
        dispatch({
          type: "AUTH_SUCCESS",
          userData: json.userData,
          userSettings: JSON.parse(json.userData.userSettings)
        })
            
    }
    
  return json;
}