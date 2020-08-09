import React from 'react'
//import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert'

function errorAlert(props) {
    
    const handleChange = (alertType, alertAction) => {
 
        //ReactTooltip.hide();
        props.handleAlertChange(alertType, alertAction)
        
    }
    

        const showErrorAlert = props.showErrorAlert ? {display: 'block'} : {display: 'none'};   
        const showErrorAlertSwitchToSignup = props.showErrorAlertSwitchToSignup ? {display: 'block'} : {display: 'none'}; 
        const showErrorAlertSwitchToLogin = props.showErrorAlertSwitchToLogin ? {display: 'block'} : {display: 'none'}; 
     
     
        return (
                
            <Alert
                className="error-alert alert-fixed"
                style={showErrorAlert}
                variant='danger'
                onClose={() => handleChange("ERROR", "HIDE")} dismissible
                >
                <Alert.Heading>Uh oh!</Alert.Heading>
                    {props.errorAlertText}
                    
                <Alert.Link style={showErrorAlertSwitchToSignup} href="#" onClick={props.handleLoginSwitchToSignup}>{props.errorAlertLinkText}</Alert.Link>
                <Alert.Link style={showErrorAlertSwitchToLogin} href="#" onClick={props.handleSignupSwitchToLogin}>{props.errorAlertLinkText}</Alert.Link>
           
            </Alert>
              
          
        );
    

}



export default errorAlert;
