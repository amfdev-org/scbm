import React from 'react'
import Alert from 'react-bootstrap/Alert'

function infoAlert(props) {
    
    const handleChange = (alertType, alertAction) => {
        //ReactTooltip.hide();
        props.handleAlertChange(alertType, alertAction) 
    }

        const showInfoAlert = props.showInfoAlert ? {display: 'block'} : {display: 'none'};
     
        return (
     
              <Alert
                className="info-alert alert-fixed"
                style={showInfoAlert}
                variant='info'
                onClose={() => handleChange("INFO", "HIDE")()}
                dismissible
                >
                <Alert.Heading>{props.infoAlertTextHeading}</Alert.Heading>
                 {props.infoAlertText}
              </Alert>
          
        );

}


export default infoAlert;