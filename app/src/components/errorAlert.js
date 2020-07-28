import React, { Component } from 'react'
//import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert'

class errorAlert extends Component {
    
    handleChange = (alertType, alertAction) => {
 
        //ReactTooltip.hide();
        this.props.handleAlertChange(alertType, alertAction)
        
    }
    
    render() {

        const showErrorAlert = this.props.showErrorAlert ? {display: 'block'} : {display: 'none'};   
        const showErrorAlertSwitchToSignup = this.props.showErrorAlertSwitchToSignup ? {display: 'block'} : {display: 'none'}; 
        const showErrorAlertSwitchToLogin = this.props.showErrorAlertSwitchToLogin ? {display: 'block'} : {display: 'none'}; 
     
     
        return (
                
            <Alert
                className="error-alert alert-fixed"
                style={showErrorAlert}
                variant='danger'
                onClose={() => this.handleChange("ERROR", "HIDE")} dismissible
                >
                <Alert.Heading>Uh oh!</Alert.Heading>
                    {this.props.errorAlertText}
                    
                <Alert.Link style={showErrorAlertSwitchToSignup} href="#" onClick={this.props.handleLoginSwitchToSignup}>{this.props.errorAlertLinkText}</Alert.Link>
                <Alert.Link style={showErrorAlertSwitchToLogin} href="#" onClick={this.props.handleSignupSwitchToLogin}>{this.props.errorAlertLinkText}</Alert.Link>
           
            </Alert>
              
          
        );
    }

}



export default errorAlert;


/*function mapStateToProps(state) {
 
    return {

        errorAlertText: state.errorAlertText,
        errorAlertLinkText: state.errorAlertLinkText,
        showErrorAlert: state.showErrorAlert
    }
      
      
}

export default connect(mapStateToProps)(errorAlert);*/
