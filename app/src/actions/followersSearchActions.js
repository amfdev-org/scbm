//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

export function fetchRecentFollowersSearches(dispatch) {

    //console.log('action fetchRecentFollowersSearches');
    
        dispatch({type: "FOLLOWERS_SEARCH_RECENT_SEARCHES_SUBMITTED"});
            
        //let messagesSearchUrlNoSlash = state.messagesSearchUrl.replace(/\/+$/, "");
        
        axios.get('https://scbm.amfdev.co.uk/api/searches/', {params: {type: "follower"} })
        .then(json => doRecentFollowersSearchesResult(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "FOLLOWERS_SEARCH_RECENT_SEARCHES_ERROR"
                      })  
                }
        });

}


function doRecentFollowersSearchesResult(json, dispatch) {
        //console.log('doRecentFollowersSearchesSuccess')
        //console.log(json.data)
        if (json.data && json.data.length > 0) {
               dispatch({
                type: "FOLLOWERS_SEARCH_RECENT_SEARCHES_RESULT",
                data: json.data
              })
        }  
          
               
  return json;
}


export function handleFollowersRecentSearchSubmit(searchUrl, context) {
    
    const dispatch = context.dispatch;

    dispatch({
         type: "FOLLOWERS_SEARCH_URL_CHANGE",
         followersSearchUrl: searchUrl
       });
    
    dispatch({
         type: "FOLLOWERS_SEARCH_SUBMITTED"
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
                          type: "FOLLOWERS_SEARCH_UNKNOWN_ERROR"
                      })  
                }
        });
                  

}

export function handleFollowersSearchChange(event, context) {
    
        const dispatch = context.dispatch;
        const followersSearchUrl = event.target.value;
        
        dispatch({
            type: "FOLLOWERS_SEARCH_URL_CHANGE",
            followersSearchUrl: followersSearchUrl
        })
       
        if(followersSearchUrl && followersSearchUrl.length > 0 && followersSearchUrl.includes("http")) {
            dispatch({
                type: "FOLLOWERS_SEARCH_SUBMIT_ENABLE"
          })
        } else {
            dispatch({
                type: "FOLLOWERS_SEARCH_SUBMIT_DISABLE"
          })
        }

}


export function handleFollowersSearchSubmit(event, context) {
    
        const dispatch = context.dispatch;
        const state = context.state;
        
        dispatch({
            type: "FOLLOWERS_SEARCH_SUBMITTED"
        });
        
        //let followersSearchUrlNoSlash = state.followersSearchUrl.replace(/\/+$/, "");
        
        axios.get('https://scbm.amfdev.co.uk/api/followers/', {
         params: {
           searchUrl: encodeURI(state.followersSearchUrl)
         }
         })
        .then(json => catchFollowersSearchNoResults(json.data, dispatch))
        .then(json => catchFollowersSearchOtherError(json, dispatch))
        .then(json => doFollowersSearchSuccess(json, dispatch))
        .then(json => fetchRecentFollowersSearches(dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "FOLLOWERS_SEARCH_UNKNOWN_ERROR"
                      })  
                }
        });
                  
    
}

//res.send({success: false, followerData: "no followers"})

function catchFollowersSearchNoResults(json, dispatch) {
    //console.log('catchFollowersSearchNoResults')
    //console.log(json);
    if (json.noResults) {
        dispatch({
                type: "FOLLOWERS_SEARCH_NO_RESULTS"
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
                type: "FOLLOWERS_SEARCH_OTHER_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function doFollowersSearchSuccess(json, dispatch) {
    //console.log('doFollowersSearchSuccess')
 
        dispatch({
                type: "FOLLOWERS_SEARCH_SUCCESS",
                followerData: json.followerData
              })
          
            dispatch({ type: "SUCCESS_ALERT_SHOW" });
            
            window.setTimeout(()=>{ 
            dispatch({ type: "SUCCESS_ALERT_HIDE" });
            },4000)
               
  return json;
}


export function handleFollowersSelectedRowsChange(selectedFollowers, context) {
    
    const dispatch = context.dispatch;
        
    //console.log(selectedFollowers);
        //console.log('dispatch rows change selected followers')
        dispatch({
            type: "FOLLOWERS_SELECTED_ROWS_CHANGE",
            selectedFollowers: selectedFollowers
        })
       
        if(selectedFollowers && selectedFollowers.length > 0) {
            //console.log('yes selected followers more than 0')
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'block';
            dispatch({
                type: "FOLLOWERS_MESSAGE_FORM_SHOW"
          })
        } else {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
            dispatch({
                type: "FOLLOWERS_MESSAGE_FORM_HIDE"
          })
        }
        
}