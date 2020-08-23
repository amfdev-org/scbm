import axios from 'axios';

import {
  fetchMyFollowers
  } from '../actions/myFollowersSearchActions'
    
import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'
  
const API_URL = process.env.REACT_APP_API_URL;

export function handleSentMessagesMessageChange(event, context) {
  
      const dispatch = context.dispatch;

        const { value } = event.target
        const sentMessagesMessage = value;
          
            dispatch({
                type: "SENT_MESSAGES_MESSAGE_CHANGE",
                sentMessagesMessage: sentMessagesMessage
            })
       
        if(sentMessagesMessage && sentMessagesMessage.length > 10) {
            dispatch({
                type: "SENT_MESSAGES_MESSAGE_SUBMIT_ENABLE"
          })
        } else {
            dispatch({
                type: "SENT_MESSAGES_MESSAGE_SUBMIT_DISABLE"
          })
        }
    
}


export function handleSentMessagesMessageSubmit(event, context) {

  const dispatch = context.dispatch;
    const state = context.state;
        
    const alertMessageType = state.isTestMode ? "test" : "live";
    const alertMessageExplanation = state.isTestMode ? "You can deactivate test mode in settings." : "";
    
        dispatch({
          type: "SENT_MESSAGES_MESSAGE_SUBMITTED"
        });
           
        dispatch({type: "INFO_ALERT_SET_TEXT",
                 text: "Sending message to "+ state.selectedSentMessages.length + " recipients in " + alertMessageType + " mode. " + alertMessageExplanation});
        
        dispatch({type: "INFO_ALERT_SET_TEXT_HEADING", textHeading: "Please sit tight!"});
        dispatch({type: "INFO_ALERT_SHOW" });
         dispatch({type: "INFO_ALERT_SPINNER_SHOW" });
           
        axios({
        method: 'post',
        url: API_URL + '/message/',
        headers: {}, 
        data: {
            messageType: "sent",
            selectedProfiles: state.selectedSentMessages,
            message: state.sentMessagesMessage,
            searchUrl: state.scProfile,
            isTestMode: state.isTestMode
        }
        })    
        .then(json => catchSentMessagesMessageError(json.data, dispatch))
        .then(json => doSentMessagesMessageSuccess(json, dispatch, state))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "SENT_MESSAGES_MESSAGE_UNKNOWN_ERROR"
                      })  
                }
        });
                  
    }
    


function catchSentMessagesMessageError(json, dispatch) {
    //console.log('catchFollowersMessageError')
    dispatch({ type: "INFO_ALERT_HIDE" });
     dispatch({type: "INFO_ALERT_SPINNER_HIDE" });
     
    if (!json.success) {
        dispatch({
                type: "SENT_MESSAGES_MESSAGE_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function doSentMessagesMessageSuccess(json, dispatch, state) {

            let successArray = [];
            
                for (let sendResult of json.result) {
         
                  const elementsIndex = state.sentMessageData.findIndex(element => element.profileUrl === sendResult.profileUrl );
                   
                   let newArray = [...state.sentMessageData]
                  
                    newArray[elementsIndex] = {...newArray[elementsIndex], messaged: sendResult.messageResult}
             
                        //await console.log(newArray);
                       
                           dispatch({
                             type: "SENT_MESSAGES_MESSAGE_RESULT",
                             sentMessageData: newArray,
                             toggledSentMessagesClearRows: !state.toggledSentMessagesClearRows
                           })
                               
                        
                          if (sendResult.messageResult === 'Success' || "Success - Test") {
                             successArray.push(sendResult.profileUrl);
                          }
                                 
                   
                }
              
                fetchSentMessages(dispatch);           
                fetchMyFollowers(dispatch);
                
                const alertMessage = state.isTestMode ? "Message would have been sent to " + successArray.length + " users."  : "Message sent to " + successArray.length + " users.";
                const alertMessageExplanation = state.isTestMode ? "You can deactivate test mode in settings." : "";   
    
                if(successArray.length > 0) {
                    
                    dispatch({ type: "SUCCESS_ALERT_SET_TEXT", text: alertMessage +  " " + alertMessageExplanation});
                
                    dispatch({ type: "SUCCESS_ALERT_SHOW" });
                    
                    window.setTimeout(()=>{ 
                    dispatch({ type: "SUCCESS_ALERT_HIDE" });
                    },4000)
                    
                } else {
           
                    dispatch({ type: "ERROR_ALERT_SET_TEXT", text: "Message not sent! Something went wrong." });
                
                    dispatch({ type: "ERROR_ALERT_SHOW" });
                    
                    window.setTimeout(()=>{ 
                    dispatch({ type: "ERROR_ALERT_HIDE" });
                    },4000)
                  
                }
                //return { newArray, successArray };
     
}
