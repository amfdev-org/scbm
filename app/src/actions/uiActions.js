import axios from 'axios';

import {
  fetchSentMessages
  } from '../actions/sentMessagesSearchActions'
  
export function handleAlertChange(alertType, alertAction) {
    //console.log(alertType+'_ALERT_'+alertAction);
    return (dispatch, getState) => {
        dispatch({type: alertType+'_ALERT_'+alertAction})
    }

}

export function handleToggleConfigModal() {
    //console.log('handleToggleConfigModal')
    return (dispatch, getState) => {
        dispatch({type: "CONFIG_MODAL_SHOW"})
    }
}


export function handleCloseConfigModal() {
    
    return (dispatch, getState) => {
        dispatch({type: "CONFIG_MODAL_HIDE"})
    }
    
}

export function handleTestModeChange(checked) {
    
    return (dispatch, getState) => {
        
        //console.log('uiActions handleTestModeChange function called');
        
        var dispatchType;
        var alertShowType;
        var alertHideType;
        var alertTextType;
        var alertText;
        var alertTextHeadingType;
        var alertTextHeading;
        
        //console.log('uiActions handleTestModeChange "checked" variable is: '+checked);
        if(checked) {         
            dispatchType = "TEST_MODE_ENABLE"
            alertShowType = "SUCCESS_ALERT_SHOW";
            alertHideType = "SUCCESS_ALERT_HIDE";
            alertTextType = "SUCCESS_ALERT_SET_TEXT";
            alertTextHeadingType = "";
            alertTextHeading = "";
            alertText = "Test Mode enabled."
        } else {
            dispatchType = "TEST_MODE_DISABLE";
            alertShowType = "INFO_ALERT_SHOW";
            alertHideType = "INFO_ALERT_HIDE";
            alertTextType = "INFO_ALERT_SET_TEXT";
            alertTextHeadingType = "INFO_ALERT_SET_TEXT_HEADING";
            alertTextHeading = "Warning!";
            alertText = "Test Mode disabled! Messages will now be sent - please be responsible."
            
        }
        
        //console.log('uiActions handleTestModeChange {isTestMode: checked.toString()}:');
        //console.log({isTestMode: checked.toString()})
        
        axios({
        method: 'post',
        url: 'https://scbm.amfdev.co.uk/api/user/',
        headers: { "X-Request-App": "scbm" }, 
        data: {
            userSettings: {isTestMode: checked.toString()}
        }
        })    
        .then(json => {
                //console.log('uiActions handleTestModeChange json result: ');
                //console.log(json);
                
                dispatch({type: alertTextType, text: alertText});
                dispatch({type: alertTextHeadingType, textHeading: alertTextHeading});
                dispatch({type: alertShowType});
                
                dispatch({type: dispatchType})
                
                window.setTimeout(()=>{ 
                dispatch({ type: alertHideType });
                },4000);
                
                dispatch(fetchSentMessages());
                                           
        })
        .catch(error => {
                //console.log('uiActions handleTestModeChange error: ');
                //console.log(error);
                if (error.response) {
                        dispatch({type: alertTextType, text: alertText});
                        dispatch({type: alertShowType});
                        
                        
                        window.setTimeout(()=>{ 
                        dispatch({ type: alertHideType });
                        },4000);
                }
                
        
        });
        
        
    }
}


export function handleDownloadLogs(event) {
    
    //console.log("handleDownloadLogs");
        
    return (dispatch) => {
        
        axios.get("https://scbm.amfdev.co.uk/api/download-logs/", {responseType: 'blob'})
       .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'debug.log');
          document.body.appendChild(link);
          link.click();
       });
       
    
    }
    
}