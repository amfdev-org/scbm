export const initialState = {
    commentersSearchUrl : '',
    commenterData : [],
    selectedCommenters : [],
    showCommentersSearchSubmitButton: true,
    enableCommentersSearchSubmitButton: false,
    showCommentersSearchSubmitLoadingButton: false,
    enableCommentersSearchInput: true,
    showCommentersSearchForm: false,
    showCommentersTable: false,
    recentCommentersSearches: [],
    showCommentersRecentSearchContainer: false,
    enableCommentersRecentSearchBadges: true
};     
      
      
export function commentersSearchReducer(state = initialState, action) {
  
  switch(action.type) {

    case "COMMENTERS_SEARCH_URL_CHANGE":
      return {
        
        ...state,
        commentersSearchUrl: action.commentersSearchUrl
      };

    case "COMMENTERS_SEARCH_SUBMIT_ENABLE":
      return {
        ...state,
        enableCommentersSearchSubmitButton: true
      };
      
    case "COMMENTERS_SEARCH_SUBMIT_DISABLE":
      return {
        ...state,
        enableCommentersSearchSubmitButton: false
      };
      
    case "COMMENTERS_SEARCH_SUBMITTED":
      return {
        ...state,
            showCommentersTable: false,
            showCommentersSearchSubmitButton: false,
            showCommentersSearchSubmitLoadingButton: true,
            enableCommentersSearchInput: false,
            enableCommentersRecentSearchBadges: false
            //showErrorAlert: false,
            //showSuccessAlert: false,
            //showInfoAlert: false
        
      };
    
    case "COMMENTERS_SEARCH_NO_RESULTS":
        //console.log("sc login error - reducer");
        //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
      return {
        ...state,
        errorAlertText: '',
        errorAlertLinkText: '',
        showCommentersSearchSubmitButton: true,
        showCommentersSearchSubmitLoadingButton: false,
        enableCommentersSearchInput : true,
        enableCommentersSearchSubmitButton: true, 
        showCommentersTable: true,
        successAlertText: "But there were no commenters found for this track."
        
      };
      
    case "COMMENTERS_SEARCH_OTHER_ERROR":
         //console.log("sc cookie error - reducer");
      return {
        ...state,
        showInfoAlert: false,
        showLoginForm: false,
        errorAlertText: "Something went wrong. Please check the search term and try again, or contact support.",
        errorAlertLinkText: '',
        showErrorAlert: true,
        enableCommentersSearchInput : true,
        enableCommentersSearchSubmitButton: true, 
        showCommentersSearchSubmitButton: true,
        showCommentersSearchSubmitLoadingButton: false,
        enableCommentersRecentSearchBadges: true
      };
      
      
    case "COMMENTERS_SEARCH_SUCCESS":
         //console.log("sc commentersSearch success - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        showInfoAlert: false,
        showErrorAlert: false,
        showCommentersSearchSubmitLoadingButton: false,
        showCommentersSearchSubmitButton: true,
        enableCommentersSearchSubmitButton: true, 
        enableCommentersSearchInput: true,
        commenterData: action.commenterData,
        showCommentersTable: true,
        successAlertText: "Found " + action.commenterData.length + ' commenters.',
        enableCommentersRecentSearchBadges: true
    
      };
      
    case "COMMENTERS_SEARCH_UNKNOWN_ERROR":
        //console.log('reducer other error')
      return {
        ...state,
          showCommentersSearchSubmitButton: true,
          showCommentersSearchSubmitLoadingButton: false,
          enableCommentersSearchInput: true,
          enableCommentersRecentSearchBadges: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support."
              
      };
      
      
    case "COMMENTERS_SELECTED_ROWS_CHANGE":
         //console.log("COMMENTERS_SELECTED_ROWS_CHANGE - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        selectedCommenters: action.selectedCommenters
    
      };
    
    case "COMMENTERS_SEARCH_RECENT_SEARCHES_RESULT":
         //console.log("COMMENTERS_SEARCH_RECENT_SEARCHES_RESULT - reducer");
         //console.log(action.data)
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        recentCommentersSearches: action.data,
        showCommentersRecentSearchContainer: true
    
      };
      
    
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

