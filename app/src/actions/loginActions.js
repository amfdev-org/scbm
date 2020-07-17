import { initialState } from '../store/configureStore';
import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

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
                scUsername: json.userData.scUsername
              })
  return json;
}



export function handleLogoutSubmit(event) {
    
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
    //console.log('doLogout')
    if (json.logoutSuccess) {
        dispatch({
                type: LOGOUT_SUCCESS,
                initialState: initialState[0]
              })
    } else {
        throw Error("Logout error");
    }
    
  return json;
}

/*
export function fetchAuth() {
  //console.log('fetch auth');
  return dispatch => {
    //dispatch(requestAuth())
    return fetch('https://scbm.amfdev.co.uk/api/auth2/', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
      })
      .then(response => catchAuthHttpError(response, dispatch))
      .then(response => response.json())
      .then(json => catchAuthSessionError(json, dispatch))
      .then(json => catchAuthCookieError(json, dispatch))
      .then(json => doAuthSuccess(json, dispatch))
      .catch(error => console.log(error));
  }

}

*/

/*
handleLoginChange = (event) => {

      this.setState({showErrorAlert: false});
      
      const { name, value } = event.target
  
      this.setState({[name]: value},()=> {
        //console.log(this.state);
        
          if (this.state.scUsername.length > 0 && this.state.scPassword.length > 0) {
            this.setState({enableLoginSubmitButton: true}, () => {   
              //console.log(this.state);
            })
          } else {
             this.setState({enableLoginSubmitButton: false}, () => {   
              //console.log(this.state);
            })
          }
          
      });
                  
  }
  
  
    handleLoginSubmit = () => {

        this.setState({ showLoginSubmitButton: false })
        this.setState({ showLoginSubmitButton: false })
        this.setState({ showLoginSubmitLoadingButton: true })
        
        this.setState({showInfoAlert: false});
        this.setState({showErrorAlert: false});
                       
              
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({scUsername: this.state.scUsername,
                                 scPassword: this.state.scPassword,
                                 })
        };
        fetch('https://scbm.amfdev.co.uk/api/login/', requestOptions)
              .then(async response => {
                
                if (!response.ok) {
                   //throw Error(response.statusText);
                    this.setState({errorAlertText: "Something went wrong. Please try again later."});
                    this.setState({showErrorAlert: true}); 
                }
                
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                // check for error response
                if (!jsonResponse.userFound) {
                  
                      this.setState({errorAlertText: 'User not found. Please try again, or '});
                      this.setState({errorAlertLinkText: 'sign up instead?'});
                      this.setState({showInfoAlert: false});
                      this.setState({showSuccessAlert: false});
                      this.setState({showErrorAlert: true});
                      this.setState({showLoginSubmitButton: true});
                      this.setState({showLoginSubmitLoadingButton: false});
                      
                } else if (!jsonResponse.scCookiesValid) {
                  
                      this.setState({showLoginForm: false});
                      this.setState({errorAlertText: "Credentials invalid. Please contact support." });
                      this.setState({showErrorAlert: true});
                      this.setState({errorAlertLinkText: ''});
                      this.setState({showInfoAlert: false});
                          
                } else {
                  
                      this.setState({showErrorAlert: false});
                      this.setState({showLoginForm: false});
                      this.setState({showCommentersSearchForm: true});
                      this.setState({showLogoutSubmitButton: true});
  
                      this.setState({showLoggedInInfo: true});
                      this.setState({loggedInInfoText: "Logged in as " + jsonResponse.userData.scUsername});
                      this.setState({showLogoutSubmitButton: true});
                      
                      this.setState({showInfoAlert: false});
                      this.setState({showErrorAlert: false});
                       
                      this.setState({successAlertText: "You're now logged in!" });
                  
                        this.setState({showSuccessAlert: true},()=>{
                        window.setTimeout(()=>{
                          this.setState({showSuccessAlert: false})
                        },2000)
                      });
                          
                }
            
        
            })
            .catch(error => {
                //this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
                        
            });
              
                
  }*/