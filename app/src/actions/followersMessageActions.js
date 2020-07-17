//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

export const FOLLOWERS_MESSAGE_CHANGE = 'FOLLOWERS_MESSAGE_CHANGE'
export const FOLLOWERS_MESSAGE_SUBMIT_ENABLE = 'FOLLOWERS_MESSAGE_SUBMIT_ENABLE'
export const FOLLOWERS_MESSAGE_SUBMIT_DISABLE = 'FOLLOWERS_MESSAGE_SUBMIT_DISABLE'
export const FOLLOWERS_MESSAGE_SUBMITTED = 'FOLLOWERS_MESSAGE_SUBMITTED'
export const FOLLOWERS_MESSAGE_ERROR = 'FOLLOWERS_MESSAGE_ERROR'
export const FOLLOWERS_MESSAGE_UNKNOWN_ERROR = 'FOLLOWERS_MESSAGE_UNKNOWN_ERROR'
export const FOLLOWERS_MESSAGE_SUCCESS = 'FOLLOWERS_MESSAGE_SUCCESS'
export const FOLLOWERS_MESSAGE_SUCCESS_SEND_COUNT = 'FOLLOWERS_MESSAGE_SUCCESS_SEND_COUNT'


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
         
                  const elementsIndex = getState().followerData.findIndex(element => element.profileUrl === sendResult.profileUrl );
                   
                   let newArray = [...getState().followerData]
                  
                    newArray[elementsIndex] = {...newArray[elementsIndex], messaged: sendResult.messageResult}
             
                        //await console.log(newArray);
                       
                           dispatch({
                             type: FOLLOWERS_MESSAGE_SUCCESS,
                             followerData: newArray
                           })
                               
                        
                          if (sendResult.messageResult === 'Success') {
                             successArray.push(sendResult.profileUrl);
                          }
                          
              
                   
                }
    
                dispatch({
                 type: FOLLOWERS_MESSAGE_SUCCESS_SEND_COUNT,
                 sendCount: successArray.length
               });
                             
                dispatch({ type: "SUCCESS_ALERT_SHOW" });
                
                window.setTimeout(()=>{ 
                dispatch({ type: "SUCCESS_ALERT_HIDE" });
                },4000)
                    
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
                //const error = (followerData && followerData.message) || response.status;
                await console.log(jsonResponse.errorMessage);
                return Promise.reject(jsonResponse.errorMessage);
                
            } else {
                          
              let successArray = [];
              
              for (let sendResult of jsonResponse) {
                //console.log(sendResult)
      
                const elementsIndex = await this.state.followerData.findIndex(element => element.profileUrl === sendResult.profileUrl );
                 
                 let newArray = await [...this.state.followerData]
                 
                  newArray[elementsIndex] = await {...newArray[elementsIndex], messaged: sendResult.messageResult}
                
                      //await console.log(newArray);
                      
                      await this.setState({
                      followerData: newArray,
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