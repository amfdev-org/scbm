/*const initialState = {
  authErrorMessage: null,
  errorAlertText: null,
  showErrorAlert: false
};*/


export default function uiReducer(state, action) {
  
  switch(action.type) {

    case "ERROR_ALERT_SHOW":
      return {
        ...state,
        showErrorAlert: true   
      };
      
    case "ERROR_ALERT_HIDE":
      return {
        ...state,
        showErrorAlert: false   
      };
      
    case "ERROR_ALERT_SET_TEXT":
         return {
        ...state,
        errorAlertText: action.text  
      };
    
    case "SUCCESS_ALERT_SHOW": 
      return {
        ...state,
        showSuccessAlert: true   
      };
      
    case "SUCCESS_ALERT_HIDE":
      return {
        ...state,
        showSuccessAlert: false   
      };
      
    case "SUCCESS_ALERT_SET_TEXT":
         return {
        ...state,
        successAlertText: action.text  
      };
            
    case "INFO_ALERT_SHOW":
      return {
        ...state,
        showInfoAlert: true   
      };
      
    case "INFO_ALERT_HIDE":
      return {
        ...state,
        showInfoAlert: false   
      };
      
    case "INFO_ALERT_SET_TEXT_HEADING":
         return {
        ...state,
        infoAlertTextHeading: action.textHeading  
      };
      
    case "INFO_ALERT_SET_TEXT":
         return {
        ...state,
        infoAlertText: action.text  
      };
      
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

