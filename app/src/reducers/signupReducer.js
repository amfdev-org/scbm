import {
    SIGNUP_USERNAME_CHANGE,
    SIGNUP_PASSWORD_CHANGE,
    SIGNUP_SUBMIT_ENABLE,
    SIGNUP_SUBMIT_DISABLE,
    SIGNUP_SUBMITTED,
    SIGNUP_SC_LOGIN_ERROR,
    SIGNUP_COOKIE_ERROR,
    SIGNUP_USER_CREATED_ERROR,
    SIGNUP_UNKNOWN_ERROR,
    SIGNUP_SUCCESS

} from '../actions/signupActions';


export default function signupReducer(state, action) {
  
  switch(action.type) {

    case SIGNUP_USERNAME_CHANGE:
      return {
        
        ...state,
        scUsername: action.scUsername
      };
    
    case SIGNUP_PASSWORD_CHANGE:
      return {
        ...state,
        scPassword: action.scPassword
      };
    
    case SIGNUP_SUBMIT_ENABLE:
      return {
        ...state,
        enableSignupSubmitButton: true
      };
      
    case SIGNUP_SUBMIT_DISABLE:
      return {
        ...state,
        enableSignupSubmitButton: false
      };
      
    case SIGNUP_SUBMITTED:
      return {
        ...state,
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        enableSignupSubmitButton: false,
        enableSignupFormInputs: false,
        showSignupSubmitButton: false,
        showSignupSubmitLoadingButton: true
      };
      
    case SIGNUP_SC_LOGIN_ERROR:
        //console.log("sc login error - reducer");
      return {
        ...state,
        errorAlertText: 'Something went wrong. Are you sure those details are correct?',
        errorAlertLinkText: '',
        showErrorAlert: true,
        
        showSignupSubmitButton: true,
        showSignupSubmitLoadingButton: false,
        enableSignupFormInputs: true,
        enableSignupSubmitButton: true
      };
      
    case SIGNUP_COOKIE_ERROR:
         //console.log("sc cookie error - reducer");
      return {
        ...state,
        errorAlertText: "Credentials invalid. Please contact support.",
        errorAlertLinkText: '',
        showErrorAlert: true,
        
        showSignupSubmitButton: true,
        showSignupSubmitLoadingButton: false,
        enableSignupFormInputs: true,
        enableSignupSubmitButton: true
      };
      
    case SIGNUP_USER_CREATED_ERROR:
         //console.log("sc user created error - reducer");
      return {
        ...state,
        errorAlertText: "User not created. Please contact support.",
        errorAlertLinkText: '',
        showErrorAlert: true,
        
        showSignupSubmitButton: true,
        showSignupSubmitLoadingButton: false,
        enableSignupFormInputs: true,
        enableSignupSubmitButton: true
            
      };
      
    case SIGNUP_UNKNOWN_ERROR:
        //console.log("sc unknown error - reducer");
      return {
        ...state,
        errorAlertText: "HTTP or unknown error. Please contact support.",
        errorAlertLinkText: '',
        showErrorAlert: true,
        
        showSignupSubmitButton: true,
        showSignupSubmitLoadingButton: false,
        enableSignupFormInputs: true,
        enableSignupSubmitButton: true
      };

      
    case SIGNUP_SUCCESS:
         //console.log("sc signup success - reducer");
      return {
        ...state,
        showSignupForm: false,
        showLogoutSubmitButton: true,
        showLoggedInInfo: true,
        loggedInInfoText: "Logged in as " + action.userData.scUsername,
        showSignupSubmitLoadingButton: false,
        showMainAccordion: true,
        showCommentersSearchForm: true,
        showCommentersSearchSubmitButton: true,
        enableCommentersSearchSubmitButton: true, 
        enableCommentersSearchInput: true,
        scProfile: action.userData.scProfile

        //successAlertText: "You're now logged in!"
      };
      
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

