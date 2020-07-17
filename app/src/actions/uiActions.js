export function handleAlertChange(alertType, alertAction) {
    
    console.log(alertType+'_ALERT_'+alertAction);
    return (dispatch, getState) => {
        dispatch({type: alertType+'_ALERT_'+alertAction})
    }

    
}

