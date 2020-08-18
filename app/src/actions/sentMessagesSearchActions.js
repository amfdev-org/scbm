import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function fetchSentMessages(dispatch) {

      //console.log('fetch sent messages');
    
        //let messagesSearchUrlNoSlash = state.messagesSearchUrl.replace(/\/+$/, "");
        
        axios.get(API_URL + '/sent-messages/')
        .then(json => catchSentMessagesSearchNoResults(json.data, dispatch))
        .then(json => catchSentMessagesSearchOtherError(json, dispatch))
        .then(json => doSentMessagesSearchSuccess(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "SENT_MESSAGES_SEARCH_UNKNOWN_ERROR"
                      })  
                }
        });
                  
}

function catchSentMessagesSearchNoResults(json, dispatch) {
    //console.log('catchSentMessagesSearchNoResults')
    //console.log(json);
    if (json.noResults) {
        dispatch({
                type: "SENT_MESSAGES_SEARCH_NO_RESULTS"
              })
    
        throw Error(json.error);
                
    }
    
  return json;
}


function catchSentMessagesSearchOtherError(json, dispatch) {
    //console.log('catchSentMessagesSearchOtherError')
    if (!json.success) {
        dispatch({
                type: "SENT_MESSAGES_SEARCH_OTHER_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function doSentMessagesSearchSuccess(json, dispatch) {
    //console.log('doMessagesSearchSuccess')
 
        dispatch({
                type: "SENT_MESSAGES_SEARCH_RESULT",
                sentMessageData: json.messageData
              })
          
            /*dispatch({ type: "SUCCESS_ALERT_SHOW" });
            
            window.setTimeout(()=>{ 
            dispatch({ type: "SUCCESS_ALERT_HIDE" });
            },4000)*/
               
  return json;
}


export function handleSentMessagesSelectedRowsChange(selectedSentMessages, context) {

        const dispatch = context.dispatch;

        //console.log('dispatch rows change selected messages')
            dispatch({
                type: "SENT_MESSAGES_SELECTED_ROWS_CHANGE",
                selectedSentMessages: selectedSentMessages
            })
       
        if(selectedSentMessages && selectedSentMessages.length > 0) {
            //console.log('yes selected messages more than 0')
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'block';
            dispatch({
                type: "SENT_MESSAGES_MESSAGE_FORM_SHOW"
            })
        } else {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
            dispatch({
                type: "SENT_MESSAGES_MESSAGE_FORM_HIDE"
          })
        }
        
           
}
