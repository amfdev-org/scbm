import React from 'react';
import connect from "../provider/connect";

//IMPORT ACTION CREATORS
import {
  handleLoginSwitchToSignup
  } from '../actions/loginActions'

import {
  handleSignupSwitchToLogin
  } from '../actions/signupActions'
  
import {
  handleAlertChange
  } from '../actions/uiActions' 
  

//alerts
import ErrorAlert from '../components/errorAlert';
import SuccessAlert from '../components/successAlert';
import InfoAlert from '../components/infoAlert';

function AlertContainer(props) {

    return (
      
      <>
           <ErrorAlert
            handleAlertChange={props.handleAlertChange}
            showErrorAlert={props.showErrorAlert}
            errorAlertText={props.errorAlertText}
            errorAlertLinkText={props.errorAlertLinkText}
            showErrorAlertSwitchToSignup={props.showErrorAlertSwitchToSignup}
            showErrorAlertSwitchToLogin={props.showErrorAlertSwitchToLogin}
            handleLoginSwitchToSignup={props.handleLoginSwitchToSignup}
            handleSignupSwitchToLogin={props.handleSignupSwitchToLogin}
            dismissErrorAlert={props.dismissErrorAlert}
           />
           
           <SuccessAlert
            handleAlertChange={props.handleAlertChange}
            showSuccessAlert={props.showSuccessAlert}
            successAlertText={props.successAlertText}
            dismissSuccessAlert={props.dismissSuccessAlert}
           />
           
           <InfoAlert
            handleAlertChange={props.handleAlertChange}
           showInfoAlert={props.showInfoAlert}
            infoAlertText={props.infoAlertText}
            infoAlertTextHeading={props.infoAlertTextHeading}
            dismissInfoAlert={props.dismissInfoAlert}
           />
            
         </>          
               
      )
  
}


const mapStateToProps = state => ({
    
      //alerts
      showInfoAlert: state.showInfoAlert,
      infoAlertText: state.infoAlertText,
      infoAlertTextHeading: state.infoAlertTextHeading,
      errorAlertText: state.errorAlertText,
      errorAlertLinkText: state.errorAlertLinkText,
      showErrorAlert: state.showErrorAlert,
      showSuccessAlert: state.showSuccessAlert,
      successAlertText: state.successAlertText,
      showErrorAlertSwitchToSignup: state.showErrorAlertSwitchToSignup,
      showErrorAlertSwitchToLogin: state.showErrorAlertSwitchToLogin,
   
      });
      

const mapDispatchToProps = dispatch => ({
      handleLoginSwitchToSignup: () => handleLoginSwitchToSignup(dispatch),
      handleSignupSwitchToLogin: () => handleSignupSwitchToLogin(dispatch),
      handleAlertChange
});


export default connect(mapStateToProps, mapDispatchToProps) (AlertContainer);