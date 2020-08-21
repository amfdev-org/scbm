//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

import {
  fetchMyFollowers
  } from '../actions/myFollowersSearchActions'
    
import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'

const API_URL = process.env.REACT_APP_API_URL;

export function handleFollowersMessageChange(event, context) {
    
    const dispatch = context.dispatch;

        const { value } = event.target
  
        const followersMessage = value;
  
        dispatch({
            type: "FOLLOWERS_MESSAGE_CHANGE",
            followersMessage: followersMessage
        })
       
        if(followersMessage && followersMessage.length > 10) {
            dispatch({
                type: "FOLLOWERS_MESSAGE_SUBMIT_ENABLE"
          })
        } else {
            dispatch({
                type: "FOLLOWERS_MESSAGE_SUBMIT_DISABLE"
          })
        }
  
}


export function handleFollowersMessageSubmit(event, context) {

    const dispatch = context.dispatch;
    const state = context.state;
    
    dispatch({
         type: "FOLLOWERS_MESSAGE_SUBMITTED"
       });
           
        axios({
        method: 'post',
        url: API_URL + '/message/',
        headers: {}, 
        data: {
            messageType: "sent",
            selectedProfiles: state.selectedFollowers,
            message: state.followersMessage,
            searchUrl: state.followersSearchUrl,
            isTestMode: state.isTestMode
        }
        })    
        .then(json => catchFollowersMessageError(json.data, dispatch))
        .then(json => doFollowersMessageSuccess(json, dispatch, state))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "FOLLOWERS_MESSAGE_UNKNOWN_ERROR"
                      })  
                }
        });
                  
}


function catchFollowersMessageError(json, dispatch) {
    //console.log('catchFollowersMessageError')
    if (!json.success) {
        dispatch({
                type: "FOLLOWERS_MESSAGE_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function doFollowersMessageSuccess(json, dispatch, state) {
    
            let successArray = [];
            
                for (let sendResult of json.result) {
         
                  const elementsIndex = state.followerData.findIndex(element => element.profileUrl === sendResult.recipientProfileUrl );
                   
                   let newArray = [...state.followerData]
                  
                    newArray[elementsIndex] = {...newArray[elementsIndex], messaged: sendResult.messageResult}
             
                        //await console.log(newArray);
                       
                           dispatch({
                              type: "FOLLOWERS_MESSAGE_RESULT",
                              followerData: newArray,
                              toggledFollowersClearRows: !state.toggledFollowersClearRows
                           })
                               
                        
                          if (sendResult.messageResult === 'Success' || "Success - Test") {
                             successArray.push(sendResult.recipientProfileUrl);
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
           
                    dispatch({ type: "ERROR_ALERT_SET_TEXT", text: "Message not sent! Something went wrong." });
                
                    dispatch({ type: "ERROR_ALERT_SHOW" });
                    
                    window.setTimeout(()=>{ 
                    dispatch({ type: "ERROR_ALERT_HIDE" });
                    },4000)
                  
                }
                    
                    
                //return { newArray, successArray };
    
}