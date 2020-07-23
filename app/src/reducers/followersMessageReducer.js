import {
  FOLLOWERS_MESSAGE_FORM_SHOW,
  FOLLOWERS_MESSAGE_FORM_HIDE

} from '../actions/followersSearchActions';

import {
  FOLLOWERS_MESSAGE_CHANGE,
  FOLLOWERS_MESSAGE_SUBMIT_ENABLE,
  FOLLOWERS_MESSAGE_SUBMIT_DISABLE,
  FOLLOWERS_MESSAGE_ERROR,
  FOLLOWERS_MESSAGE_SUCCESS,
  FOLLOWERS_MESSAGE_SUCCESS_SEND_COUNT,
  FOLLOWERS_MESSAGE_SUBMITTED,
  FOLLOWERS_MESSAGE_UNKNOWN_ERROR

} from '../actions/followersMessageActions';    
        
        
export default function followersMessageReducer(state, action) {
  
  switch(action.type) {

    case FOLLOWERS_MESSAGE_FORM_SHOW:
        //console.log('show message form - reducer')
      return {
        ...state,
        showFollowersMessageForm: true
      };
      
    case FOLLOWERS_MESSAGE_FORM_HIDE:
      return {
        ...state,
        showFollowersMessageForm: false
      };
      
    case FOLLOWERS_MESSAGE_CHANGE:
      return {
        ...state,
        followersMessage: action.followersMessage
      };
          
    case FOLLOWERS_MESSAGE_SUBMIT_ENABLE:
      return {
        ...state,
        enableFollowersMessageSubmitButton: true
      };
                
    case FOLLOWERS_MESSAGE_SUBMIT_DISABLE:
      return {
        ...state,
          enableFollowersMessageSubmitButton: false
      };
      
    case FOLLOWERS_MESSAGE_SUBMITTED:
      return {
        ...state,
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        enableFollowersSearchInput: false,
        enableFollowersSearchSubmitButton: false,
        showFollowersMessageSubmitButton: false,
        showFollowersMessageSubmitLoadingButton: true,
        enableFollowersMessageInput: false
        
      };
    
          
    case FOLLOWERS_MESSAGE_ERROR:
      return {
        ...state,
          showFollowersMessageSubmitButton: true,
          showFollowersMessageSubmitLoadingButton: false,
          enableFollowersMessageInput: true,
          enableFollowersSearchSubmitButton: true,
          enableFollowersSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong."
              
      };
    
      case FOLLOWERS_MESSAGE_UNKNOWN_ERROR:
        //console.log('reducer unknoqn error')
      return {
        ...state,
          showFollowersMessageSubmitButton: true,
          showFollowersMessageSubmitLoadingButton: false,
          enableFollowersMessageInput: true,
          enableFollowersSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support."
              
      };
          
    case FOLLOWERS_MESSAGE_SUCCESS:
      return {
        ...state,
        toggledClearRows: true,
        showMessageSubmitButton: true,
        showMessageSubmitLoadingButton: false,
        enableFollowersMessageInput: true,
        enableFollowersSearchSubmitButton: true,
        enableFollowersSearchInput: true,
        followerData: action.followerData
      };
    
    
      case FOLLOWERS_MESSAGE_SUCCESS_SEND_COUNT:
      return {
        ...state,
        successAlertText: "Message sent to " + action.sendCount + " users.",
      };
      
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

