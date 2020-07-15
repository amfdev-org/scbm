//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

export const COMMENTERS_SEARCH_URL_CHANGE = 'COMMENTERS_SEARCH_URL_CHANGE'
export const COMMENTERS_SEARCH_SUBMIT_ENABLE = 'COMMENTERS_SEARCH_SUBMIT_ENABLE'
export const COMMENTERS_SEARCH_SUBMIT_DISABLE = 'COMMENTERS_SEARCH_SUBMIT_DISABLE'
export const COMMENTERS_SEARCH_SUBMITTED = 'COMMENTERS_SEARCH_SUBMITTED'
export const COMMENTERS_SEARCH_NO_RESULTS = 'COMMENTERS_SEARCH_NO_RESULTS'
export const COMMENTERS_SEARCH_OTHER_ERROR = 'COMMENTERS_SEARCH_OTHER_ERROR'
export const COMMENTERS_SEARCH_SUCCESS = 'COMMENTERS_SEARCH_SUCCESS'
export const COMMENTERS_SELECTED_ROWS_CHANGE = 'COMMENTERS_SELECTED_ROWS_CHANGE'
export const COMMENTERS_MESSAGE_FORM_SHOW = 'COMMENTERS_MESSAGE_FORM_SHOW'
export const COMMENTERS_MESSAGE_FORM_HIDE = 'COMMENTERS_MESSAGE_FORM_HIDE'
export const COMMENTERS_SEARCH_UNKNOWN_ERROR = 'COMMENTERS_SEARCH_UNKNOWN_ERROR'


export function handleCommentersSearchChange(event) {
    
    return (dispatch, getState) => {
        
        const { name, value } = event.target
  
            dispatch({
                type: COMMENTERS_SEARCH_URL_CHANGE,
                commentersSearchUrl: value
            })
       
        if(getState().commentersSearchUrl && getState().commentersSearchUrl.length > 0 && getState().commentersSearchUrl.includes("http")) {
            dispatch({
                type: COMMENTERS_SEARCH_SUBMIT_ENABLE
          })
        } else {
            dispatch({
                type: COMMENTERS_SEARCH_SUBMIT_DISABLE
          })
        }

          
    }
    
}


export function handleCommentersSearchSubmit(event) {
    
    return (dispatch, getState) => {

    dispatch({
         type: COMMENTERS_SEARCH_SUBMITTED
       });
           
        axios.get('https://scbm.amfdev.co.uk/api/commenters/', {
         params: {
           commentersSearchUrl: encodeURI(getState().commentersSearchUrl)
         }
         })
         .then(json => catchCommentersSearchNoResults(json.data, dispatch))
         .then(json => catchCommentersSearchOtherError(json, dispatch))
         .then(json => doCommentersSearchSuccess(json, dispatch))
         .catch(error => console.log(error));
                  
    }
    
}

//res.send({success: false, commenterData: "no commenters"})

function catchCommentersSearchNoResults(json, dispatch) {
    console.log('catchCommentersSearchNoResults')
    console.log(json);
    if (json.noResults) {
        dispatch({
                type: COMMENTERS_SEARCH_NO_RESULTS
              })
        throw Error(json.error);
    }
    
  return json;
}


function catchCommentersSearchUnknownError(error, dispatch) {
    console.log('catchCommentersSearchUnknownError')
        dispatch({
                type: COMMENTERS_SEARCH_UNKNOWN_ERROR
              });
        return;
}


function catchCommentersSearchOtherError(json, dispatch) {
    console.log('catchCommentersSearchOtherError')
    if (!json.success) {
        dispatch({
                type: COMMENTERS_SEARCH_OTHER_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doCommentersSearchSuccess(json, dispatch) {
    console.log('doCommentersSearchSuccess')
 
        dispatch({
                type: COMMENTERS_SEARCH_SUCCESS,
                commenterData: json.commenterData
              })
  return json;
}


export function handleCommentersSelectedRowsChange(selectedCommenters) {
    
    console.log(selectedCommenters);
    
    return (dispatch, getState) => {
  
            dispatch({
                type: COMMENTERS_SELECTED_ROWS_CHANGE,
                selectedCommenters: selectedCommenters
            })
       
        if(getState().selectedCommenters && getState().selectedCommenters.length > 0) {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'block';
            dispatch({
                type: COMMENTERS_MESSAGE_FORM_SHOW
          })
        } else {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
            dispatch({
                type: COMMENTERS_MESSAGE_FORM_HIDE
          })
        }
        
    }
           
}

/*
handleCommentersSearchChange = event => {
     
     const { name, value } = event.target
  
      this.setState({[name]: value, commentersSearchUrl: value}, () => {   
          if (this.state.commentersSearchUrl.length > 10 && this.state.commentersSearchUrl.includes("http")) {
            this.setState({enableCommentersSearchSubmitButton: true}, () => {   
              //console.log(this.state);
            })
          } else {
            this.setState({enableCommentersSearchSubmitButton: false}, () => {   
              //console.log(this.state);
            })
          }
      })
        
  }
    
    
  handleCommentersSearchSubmit = () => {
  
    this.setState({ showCommentersTable: false })
    this.setState({ showCommentersSearchSubmitButton: false })
    this.setState({ showCommentersSearchSubmitLoadingButton: true })
    this.setState({ enableCommentersSearchInput: false })
    this.setState({ showErrorAlert: false })
    this.setState({ showSuccessAlert: false })
    this.setState({ showInfoAlert: false })
    
      var myHeaders = new Headers();
        myHeaders.set('Accept', 'application/json');
        myHeaders.set('Content-Type', 'application/json');
        //myHeaders.set('Authorization', 'Token token=' + String(token));
        myHeaders.set('Cache-Control', 'no-cache');
        myHeaders.set('Pragma', 'no-cache');
        myHeaders.set('Expires', '0');
    
    fetch('https://scbm.amfdev.co.uk/api/commenters/?commentersSearchUrl='+encodeURI((this.state.commentersSearchUrl)), {
            method: 'GET',
            headers: myHeaders
        })
    .then(async response => {
      
            if (!response.ok) {
               //throw Error(response.statusText);
                this.setState({errorAlertText: "Something went wrong. Please try again later."});
                this.setState({showErrorAlert: true});
                
                this.setState({ showCommentersSearchSubmitButton: true })
                this.setState({ showCommentersSearchSubmitLoadingButton: false })
            }
            //console.log(response);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
                
            if (jsonResponse.success) {
                  
                this.setState({ commenterData: jsonResponse.commenterData })
                this.setState({ showCommentersTable: true })
                document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
  
                this.setState({successAlertText: "Found " + jsonResponse.commenterData.length + ' commenters.'});
                
                  this.setState({showSuccessAlert: true},()=>{
                  window.setTimeout(()=>{
                    this.setState({showSuccessAlert: false})
                  },4000)
                  
              });
                
                  this.setState({ enableCommentersSearchInput: true })
                  this.setState({ showCommentersSearchSubmitButton: true })
                  this.setState({ showCommentersSearchSubmitLoadingButton: false })
                  
            
            } else if (!jsonResponse.success) {
              
                  if (jsonResponse.commenterData === "no commenters") {
                    
                        this.setState({ showCommentersTable: true })
                        document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
          
                        this.setState({successAlertText: "But there were no commenters found for this track."});
                        
                          this.setState({showSuccessAlert: true},()=>{
                          window.setTimeout(()=>{
                            this.setState({showSuccessAlert: false})
                          },4000)
                          
                      });
                      
                          this.setState({ enableCommentersSearchInput: true })
                          this.setState({ showCommentersSearchSubmitButton: true })
                          this.setState({ showCommentersSearchSubmitLoadingButton: false })
                          
                  } else {
                    
                        // get error message from body or default to response status
                         //const error = (commenterData && commenterData.message) || response.status;
                         //console.log(jsonResponse.errorMessage);
                         //return Promise.reject(jsonResponse.errorMessage);
                         this.setState({errorAlertText: "Something went wrong. Please try again later."});
                         this.setState({showErrorAlert: true});
                         
                         this.setState({ showCommentersSearchSubmitButton: true })
                         this.setState({ showCommentersSearchSubmitLoadingButton: false })
                         this.setState({ enableCommentersSearchInput: true })
  
                  }
           
                  
            }
            
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            
             this.setState({ enableCommentersSearchInput: true })
            this.setState({ showCommentersSearchSubmitButton: true })
            this.setState({ showCommentersSearchSubmitLoadingButton: false })
            
              this.setState({showErrorAlert: true},()=>{
              window.setTimeout(()=>{
                this.setState({showErrorAlert: false})
              },4000)
            });
              
        });

            
 
  }*/
  