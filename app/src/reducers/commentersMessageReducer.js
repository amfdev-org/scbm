export const initialState = {
    showCommentersMessageForm: false,
    commentersMessage : 'Hi <<profileName>>,',
    enableCommentersMessageSubmitButton: false,
    showCommentersMessageSubmitButton: true,
    showCommentersMessageSubmitLoadingButton: false,
    enableCommentersMessageInput: true,
    toggledCommentersClearRows: false
};     
        
export function commentersMessageReducer(state = initialState, action) {
  
  switch(action.type) {

  
    case "COMMENTERS_MESSAGE_FORM_SHOW":
      return {
        ...state,
        showCommentersMessageForm: true
      };
      
    case "COMMENTERS_MESSAGE_FORM_HIDE":
      return {
        ...state,
        showCommentersMessageForm: false
      };
      
    case "COMMENTERS_MESSAGE_CHANGE":
      return {
        ...state,
        commentersMessage: action.commentersMessage
      };
           
    case "COMMENTERS_MESSAGE_SUBMIT_ENABLE":
      return {
        ...state,
        enableCommentersMessageSubmitButton: true
      };  
            
    case "COMMENTERS_MESSAGE_SUBMIT_DISABLE":
      return {
        ...state,
          enableCommentersMessageSubmitButton: false
      };
      
    case "COMMENTERS_MESSAGE_SUBMITTED":
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
    
          
    case "COMMENTERS_MESSAGE_ERROR":
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
    
      case "COMMENTERS_MESSAGE_UNKNOWN_ERROR":
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
          
    case "COMMENTERS_MESSAGE_RESULT":
      //console.log(action.commenterData)
      return {
        ...state,
        showCommentersMessageSubmitButton: true,
        showCommentersMessageSubmitLoadingButton: false,
        enableCommentersMessageInput: true,
        enableCommentersSearchSubmitButton: true,
        enableCommentersSearchInput: true,
        commenterData: action.commenterData,
        toggledCommentersClearRows: action.toggledCommentersClearRows
      };
    
    
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}

