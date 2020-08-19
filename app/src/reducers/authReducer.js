export const initialState = {

};     
   
export function authReducer(state = initialState, action) {
  
  //console.log(action);
   
  switch(action.type) {
   
    case "AUTH_UNKNOWN_ERROR":
      
      return {
        ...state,
        showInfoAlert: false,
        errorAlertText: "API or unknown error. Please try again later.",
        showErrorAlert: true   
      };

    case "AUTH_SESSION_ERROR":

    //console.log('reducer AUTH_SESSION_ERROR')
    
      return {
        ...state,
        errorAlertText: "",
        showErrorAlert: false,
        showLoginForm: true,
        showLoginSubmitButton: true,
        infoAlertTextHeading: "Welcome",
        infoAlertText: "Please log in.",
        enableLoginSubmitButton: true,
        //showInfoAlert: true                        
                              
      };
      
    case "AUTH_COOKIE_ERROR":
    //console.log('reducer AUTH_COOKIE_ERROR')
      return {
        ...state,
        errorAlertText: "Auth cookie error. Please contact support.",
        showErrorAlert: true
      };
      
    
    case "AUTH_SUCCESS":
      //console.log("authReducer AUTH_SUCCESS - action.userSettings.isTestMode: "+action.userSettings.isTestMode)
      console.log("authReducer AUTH_SUCCESS");
      return {
        ...state,
        errorAlertText: null,
        showErrorAlert: false,            
        showLoggedInInfo: true,
        showLogoutSubmitButton: true,
        loggedInInfoText: "Logged in as " + action.userData.scUsername,
        showMainAccordion: true,
        //showCommentersSearchForm: true,
        //showCommentersSearchSubmitButton: true,
        //enableCommentersSearchSubmitButton: false, 
        //enableCommentersSearchInput: true,
        scProfile: action.userData.scProfile,
        isTestMode: action.userSettings.isTestMode === "true"
                    
      };
      
      
    default:
      // ALWAYS have a default case in a reducer
      return { ...state };
  }
  
};

export default authReducer;
