import React from 'react'
import Alert from 'react-bootstrap/Alert'

function successAlert(props) {
    
    const handleChange = (alertType, alertAction) => {
        //ReactTooltip.hide();
        props.handleAlertChange(alertType, alertAction) 
    }

        const showSuccessAlert = props.showSuccessAlert ? {display: 'block'} : {display: 'none'};
     
        return (
                
              
              <Alert
                className="success-alert alert-fixed"
                style={showSuccessAlert}
                variant='success'
                onClose={() => handleChange("SUCCESS", "HIDE")}
                dismissible>
              <Alert.Heading>Success!</Alert.Heading>
                 {props.successAlertText}
              </Alert>
 
        );

}


export default successAlert;