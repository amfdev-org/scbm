//import { initialState } from '../store/configureStore';
//import { fetchAuth } from '../actions/authActions'

import axios from 'axios';

export function fetchRecentCommentersSearches(dispatch) {

    //console.log('fetch received messages');
    
        dispatch({type: "COMMENTERS_SEARCH_RECENT_SEARCHES_SUBMITTED"});
            
        //let messagesSearchUrlNoSlash = state.messagesSearchUrl.replace(/\/+$/, "");
        
        axios.get('https://scbm.amfdev.co.uk/api/searches/', {params: {type: "commenter"} })
        .then(json => doRecentCommentersSearchesResult(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "COMMENTERS_SEARCH_RECENT_SEARCHES_ERROR"
                      })  
                }
        });
                

}

function doRecentCommentersSearchesResult(json, dispatch) {
        //console.log('doRecentCommentersSearchesSuccess')
        //console.log(json.data)
        if (json.data && json.data.length > 0) {
               dispatch({
                type: "COMMENTERS_SEARCH_RECENT_SEARCHES_RESULT",
                data: json.data
              })
        }  
          
               
  return json;
}



export function handleCommentersRecentSearchSubmit(searchUrl, context) {

    const dispatch = context.dispatch;
    
    dispatch({
         type: "COMMENTERS_SEARCH_URL_CHANGE",
         commentersSearchUrl: searchUrl
       });
    
    dispatch({
         type: "COMMENTERS_SEARCH_SUBMITTED"
       });
           
        axios.get('https://scbm.amfdev.co.uk/api/commenters/', {
         params: {
           searchUrl: encodeURI(searchUrl)
         }
         })
        .then(json => catchCommentersSearchNoResults(json.data, dispatch))
        .then(json => catchCommentersSearchOtherError(json, dispatch))
        .then(json => doCommentersSearchSuccess(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "COMMENTERS_SEARCH_UNKNOWN_ERROR"
                      })  
                }
        });
                
    
}

export function handleCommentersSearchSubmit(event, context) {

    const dispatch = context.dispatch;
    const state = context.state;
    
    dispatch({
         type: "COMMENTERS_SEARCH_SUBMITTED"
       });
           
        axios.get('https://scbm.amfdev.co.uk/api/commenters/', {
         params: {
           searchUrl: encodeURI(state.commentersSearchUrl)
         }
         })
        .then(json => catchCommentersSearchNoResults(json.data, dispatch))
        .then(json => catchCommentersSearchOtherError(json, dispatch))
        .then(json => doCommentersSearchSuccess(json, dispatch))
        .then(json => fetchRecentCommentersSearches(dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "COMMENTERS_SEARCH_UNKNOWN_ERROR"
                      })  
                }
        });
                  
}



export function handleCommentersSearchChange(event, context) {

    const dispatch = context.dispatch;

    const commentersSearchUrl = event.target.value;
    
        dispatch({
            type: "COMMENTERS_SEARCH_URL_CHANGE",
            commentersSearchUrl: commentersSearchUrl
        })
       
        if(commentersSearchUrl && commentersSearchUrl.length > 0 && commentersSearchUrl.includes("http")) {
            dispatch({
                type: "COMMENTERS_SEARCH_SUBMIT_ENABLE"
          })
        } else {
            dispatch({
                type: "COMMENTERS_SEARCH_SUBMIT_DISABLE"
          })
        }

    
}



//res.send({success: false, commenterData: "no commenters"})

function catchCommentersSearchNoResults(json, dispatch) {
    //console.log('catchCommentersSearchNoResults')
    //console.log(json);
    if (json.noResults) {
        dispatch({
                type: "COMMENTERS_SEARCH_NO_RESULTS"
              })
        dispatch({ type: "SUCCESS_ALERT_SHOW" });
        
        window.setTimeout(()=>{ 
        dispatch({ type: "SUCCESS_ALERT_HIDE" });
        },4000)
    
        throw Error(json.error);
                
    }
    
  return json;
}


function catchCommentersSearchOtherError(json, dispatch) {
    //console.log('catchCommentersSearchOtherError')
    if (!json.success) {
        dispatch({
                type: "COMMENTERS_SEARCH_OTHER_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function doCommentersSearchSuccess(json, dispatch) {
    //console.log('doCommentersSearchSuccess')
 
        dispatch({
                type: "COMMENTERS_SEARCH_SUCCESS",
                commenterData: json.commenterData
              })
          
          
            dispatch({ type: "SUCCESS_ALERT_SHOW" });
            
            window.setTimeout(()=>{ 
            dispatch({ type: "SUCCESS_ALERT_HIDE" });
            },4000)
               
  return json;
}


export function handleCommentersSelectedRowsChange(selectedCommenters, context) {
    
    //console.log(selectedCommenters);
    const dispatch = context.dispatch;

            dispatch({
                type: "COMMENTERS_SELECTED_ROWS_CHANGE",
                selectedCommenters: selectedCommenters
            })
       
        if(selectedCommenters && selectedCommenters.length > 0) {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'block';
            dispatch({
                type: "COMMENTERS_MESSAGE_FORM_SHOW"
          })
        } else {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
            dispatch({
                type: "COMMENTERS_MESSAGE_FORM_HIDE"
          })
        }

           
}
