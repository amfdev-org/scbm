import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function fetchMyFollowers(dispatch) {

    //console.log('fetch my followers');

    dispatch({
         type: "MY_FOLLOWERS_SEARCH_SUBMITTED"
       });
        
        //let followersSearchUrlNoSlash = state.followersSearchUrl.replace(/\/+$/, "");
        
        axios.get(API_URL + '/followers/', {
         params: {
           searchUrl: "https://soundcloud.com"
         }
         })
        .then(json => catchMyFollowersSearchNoResults(json.data, dispatch))
        .then(json => catchMyFollowersSearchOtherError(json, dispatch))
        .then(json => doMyFollowersSearchSuccess(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: "MY_FOLLOWERS_SEARCH_UNKNOWN_ERROR"
                      })  
                }
        });
                  

}

function catchMyFollowersSearchNoResults(json, dispatch) {
    //console.log('catchMyFollowersSearchNoResults')
    //console.log(json);
    if (json.noResults) {
        dispatch({
                type: "MY_FOLLOWERS_SEARCH_NO_RESULTS"
              })
        dispatch({ type: "SUCCESS_ALERT_SHOW" });
        
        window.setTimeout(()=>{ 
        dispatch({ type: "SUCCESS_ALERT_HIDE" });
        },4000)
    
        throw Error(json.error);
                
    }
    
  return json;
}


function catchMyFollowersSearchOtherError(json, dispatch) {
    //console.log('catchMyFollowersSearchOtherError')
    if (!json.success) {
        dispatch({
                type: "MY_FOLLOWERS_SEARCH_OTHER_ERROR"
              })
        throw Error(json.error);
    }
    
  return json;
}


function doMyFollowersSearchSuccess(json, dispatch) {
    //console.log('doFollowersSearchSuccess')
 
        dispatch({
                type: "MY_FOLLOWERS_SEARCH_RESULT",
                myFollowerData: json.followerData
              })
          
            /*dispatch({ type: "SUCCESS_ALERT_SHOW" });
            
            window.setTimeout(()=>{ 
            dispatch({ type: "SUCCESS_ALERT_HIDE" });
            },4000)*/
               
  return json;
}


export function handleMyFollowersSelectedRowsChange(selectedMyFollowers, context) {
    
     const dispatch = context.dispatch;

        //console.log('dispatch rows change selected followers')
            dispatch({
                type: "MY_FOLLOWERS_SELECTED_ROWS_CHANGE",
                selectedMyFollowers: selectedMyFollowers
            })
       
        if(selectedMyFollowers && selectedMyFollowers.length > 0) {
            //console.log('yes selected followers more than 0')
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'block';
            dispatch({
                type: "MY_FOLLOWERS_MESSAGE_FORM_SHOW"
            })
        } else {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
            dispatch({
                type: "MY_FOLLOWERS_MESSAGE_FORM_HIDE"
          })
        }
        
}
