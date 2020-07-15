import React, { Component } from 'react'
//import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert'

class errorAlert extends Component {
    
    render() {

        const showErrorAlert = this.props.showErrorAlert ? {display: 'block'} : {display: 'none'};   
     
     
        return (
                
            <Alert className="error-alert alert-fixed" style={showErrorAlert} variant='danger' onClose={() => this.props.dismissErrorAlert()} dismissible>
                <Alert.Heading>Uh oh!</Alert.Heading>
                    {this.props.errorAlertText}
                <Alert.Link href="#" onClick={this.props.handleLoginSwitchToSignup}>{this.props.errorAlertLinkText}</Alert.Link>
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
