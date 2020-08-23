export const initialState = {
        showFollowersMessageForm: false,
        followersMessage : 'Hi <<profileName>>,',
        enableFollowersMessageSubmitButton: false,
        showFollowersMessageSubmitButton: true,
        showFollowersMessageSubmitLoadingButton: false,
        enableFollowersMessageInput: true,
        toggledFollowersClearRows: false
};

export function followersMessageReducer(state = initialState, action) {
  
  switch(action.type) {

    case "FOLLOWERS_MESSAGE_FORM_SHOW":
        //console.log('show message form - reducer')
      return {
        ...state,
        showFollowersMessageForm: true
      };
      
    case "FOLLOWERS_MESSAGE_FORM_HIDE":
      return {
        ...state,
        showFollowersMessageForm: false
      };
      
    case "FOLLOWERS_MESSAGE_CHANGE":
      return {
        ...state,
        followersMessage: action.followersMessage
      };
          
    case "FOLLOWERS_MESSAGE_SUBMIT_ENABLE":
      return {
        ...state,
        enableFollowersMessageSubmitButton: true
      };
                
    case "FOLLOWERS_MESSAGE_SUBMIT_DISABLE":
      return {
        ...state,
          enableFollowersMessageSubmitButton: false
      };
      
    case "FOLLOWERS_MESSAGE_SUBMITTED":
      return {
        ...state,
        //showErrorAlert: false,
        //showSuccessAlert: false,
        //showInfoAlert: false,
        enableFollowersSearchInput: false,
        enableFollowersSearchSubmitButton: false,
        showFollowersMessageSubmitButton: false,
        showFollowersMessageSubmitLoadingButton: true,
        enableFollowersMessageInput: false,
        enableFollowersRecentSearchBadges: false
      };
    
          
    case "FOLLOWERS_MESSAGE_ERROR":
      return {
        ...state,
          showFollowersMessageSubmitButton: true,
          showFollowersMessageSubmitLoadingButton: false,
          enableFollowersMessageInput: true,
          enableFollowersSearchSubmitButton: true,
          enableFollowersSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong.",
          enableFollowersRecentSearchBadges: true
              
      };
    
      case "FOLLOWERS_MESSAGE_UNKNOWN_ERROR":
        //console.log('reducer unknoqn error')
      return {
        ...state,
          showFollowersMessageSubmitButton: true,
          showFollowersMessageSubmitLoadingButton: false,
          enableFollowersMessageInput: true,
          enableFollowersSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support.",
          enableFollowersRecentSearchBadges: true
              
      };
          
    case "FOLLOWERS_MESSAGE_RESULT":
      return {
        ...state,
        showFollowersMessageSubmitButton: true,
        showFollowersMessageSubmitLoadingButton: false,
        enableFollowersMessageInput: true,
        enableFollowersSearchSubmitButton: true,
        enableFollowersSearchInput: true,
        followerData: action.followerData,
        toggledFollowersClearRows: action.toggledFollowersClearRows,
        enableFollowersRecentSearchBadges: true
      };
    
    
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

