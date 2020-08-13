import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";

import Alert from 'react-bootstrap/Alert'

function SuccessAlert(props) {
    
    const context = useContext(ContextConsumer);
    
    const handleChange = (alertType, alertAction) => {
        //ReactTooltip.hide();
        props.handleAlertChange(alertType, alertAction, context) 
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


export default SuccessAlert;