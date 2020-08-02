import axios from 'axios';

export const RECEIVED_MESSAGES_SEARCH_SUBMITTED = 'RECEIVED_MESSAGES_SEARCH_SUBMITTED'
export const RECEIVED_MESSAGES_SEARCH_OTHER_ERROR = 'RECEIVED_MESSAGES_SEARCH_OTHER_ERROR'
export const RECEIVED_MESSAGES_SEARCH_UNKNOWN_ERROR = 'RECEIVED_MESSAGES_SEARCH_UNKNOWN_ERROR'
export const RECEIVED_MESSAGES_SELECTED_ROWS_CHANGE = 'RECEIVED_MESSAGES_SELECTED_ROWS_CHANGE'
export const RECEIVED_MESSAGES_SEARCH_NO_RESULTS = 'RECEIVED_MESSAGES_SEARCH_NO_RESULTS'
export const RECEIVED_MESSAGES_SEARCH_RESULT = 'RECEIVED_MESSAGES_SEARCH_RESULT'
export const RECEIVED_MESSAGES_MESSAGE_FORM_SHOW = 'RECEIVED_MESSAGES_MESSAGE_FORM_SHOW'
export const RECEIVED_MESSAGES_MESSAGE_FORM_HIDE = 'RECEIVED_MESSAGES_MESSAGE_FORM_HIDE'
export const RECEIVED_MESSAGES_SEARCH_REFRESH = 'RECEIVED_MESSAGES_SEARCH_REFRESH'

export function fetchReceivedMessages(forceRefresh = false) {

    return (dispatch, getState) => {

    //console.log('fetch received messages');
    
        dispatch({type: RECEIVED_MESSAGES_SEARCH_SUBMITTED});
            
        //let messagesSearchUrlNoSlash = getState().messagesSearchUrl.replace(/\/+$/, "");
        
        axios.get('https://scbm.amfdev.co.uk/api/received-messages/', {params: {forceRefresh: forceRefresh}})
        .then(json => catchReceivedMessagesSearchNoResults(json.data, dispatch))
        .then(json => catchReceivedMessagesSearchOtherError(json, dispatch))
        .then(json => doReceivedMessagesSearchSuccess(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: RECEIVED_MESSAGES_SEARCH_UNKNOWN_ERROR
                      })  
                }
        });
                  
    }
    

}

function catchReceivedMessagesSearchNoResults(json, dispatch) {
    //console.log('catchReceivedMessagesSearchNoResults')
    //console.log(json);
    if (json.noResults) {
        dispatch({
                type: RECEIVED_MESSAGES_SEARCH_NO_RESULTS
              })
    
        throw Error(json.error);
                
    }
    
  return json;
}


function catchReceivedMessagesSearchOtherError(json, dispatch) {
    //console.log('catchReceivedMessagesSearchOtherError')
    if (!json.success) {
        dispatch({
                type: RECEIVED_MESSAGES_SEARCH_OTHER_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doReceivedMessagesSearchSuccess(json, dispatch) {
    //console.log('doReceivedMessagesSearchSuccess')
      //console.log(json)
        dispatch({
                type: RECEIVED_MESSAGES_SEARCH_RESULT,
                receivedMessageData: json.messageData
              })
          
            /*dispatch({ type: "SUCCESS_ALERT_SHOW" });
            
            window.setTimeout(()=>{ 
            dispatch({ type: "SUCCESS_ALERT_HIDE" });
            },4000)*/
               
  return json;
}


export function handleReceivedMessagesSelectedRowsChange(selectedReceivedMessages) {
    
    //console.log(selectedReceivedMessages);
    
    return (dispatch, getState) => {
  
        //console.log('dispatch rows change selected messages')
            dispatch({
                type: RECEIVED_MESSAGES_SELECTED_ROWS_CHANGE,
                selectedReceivedMessages: selectedReceivedMessages
            })
       
        if(getState().selectedReceivedMessages && getState().selectedReceivedMessages.length > 0) {
            //console.log('yes selected messages more than 0')
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'block';
            dispatch({
                type: RECEIVED_MESSAGES_MESSAGE_FORM_SHOW
            })
        } else {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
            dispatch({
                type: RECEIVED_MESSAGES_MESSAGE_FORM_HIDE
          })
        }
        
    }
           
}


export function handleReceivedMessagesRefresh() {
      
      return (dispatch, getState) => {
            
            dispatch({type: RECEIVED_MESSAGES_SEARCH_REFRESH});
            
            dispatch(fetchReceivedMessages(true));
      
      }
}