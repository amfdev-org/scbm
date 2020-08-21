import axios from 'axios';

import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'
  
const API_URL = process.env.REACT_APP_API_URL;

export function handleMyFollowersMessageChange(event, context) {

        const dispatch = context.dispatch;
        
        const { value } = event.target
   
        const myFollowersMessage = value;
        
            dispatch({
                type: "MY_FOLLOWERS_MESSAGE_CHANGE",
                myFollowersMessage: myFollowersMessage
            })
       
        if(myFollowersMessage && myFollowersMessage.length > 10) {
            dispatch({
                type: "MY_FOLLOWERS_MESSAGE_SUBMIT_ENABLE"
          })
        } else {
            dispatch({
                type: "MY_FOLLOWERS_MESSAGE_SUBMIT_DISABLE"
          })
        }

    
}


export function handleMyFollowersMessageSubmit(event, context) {

    //console.log('handleMyFollowersMessageSubmit')
    //console.log(event);

    const dispatch = context.dispatch;
    const state = context.state;
    

    dispatch({
         type: "MY_FOLLOWERS_MESSAGE_SUBMITTED"
       });
           
        axios({
        method: 'post',
        url: API_URL + '/message/',
        headers: {}, 
        data: {
            messageType: "sent",
            selectedProfiles: state.selectedMyFollowers,
            message: state.myFollowersMessage,
            searchUrl: state.scProfile,
            isTestMode: state.isTestMode
        }
        })    
        .then(json => catchMyFollowersMessageError(json.data, dispatch))
        .then(json => doMyFollowersMessageSuccess(json, dispatch, state))
        .catch(error => {

                if (error.response) {
                    console.log('catch catch error.response in my followers messageactions')
                      dispatch({
                          type: "MY_FOLLOWERS_MESSAGE_UNKNOWN_ERROR"
                      })  
                }
        });
                
    
}


function catchMyFollowersMessageError(json, dispatch) {
    //console.log(json)
    //console.log('catch catchMyFollowersMessageError')
    if (!json.success) {
        dispatch({
                type: "MY_FOLLOWERS_MESSAGE_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function doMyFollowersMessageSuccess(json, dispatch, state) {
        
            let successArray = [];
            
                for (let sendResult of json.result) {
         
                  const elementsIndex = state.myFollowerData.findIndex(element => element.profileUrl === sendResult.recipientProfileUrl );
                   
                   let newArray = [...state.myFollowerData]
                  
                    newArray[elementsIndex] = {...newArray[elementsIndex], messaged: sendResult.messageResult}
             
                        //await console.log(newArray);
                       
                           dispatch({
                             type: "MY_FOLLOWERS_MESSAGE_RESULT",
                             myFollowerData: newArray,
                             toggledMyFollowersClearRows: !state.toggledMyFollowersClearRows
                           })
                               
                        
                          if (sendResult.messageResult === 'Success' || "Success - Test") {
                             successArray.push(sendResult.recipientProfileUrl);
                          }
                                 
                   
                }
              
                fetchSentMessages(dispatch);
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
