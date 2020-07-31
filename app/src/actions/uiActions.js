import axios from 'axios';

export function handleAlertChange(alertType, alertAction) {
    //console.log(alertType+'_ALERT_'+alertAction);
    return (dispatch, getState) => {
        dispatch({type: alertType+'_ALERT_'+alertAction})
    }

}

export function handleToggleConfigModal() {
    console.log('handleToggleConfigModal')
    return (dispatch, getState) => {
        dispatch({type: "CONFIG_MODAL_SHOW"})
    }
}


export function handleCloseConfigModal() {
    
    return (dispatch, getState) => {
        dispatch({type: "CONFIG_MODAL_HIDE"})
    }
    
}

export function handleTestModeChange(event) {

    return (dispatch, getState) => {
        if(event.target.checked) {         
            dispatch({type: "TEST_MODE_ENABLE"})
        } else {
            dispatch({type: "TEST_MODE_DISABLE"})
        }
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