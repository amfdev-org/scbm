export const initialState = {
        myFollowersMessage : 'Hi <<profileName>>,',
        showMyFollowersMessageForm: false,
        enableMyFollowersMessageInput: true,
        enableMyFollowersMessageSubmitButton: false,
        showMyFollowersMessageSubmitButton: true,
        showMyFollowersMessageSubmitLoadingButton: false
};

       
export function myFollowersMessageReducer(state = initialState, action) {
  
  switch(action.type) {

    case "MY_FOLLOWERS_MESSAGE_FORM_SHOW":
        //console.log('show message form - reducer')
      return {
        ...state,
        showMyFollowersMessageForm: true
      };
      
    case "MY_FOLLOWERS_MESSAGE_FORM_HIDE":
      return {
        ...state,
        showMyFollowersMessageForm: false
      };
      
    case "MY_FOLLOWERS_MESSAGE_CHANGE":
      return {
        ...state,
        myFollowersMessage: action.myFollowersMessage
      };
          
    case "MY_FOLLOWERS_MESSAGE_SUBMIT_ENABLE":
      return {
        ...state,
        enableMyFollowersMessageSubmitButton: true
      };
                
    case "MY_FOLLOWERS_MESSAGE_SUBMIT_DISABLE":
      return {
        ...state,
          enableMyFollowersMessageSubmitButton: false
      };
      
    case "MY_FOLLOWERS_MESSAGE_SUBMITTED":
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
    
          
    case "MY_FOLLOWERS_MESSAGE_ERROR":
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
    
      case "MY_FOLLOWERS_MESSAGE_UNKNOWN_ERROR":
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
          
    case "MY_FOLLOWERS_MESSAGE_RESULT":
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
    
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

