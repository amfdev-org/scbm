//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

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
            selectedProfiles: getState().selectedSentMessages,
            message: getState().sentMessagesMessage,
            searchUrl: getState().scProfile                     
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


/*
handleMessageChange = (changeEvent) => {
      
      //console.log(changeEvent.target.value);
    
        this.setState({message: changeEvent.target.value}, () => {
        
          if (this.state.message.length > 10) {
            this.setState({enableMessageSubmitButton: true}, () => {   
              //console.log(this.state);
            })
          } else {
             this.setState({enableMessageSubmitButton: false}, () => {   
              //console.log(this.state);
            })
          }
          
        })
                  
  }
  
  
  handleMessageSubmit = async () => {
    
    this.setState({ showMessageSubmitButton: false })
    this.setState({ enableMessageInput: false })
    this.setState({ showMessageSubmitLoadingButton: true })
    
    this.setState({ enableFollowersSearchSubmitButton: false})
    this.setState({ enableFollowersSearchInput: false})

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({selectedFollowers: this.state.selectedFollowers,
                             message: this.state.message,
                             searchUrl: this.state.searchUrl})
    };
    fetch('https://scbm.amfdev.co.uk/api/message/', requestOptions)
          .then(async response => {
            
            if (!response.ok) {
               //throw Error(response.statusText);
                this.setState({errorAlertText: "Something went wrong. Please try again later."});
                this.setState({showErrorAlert: true}); 
            }
                
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            // check for error response
            if (jsonResponse.errorMessage) {
                // get error message from body or default to response status
                //const error = (sentMessageData && sentMessageData.message) || response.status;
                await console.log(jsonResponse.errorMessage);
                return Promise.reject(jsonResponse.errorMessage);
                
            } else {
                          
              let successArray = [];
              
              for (let sendResult of jsonResponse) {
                //console.log(sendResult)
      
                const elementsIndex = await this.state.sentMessageData.findIndex(element => element.profileUrl === sendResult.profileUrl );
                 
                 let newArray = await [...this.state.sentMessageData]
                 
                  newArray[elementsIndex] = await {...newArray[elementsIndex], messaged: sendResult.messageResult}
                
                      //await console.log(newArray);
                      
                      await this.setState({
                      sentMessageData: newArray,
                      });
                      
                        if (sendResult.messageResult === 'Success') {
                           await successArray.push(sendResult.profileUrl);
                        }
                 
              }
          
              
              this.setState({successAlertText: "Message sent to " + successArray.length + " users." });
              
                this.setState({showSuccessAlert: true},()=>{
                    window.setTimeout(()=>{
                      this.setState({showSuccessAlert: false})
                    },4000)
                  });
               
               
              this.setState({ toggledClearRows: true })
              this.setState({ showMessageSubmitButton: true })
              this.setState({ showMessageSubmitLoadingButton: false })
               this.setState({ enableMessageInput: true })
    
              this.setState({ enableFollowersSearchSubmitButton: true})
              this.setState({ enableFollowersSearchInput: true})
                      
            }
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            this.setState({ showMessageSubmitButton: true })
            this.setState({ showMessageSubmitLoadingButton: false })
            this.setState({ enableMessageInput: true })
             
            this.setState({ enableFollowersSearchSubmitButton: true})
            this.setState({ enableFollowersSearchInput: true})
              
            this.setState({errorAlertText: "Something went wrong."});
              
              
              this.setState({showErrorAlert: true},()=>{
                window.setTimeout(()=>{
                  this.setState({showErrorAlert: false})
                },4000)
              });
                    
        });
                
        
  }
  */