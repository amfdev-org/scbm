export const initialState = {
        sentMessageData: [],
        showSentMessagesTable: false,
        showSentMessagesSubmitButton: true,
        showSentMessagesSubmitLoadingButton: false,
        selectedSentMessages: [],   
        showSentMessagesLoadingIcon: true
};

export function sentMessagesSearchReducer(state = initialState, action) {
  
  switch(action.type) {

    
    case "SENT_MESSAGES_SEARCH_NO_RESULTS":
        //console.log("sc login error - reducer");
        //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
      return {
        ...state,
        errorAlertText: '',
        errorAlertLinkText: '',
        //showInfoAlert: false,
        showSuccessAlert: true,
        showErrorAlert: true,
        showSentMessagesTable: false,
        successAlertText: "But it looks like you have no messages.",
        showSentMessagesLoadingIcon: false
        
      };
      
    case "SENT_MESSAGES_SEARCH_OTHER_ERROR":
         //console.log("sc cookie error - reducer");
      return {
        ...state,
        //showInfoAlert: false,
        showLoginForm: false,
        errorAlertText: "Something went wrong. Please try again, or contact support.",
        errorAlertLinkText: '',
        showErrorAlert: true,
        showSentMessagesLoadingIcon: false
      };
      
      
    case "SENT_MESSAGES_SEARCH_RESULT":
        //console.log("sc myMessagesSearch result - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        //showInfoAlert: false,
        showErrorAlert: false,
        sentMessageData: action.sentMessageData,
        showSentMessagesTable: true,
        //successAlertText: "Messages sucessfully loaded.",
        showSentMessagesLoadingIcon: false
    
      };
      
    case "SENT_MESSAGES_SEARCH_UNKNOWN_ERROR":
        //console.log('reducer other error')
      return {
        ...state,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support.",
          showSentMessagesLoadingIcon: false
              
      };
      
      
    case "SENT_MESSAGES_SELECTED_ROWS_CHANGE":
         //console.log("SENT_MESSAGES_SELECTED_ROWS_CHANGE - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        selectedSentMessages: action.selectedSentMessages
    
      };
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

