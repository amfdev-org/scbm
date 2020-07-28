import {
  COMMENTERS_MESSAGE_FORM_SHOW,
  COMMENTERS_MESSAGE_FORM_HIDE

} from '../actions/commentersSearchActions';

import {
  COMMENTERS_MESSAGE_CHANGE,
  COMMENTERS_MESSAGE_SUBMIT_ENABLE,
  COMMENTERS_MESSAGE_SUBMIT_DISABLE,
  COMMENTERS_MESSAGE_ERROR,
  COMMENTERS_MESSAGE_RESULT,
  COMMENTERS_MESSAGE_SUBMITTED,
  COMMENTERS_MESSAGE_UNKNOWN_ERROR

} from '../actions/commentersMessageActions';    
        
        
export default function commentersMessageReducer(state, action) {
  
  switch(action.type) {

  
    case COMMENTERS_MESSAGE_FORM_SHOW:
      return {
        ...state,
        showCommentersMessageForm: true
      };
      
    case COMMENTERS_MESSAGE_FORM_HIDE:
      return {
        ...state,
        showCommentersMessageForm: false
      };
      
    case COMMENTERS_MESSAGE_CHANGE:
      return {
        ...state,
        commentersMessage: action.commentersMessage
      };
    
          
    case COMMENTERS_MESSAGE_SUBMIT_ENABLE:
      return {
        ...state,
        enableCommentersMessageSubmitButton: true
      };
      
            
    case COMMENTERS_MESSAGE_SUBMIT_DISABLE:
      return {
        ...state,
          enableCommentersMessageSubmitButton: false
      };
      
    case COMMENTERS_MESSAGE_SUBMITTED:
      return {
        ...state,
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        enableCommentersSearchInput: false,
        enableCommentersSearchSubmitButton: false,
        showCommentersMessageSubmitButton: false,
        showCommentersMessageSubmitLoadingButton: true,
        enableCommentersMessageInput: false
        
      };
    
          
    case COMMENTERS_MESSAGE_ERROR:
      return {
        ...state,
          showCommentersMessageSubmitButton: true,
          showCommentersMessageSubmitLoadingButton: false,
          enableCommentersMessageInput: true,
          enableCommentersSearchSubmitButton: true,
          enableCommentersSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong."
              
      };
    
      case COMMENTERS_MESSAGE_UNKNOWN_ERROR:
        //console.log('reducer unknoqn error')
      return {
        ...state,
          showCommentersMessageSubmitButton: true,
          showCommentersMessageSubmitLoadingButton: false,
          enableCommentersMessageInput: true,
          enableCommentersSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support."
              
      };
          
    case COMMENTERS_MESSAGE_RESULT:
      console.log(action.commenterData)
      return {
        ...state,
        toggledClearRows: true,
        showCommentersMessageSubmitButton: true,
        showCommentersMessageSubmitLoadingButton: false,
        enableCommentersMessageInput: true,
        enableCommentersSearchSubmitButton: true,
        enableCommentersSearchInput: true,
        commenterData: action.commenterData
      };
    
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

