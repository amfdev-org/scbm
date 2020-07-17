import React, { Component } from 'react'
//import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert'

class infoAlert extends Component {
    
    handleChange = (alertType, alertAction) => {
        //ReactTooltip.hide();
        this.props.handleAlertChange(alertType, alertAction) 
    }
    
    render() {

        const showInfoAlert = this.props.showInfoAlert ? {display: 'block'} : {display: 'none'};
     
        return (
     
              <Alert
                className="info-alert alert-fixed"
                style={showInfoAlert}
                variant='info'
                onClose={() => this.props.this.handleChange("INFO", "HIDE")()}
                dismissible
                >
                <Alert.Heading>{this.props.infoAlertTextHeading}</Alert.Heading>
                 {this.props.infoAlertText}
              </Alert>
          
        );
    }

}


export default infoAlert;

/*function mapStateToProps(state) {
 
    return {
        showInfoAlert: state.showInfoAlert,
        infoAlertText: state.infoAlertText,
        infoAlertTextHeading: state.infoAlertTextHeading
    }
      
      
}

export default connect(mapStateToProps)(infoAlert);*/
