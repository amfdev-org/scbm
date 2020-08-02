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

            dispatch({
                type: COMMENTERS_SEARCH_URL_CHANGE,
                commentersSearchUrl: event.target.value
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
           searchUrl: encodeURI(getState().commentersSearchUrl)
         }
         })
        .then(json => catchCommentersSearchNoResults(json.data, dispatch))
        .then(json => catchCommentersSearchOtherError(json, dispatch))
        .then(json => doCommentersSearchSuccess(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: COMMENTERS_SEARCH_UNKNOWN_ERROR
                      })  
                }
        });
                  
    }
    
}

//res.send({success: false, commenterData: "no commenters"})

function catchCommentersSearchNoResults(json, dispatch) {
    //console.log('catchCommentersSearchNoResults')
    //console.log(json);
    if (json.noResults) {
        dispatch({
                type: COMMENTERS_SEARCH_NO_RESULTS
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
                type: COMMENTERS_SEARCH_OTHER_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doCommentersSearchSuccess(json, dispatch) {
    //console.log('doCommentersSearchSuccess')
 
        dispatch({
                type: COMMENTERS_SEARCH_SUCCESS,
                commenterData: json.commenterData
              })
          
            dispatch({ type: "SUCCESS_ALERT_SHOW" });
            
            window.setTimeout(()=>{ 
            dispatch({ type: "SUCCESS_ALERT_HIDE" });
            },4000)
               
  return json;
}


export function handleCommentersSelectedRowsChange(selectedCommenters) {
    
    //console.log(selectedCommenters);
    
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
