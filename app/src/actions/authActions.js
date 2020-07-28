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




/*
 //console.log('do auth');
    fetch('https://scbm.amfdev.co.uk/api/auth/', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    })
    .then(async response => {
    
            if (!response.ok) {
                 //throw Error(response.statusText);
                  this.setState({errorAlertText: "Something went wrong. Please try again later."});
                  this.setState({showErrorAlert: true}); 
             }
        
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            // check for error response
            if (jsonResponse.errorMessage) {
                // get error message from body or default to response status
                //const error = (commenterData && commenterData.message) || response.status;
                console.log(jsonResponse.errorMessage);
                return Promise.reject(jsonResponse.errorMessage);
                
            } else {
              
                if (jsonResponse.authResult === true) {
                    
                    this.setState({showCommentersSearchForm: true});
                    
                    this.setState({showLoggedInInfo: true});
                    this.setState({showLogoutSubmitButton: true});
                    this.setState({loggedInInfoText: jsonResponse.userData.scUsername});
                         
                    this.setState({successAlertText: "We logged you in!" });
                    
                        this.setState({showSuccessAlert: true},()=>{
                          window.setTimeout(()=>{
                            this.setState({showSuccessAlert: false})
                          },2000)
                        });
                                     
                } else {
                       
                        if (jsonResponse.scCookiesValid === false) {
                          
                              this.setState({showLoginForm: false});
                              this.setState({errorAlertText: "Credentials invalid. Please contact support." });
                              this.setState({showErrorAlert: true});
                              
                        } else {
                          
                              this.setState({showLoginForm: true});
                        
                              this.setState({infoAlertTextHeading: "Welcome" });
                              this.setState({infoAlertText: "Please log in." });
                        
                              this.setState({showInfoAlert: true});
                      
                        }                  
                  
                          
                }
    
            }
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);

        });
        
        */