import {
    COMMENTERS_SEARCH_URL_CHANGE,
    COMMENTERS_SEARCH_SUBMIT_ENABLE,
    COMMENTERS_SEARCH_SUBMIT_DISABLE,
    COMMENTERS_SEARCH_SUBMITTED,
    COMMENTERS_SEARCH_NO_RESULTS,
    COMMENTERS_SEARCH_OTHER_ERROR,
    COMMENTERS_SEARCH_SUCCESS,
    COMMENTERS_SELECTED_ROWS_CHANGE,
    COMMENTERS_SEARCH_UNKNOWN_ERROR

} from '../actions/commentersSearchActions';


export default function commentersSearchReducer(state, action) {
  
  switch(action.type) {

    case COMMENTERS_SEARCH_URL_CHANGE:
      return {
        
        ...state,
        commentersSearchUrl: action.commentersSearchUrl
      };

    case COMMENTERS_SEARCH_SUBMIT_ENABLE:
      return {
        ...state,
        enableCommentersSearchSubmitButton: true
      };
      
    case COMMENTERS_SEARCH_SUBMIT_DISABLE:
      return {
        ...state,
        enableCommentersSearchSubmitButton: false
      };
      
    case COMMENTERS_SEARCH_SUBMITTED:
      return {
        ...state,
            showCommentersTable: false,
            showCommentersSearchSubmitButton: false,
            showCommentersSearchSubmitLoadingButton: true,
            enableCommentersSearchInput: false,
            showErrorAlert: false,
            showSuccessAlert: false,
            showInfoAlert: false
        
      };
    
    case COMMENTERS_SEARCH_NO_RESULTS:
        console.log("sc login error - reducer");
        //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
      return {
        ...state,
        errorAlertText: '',
        errorAlertLinkText: '',
        showInfoAlert: false,
        showSuccessAlert: true,
        showErrorAlert: true,
        showCommentersSearchSubmitButton: true,
        showCommentersSearchSubmitLoadingButton: false,
        enableCommentersSearchFormInputs : true,
        enableCommentersSearchSubmitButton: true, 
        showCommentersTable: true,
        successAlertText: "But there were no commenters found for this track."
        
      };
      
    case COMMENTERS_SEARCH_OTHER_ERROR:
         console.log("sc cookie error - reducer");
      return {
        ...state,
        showInfoAlert: false,
        showLoginForm: false,
        errorAlertText: "Something went wrong. Please try again, or contact support.",
        errorAlertLinkText: '',
        showErrorAlert: true,
        enableCommentersSearchFormInputs : true,
        enableCommentersSearchSubmitButton: true, 
        showCommentersSearchSubmitButton: true,
        showCommentersSearchSubmitLoadingButton: false
      };
      
      
    case COMMENTERS_SEARCH_SUCCESS:
         console.log("sc commentersSearch success - reducer");
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
        
                
            /*this.setState({showSuccessAlert: true},()=>{
            window.setTimeout(()=>{
              this.setState({showSuccessAlert: false})
            },4000)*/

        //successAlertText: "You're now logged in!"
    
      };
      
    case COMMENTERS_SEARCH_UNKNOWN_ERROR:
        console.log('reducer other error')
      return {
        ...state,
          showCommentersMessageSubmitButton: true,
          showCommentersMessageSubmitLoadingButton: false,
          enableCommentersSearchInput: true,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support."
              
      };
      
      
    case COMMENTERS_SELECTED_ROWS_CHANGE:
         console.log("COMMENTERS_SELECTED_ROWS_CHANGE - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        selectedCommenters: action.selectedCommenters
    
      };
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

