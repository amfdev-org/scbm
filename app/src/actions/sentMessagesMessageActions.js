//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

import {
  fetchMyFollowers
  } from '../actions/myFollowersSearchActions'
    
import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'
  
  
export const SENT_MESSAGES_MESSAGE_CHANGE = 'SENT_MESSAGES_MESSAGE_CHANGE'
export const SENT_MESSAGES_MESSAGE_SUBMIT_ENABLE = 'SENT_MESSAGES_MESSAGE_SUBMIT_ENABLE'
export const SENT_MESSAGES_MESSAGE_SUBMIT_DISABLE = 'SENT_MESSAGES_MESSAGE_SUBMIT_DISABLE'
export const SENT_MESSAGES_MESSAGE_SUBMITTED = 'SENT_MESSAGES_MESSAGE_SUBMITTED'
export const SENT_MESSAGES_MESSAGE_ERROR = 'SENT_MESSAGES_MESSAGE_ERROR'
export const SENT_MESSAGES_MESSAGE_UNKNOWN_ERROR = 'SENT_MESSAGES_MESSAGE_UNKNOWN_ERROR'
export const SENT_MESSAGES_MESSAGE_RESULT = 'SENT_MESSAGES_MESSAGE_RESULT'

export function handleSentMessagesMessageChange(event) {
    
    return (dispatch, getState) => {
        
        const { value } = event.target
  
            dispatch({
                type: SENT_MESSAGES_MESSAGE_CHANGE,
                sentMessagesMessage: value
            })
       
        if(getState().sentMessagesMessage && getState().sentMessagesMessage.length > 10) {
            dispatch({
                type: SENT_MESSAGES_MESSAGE_SUBMIT_ENABLE
          })
        } else {
            dispatch({
                type: SENT_MESSAGES_MESSAGE_SUBMIT_DISABLE
          })
        }

          
    }
    
}


export function handleSentMessagesMessageSubmit(event) {
    
    return (dispatch, getState) => {

    dispatch({
         type: SENT_MESSAGES_MESSAGE_SUBMITTED
       });
           
        axios({
        method: 'post',
        url: 'https://scbm.amfdev.co.uk/api/message/',
        headers: {}, 
        data: {
            messageType: "sent",
            selectedProfiles: getState().selectedSentMessages,
            message: getState().sentMessagesMessage,
            searchUrl: getState().scProfile,
            isTestMode: getState().isTestMode
        }
        })    
        .then(json => catchSentMessagesMessageError(json.data, dispatch))
        .then(json => dispatch(doSentMessagesMessageSuccess(json, dispatch, getState)))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: SENT_MESSAGES_MESSAGE_UNKNOWN_ERROR
                      })  
                }
        });
                  
    }
    
}


function catchSentMessagesMessageError(json, dispatch) {
    //console.log('catchFollowersMessageError')
    if (!json.success) {
        dispatch({
                type: SENT_MESSAGES_MESSAGE_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doSentMessagesMessageSuccess(json, dispatch, getState) {
    
    return (dispatch, getState) => {
        
            let successArray = [];
            
                for (let sendResult of json.result) {
         
                  const elementsIndex = getState().sentMessageData.findIndex(element => element.profileUrl === sendResult.profileUrl );
                   
                   let newArray = [...getState().sentMessageData]
                  
                    newArray[elementsIndex] = {...newArray[elementsIndex], messaged: sendResult.messageResult}
             
                        //await console.log(newArray);
                       
                           dispatch({
                             type: SENT_MESSAGES_MESSAGE_RESULT,
                             sentMessageData: newArray
                           })
                               
                        
                          if (sendResult.messageResult === 'Success') {
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
           
                    dispatch({ type: "ERROR_ALERT_SET_TEXT", text: "Message not sent! Something went wrong." });
                
                    dispatch({ type: "ERROR_ALERT_SHOW" });
                    
                    window.setTimeout(()=>{ 
                    dispatch({ type: "ERROR_ALERT_HIDE" });
                    },4000)
                  
                }
                //return { newArray, successArray };
     
    }
    
}
