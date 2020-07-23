import axios from 'axios';

import {
  fetchMyFollowers
  } from '../actions/myFollowersSearchActions'
  
export const SIGNUP_USERNAME_CHANGE = 'SIGNUP_USERNAME_CHANGE'
export const SIGNUP_PASSWORD_CHANGE = 'SIGNUP_PASSWORD_CHANGE'
export const SIGNUP_SUBMIT_ENABLE = 'SIGNUP_SUBMIT_ENABLE'
export const SIGNUP_SUBMIT_DISABLE = 'SIGNUP_SUBMIT_DISABLE'
export const SIGNUP_SUBMITTED = 'SIGNUP_SUBMITTED'
export const SIGNUP_SC_LOGIN_ERROR = 'SIGNUP_SC_LOGIN_ERROR'
export const SIGNUP_COOKIE_ERROR = 'SIGNUP_COOKIE_ERROR'
export const SIGNUP_UNKNOWN_ERROR = 'SIGNUP_UNKNOWN_ERROR'
export const SIGNUP_USER_CREATED_ERROR = 'SIGNUP_USER_CREATED_ERROR'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'


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
            .then(json => catchSignupScLoginError(json.data, dispatch))
            .then(json => catchSignupCookieError(json, dispatch))
            .then(json => catchSignupUserCreatedError(json, dispatch))
            .then(json => doSignupSuccess(json, dispatch))
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


//res.send(JSON.stringify({ signupSuccess: false, scLoginSuccess: true, scCookiesValid: true, userCreated: true, signupError: null, userData: data}));

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


  /*

handleSignupChange = (event) => {

      this.setState({showErrorAlert: false});
      
      const { name, value } = event.target
  
      this.setState({[name]: value},()=> {
        //console.log(this.state);
        
          if (this.state.scUsername.length > 0 && this.state.scPassword.length > 0) {
            this.setState({enableSignupSubmitButton: true}, () => {   
              //console.log(this.state);
            })
          } else {
             this.setState({enableSignupSubmitButton: false}, () => {   
              //console.log(this.state);
            })
          }
          
      });
                  
  }
  
  
  

    handleSignupSubmit = () => {

        this.setState({ showErrorAlert: false })
        this.setState({ showSuccessAlert: false })
        this.setState({ showInfoAlert: false })
        this.setState({ showSignupSubmitButton: false })
        this.setState({ showSignupSubmitLoadingButton: true })
        this.setState({ enableSignupFormInputs: false })
              
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({scUsername: this.state.scUsername,
                                 scPassword: this.state.scPassword})
        };
        fetch('https://scbm.amfdev.co.uk/api/signup/', requestOptions)
              .then(async response => {
                
                if (!response.ok) {
                   //throw Error(response.statusText);
                    this.setState({errorAlertText: "Something went wrong. Please try again later."});
                    this.setState({errorAlertLink: ''});
                     this.setState({errorAlertLinkText: ''});
                    this.setState({showErrorAlert: true}); 
                    this.setState({showErrorAlert: true});
            
                }
                
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                // check for error response
                    
                if (jsonResponse.signupSuccess) {
                  
                        this.setState({showErrorAlert: false});
                        this.setState({showSignupForm: false});
                        this.setState({showCommentersSearchForm: true});
                        this.setState({showLogoutSubmitButton: true});
    
                        this.setState({showLoggedInInfo: true});
                        this.setState({loggedInInfoText: "Logged in as " + jsonResponse.userData.scUsername});
                        this.setState({showLogoutSubmitButton: true});
                        
                        this.setState({showInfoAlert: false});
                        this.setState({showErrorAlert: false});
                         
                        this.setState({successAlertText: "You're now logged in!" });
                    
                          this.setState({showSuccessAlert: true}, () => {
                          window.setTimeout(()=>{
                            this.setState({showSuccessAlert: false})
                          },4000)
                        });
                          
                } else if (!jsonResponse.signupSuccess ) {
                  
                        if (jsonResponse.scCookiesValid === false) {
                          
                              this.setState({showLoginForm: false});
                              this.setState({errorAlertText: "Credentials invalid. Please contact support." });
                              this.setState({errorAlertLinkText: ''})
                              this.setState({showErrorAlert: true});
                              
                        } else {
                            
                            this.setState({errorAlertText: 'Something went wrong. Are you sure those details are correct?'});
                            this.setState({errorAlertLinkText: ''})
                            this.setState({showInfoAlert: false});
                            this.setState({showSuccessAlert: false});
                            this.setState({showErrorAlert: true});
                            
                            this.setState({ showSignupSubmitButton: true });
                            this.setState({ showSignupSubmitLoadingButton: false });
                            
                            this.setState({ enableSignupFormInputs: true })
                      
                        }

                }
            
        
            })
            .catch(error => {
                //this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
                this.setState({ showSignupSubmitButton: true })
                this.setState({ showSignupSubmitLoadingButton: false })
                        
            });
            */