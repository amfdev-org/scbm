//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

import {
  fetchMyFollowers
  } from '../actions/myFollowersSearchActions'
    
import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'
  

export function handleCommentersMessageChange(event, context) {
        
        const dispatch = context.dispatch;
        
        const { value } = event.target
  
        const commentersMessage = value;
    
            dispatch({
                type: "COMMENTERS_MESSAGE_CHANGE",
                commentersMessage: commentersMessage
            })
       
        if(commentersMessage && commentersMessage.length > 10) {
            dispatch({
                type: "COMMENTERS_MESSAGE_SUBMIT_ENABLE"
          })
        } else {
            dispatch({
                type: "COMMENTERS_MESSAGE_SUBMIT_DISABLE"
          })
        }

}


export function handleCommentersMessageSubmit(event, context) {

    const dispatch = context.dispatch;
    const state = context.state;

    dispatch({
         type: "COMMENTERS_MESSAGE_SUBMITTED"
       });
           
        axios({
        method: 'post',
        url: 'https://scbm.amfdev.co.uk/api/message/',
        headers: {}, 
        data: {
            messageType: "sent",
            selectedProfiles: state.selectedCommenters,
            message: state.commentersMessage,
            searchUrl: state.commentersSearchUrl,
            isTestMode: state.isTestMode
        }
        })    
        .then(json => catchCommentersMessageError(json.data, dispatch))
        .then(json => doCommentersMessageSuccess(json, dispatch, state))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "COMMENTERS_MESSAGE_UNKNOWN_ERROR"
                      })  
                }
        });
                  
    
}


function catchCommentersMessageError(json, dispatch) {
    console.log('catchCommentersMessageError')
    if (!json.success) {
        dispatch({
                type: "COMMENTERS_MESSAGE_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function doCommentersMessageSuccess(json, dispatch, state) {
    
    //console.log('doCommentersMessageSuccess')
    //console.log(json);
        
            let successArray = [];
            
                for (let sendResult of json.result) {
         
                  const elementsIndex = state.commenterData.findIndex(element => element.profileUrl === sendResult.recipientProfileUrl );
                   
                   let newArray = [...state.commenterData]
                  
                    newArray[elementsIndex] = {...newArray[elementsIndex], messaged: sendResult.messageResult}
                  
                   //console.log(newArray);
                   
                        //await console.log(newArray);
                       
                           dispatch({
                             type: "COMMENTERS_MESSAGE_RESULT",
                             commenterData: newArray
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