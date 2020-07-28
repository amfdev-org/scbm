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
            searchUrl: getState().commentersSearchUrl                     
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
    
    console.log('doCommentersMessageSuccess')
    console.log(json);
    
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
    
    this.setState({ enableCommentersSearchSubmitButton: false})
    this.setState({ enableCommentersSearchInput: false})

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({selectedCommenters: this.state.selectedCommenters,
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
                //const error = (commenterData && commenterData.message) || response.status;
                await console.log(jsonResponse.errorMessage);
                return Promise.reject(jsonResponse.errorMessage);
                
            } else {
                          
              let successArray = [];
              
              for (let sendResult of jsonResponse) {
                //console.log(sendResult)
      
                const elementsIndex = await this.state.commenterData.findIndex(element => element.profileUrl === sendResult.profileUrl );
                 
                 let newArray = await [...this.state.commenterData]
                 
                  newArray[elementsIndex] = await {...newArray[elementsIndex], messaged: sendResult.messageResult}
                
                      //await console.log(newArray);
                      
                      await this.setState({
                      commenterData: newArray,
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
    
              this.setState({ enableCommentersSearchSubmitButton: true})
              this.setState({ enableCommentersSearchInput: true})
                      
            }
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            this.setState({ showMessageSubmitButton: true })
            this.setState({ showMessageSubmitLoadingButton: false })
            this.setState({ enableMessageInput: true })
             
            this.setState({ enableCommentersSearchSubmitButton: true})
            this.setState({ enableCommentersSearchInput: true})
              
            this.setState({errorAlertText: "Something went wrong."});
              
              
              this.setState({showErrorAlert: true},()=>{
                window.setTimeout(()=>{
                  this.setState({showErrorAlert: false})
                },4000)
              });
                    
        });
                
        
  }
  */