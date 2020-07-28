import {
  SENT_MESSAGES_MESSAGE_FORM_SHOW,
  SENT_MESSAGES_MESSAGE_FORM_HIDE

} from '../actions/sentMessagesSearchActions';

import {
  SENT_MESSAGES_MESSAGE_CHANGE,
  SENT_MESSAGES_MESSAGE_SUBMIT_ENABLE,
  SENT_MESSAGES_MESSAGE_SUBMIT_DISABLE,
  SENT_MESSAGES_MESSAGE_ERROR,
  SENT_MESSAGES_MESSAGE_RESULT,
  SENT_MESSAGES_MESSAGE_SUBMITTED,
  SENT_MESSAGES_MESSAGE_UNKNOWN_ERROR

} from '../actions/sentMessagesMessageActions';    
        
        
export default function sentMessagesMessageReducer(state, action) {
  
  switch(action.type) {

    case SENT_MESSAGES_MESSAGE_FORM_SHOW:
        //console.log('show message form - reducer')
      return {
        ...state,
        showSentMessagesMessageForm: true
      };
      
    case SENT_MESSAGES_MESSAGE_FORM_HIDE:
      return {
        ...state,
        showSentMessagesMessageForm: false
      };
      
    case SENT_MESSAGES_MESSAGE_CHANGE:
      return {
        ...state,
        sentMessagesMessage: action.sentMessagesMessage
      };
          
    case SENT_MESSAGES_MESSAGE_SUBMIT_ENABLE:
      return {
        ...state,
        enableSentMessagesMessageSubmitButton: true
      };
                
    case SENT_MESSAGES_MESSAGE_SUBMIT_DISABLE:
      return {
        ...state,
          enableSentMessagesMessageSubmitButton: false
      };
      
    case SENT_MESSAGES_MESSAGE_SUBMITTED:
      return {
        ...state,
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        enableSentMessagesSearchInput: false,
        enableSentMessagesSearchSubmitButton: false,
        showSentMessagesMessageSubmitButton: false,
        showSentMessagesMessageSubmitLoadingButton: true,
        enableSentMessagesMessageInput: false
        
      };
    
          
    case SENT_MESSAGES_MESSAGE_ERROR:
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
    
      case SENT_MESSAGES_MESSAGE_UNKNOWN_ERROR:
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
          
    case SENT_MESSAGES_MESSAGE_RESULT:
      return {
        ...state,
        toggledClearRows: true,
        showSentMessagesMessageSubmitButton: true,
        showSentMessagesMessageSubmitLoadingButton: false,
        enableSentMessagesMessageInput: true,
        enableSentMessagesSearchSubmitButton: true,
        enableSentMessagesSearchInput: true,
        sentMessageData: action.sentMessageData
      };
    
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

