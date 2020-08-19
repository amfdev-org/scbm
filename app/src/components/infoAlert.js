import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";

import Alert from 'react-bootstrap/Alert'

function InfoAlert(props) {
    
     const context = useContext(ContextConsumer);
     
    const handleChange = (alertType, alertAction) => {
        //ReactTooltip.hide();
        props.handleAlertChange(alertType, alertAction, context) 
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


export default InfoAlert;