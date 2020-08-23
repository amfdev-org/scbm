export const initialState = {
        sentMessagesMessage : 'Hi <<profileName>>,',
        showSentMessagesMessageForm: false,
        enableSentMessagesMessageInput: true,
        enableSentMessagesMessageSubmitButton: false,
        showSentMessagesMessageSubmitButton: true,
        showSentMessagesMessageSubmitLoadingButton: false,
        toggledSentMessagesClearRows: false
};

export function sentMessagesMessageReducer(state = initialState, action) {
  
  switch(action.type) {

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
      
    case "SENT_MESSAGES_MESSAGE_SUBMITTED":
      return {
        ...state,
        //showErrorAlert: false,
        //showSuccessAlert: false,
        //showInfoAlert: false,
        enableSentMessagesSearchInput: false,
        enableSentMessagesSearchSubmitButton: false,
        showSentMessagesMessageSubmitButton: false,
        showSentMessagesMessageSubmitLoadingButton: true,
        enableSentMessagesMessageInput: false
      };
    
          
    case "SENT_MESSAGES_MESSAGE_ERROR":
      return {
        ...state,
          showSentMessagesMessageSubmitButton: true,
          showSentMessagesMessageSubmitLoadingButton: false,
          enableSentMessagesMessageInput: true,
          enableSentMessagesSearchSubmitButton: true,
          enableSentMessagesSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong."
              
      };
    
      case "SENT_MESSAGES_MESSAGE_UNKNOWN_ERROR":
        //console.log('reducer unknoqn error')
      return {
        ...state,
          showSentMessagesMessageSubmitButton: true,
          showSentMessagesMessageSubmitLoadingButton: false,
          enableSentMessagesMessageInput: true,
          enableSentMessagesSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support."
              
      };
          
    case "SENT_MESSAGES_MESSAGE_RESULT":
      return {
        ...state,
        showSentMessagesMessageSubmitButton: true,
        showSentMessagesMessageSubmitLoadingButton: false,
        enableSentMessagesMessageInput: true,
        enableSentMessagesSearchSubmitButton: true,
        enableSentMessagesSearchInput: true,
        sentMessageData: action.sentMessageData,
        toggledSentMessagesClearRows: action.toggledSentMessagesClearRows
      };
    
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

