import React, { Component } from 'react'
//import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert'

class successAlert extends Component {
    
    handleChange = (alertType, alertAction) => {
        //ReactTooltip.hide();
        this.props.handleAlertChange(alertType, alertAction) 
    }
    
    render() {

        const showSuccessAlert = this.props.showSuccessAlert ? {display: 'block'} : {display: 'none'};
     
        return (
                
              
              <Alert
                className="success-alert alert-fixed"
                style={showSuccessAlert}
                variant='success'
                onClose={() => this.props.this.handleChange("SUCCESS", "HIDE")}
                dismissible>
              <Alert.Heading>Success!</Alert.Heading>
                 {this.props.successAlertText}
              </Alert>
 
        );
    }

}


export default successAlert;

/*function mapStateToProps(state) {
 
    return {
        showSuccessAlert: state.showSuccessAlert,
        successAlertText: state.successAlertText
    }
      
      
}

export default connect(mapStateToProps)(successAlert);*/
