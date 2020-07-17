import {
  AUTH_SESSION_ERROR,
  AUTH_COOKIE_ERROR,
  AUTH_SUCCESS,
  AUTH_UNKNOWN_ERROR
} from '../actions/authActions';

/*const initialState = {
  authErrorMessage: null,
  errorAlertText: null,
  showErrorAlert: false
};*/


export default function authReducer(state, action) {
  
  switch(action.type) {

    case AUTH_UNKNOWN_ERROR:
      
      return {
        ...state,
        showInfoAlert: false,
        errorAlertText: "HTTP or unknown error. Please try again later.",
        showErrorAlert: true   
      };

    case AUTH_SESSION_ERROR:

      return {
        ...state,
        errorAlertText: "",
        showErrorAlert: false,
        showLoginForm: true,
        showLoginSubmitButton: true,
        infoAlertTextHeading: "Welcome",
        infoAlertText: "Please log in.",
        enableLoginSubmitButton: true,
        showInfoAlert: true                        
                              
      };
      
    case AUTH_COOKIE_ERROR:

      return {
        ...state,
        errorAlertText: "Auth cookie error. Please contact support.",
        showErrorAlert: true
      };
      
      case AUTH_SUCCESS:

      return {
        ...state,
        errorAlertText: null,
        showErrorAlert: false,            
        showLoggedInInfo: true,
        showLogoutSubmitButton: true,
        loggedInInfoText: "Logged in as " + action.scUsername,
        showMainAccordion: true,
        showCommentersSearchForm: true,
        showCommentersSearchSubmitButton: true,
        enableCommentersSearchSubmitButton: false, 
        enableCommentersSearchInput: true
                    
      };
      
      
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

