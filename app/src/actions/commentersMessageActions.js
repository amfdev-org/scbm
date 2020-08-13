//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

import {
  fetchMyFollowers
  } from '../actions/myFollowersSearchActions'
    
import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'
  
export const COMMENTERS_MESSAGE_CHANGE = 'COMMENTERS_MESSAGE_CHANGE'
export const COMMENTERS_MESSAGE_SUBMIT_ENABLE = 'COMMENTERS_MESSAGE_SUBMIT_ENABLE'
export const COMMENTERS_MESSAGE_SUBMIT_DISABLE = 'COMMENTERS_MESSAGE_SUBMIT_DISABLE'
export const COMMENTERS_MESSAGE_SUBMITTED = 'COMMENTERS_MESSAGE_SUBMITTED'
export const COMMENTERS_MESSAGE_ERROR = 'COMMENTERS_MESSAGE_ERROR'
export const COMMENTERS_MESSAGE_UNKNOWN_ERROR = 'COMMENTERS_MESSAGE_UNKNOWN_ERROR'
export const COMMENTERS_MESSAGE_RESULT = 'COMMENTERS_MESSAGE_RESULT'

export function handleCommentersMessageChange(event) {
    
    return (dispatch, getState) => {
        
        const { value } = event.target
  
            dispatch({
                type: COMMENTERS_MESSAGE_CHANGE,
                commentersMessage: value
            })
       
        if(getState().commentersMessage && getState().commentersMessage.length > 10) {
            dispatch({
                type: COMMENTERS_MESSAGE_SUBMIT_ENABLE
          })
        } else {
            dispatch({
                type: COMMENTERS_MESSAGE_SUBMIT_DISABLE
          })
        }

          
    }
    
}


export function handleCommentersMessageSubmit(event) {
    
    return (dispatch, getState) => {

    dispatch({
         type: COMMENTERS_MESSAGE_SUBMITTED
       });
           
        axios({
        method: 'post',
        url: 'https://scbm.amfdev.co.uk/api/message/',
        headers: {}, 
        data: {
            messageType: "sent",
            selectedProfiles: getState().selectedCommenters,
            message: getState().commentersMessage,
            searchUrl: getState().commentersSearchUrl,
            isTestMode: getState().isTestMode
        }
        })    
        .then(json => catchCommentersMessageError(json.data, dispatch))
        .then(json => dispatch(doCommentersMessageSuccess(json, dispatch, getState)))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: COMMENTERS_MESSAGE_UNKNOWN_ERROR
                      })  
                }
        });
                  
    }
    
}


function catchCommentersMessageError(json, dispatch) {
    console.log('catchCommentersMessageError')
    if (!json.success) {
        dispatch({
                type: COMMENTERS_MESSAGE_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doCommentersMessageSuccess(json, dispatch, getState) {
    
    //console.log('doCommentersMessageSuccess')
    //console.log(json);
    
    return (dispatch, getState) => {
        
            let successArray = [];
            
                for (let sendResult of json.result) {
         
                  const elementsIndex = getState().commenterData.findIndex(element => element.profileUrl === sendResult.recipientProfileUrl );
                   
                   let newArray = [...getState().commenterData]
                  
                    newArray[elementsIndex] = {...newArray[elementsIndex], messaged: sendResult.messageResult}
                  
                   //console.log(newArray);
                   
                        //await console.log(newArray);
                       
                           dispatch({
                             type: COMMENTERS_MESSAGE_RESULT,
                             commenterData: newArray
                           })
                               
                        
                          if (sendResult.messageResult === 'Success' || 'Success - Test') {
                             successArray.push(sendResult.recipientProfileUrl);
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
