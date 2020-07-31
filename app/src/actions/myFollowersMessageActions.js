//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'
  
export const MY_FOLLOWERS_MESSAGE_CHANGE = 'MY_FOLLOWERS_MESSAGE_CHANGE'
export const MY_FOLLOWERS_MESSAGE_SUBMIT_ENABLE = 'MY_FOLLOWERS_MESSAGE_SUBMIT_ENABLE'
export const MY_FOLLOWERS_MESSAGE_SUBMIT_DISABLE = 'MY_FOLLOWERS_MESSAGE_SUBMIT_DISABLE'
export const MY_FOLLOWERS_MESSAGE_SUBMITTED = 'MY_FOLLOWERS_MESSAGE_SUBMITTED'
export const MY_FOLLOWERS_MESSAGE_ERROR = 'MY_FOLLOWERS_MESSAGE_ERROR'
export const MY_FOLLOWERS_MESSAGE_UNKNOWN_ERROR = 'MY_FOLLOWERS_MESSAGE_UNKNOWN_ERROR'
export const MY_FOLLOWERS_MESSAGE_RESULT = 'MY_FOLLOWERS_MESSAGE_RESULT'

export function handleMyFollowersMessageChange(event) {
    
    return (dispatch, getState) => {
        
        const { value } = event.target
  
            dispatch({
                type: MY_FOLLOWERS_MESSAGE_CHANGE,
                myFollowersMessage: value
            })
       
        if(getState().myFollowersMessage && getState().myFollowersMessage.length > 10) {
            dispatch({
                type: MY_FOLLOWERS_MESSAGE_SUBMIT_ENABLE
          })
        } else {
            dispatch({
                type: MY_FOLLOWERS_MESSAGE_SUBMIT_DISABLE
          })
        }

          
    }
    
}


export function handleMyFollowersMessageSubmit(event) {
    
    return (dispatch, getState) => {

    dispatch({
         type: MY_FOLLOWERS_MESSAGE_SUBMITTED
       });
           
        axios({
        method: 'post',
        url: 'https://scbm.amfdev.co.uk/api/message/',
        headers: {}, 
        data: {
            messageType: "sent",
            selectedProfiles: getState().selectedMyFollowers,
            message: getState().myFollowersMessage,
            searchUrl: getState().scProfile,
            isTestMode: getState().isTestMode
        }
        })    
        .then(json => catchMyFollowersMessageError(json.data, dispatch))
        .then(json => dispatch(doMyFollowersMessageSuccess(json, dispatch, getState)))
        .catch(error => {

                if (error.response) {
                    console.log('catch catch error.response in my followers messageactions')
                      dispatch({
                          type: MY_FOLLOWERS_MESSAGE_UNKNOWN_ERROR
                      })  
                }
        });
                  
    }
    
}


function catchMyFollowersMessageError(json, dispatch) {
    console.log('catch catchMyFollowersMessageError')
    if (!json.success) {
        dispatch({
                type: MY_FOLLOWERS_MESSAGE_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doMyFollowersMessageSuccess(json, dispatch, getState) {
    
    return (dispatch, getState) => {
        
            let successArray = [];
            
                for (let sendResult of json.result) {
         
                  const elementsIndex = getState().myFollowerData.findIndex(element => element.profileUrl === sendResult.recipientProfileUrl );
                   
                   let newArray = [...getState().myFollowerData]
                  
                    newArray[elementsIndex] = {...newArray[elementsIndex], messaged: sendResult.messageResult}
             
                        //await console.log(newArray);
                       
                           dispatch({
                             type: MY_FOLLOWERS_MESSAGE_RESULT,
                             myFollowerData: newArray
                           })
                               
                        
                          if (sendResult.messageResult === 'Success') {
                             successArray.push(sendResult.recipientProfileUrl);
                          }
                                 
                   
                }
              
                dispatch(fetchSentMessages());
                //dispatch(fetchMyFollowers());
                        
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
