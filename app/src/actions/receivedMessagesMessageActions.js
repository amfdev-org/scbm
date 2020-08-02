//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

import {
  fetchMyFollowers
  } from '../actions/myFollowersSearchActions'
    
import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'
  

export const RECEIVED_MESSAGES_MESSAGE_CHANGE = 'RECEIVED_MESSAGES_MESSAGE_CHANGE'
export const RECEIVED_MESSAGES_MESSAGE_SUBMIT_ENABLE = 'RECEIVED_MESSAGES_MESSAGE_SUBMIT_ENABLE'
export const RECEIVED_MESSAGES_MESSAGE_SUBMIT_DISABLE = 'RECEIVED_MESSAGES_MESSAGE_SUBMIT_DISABLE'
export const RECEIVED_MESSAGES_MESSAGE_SUBMITTED = 'RECEIVED_MESSAGES_MESSAGE_SUBMITTED'
export const RECEIVED_MESSAGES_MESSAGE_ERROR = 'RECEIVED_MESSAGES_MESSAGE_ERROR'
export const RECEIVED_MESSAGES_MESSAGE_UNKNOWN_ERROR = 'RECEIVED_MESSAGES_MESSAGE_UNKNOWN_ERROR'
export const RECEIVED_MESSAGES_MESSAGE_RESULT = 'RECEIVED_MESSAGES_MESSAGE_RESULT'

export function handleReceivedMessagesMessageChange(event) {
    
    return (dispatch, getState) => {
        
        const { value } = event.target
  
            dispatch({
                type: RECEIVED_MESSAGES_MESSAGE_CHANGE,
                receivedMessagesMessage: value
            })
       
        if(getState().receivedMessagesMessage && getState().receivedMessagesMessage.length > 10) {
            dispatch({
                type: RECEIVED_MESSAGES_MESSAGE_SUBMIT_ENABLE
          })
        } else {
            dispatch({
                type: RECEIVED_MESSAGES_MESSAGE_SUBMIT_DISABLE
          })
        }

          
    }
    
}


export function handleReceivedMessagesMessageSubmit(event) {
    
    return (dispatch, getState) => {

    dispatch({
         type: RECEIVED_MESSAGES_MESSAGE_SUBMITTED
       });
           
        axios({
        method: 'post',
        url: 'https://scbm.amfdev.co.uk/api/message/',
        headers: {}, 
        data: {
          messageType: "received",
            selectedProfiles: getState().selectedReceivedMessages,
            message: getState().receivedMessagesMessage,
            searchUrl: getState().scProfile,
            isTestMode: getState().isTestMode
        }
        })    
        .then(json => catchReceivedMessagesMessageError(json.data, dispatch))
        .then(json => dispatch(doReceivedMessagesMessageSuccess(json, dispatch, getState)))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: RECEIVED_MESSAGES_MESSAGE_UNKNOWN_ERROR
                      })  
                }
        });
                  
    }
    
}


function catchReceivedMessagesMessageError(json, dispatch) {
    //console.log('catchFollowersMessageError')
    if (!json.success) {
        dispatch({
                type: RECEIVED_MESSAGES_MESSAGE_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doReceivedMessagesMessageSuccess(json, dispatch, getState) {
    
    return (dispatch, getState) => {
        
            let successArray = [];
            
                for (let sendResult of json.result) {
         
                  const elementsIndex = getState().receivedMessageData.findIndex(element => element.profileUrl === sendResult.profileUrl );
                   
                   let newArray = [...getState().receivedMessageData]
                  
                    newArray[elementsIndex] = {...newArray[elementsIndex], messaged: sendResult.messageResult}
             
                        //await console.log(newArray);
                       
                           dispatch({
                             type: RECEIVED_MESSAGES_MESSAGE_RESULT,
                             receivedMessageData: newArray
                           })
                               
                        
                          if (sendResult.messageResult === 'Success' || 'Success - Test') {
                             successArray.push(sendResult.profileUrl);
                          }
                                 
                   
                }
              
                dispatch(fetchSentMessages());
                dispatch(fetchMyFollowers());
                
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
    
}

