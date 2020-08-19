export const initialState = {
        receivedMessagesMessage : 'Hi <<profileName>>,',
        showReceivedMessagesMessageForm: false,
        enableReceivedMessagesMessageInput: true,
        enableReceivedMessagesMessageSubmitButton: false,
        showReceivedMessagesMessageSubmitButton: true,
        showReceivedMessagesMessageSubmitLoadingButton: false,
        enableReceivedMessagesRefresh: true
};

export function receivedMessagesMessageReducer(state = initialState, action) {
  
  switch(action.type) {

    case "RECEIVED_MESSAGES_MESSAGE_FORM_SHOW":
        //console.log('show message form - reducer')
      return {
        ...state,
        showReceivedMessagesMessageForm: true
      };
      
    case "RECEIVED_MESSAGES_MESSAGE_FORM_HIDE":
      return {
        ...state,
        showReceivedMessagesMessageForm: false
      };
      
    case "RECEIVED_MESSAGES_MESSAGE_CHANGE":
      return {
        ...state,
        receivedMessagesMessage: action.receivedMessagesMessage
      };
          
    case "RECEIVED_MESSAGES_MESSAGE_SUBMIT_ENABLE":
      return {
        ...state,
        enableReceivedMessagesMessageSubmitButton: true
      };
                
    case "RECEIVED_MESSAGES_MESSAGE_SUBMIT_DISABLE":
      return {
        ...state,
          enableReceivedMessagesMessageSubmitButton: false
      };
      
    case "RECEIVED_MESSAGES_MESSAGE_SUBMITTED":
      return {
        ...state,
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        enableReceivedMessagesSearchInput: false,
        enableReceivedMessagesSearchSubmitButton: false,
        showReceivedMessagesMessageSubmitButton: false,
        showReceivedMessagesMessageSubmitLoadingButton: true,
        enableReceivedMessagesMessageInput: false
        
      };
    
          
    case "RECEIVED_MESSAGES_MESSAGE_ERROR":
      return {
        ...state,
          showReceivedMessagesMessageSubmitButton: true,
          showReceivedMessagesMessageSubmitLoadingButton: false,
          enableReceivedMessagesMessageInput: true,
          enableReceivedMessagesSearchSubmitButton: true,
          enableReceivedMessagesSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong."
              
      };
    
      case "RECEIVED_MESSAGES_MESSAGE_UNKNOWN_ERROR":
        //console.log('reducer unknoqn error')
      return {
        ...state,
          showReceivedMessagesMessageSubmitButton: true,
          showReceivedMessagesMessageSubmitLoadingButton: false,
          enableReceivedMessagesMessageInput: true,
          enableReceivedMessagesSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support."
              
      };
          
    case "RECEIVED_MESSAGES_MESSAGE_RESULT":
      return {
        ...state,
        toggledClearRows: true,
        showReceivedMessagesMessageSubmitButton: true,
        showReceivedMessagesMessageSubmitLoadingButton: false,
        enableReceivedMessagesMessageInput: true,
        enableReceivedMessagesSearchSubmitButton: true,
        enableReceivedMessagesSearchInput: true,
        receivedMessageData: action.receivedMessageData
      };
    
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

