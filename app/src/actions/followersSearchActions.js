//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

export const FOLLOWERS_SEARCH_URL_CHANGE = 'FOLLOWERS_SEARCH_URL_CHANGE'
export const FOLLOWERS_SEARCH_SUBMIT_ENABLE = 'FOLLOWERS_SEARCH_SUBMIT_ENABLE'
export const FOLLOWERS_SEARCH_SUBMIT_DISABLE = 'FOLLOWERS_SEARCH_SUBMIT_DISABLE'
export const FOLLOWERS_SEARCH_SUBMITTED = 'FOLLOWERS_SEARCH_SUBMITTED'
export const FOLLOWERS_SEARCH_NO_RESULTS = 'FOLLOWERS_SEARCH_NO_RESULTS'
export const FOLLOWERS_SEARCH_OTHER_ERROR = 'FOLLOWERS_SEARCH_OTHER_ERROR'
export const FOLLOWERS_SEARCH_SUCCESS = 'FOLLOWERS_SEARCH_SUCCESS'
export const FOLLOWERS_SELECTED_ROWS_CHANGE = 'FOLLOWERS_SELECTED_ROWS_CHANGE'
export const FOLLOWERS_MESSAGE_FORM_SHOW = 'FOLLOWERS_MESSAGE_FORM_SHOW'
export const FOLLOWERS_MESSAGE_FORM_HIDE = 'FOLLOWERS_MESSAGE_FORM_HIDE'
export const FOLLOWERS_SEARCH_UNKNOWN_ERROR = 'FOLLOWERS_SEARCH_UNKNOWN_ERROR'


export function handleFollowersSearchChange(event) {
    
    return (dispatch, getState) => {

            dispatch({
                type: FOLLOWERS_SEARCH_URL_CHANGE,
                followersSearchUrl: event.target.value
            })
       
        if(getState().followersSearchUrl && getState().followersSearchUrl.length > 0 && getState().followersSearchUrl.includes("http")) {
            dispatch({
                type: FOLLOWERS_SEARCH_SUBMIT_ENABLE
          })
        } else {
            dispatch({
                type: FOLLOWERS_SEARCH_SUBMIT_DISABLE
          })
        }

          
    }
    
}


export function handleFollowersSearchSubmit(event) {
    
    return (dispatch, getState) => {

    dispatch({
         type: FOLLOWERS_SEARCH_SUBMITTED
       });
        
        //let followersSearchUrlNoSlash = getState().followersSearchUrl.replace(/\/+$/, "");
        
        axios.get('https://scbm.amfdev.co.uk/api/followers/', {
         params: {
           searchUrl: encodeURI(getState().followersSearchUrl)
         }
         })
        .then(json => catchFollowersSearchNoResults(json.data, dispatch))
        .then(json => catchFollowersSearchOtherError(json, dispatch))
        .then(json => doFollowersSearchSuccess(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: FOLLOWERS_SEARCH_UNKNOWN_ERROR
                      })  
                }
        });
                  
    }
    
}

//res.send({success: false, followerData: "no followers"})

function catchFollowersSearchNoResults(json, dispatch) {
    console.log('catchFollowersSearchNoResults')
    console.log(json);
    if (json.noResults) {
        dispatch({
                type: FOLLOWERS_SEARCH_NO_RESULTS
              })
        dispatch({ type: "SUCCESS_ALERT_SHOW" });
        
        window.setTimeout(()=>{ 
        dispatch({ type: "SUCCESS_ALERT_HIDE" });
        },4000)
    
        throw Error(json.error);
                
    }
    
  return json;
}


function catchFollowersSearchOtherError(json, dispatch) {
    console.log('catchFollowersSearchOtherError')
    if (!json.success) {
        dispatch({
                type: FOLLOWERS_SEARCH_OTHER_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doFollowersSearchSuccess(json, dispatch) {
    console.log('doFollowersSearchSuccess')
 
        dispatch({
                type: FOLLOWERS_SEARCH_SUCCESS,
                followerData: json.followerData
              })
          
            dispatch({ type: "SUCCESS_ALERT_SHOW" });
            
            window.setTimeout(()=>{ 
            dispatch({ type: "SUCCESS_ALERT_HIDE" });
            },4000)
               
  return json;
}


export function handleFollowersSelectedRowsChange(selectedFollowers) {
    
    //console.log(selectedFollowers);
    
    return (dispatch, getState) => {
  
        //console.log('dispatch rows change selected followers')
            dispatch({
                type: FOLLOWERS_SELECTED_ROWS_CHANGE,
                selectedFollowers: selectedFollowers
            })
       
        if(getState().selectedFollowers && getState().selectedFollowers.length > 0) {
            //console.log('yes selected followers more than 0')
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'block';
            dispatch({
                type: FOLLOWERS_MESSAGE_FORM_SHOW
          })
        } else {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
            dispatch({
                type: FOLLOWERS_MESSAGE_FORM_HIDE
          })
        }
        
    }
           
}

/*
 handleFollowersSearchChange = event => {
    
    console.log(event);
     
     const { name, value } = event.target
  
      this.setState({[name]: value, followersSearchUrl: value}, () => {   
          if (this.state.followersSearchUrl.length > 10 && this.state.followersSearchUrl.includes("http")) {
            this.setState({enableFollowersSearchSubmitButton: true}, () => {   
              //console.log(this.state);
            })
          } else {
            this.setState({enableFollowersSearchSubmitButton: false}, () => {   
              //console.log(this.state);
            })
          }
      })
        
  }
    
    
  handleFollowersSearchSubmit = () => {
  
    this.setState({ showFollowersTable: false })
    this.setState({ showFollowersSearchSubmitButton: false })
    this.setState({ showFollowersSearchSubmitLoadingButton: true })
    this.setState({ enableFollowersSearchInput: false })
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
    
    fetch('https://scbm.amfdev.co.uk/api/followers/?followersSearchUrl='+encodeURI((this.state.followersSearchUrl)), {
            method: 'GET',
            headers: myHeaders
        })
    .then(async response => {
      
            if (!response.ok) {
               //throw Error(response.statusText);
                this.setState({errorAlertText: "Something went wrong. Please try again later."});
                this.setState({showErrorAlert: true});
                
                this.setState({ showFollowersSearchSubmitButton: true })
                this.setState({ showFollowersSearchSubmitLoadingButton: false })
            }
            //console.log(response);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
                
            if (jsonResponse.success) {
                  
                this.setState({ followerData: jsonResponse.followerData })
                this.setState({ showFollowersTable: true })
                document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
  
                this.setState({successAlertText: "Found " + jsonResponse.followerData.length + ' followers.'});
                
                  this.setState({showSuccessAlert: true},()=>{
                  window.setTimeout(()=>{
                    this.setState({showSuccessAlert: false})
                  },4000)
                  
              });
                
                  this.setState({ enableFollowersSearchInput: true })
                  this.setState({ showFollowersSearchSubmitButton: true })
                  this.setState({ showFollowersSearchSubmitLoadingButton: false })
                  
            
            } else if (!jsonResponse.success) {
              
                  if (jsonResponse.followerData === "no followers") {
                    
                        this.setState({ showFollowersTable: true })
                        document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
          
                        this.setState({successAlertText: "But there were no followers found for this track."});
                        
                          this.setState({showSuccessAlert: true},()=>{
                          window.setTimeout(()=>{
                            this.setState({showSuccessAlert: false})
                          },4000)
                          
                      });
                      
                          this.setState({ enableFollowersSearchInput: true })
                          this.setState({ showFollowersSearchSubmitButton: true })
                          this.setState({ showFollowersSearchSubmitLoadingButton: false })
                          
                  } else {
                    
                        // get error message from body or default to response status
                         //const error = (followerData && followerData.message) || response.status;
                         //console.log(jsonResponse.errorMessage);
                         //return Promise.reject(jsonResponse.errorMessage);
                         this.setState({errorAlertText: "Something went wrong. Please try again later."});
                         this.setState({showErrorAlert: true});
                         
                         this.setState({ showFollowersSearchSubmitButton: true })
                         this.setState({ showFollowersSearchSubmitLoadingButton: false })
                         this.setState({ enableFollowersSearchInput: true })
  
                  }
           
                  
            }
            
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            
             this.setState({ enableFollowersSearchInput: true })
            this.setState({ showFollowersSearchSubmitButton: true })
            this.setState({ showFollowersSearchSubmitLoadingButton: false })
            
              this.setState({showErrorAlert: true},()=>{
              window.setTimeout(()=>{
                this.setState({showErrorAlert: false})
              },4000)
            });
              
        });
      
    
      /*
        const followerData = [
            {profileUrl: "https://soundcloud.com/cloaked-music", messagedBefore: "No"},
            {profileUrl: "https://srewrewr.com", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/patrickxtaylor", messagedBefore: "Yes"},
            {profileUrl: "https://soundcloud.com/alvonmars", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/upukrecords", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/user-355158966-477119345", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/deftsoulmusique1995", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/ocmoon", messagedBefore: "Yes"}
            ];
        
        
            this.setState({ followerData: followerData })
            this.setState({ showFollowersTable: true })
            
            this.setState({ showSearchSubmitButton: true })
            this.setState({ showSearchSubmitLoadingButton: false })
            
 
  }
  */
  