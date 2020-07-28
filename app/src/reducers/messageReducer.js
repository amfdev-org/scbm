export default function MessageReducer(state, action) {
  
  switch(action.type) {

    case "FETCH_MESSAGES_NO_RESULTS":
        //console.log("sc login error - reducer");
        //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
      return {
        ...state,
        errorAlertText: '',
        errorAlertLinkText: '',
        showInfoAlert: false,
        showSuccessAlert: true,
        showErrorAlert: true,
        showTable: true,
        successAlertText: "But it looks like you have no messages.",
        showLoadingIcon: false
        
      };
      
    case "FETCH_MESSAGES_OTHER_ERROR":
         //console.log("sc cookie error - reducer");
      return {
        ...state,
        showInfoAlert: false,
        showLoginForm: false,
        errorAlertText: "Something went wrong. Please try again, or contact support.",
        errorAlertLinkText: '',
        showErrorAlert: true,
        showLoadingIcon: false
      };
      
      
    case "FETCH_SENT_MESSAGES_RESULT":
        console.log("sc FETCH_SENT_MESSAGES_RESULT - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        showInfoAlert: false,
        showErrorAlert: false,
        sentMessageData: action.messageData,
        showSentMessagesTable: true,
        successAlertText: "Messages sucessfully loaded.",
        showLoadingIcon: false
    
      };
      
      
            
    case "FETCH_RECEIVED_MESSAGES_RESULT":
        console.log("sc myMessagesSearch result - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        showInfoAlert: false,
        showErrorAlert: false,
        receivedMessageData: action.messageData,
        showTable: true,
        successAlertText: "Messages sucessfully loaded.",
        showLoadingIcon: false
    
      };
      
    case "FETCH_MESSAGES_UNKNOWN_ERROR":
        //console.log('reducer other error')
      return {
        ...state,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support.",
          showLoadingIcon: false
              
      };
      
      
    case "SENT_MESSAGES_SELECTED_ROWS_CHANGE":
         //console.log("SELECTED_ROWS_CHANGE - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        selectedSentMessages: action.selectedSentMessages
    
      };
      
    case "SENT_MESSAGES_MESSAGE_FORM_SHOW":
        //console.log('show message form - reducer')
      return {
        ...state,
        showSentMessagesMessageForm: true
      };
      
    case "SENT_MESSAGES_MESSAGE_FORM_HIDE":
      return {
        ...state,
        showSentMessagesMessageForm: false
      };
      
    case "SENT_MESSAGES_MESSAGE_CHANGE":
      return {
        ...state,
        sentMessagesMessage: action.sentMessagesMessage
      };
          
    case "SENT_MESSAGES_MESSAGE_SUBMIT_ENABLE":
      return {
        ...state,
        enableSentMessagesMessageSubmitButton: true
      };
                
    case "SENT_MESSAGES_MESSAGE_SUBMIT_DISABLE":
      return {
        ...state,
          enableSentMessagesMessageSubmitButton: false
      };
      
    case "MESSAGE_SUBMITTED":
      return {
        ...state,
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        enableSearchInput: false,
        enableSearchSubmitButton: false,
        showMessageSubmitButton: false,
        showMessageSubmitLoadingButton: true,
        enableMessageInput: false
        
      };
    
          
    case "MESSAGE_ERROR":
      return {
        ...state,
          showMessageSubmitButton: true,
          showMessageSubmitLoadingButton: false,
          enableMessageInput: true,
          enableSearchSubmitButton: true,
          enableSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong."
              
      };
    
      case "MESSAGE_UNKNOWN_ERROR":
        //console.log('reducer unknoqn error')
      return {
        ...state,
          showMessageSubmitButton: true,
          showMessageSubmitLoadingButton: false,
          enableMessageInput: true,
          enableSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support."
              
      };
          
    case "MESSAGE_RESULT":
      return {
        ...state,
        toggledClearRows: true,
        showMessageSubmitButton: true,
        showMessageSubmitLoadingButton: false,
        enableMessageInput: true,
        enableSearchSubmitButton: true,
        enableSearchInput: true,
        sentMessageData: action.sentMessageData
      };
    
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

