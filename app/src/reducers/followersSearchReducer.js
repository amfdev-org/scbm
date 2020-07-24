import {
    FOLLOWERS_SEARCH_URL_CHANGE,
    FOLLOWERS_SEARCH_SUBMIT_ENABLE,
    FOLLOWERS_SEARCH_SUBMIT_DISABLE,
    FOLLOWERS_SEARCH_SUBMITTED,
    FOLLOWERS_SEARCH_NO_RESULTS,
    FOLLOWERS_SEARCH_OTHER_ERROR,
    FOLLOWERS_SEARCH_SUCCESS,
    FOLLOWERS_SELECTED_ROWS_CHANGE,
    FOLLOWERS_SEARCH_UNKNOWN_ERROR

} from '../actions/followersSearchActions';


export default function followersSearchReducer(state, action) {
  
  switch(action.type) {

    case FOLLOWERS_SEARCH_URL_CHANGE:
      return {
        ...state,
        followersSearchUrl: action.followersSearchUrl
      };

    case FOLLOWERS_SEARCH_SUBMIT_ENABLE:
      return {
        ...state,
        enableFollowersSearchSubmitButton: true
      };
      
    case FOLLOWERS_SEARCH_SUBMIT_DISABLE:
      return {
        ...state,
        enableFollowersSearchSubmitButton: false
      };
      
    case FOLLOWERS_SEARCH_SUBMITTED:
      return {
        ...state,
            showFollowersTable: false,
            showFollowersSearchSubmitButton: false,
            showFollowersSearchSubmitLoadingButton: true,
            enableFollowersSearchInput: false,
            showErrorAlert: false,
            showSuccessAlert: false,
            showInfoAlert: false
        
      };
    
    case FOLLOWERS_SEARCH_NO_RESULTS:
        //console.log("sc login error - reducer");
        //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
      return {
        ...state,
        errorAlertText: '',
        errorAlertLinkText: '',
        showInfoAlert: false,
        showSuccessAlert: true,
        showErrorAlert: true,
        showFollowersSearchSubmitButton: true,
        showFollowersSearchSubmitLoadingButton: false,
        enableFollowersSearchInput : true,
        enableFollowersSearchSubmitButton: true, 
        showFollowersTable: true,
        successAlertText: "But there were no followers found for this track."
        
      };
      
    case FOLLOWERS_SEARCH_OTHER_ERROR:
         //console.log("sc cookie error - reducer");
      return {
        ...state,
        showInfoAlert: false,
        showLoginForm: false,
        errorAlertText: "Something went wrong. Please try again, or contact support.",
        errorAlertLinkText: '',
        showErrorAlert: true,
        enableFollowersSearchInput : true,
        enableFollowersSearchSubmitButton: true, 
        showFollowersSearchSubmitButton: true,
        showFollowersSearchSubmitLoadingButton: false
      };
      
      
    case FOLLOWERS_SEARCH_SUCCESS:
         //console.log("sc followersSearch success - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        showInfoAlert: false,
        showErrorAlert: false,
        showFollowersSearchSubmitLoadingButton: false,
        showFollowersSearchSubmitButton: true,
        enableFollowersSearchSubmitButton: true, 
        enableFollowersSearchInput: true,
        followerData: action.followerData,
        showFollowersTable: true,
        successAlertText: "Found " + action.followerData.length + ' followers.',
    
      };
      
    case FOLLOWERS_SEARCH_UNKNOWN_ERROR:
        //console.log('reducer other error')
      return {
        ...state,
          showFollowersSearchSubmitButton: true,
          showFollowersSearchSubmitLoadingButton: false,
          enableFollowersSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support."
              
      };
      
      
    case FOLLOWERS_SELECTED_ROWS_CHANGE:
         //console.log("FOLLOWERS_SELECTED_ROWS_CHANGE - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        selectedFollowers: action.selectedFollowers
    
      };
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

