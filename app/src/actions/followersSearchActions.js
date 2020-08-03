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
export const FOLLOWERS_SEARCH_RECENT_SEARCHES_SUBMITTED = 'FOLLOWERS_SEARCH_RECENT_SEARCHES_SUBMITTED'
export const FOLLOWERS_SEARCH_RECENT_SEARCHES_ERROR = 'FOLLOWERS_SEARCH_RECENT_SEARCHES_ERROR'
export const FOLLOWERS_SEARCH_RECENT_SEARCHES_RESULT = 'FOLLOWERS_SEARCH_RECENT_SEARCHES_RESULT'

export function fetchRecentFollowersSearches() {

    return (dispatch, getState) => {

    //console.log('fetch received messages');
    
        dispatch({type: FOLLOWERS_SEARCH_RECENT_SEARCHES_SUBMITTED});
            
        //let messagesSearchUrlNoSlash = getState().messagesSearchUrl.replace(/\/+$/, "");
        
        axios.get('https://scbm.amfdev.co.uk/api/searches/', {params: {type: "follower"} })
        .then(json => doRecentFollowersSearchesResult(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: FOLLOWERS_SEARCH_RECENT_SEARCHES_ERROR
                      })  
                }
        });
                  
    }
    

}

function doRecentFollowersSearchesResult(json, dispatch) {
        //console.log('doRecentFollowersSearchesSuccess')
        //console.log(json.data)
        if (json.data && json.data.length > 0) {
               dispatch({
                type: FOLLOWERS_SEARCH_RECENT_SEARCHES_RESULT,
                data: json.data
              })
        }  
          
               
  return json;
}



export function handleFollowersRecentSearchSubmit(searchUrl) {
    
    return (dispatch, getState) => {

    dispatch({
         type: FOLLOWERS_SEARCH_URL_CHANGE,
         followersSearchUrl: searchUrl
       });
    
    dispatch({
         type: FOLLOWERS_SEARCH_SUBMITTED
       });
           
        axios.get('https://scbm.amfdev.co.uk/api/followers/', {
         params: {
           searchUrl: encodeURI(searchUrl)
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
        .then(json => dispatch(fetchRecentFollowersSearches()))
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
    //console.log('catchFollowersSearchNoResults')
    //console.log(json);
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
    //console.log('catchFollowersSearchOtherError')
    if (!json.success) {
        dispatch({
                type: FOLLOWERS_SEARCH_OTHER_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doFollowersSearchSuccess(json, dispatch) {
    //console.log('doFollowersSearchSuccess')
 
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