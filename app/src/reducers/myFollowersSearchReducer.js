import {
    MY_FOLLOWERS_SEARCH_SUBMITTED,
    MY_FOLLOWERS_SEARCH_NO_RESULTS,
    MY_FOLLOWERS_SEARCH_OTHER_ERROR,
    MY_FOLLOWERS_SEARCH_SUCCESS,
    MY_FOLLOWERS_SELECTED_ROWS_CHANGE,
    MY_FOLLOWERS_SEARCH_UNKNOWN_ERROR

} from '../actions/myFollowersSearchActions';


export default function myFollowersSearchReducer(state, action) {
  
  switch(action.type) {

      
    case MY_FOLLOWERS_SEARCH_SUBMITTED:
      return {
        ...state,
            showMyFollowersTable: false,
            showErrorAlert: false,
            showSuccessAlert: false,
            showInfoAlert: false
        
      };
    
    case MY_FOLLOWERS_SEARCH_NO_RESULTS:
        //console.log("sc login error - reducer");
        //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
      return {
        ...state,
        errorAlertText: '',
        errorAlertLinkText: '',
        showInfoAlert: false,
        showSuccessAlert: true,
        showErrorAlert: true,
        showMyFollowersTable: true,
        successAlertText: "But it looks like you have no followers.",
        showMyFollowersLoadingIcon: false
        
      };
      
    case MY_FOLLOWERS_SEARCH_OTHER_ERROR:
         //console.log("sc cookie error - reducer");
      return {
        ...state,
        showInfoAlert: false,
        showLoginForm: false,
        errorAlertText: "Something went wrong. Please try again, or contact support.",
        errorAlertLinkText: '',
        showErrorAlert: true,
        showMyFollowersLoadingIcon: false
      };
      
      
    case MY_FOLLOWERS_SEARCH_SUCCESS:
         //console.log("sc myFollowersSearch success - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        showInfoAlert: false,
        showErrorAlert: false,
        myFollowerData: action.myFollowerData,
        showMyFollowersTable: true,
        //successAlertText: "Followers sucessfully loaded.",
        showMyFollowersLoadingIcon: false
    
      };
      
    case MY_FOLLOWERS_SEARCH_UNKNOWN_ERROR:
        //console.log('reducer other error')
      return {
        ...state,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support.",
          showMyFollowersLoadingIcon: false
              
      };
      
      
    case MY_FOLLOWERS_SELECTED_ROWS_CHANGE:
         //console.log("MY_FOLLOWERS_SELECTED_ROWS_CHANGE - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        selectedMyFollowers: action.selectedMyFollowers
    
      };
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

