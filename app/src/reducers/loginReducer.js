import {
  LOGIN_USERNAME_CHANGE,
  LOGIN_PASSWORD_CHANGE,
  LOGIN_SUBMIT_ENABLE,
  LOGIN_SUBMIT_DISABLE,
  LOGIN_USER_NOT_FOUND_ERROR,
  LOGIN_COOKIE_ERROR,
  LOGIN_UNKNOWN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_SWITCH_TO_SIGNUP
} from '../actions/loginActions';


export default function loginReducer(state, action) {
  
  switch(action.type) {

    case LOGIN_USERNAME_CHANGE:

      return {
        
        ...state,
        scUsername: action.scUsername
      };
    
    case LOGIN_PASSWORD_CHANGE:

      return {
        ...state,
        scPassword: action.scPassword
      };
    
    case LOGIN_SUBMIT_ENABLE:

      return {
        ...state,
        enableLoginSubmitButton: true
      };
      
    case LOGIN_SUBMIT_DISABLE:
      return {
        ...state,
        enableLoginSubmitButton: false
      };
      
    case LOGIN_USER_NOT_FOUND_ERROR:
         console.log('reducer user not found error')
      return {
        ...state,
            errorAlertText: 'User not found. Please try again, or ',
            errorAlertLinkText: 'sign up instead?',
            showInfoAlert: false,
            showSuccessAlert: false,
            showErrorAlert: true,
            showLoginSubmitButton: true,
            showLoginSubmitLoadingButton: false
      };
      
            
    case LOGIN_COOKIE_ERROR:
      return {
        ...state,
            showLoginForm: false,
            errorAlertText: "Credentials invalid. Please contact support.",
            showErrorAlert: true,
            errorAlertLinkText: '',
            showInfoAlert: false             
      };
    
    case LOGIN_UNKNOWN_ERROR:
      console.log('reducer login unkown error')
      return {
        ...state,
        showInfoAlert: false,
        errorAlertText: "HTTP or unknown error. Please try again later.",
        showErrorAlert: true  
      };

      
    case LOGIN_SUCCESS:
    //console.log('login success reducer');
      return {
        ...state,
            showErrorAlert: false,
            showLoginForm: false,
            showLogoutSubmitButton: true,
            showLoggedInInfo: true,
            loggedInInfoText: "Logged in as " + action.scUsername, 
            showInfoAlert: false,
            showMainAccordion: true,
            showCommentersSearchForm: true,
            showCommentersSearchSubmitButton: true,
            enableCommentersSearchSubmitButton: true, 
            enableCommentersSearchInput: true
            
      };
    
    
    case LOGIN_SWITCH_TO_SIGNUP:
    //console.log('login success reducer');
      return {
        ...state,
            showLoginForm: false,
            showSignupForm: true,
            enableSignupFormInputs: true,
            showSignupSubmitButton: true,
            enableSignupSubmitButton: true,
            showErrorAlert: false,
            infoAlertTextHeading: "OK then!",
            infoAlertText: "Please sign up below.",
            showInfoAlert: true

      };
          
        
    case LOGOUT_SUCCESS:
    //console.log('login success reducer');
      return action.initialState;
    
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

