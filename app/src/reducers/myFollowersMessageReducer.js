import {
  MY_FOLLOWERS_MESSAGE_FORM_SHOW,
  MY_FOLLOWERS_MESSAGE_FORM_HIDE

} from '../actions/myFollowersSearchActions';

import {
  MY_FOLLOWERS_MESSAGE_CHANGE,
  MY_FOLLOWERS_MESSAGE_SUBMIT_ENABLE,
  MY_FOLLOWERS_MESSAGE_SUBMIT_DISABLE,
  MY_FOLLOWERS_MESSAGE_ERROR,
  MY_FOLLOWERS_MESSAGE_SUCCESS,
  MY_FOLLOWERS_MESSAGE_SUCCESS_SEND_COUNT,
  MY_FOLLOWERS_MESSAGE_SUBMITTED,
  MY_FOLLOWERS_MESSAGE_UNKNOWN_ERROR

} from '../actions/myFollowersMessageActions';    
        
        
export default function myFollowersMessageReducer(state, action) {
  
  switch(action.type) {

    case MY_FOLLOWERS_MESSAGE_FORM_SHOW:
        //console.log('show message form - reducer')
      return {
        ...state,
        showMyFollowersMessageForm: true
      };
      
    case MY_FOLLOWERS_MESSAGE_FORM_HIDE:
      return {
        ...state,
        showMyFollowersMessageForm: false
      };
      
    case MY_FOLLOWERS_MESSAGE_CHANGE:
      return {
        ...state,
        myFollowersMessage: action.myFollowersMessage
      };
          
    case MY_FOLLOWERS_MESSAGE_SUBMIT_ENABLE:
      return {
        ...state,
        enableMyFollowersMessageSubmitButton: true
      };
                
    case MY_FOLLOWERS_MESSAGE_SUBMIT_DISABLE:
      return {
        ...state,
          enableMyFollowersMessageSubmitButton: false
      };
      
    case MY_FOLLOWERS_MESSAGE_SUBMITTED:
      return {
        ...state,
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        enableMyFollowersSearchInput: false,
        enableMyFollowersSearchSubmitButton: false,
        showMyFollowersMessageSubmitButton: false,
        showMyFollowersMessageSubmitLoadingButton: true,
        enableMyFollowersMessageInput: false
        
      };
    
          
    case MY_FOLLOWERS_MESSAGE_ERROR:
      return {
        ...state,
          showMyFollowersMessageSubmitButton: true,
          showMyFollowersMessageSubmitLoadingButton: false,
          enableMyFollowersMessageInput: true,
          enableMyFollowersSearchSubmitButton: true,
          enableMyFollowersSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong."
              
      };
    
      case MY_FOLLOWERS_MESSAGE_UNKNOWN_ERROR:
        //console.log('reducer unknoqn error')
      return {
        ...state,
          showMyFollowersMessageSubmitButton: true,
          showMyFollowersMessageSubmitLoadingButton: false,
          enableMyFollowersMessageInput: true,
          enableMyFollowersSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support."
              
      };
          
    case MY_FOLLOWERS_MESSAGE_SUCCESS:
      return {
        ...state,
        toggledClearRows: true,
        showMyFollowersMessageSubmitButton: true,
        showMyFollowersMessageSubmitLoadingButton: false,
        enableMyFollowersMessageInput: true,
        enableMyFollowersSearchSubmitButton: true,
        enableMyFollowersSearchInput: true,
        myFollowerData: action.myFollowerData
      };
    
    
      case MY_FOLLOWERS_MESSAGE_SUCCESS_SEND_COUNT:
      return {
        ...state,
        successAlertText: "Message sent to " + action.sendCount + " users.",
      };
      
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

