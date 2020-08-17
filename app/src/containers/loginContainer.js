import React from 'react';
import connect from "../provider/connect";

import {
  handleLoginChange,
  handleLoginSubmit
  } from '../actions/loginActions'

import {
  handleSignupChange,
  handleSignupSubmit
  } from '../actions/signupActions'
  
  
//BOOTSTRAP

import LoginForm from '../components/loginForm';
import SignupForm from '../components/signupForm';

function LoginContainer(props) {
         
    const showLoginForm = props.showLoginForm ? {display: 'block'} : {display: 'none'};
    const showSignupForm = props.showSignupForm ? {display: 'block'} : {display: 'none'};
  
    return (
      
        <div className="login-container">
        
          <h3 className="main" style={showLoginForm}>Login</h3>
            
            <LoginForm className="main"
              showLoginForm={props.showLoginForm}
              enableLoginSubmitButton={props.enableLoginSubmitButton}
              showLoginSubmitButton={props.showLoginSubmitButton}
              showLoginSubmitLoadingButton={props.showLoginSubmitLoadingButton} 
              scUsername={props.scUsername}
              scPassword={props.scPassword}
              loginButtonText={props.loginHeaderText}
              handleLoginChange={props.handleLoginChange}
              handleLoginSubmit={props.handleLoginSubmit}
            />
            
             <h3 className="main" style={showSignupForm}>Sign Up</h3>
            
            <SignupForm className="main"
              showSignupForm={props.showSignupForm}
              scUsername={props.scUsername}
              scPassword={props.scPassword}
              signupButtonText = {props.signupHeaderText}
              enableSignupFormInputs={props.enableSignupFormInputs}
              handleSignupChange={props.handleSignupChange}
              handleSignupSubmit={props.handleSignupSubmit}
              enableSignupSubmitButton={props.enableSignupSubmitButton}
              showSignupSubmitButton={props.showSignupSubmitButton}
              showSignupSubmitLoadingButton={props.showSignupSubmitLoadingButton} />
         
         </div>
    
               
      )
  
}


const mapStateToProps = state => ({

      //login
      showLoginForm: state.showLoginForm,
      showLoginSubmitButton: state.showLoginSubmitButton,
      showLoginSubmitLoadingButton: state.showLoginSubmitLoadingButton,
      enableLoginSubmitButton: state.enableLoginSubmitButton,
      scUsername: state.scUsername,
      scPassword: state.scPassword,
      
      //signup
      showSignupForm: state.showSignupForm,
      signupButtonText: state.signupButtonText,
      enableSignupFormInputs: state.enableSignupFormInputs,
      enableSignupSubmitButton: state.enableSignupSubmitButton,
      showSignupSubmitButton: state.showSignupSubmitButton,
      showSignupSubmitLoadingButton: state.showSignupSubmitLoadingButton
      })
      

const mapDispatchToProps = dispatch => ({
      handleLoginChange,
      handleLoginSubmit,
      handleSignupChange,
      handleSignupSubmit
});


export default connect(mapStateToProps, mapDispatchToProps) (LoginContainer);