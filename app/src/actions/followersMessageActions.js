//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

import {
  fetchMyFollowers
  } from '../actions/myFollowersSearchActions'
    
import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'

export const FOLLOWERS_MESSAGE_CHANGE = 'FOLLOWERS_MESSAGE_CHANGE'
export const FOLLOWERS_MESSAGE_SUBMIT_ENABLE = 'FOLLOWERS_MESSAGE_SUBMIT_ENABLE'
export const FOLLOWERS_MESSAGE_SUBMIT_DISABLE = 'FOLLOWERS_MESSAGE_SUBMIT_DISABLE'
export const FOLLOWERS_MESSAGE_SUBMITTED = 'FOLLOWERS_MESSAGE_SUBMITTED'
export const FOLLOWERS_MESSAGE_ERROR = 'FOLLOWERS_MESSAGE_ERROR'
export const FOLLOWERS_MESSAGE_UNKNOWN_ERROR = 'FOLLOWERS_MESSAGE_UNKNOWN_ERROR'
export const FOLLOWERS_MESSAGE_RESULT = 'FOLLOWERS_MESSAGE_SUCCESS'

export function handleFollowersMessageChange(event) {
    
    return (dispatch, getState) => {
        
        const { value } = event.target
  
            dispatch({
                type: FOLLOWERS_MESSAGE_CHANGE,
                followersMessage: value
            })
       
        if(getState().followersMessage && getState().followersMessage.length > 10) {
            dispatch({
                type: FOLLOWERS_MESSAGE_SUBMIT_ENABLE
          })
        } else {
            dispatch({
                type: FOLLOWERS_MESSAGE_SUBMIT_DISABLE
          })
        }

          
    }
    
}


export function handleFollowersMessageSubmit(event) {
    
    return (dispatch, getState) => {

    dispatch({
         type: FOLLOWERS_MESSAGE_SUBMITTED
       });
           
        axios({
        method: 'post',
        url: 'https://scbm.amfdev.co.uk/api/message/',
        headers: {}, 
        data: {
            messageType: "sent",
            selectedProfiles: getState().selectedFollowers,
            message: getState().followersMessage,
            searchUrl: getState().followersSearchUrl                     
        }
        })    
        .then(json => catchFollowersMessageError(json.data, dispatch))
        .then(json => dispatch(doFollowersMessageSuccess(json, dispatch, getState)))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: FOLLOWERS_MESSAGE_UNKNOWN_ERROR
                      })  
                }
        });
                  
    }
    
}


function catchFollowersMessageError(json, dispatch) {
    //console.log('catchFollowersMessageError')
    if (!json.success) {
        dispatch({
                type: FOLLOWERS_MESSAGE_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doFollowersMessageSuccess(json, dispatch, getState) {
    
    return (dispatch, getState) => {
        
            let successArray = [];
            
                for (let sendResult of json.result) {
         
                  const elementsIndex = getState().followerData.findIndex(element => element.profileUrl === sendResult.recipientProfileUrl );
                   
                   let newArray = [...getState().followerData]
                  
                    newArray[elementsIndex] = {...newArray[elementsIndex], messaged: sendResult.messageResult}
             
                        //await console.log(newArray);
                       
                           dispatch({
                             type: FOLLOWERS_MESSAGE_RESULT,
                             followerData: newArray
                           })
                               
                        
                          if (sendResult.messageResult === 'Success') {
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