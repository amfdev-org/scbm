export const initialState = {
        isTestMode: false,
        showMainAccordion: false,
        showConfigModal: false,
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        errorAlertText: '',
        successAlertText: '',
        infoAlertText: '',
        infoAlertTextHeading: '',
        errorAlertLink: '',
        errorAlertLinkText: '',
        showErrorAlertSwitchToSignup: false,
        showErrorAlertSwitchToLogin: false
};

export function uiReducer(state = initialState, action) {
  
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
      
      case "CONFIG_MODAL_SHOW":
        //console.log("reducer CONFIG_MODAL_SHOW")
         return {
        ...state,
        showConfigModal: true 
      };
      
      case "CONFIG_MODAL_HIDE":
         return {
        ...state,
        showConfigModal: false 
      };
      
      case "TEST_MODE_DISABLE":
         //console.log("uiReducer TEST_MODE_DISABLE")
         return {
        ...state,
        isTestMode: false 
      };
      
         case "TEST_MODE_ENABLE":
        //console.log("uiReducer TEST_MODE_ENABLE")
         return {
        ...state,
        isTestMode: true 
      };
      
      
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

