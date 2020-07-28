import {
    RECEIVED_MESSAGES_SEARCH_NO_RESULTS,
    RECEIVED_MESSAGES_SEARCH_OTHER_ERROR,
    RECEIVED_MESSAGES_SEARCH_RESULT,
    RECEIVED_MESSAGES_SELECTED_ROWS_CHANGE,
    RECEIVED_MESSAGES_SEARCH_UNKNOWN_ERROR,
    RECEIVED_MESSAGES_SEARCH_REFRESH

} from '../actions/receivedMessagesSearchActions';


export default function receivedMessagesSearchReducer(state, action) {
  
  switch(action.type) {

    
    case RECEIVED_MESSAGES_SEARCH_NO_RESULTS:
        //console.log("sc login error - reducer");
        //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
      return {
        ...state,
        errorAlertText: '',
        errorAlertLinkText: '',
        showInfoAlert: false,
        showSuccessAlert: true,
        showErrorAlert: true,
        showReceivedMessagesTable: true,
        successAlertText: "But it looks like you have no messages.",
        showReceivedMessagesLoadingIcon: false
        
      };
      
    case RECEIVED_MESSAGES_SEARCH_OTHER_ERROR:
         //console.log("sc cookie error - reducer");
      return {
        ...state,
        showInfoAlert: false,
        showLoginForm: false,
        errorAlertText: "Something went wrong. Please try again, or contact support.",
        errorAlertLinkText: '',
        showErrorAlert: true,
        showReceivedMessagesLoadingIcon: false
      };
      
      
    case RECEIVED_MESSAGES_SEARCH_RESULT:
        console.log("sc myMessagesSearch result - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        showInfoAlert: false,
        showErrorAlert: false,
        receivedMessageData: action.receivedMessageData,
        showReceivedMessagesTable: true,
        //successAlertText: "Messages sucessfully loaded.",
        showReceivedMessagesLoadingIcon: false
    
      };
      
    case RECEIVED_MESSAGES_SEARCH_UNKNOWN_ERROR:
        //console.log('reducer other error')
      return {
        ...state,
          showErrorAlert: true,
          errorAlertText: "Something went wrong. Please contact support.",
          showReceivedMessagesLoadingIcon: false
              
      };
      
      
    case RECEIVED_MESSAGES_SELECTED_ROWS_CHANGE:
         //console.log("RECEIVED_MESSAGES_SELECTED_ROWS_CHANGE - reducer");
         //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none'
      return {
        ...state,
        selectedReceivedMessages: action.selectedReceivedMessages
    
      };
      
      
    case RECEIVED_MESSAGES_SEARCH_REFRESH:
        //console.log("sc login error - reducer");
        //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
      return {
        ...state,
        showReceivedMessagesTable: false,
        showReceivedMessagesLoadingIcon: true
        
      };
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

