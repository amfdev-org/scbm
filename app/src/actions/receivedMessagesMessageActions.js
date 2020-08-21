import axios from 'axios';

import {
  fetchMyFollowers
  } from '../actions/myFollowersSearchActions'
    
import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'
  
const API_URL = process.env.REACT_APP_API_URL;

export function handleReceivedMessagesMessageChange(event, context) {
  
        const dispatch = context.dispatch;

        const { value } = event.target
        const receivedMessagesMessage = value;
        
            dispatch({
                type: "RECEIVED_MESSAGES_MESSAGE_CHANGE",
                receivedMessagesMessage: receivedMessagesMessage
            })
       
        if(receivedMessagesMessage && receivedMessagesMessage.length > 10) {
            dispatch({
                type: "RECEIVED_MESSAGES_MESSAGE_SUBMIT_ENABLE"
          })
        } else {
            dispatch({
                type: "RECEIVED_MESSAGES_MESSAGE_SUBMIT_DISABLE"
          })
        }

}


export function handleReceivedMessagesMessageSubmit(event, context) {

    const dispatch = context.dispatch;
    const state = context.state;
        
    dispatch({
         type: "RECEIVED_MESSAGES_MESSAGE_SUBMITTED"
       });
           
        axios({
        method: 'post',
        url: API_URL + '/message/',
        headers: {}, 
        data: {
          messageType: "received",
            selectedProfiles: state.selectedReceivedMessages,
            message: state.receivedMessagesMessage,
            searchUrl: state.scProfile,
            isTestMode: state.isTestMode
        }
        })    
        .then(json => catchReceivedMessagesMessageError(json.data, dispatch))
        .then(json => doReceivedMessagesMessageSuccess(json, dispatch, state))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "RECEIVED_MESSAGES_MESSAGE_UNKNOWN_ERROR"
                      })  
                }
        });
                  
    
}


function catchReceivedMessagesMessageError(json, dispatch) {
    //console.log('catchFollowersMessageError')
    if (!json.success) {
        dispatch({
                type: "RECEIVED_MESSAGES_MESSAGE_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function doReceivedMessagesMessageSuccess(json, dispatch, state) {
        
            let successArray = [];
            
                for (let sendResult of json.result) {
         
                  const elementsIndex = state.receivedMessageData.findIndex(element => element.profileUrl === sendResult.profileUrl );
                   
                   let newArray = [...state.receivedMessageData]
                  
                    newArray[elementsIndex] = {...newArray[elementsIndex], messaged: sendResult.messageResult}
             
                        //await console.log(newArray);
                       
                           dispatch({
                             type: "RECEIVED_MESSAGES_MESSAGE_RESULT",
                             receivedMessageData: newArray,
                              toggledReceivedMessagesClearRows: !state.toggledReceivedMessagesClearRows
                           })
                               
                        
                          if (sendResult.messageResult === 'Success' || 'Success - Test') {
                             successArray.push(sendResult.profileUrl);
                          }
                                 
                   
                }
              
                fetchSentMessages(dispatch);
                fetchMyFollowers(dispatch);
                
                if(successArray.length > 0) {
                    
                    dispatch({ type: "SUCCESS_ALERT_SET_TEXT", text: "Message sent to " + successArray.length + " users." });
                
                    dispatch({ type: "SUCCESS_ALERT_SHOW" });
                    
                    window.setTimeout(()=>{ 
                    dispatch({ type: "SUCCESS_ALERT_HIDE" });
                    },4000)
                    
                } else {
           
                    dispatch({ type: "ERROR_ALERT_SET_TEXT", text: "Message not received! Something went wrong." });
                
                    dispatch({ type: "ERROR_ALERT_SHOW" });
                    
                    window.setTimeout(()=>{ 
                    dispatch({ type: "ERROR_ALERT_HIDE" });
                    },4000)
                  
                }
                //return { newArray, successArray };
     
    
}

