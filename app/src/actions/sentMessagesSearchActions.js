import axios from 'axios';

export const SENT_MESSAGES_SEARCH_SUBMITTED = 'SENT_MESSAGES_SEARCH_SUBMITTED'
export const SENT_MESSAGES_SEARCH_OTHER_ERROR = 'SENT_MESSAGES_SEARCH_OTHER_ERROR'
export const SENT_MESSAGES_SEARCH_UNKNOWN_ERROR = 'SENT_MESSAGES_SEARCH_UNKNOWN_ERROR'
export const SENT_MESSAGES_SELECTED_ROWS_CHANGE = 'SENT_MESSAGES_SELECTED_ROWS_CHANGE'
export const SENT_MESSAGES_SEARCH_NO_RESULTS = 'SENT_MESSAGES_SEARCH_NO_RESULTS'
export const SENT_MESSAGES_SEARCH_RESULT = 'SENT_MESSAGES_SEARCH_RESULT'
export const SENT_MESSAGES_MESSAGE_FORM_SHOW = 'SENT_MESSAGES_MESSAGE_FORM_SHOW'
export const SENT_MESSAGES_MESSAGE_FORM_HIDE = 'SENT_MESSAGES_MESSAGE_FORM_HIDE'


export function fetchSentMessages() {

    return (dispatch, getState) => {

    //console.log('fetch sent messages');
    
        //let messagesSearchUrlNoSlash = getState().messagesSearchUrl.replace(/\/+$/, "");
        
        axios.get('https://scbm.amfdev.co.uk/api/sent-messages/')
        .then(json => catchSentMessagesSearchNoResults(json.data, dispatch))
        .then(json => catchSentMessagesSearchOtherError(json, dispatch))
        .then(json => doSentMessagesSearchSuccess(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: SENT_MESSAGES_SEARCH_UNKNOWN_ERROR
                      })  
                }
        });
                  
    }
    

}

function catchSentMessagesSearchNoResults(json, dispatch) {
    //console.log('catchSentMessagesSearchNoResults')
    //console.log(json);
    if (json.noResults) {
        dispatch({
                type: SENT_MESSAGES_SEARCH_NO_RESULTS
              })
    
        throw Error(json.error);
                
    }
    
  return json;
}


function catchSentMessagesSearchOtherError(json, dispatch) {
    //console.log('catchSentMessagesSearchOtherError')
    if (!json.success) {
        dispatch({
                type: SENT_MESSAGES_SEARCH_OTHER_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doSentMessagesSearchSuccess(json, dispatch) {
    //console.log('doMessagesSearchSuccess')
 
        dispatch({
                type: SENT_MESSAGES_SEARCH_RESULT,
                sentMessageData: json.messageData
              })
          
            /*dispatch({ type: "SUCCESS_ALERT_SHOW" });
            
            window.setTimeout(()=>{ 
            dispatch({ type: "SUCCESS_ALERT_HIDE" });
            },4000)*/
               
  return json;
}


export function handleSentMessagesSelectedRowsChange(selectedSentMessages) {
    
    //console.log(selectedSentMessages);
    
    return (dispatch, getState) => {
  
        //console.log('dispatch rows change selected messages')
            dispatch({
                type: SENT_MESSAGES_SELECTED_ROWS_CHANGE,
                selectedSentMessages: selectedSentMessages
            })
       
        if(getState().selectedSentMessages && getState().selectedSentMessages.length > 0) {
            console.log('yes selected messages more than 0')
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'block';
            dispatch({
                type: SENT_MESSAGES_MESSAGE_FORM_SHOW
            })
        } else {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
            dispatch({
                type: SENT_MESSAGES_MESSAGE_FORM_HIDE
          })
        }
        
    }
           
}
