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

    console.log('fetch sent messages');
    
        //let messagesSearchUrlNoSlash = getState().messagesSearchUrl.replace(/\/+$/, "");
        
        axios.get('https://scbm.amfdev.co.uk/api/message/')
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
    console.log('catchSentMessagesSearchNoResults')
    console.log(json);
    if (json.noResults) {
        dispatch({
                type: SENT_MESSAGES_SEARCH_NO_RESULTS
              })
    
        throw Error(json.error);
                
    }
    
  return json;
}


function catchSentMessagesSearchOtherError(json, dispatch) {
    console.log('catchSentMessagesSearchOtherError')
    if (!json.success) {
        dispatch({
                type: SENT_MESSAGES_SEARCH_OTHER_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doSentMessagesSearchSuccess(json, dispatch) {
    console.log('doMessagesSearchSuccess')
 
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
    
    console.log(selectedSentMessages);
    
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


/*
 //console.log('do mymessages');
    fetch('https://scbm.amfdev.co.uk/api/mymessages/', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    })
    .then(async response => {
    
            if (!response.ok) {
                 //throw Error(response.statusText);
                  this.setState({errorAlertText: "Something went wrong. Please try again later."});
                  this.setState({showErrorAlert: true}); 
             }
        
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            // check for error response
            if (jsonResponse.errorMessage) {
                // get error message from body or default to response status
                //const error = (commenterData && commenterData.message) || response.status;
                console.log(jsonResponse.errorMessage);
                return Promise.reject(jsonResponse.errorMessage);
                
            } else {
              
                if (jsonResponse.mymessagesResult === true) {
                    
                    this.setState({showCommentersSearchForm: true});
                    
                    this.setState({showLoggedInInfo: true});
                    this.setState({showLogoutSubmitButton: true});
                    this.setState({loggedInInfoText: jsonResponse.userData.scUsername});
                         
                    this.setState({successAlertText: "We logged you in!" });
                    
                        this.setState({showSuccessAlert: true},()=>{
                          window.setTimeout(()=>{
                            this.setState({showSuccessAlert: false})
                          },2000)
                        });
                                     
                } else {
                       
                        if (jsonResponse.scCookiesValid === false) {
                          
                              this.setState({showLoginForm: false});
                              this.setState({errorAlertText: "Credentials invalid. Please contact support." });
                              this.setState({showErrorAlert: true});
                              
                        } else {
                          
                              this.setState({showLoginForm: true});
                        
                              this.setState({infoAlertTextHeading: "Welcome" });
                              this.setState({infoAlertText: "Please log in." });
                        
                              this.setState({showInfoAlert: true});
                      
                        }                  
                  
                          
                }
    
            }
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);

        });
        
        */