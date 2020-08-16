import axios from 'axios';

export function fetchReceivedMessages(forceRefresh = false, dispatch) {

    console.log('fetch received messages');
    
        dispatch({type: "RECEIVED_MESSAGES_SEARCH_SUBMITTED"});
            
        //let messagesSearchUrlNoSlash = state.messagesSearchUrl.replace(/\/+$/, "");
        
        axios.get('https://scbm.amfdev.co.uk/api/received-messages/', {params: {forceRefresh: forceRefresh}})
        .then(json => catchReceivedMessagesSearchNoResults(json.data, dispatch))
        .then(json => catchReceivedMessagesSearchOtherError(json, dispatch))
        .then(json => doReceivedMessagesSearchSuccess(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "RECEIVED_MESSAGES_SEARCH_UNKNOWN_ERROR"
                      })  
                }
        });
            
}

function catchReceivedMessagesSearchNoResults(json, dispatch) {
    //console.log('catchReceivedMessagesSearchNoResults')
    //console.log(json);
    if (json.noResults) {
        dispatch({
                type: "RECEIVED_MESSAGES_SEARCH_NO_RESULTS"
              })
    
        throw Error(json.error);
                
    }
    
  return json;
}


function catchReceivedMessagesSearchOtherError(json, dispatch) {
    //console.log('catchReceivedMessagesSearchOtherError')
    if (!json.success) {
        dispatch({
                type: "RECEIVED_MESSAGES_SEARCH_OTHER_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function doReceivedMessagesSearchSuccess(json, dispatch) {
    //console.log('doReceivedMessagesSearchSuccess')
      //console.log(json)
        dispatch({
                type: "RECEIVED_MESSAGES_SEARCH_RESULT",
                receivedMessageData: json.messageData
              })
          
            /*dispatch({ type: "SUCCESS_ALERT_SHOW" });
            
            window.setTimeout(()=>{ 
            dispatch({ type: "SUCCESS_ALERT_HIDE" });
            },4000)*/
               
  return json;
}


export function handleReceivedMessagesSelectedRowsChange(selectedReceivedMessages, context) {
      
      const dispatch = context.dispatch;
    //console.log(selectedReceivedMessages);

        //console.log('dispatch rows change selected messages')
            dispatch({
                type: "RECEIVED_MESSAGES_SELECTED_ROWS_CHANGE",
                selectedReceivedMessages: selectedReceivedMessages
            })
       
        if(selectedReceivedMessages && selectedReceivedMessages.length > 0) {
            //console.log('yes selected messages more than 0')
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'block';
            dispatch({
                type: "RECEIVED_MESSAGES_MESSAGE_FORM_SHOW"
            })
        } else {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
            dispatch({
                type: "RECEIVED_MESSAGES_MESSAGE_FORM_HIDE"
          })
        }
   
}


export function handleReceivedMessagesRefresh(dispatch) {
        
      dispatch({type: "RECEIVED_MESSAGES_SEARCH_REFRESH"});
      
      fetchReceivedMessages(true, dispatch);

}