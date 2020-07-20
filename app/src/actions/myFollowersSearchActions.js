import axios from 'axios';

export const MY_FOLLOWERS_SEARCH_SUBMITTED = 'MY_FOLLOWERS_SEARCH_SUBMITTED'
export const MY_FOLLOWERS_SEARCH_OTHER_ERROR = 'MY_FOLLOWERS_SEARCH_OTHER_ERROR'
export const MY_FOLLOWERS_SEARCH_UNKNOWN_ERROR = 'MY_FOLLOWERS_SEARCH_UNKNOWN_ERROR'
export const MY_FOLLOWERS_SELECTED_ROWS_CHANGE = 'MY_FOLLOWERS_SELECTED_ROWS_CHANGE'
export const MY_FOLLOWERS_SEARCH_NO_RESULTS = 'MY_FOLLOWERS_SEARCH_NO_RESULTS'
export const MY_FOLLOWERS_SEARCH_SUCCESS = 'MY_FOLLOWERS_SEARCH_SUCCESS'
export const MY_FOLLOWERS_MESSAGE_FORM_SHOW = 'MY_FOLLOWERS_MESSAGE_FORM_SHOW'
export const MY_FOLLOWERS_MESSAGE_FORM_HIDE = 'MY_FOLLOWERS_MESSAGE_FORM_HIDE'


export function fetchMyFollowers() {

    return (dispatch, getState) => {

    console.log('fetch my followers');
    
    dispatch({
         type: MY_FOLLOWERS_SEARCH_SUBMITTED
       });
        
        //let followersSearchUrlNoSlash = getState().followersSearchUrl.replace(/\/+$/, "");
        
        axios.get('https://scbm.amfdev.co.uk/api/followers/', {
         params: {
           searchUrl: encodeURI(getState().scProfile)
         }
         })
        .then(json => catchMyFollowersSearchNoResults(json.data, dispatch))
        .then(json => catchMyFollowersSearchOtherError(json, dispatch))
        .then(json => doMyFollowersSearchSuccess(json, dispatch))
        .catch(error => {

                if (error.response) {   
                      dispatch({
                          type: MY_FOLLOWERS_SEARCH_UNKNOWN_ERROR
                      })  
                }
        });
                  
    }
    

}

function catchMyFollowersSearchNoResults(json, dispatch) {
    console.log('catchMyFollowersSearchNoResults')
    console.log(json);
    if (json.noResults) {
        dispatch({
                type: MY_FOLLOWERS_SEARCH_NO_RESULTS
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
    console.log('catchMyFollowersSearchOtherError')
    if (!json.success) {
        dispatch({
                type: MY_FOLLOWERS_SEARCH_OTHER_ERROR
              })
        throw Error(json.error);
    }
    
  return json;
}


function doMyFollowersSearchSuccess(json, dispatch) {
    console.log('doFollowersSearchSuccess')
 
        dispatch({
                type: MY_FOLLOWERS_SEARCH_SUCCESS,
                myFollowerData: json.followerData
              })
          
            /*dispatch({ type: "SUCCESS_ALERT_SHOW" });
            
            window.setTimeout(()=>{ 
            dispatch({ type: "SUCCESS_ALERT_HIDE" });
            },4000)*/
               
  return json;
}


export function handleMyFollowersSelectedRowsChange(selectedMyFollowers) {
    
    console.log(selectedMyFollowers);
    
    return (dispatch, getState) => {
  
        //console.log('dispatch rows change selected followers')
            dispatch({
                type: MY_FOLLOWERS_SELECTED_ROWS_CHANGE,
                selectedMyFollowers: selectedMyFollowers
            })
       
        if(getState().selectedMyFollowers && getState().selectedMyFollowers.length > 0) {
            console.log('yes selected followers more than 0')
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'block';
            dispatch({
                type: MY_FOLLOWERS_MESSAGE_FORM_SHOW
            })
        } else {
            //document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
            dispatch({
                type: MY_FOLLOWERS_MESSAGE_FORM_HIDE
          })
        }
        
    }
           
}


/*
 //console.log('do myfollowers');
    fetch('https://scbm.amfdev.co.uk/api/myfollowers/', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    })
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
                console.log(jsonResponse.errorMessage);
                return Promise.reject(jsonResponse.errorMessage);
                
            } else {
              
                if (jsonResponse.myfollowersResult === true) {
                    
                    this.setState({showCommentersSearchForm: true});
                    
                    this.setState({showLoggedInInfo: true});
                    this.setState({showLogoutSubmitButton: true});
                    this.setState({loggedInInfoText: jsonResponse.userData.scUsername});
                         
                    this.setState({successAlertText: "We logged you in!" });
                    
                        this.setState({showSuccessAlert: true},()=>{
                          window.setTimeout(()=>{
                            this.setState({showSuccessAlert: false})
                          },2000)
                        });
                                     
                } else {
                       
                        if (jsonResponse.scCookiesValid === false) {
                          
                              this.setState({showLoginForm: false});
                              this.setState({errorAlertText: "Credentials invalid. Please contact support." });
                              this.setState({showErrorAlert: true});
                              
                        } else {
                          
                              this.setState({showLoginForm: true});
                        
                              this.setState({infoAlertTextHeading: "Welcome" });
                              this.setState({infoAlertText: "Please log in." });
                        
                              this.setState({showInfoAlert: true});
                      
                        }                  
                  
                          
                }
    
            }
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);

        });
        
        */