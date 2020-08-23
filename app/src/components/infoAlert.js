import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";

import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

function InfoAlert(props) {
    
     const context = useContext(ContextConsumer);
     
    const handleChange = (alertType, alertAction) => {
        //ReactTooltip.hide();
        props.handleAlertChange(alertType, alertAction, context) 
    }

     const showInfoAlert = props.showInfoAlert ? {display: 'block'} : {display: 'none'};
     const showInfoAlertSpinner = props.showInfoAlertSpinner ? {display: 'block'} : {display: 'none'};
     
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
 
                    <Spinner className="info-alert-spinner" style={showInfoAlertSpinner}
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
        
              </Alert>
              
          
        );

}


export default InfoAlert;