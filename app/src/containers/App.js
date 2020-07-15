import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux';

//IMPORT REDUX ACTION CREATORS
import {
  fetchAuth
  } from '../actions/authActions'
  
import {
  handleLoginChange,
  handleLoginSubmit,
  handleLogoutSubmit,
  handleLoginSwitchToSignup
  } from '../actions/loginActions'

import {
  handleSignupChange,
  handleSignupSubmit
  } from '../actions/signupActions'
  
import {
  handleCommentersSearchChange,
  handleCommentersSearchSubmit,
  handleCommentersSelectedRowsChange
  } from '../actions/commentersSearchActions'
 
import {
  handleCommentersMessageChange,
  handleCommentersMessageSubmit
  } from '../actions/commentersMessageActions' 
  
//BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

//COMPONENTS
//forms
import LoggedInInfo from '../components/loggedInInfo';
import LoginForm from '../components/loginForm';
import SignupForm from '../components/signupForm';
import CommentersSearchForm from '../components/commentersSearchForm';
import FollowersSearchForm from '../components/followersSearchForm';
import CommentersMessageForm from '../components/commentersMessageForm';

//tables/grids
import CommentersTable from '../components/commentersTable';
import FollowersTable from '../components/followersTable';

//alerts
import ErrorAlert from '../components/errorAlert';
import SuccessAlert from '../components/successAlert';
import InfoAlert from '../components/infoAlert';

class App extends Component {
  
  /*constructor() {
    
      super();
      
  }*/
  
  componentDidMount = () => {

    this.props.fetchAuth()
  }

  
  render() {
         
    const showLoginForm = this.props.showLoginForm ? {display: 'block'} : {display: 'none'};
    const showMainAccordion = this.props.showMainAccordion ? {display: 'block'} : {display: 'none'};
    
    const showCommentersMessageForm = this.props.showCommentersMessageForm ? {display: 'block'} : {display: 'none'};
    
    const showSignupForm = this.props.showSignupForm ? {display: 'block'} : {display: 'none'};
    /*
    const showCommentersSearchForm = this.state.showCommentersSearchForm ? {display: 'block'} : {display: 'none'};
    //const showCommentersTable = this.state.showCommentersTable ? {display: 'block'} : {display: 'none'};
    const showMessageForm = this.state.showMessageForm ? {display: 'block'} : {display: 'none'};
*/
    
    return (
      <Container>
          <Row>
          <Col>
       
           <ErrorAlert
            showErrorAlert={this.props.showErrorAlert}
            errorAlertText={this.props.errorAlertText}
            errorAlertLinkText={this.props.errorAlertLinkText}
            handleLoginSwitchToSignup={this.props.handleLoginSwitchToSignup}
            dismissErrorAlert={this.dismissErrorAlert}
           />
           
           <SuccessAlert
            showSuccessAlert={this.props.showSuccessAlert}
            successAlertText={this.props.successAlertText}
            dismissSuccessAlert={this.dismissSuccessAlert}
           />
           
           <InfoAlert
           showInfoAlert={this.props.showInfoAlert}
            infoAlertText={this.props.infoAlertText}
            infoAlertTextHeading={this.props.infoAlertTextHeading}
            dismissInfoAlert={this.dismissInfoAlert}
           />
               
        <LoggedInInfo
          showLoggedInInfo={this.props.showLoggedInInfo}
          showLogoutSubmitButton={this.props.showLogoutSubmitButton}
          loggedInInfoText={this.props.loggedInInfoText}
          handleLogoutSubmit={this.props.handleLogoutSubmit}
          />
        
          <h3 className="main" style={showLoginForm}>Login</h3>
            
            <LoginForm className="main"
              showLoginForm={this.props.showLoginForm}
              enableLoginSubmitButton={this.props.enableLoginSubmitButton}
              showLoginSubmitButton={this.props.showLoginSubmitButton}
              showLoginSubmitLoadingButton={this.props.showLoginSubmitLoadingButton} 
              scUsername={this.props.scUsername}
              scPassword={this.props.scPassword}
              loginButtonText = {this.props.loginHeaderText}
              handleLoginChange={this.props.handleLoginChange}
              handleLoginSubmit={this.props.handleLoginSubmit}
            />
            
             <h3 className="main" style={showSignupForm}>Sign Up</h3>
            
            <SignupForm className="main"
              showSignupForm={this.props.showSignupForm}
              scUsername={this.props.scUsername}
              scPassword={this.props.scPassword}
              signupButtonText = {this.props.signupHeaderText}
              enableSignupFormInputs={this.props.enableSignupFormInputs}
              handleSignupChange={this.props.handleSignupChange}
              handleSignupSubmit={this.props.handleSignupSubmit}
              enableSignupSubmitButton={this.props.enableSignupSubmitButton}
              showSignupSubmitButton={this.props.showSignupSubmitButton}
              showSignupSubmitLoadingButton={this.props.showSignupSubmitLoadingButton} />
              
   
            <Accordion className="main-accordion" style={showMainAccordion}>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Commenters
                </Accordion.Toggle>
                
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                  
                      <h6 className="main">Song URL</h6>
                      
                        <CommentersSearchForm
                          className="main"
                          searchUrl={this.props.commentersSearchUrl}
                          handleCommentersSearchChange={this.props.handleCommentersSearchChange}
                          handleCommentersSearchSubmit={this.props.handleCommentersSearchSubmit}
                          enableCommentersSearchInput={this.props.enableCommentersSearchInput}
                          enableCommentersSearchSubmitButton={this.props.enableCommentersSearchSubmitButton}
                          showCommentersSearchSubmitButton={this.props.showCommentersSearchSubmitButton}
                          showCommentersSearchSubmitLoadingButton={this.props.showCommentersSearchSubmitLoadingButton} />
                  
        
                      <CommentersTable className="commentersDataTable"
                          commenterData={this.props.commenterData}
                          showCommentersTable={this.props.showCommentersTable}
                          handleCommentersSelectedRowsChange={this.props.handleCommentersSelectedRowsChange}
                          //handleCommentersSelecSubmit={this.props.handleCommentersSubmit}
                          showCommentersSubmitButton={this.props.showCommentersSubmitButton}
                          showCommentersSubmitLoadingButton={this.props.showCommentersSubmitLoadingButton}
                          selectedCommenters={this.props.selectedCommenters}
                          toggledClearRows={this.props.toggledClearRows}
                          />
                      
                      <h6 style={showCommentersMessageForm} className="messageForm">Message</h6>
                      
                      <CommentersMessageForm
                          commentersMessage={this.props.commentersMessage}
                          showCommentersMessageForm={this.props.showCommentersMessageForm}
                          handleCommentersMessageChange={this.props.handleCommentersMessageChange}
                          handleCommentersMessageSubmit={this.props.handleCommentersMessageSubmit}
                          enableCommentersMessageInput={this.props.enableCommentersMessageInput}
                          enableCommentersMessageSubmitButton={this.props.enableCommentersMessageSubmitButton}
                          showCommentersMessageSubmitButton = {this.props.showCommentersMessageSubmitButton}
                          showCommentersMessageSubmitLoadingButton = {this.props.showCommentersMessageSubmitLoadingButton}
                          />
                  
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Followers
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                  
                    <h6 className="main">Profile URL</h6>
                        
                        
                        {/*<FollowersSearchForm
                          className="main"
                          searchUrl={this.state.searchUrl}
                          handleFollowersSearchChange={this.handleFollowersSearchChange}
                          handleFollowersSearchSubmit={this.handleFollowersSearchSubmit}
                          enableFollowersSearchInput={this.state.enableFollowersSearchInput}
                          enableFollowersSearchSubmitButton={this.state.enableFollowersSearchSubmitButton}
                          showFollowersSearchSubmitButton={this.state.showFollowersSearchSubmitButton}
                          showFollowersSearchSubmitLoadingButton={this.state.showFollowersSearchSubmitLoadingButton} />
            
                      <FollowersTable className="followersDataTable"
                          followerData={this.state.followerData}
                          showFollowersTable={this.state.showFollowersTable}
                          handleFollowersChange={this.handleFollowersChange}
                          handleFollowersSubmit={this.handleFollowersSubmit}
                          showFollowersSubmitButton={this.state.showFollowersSubmitButton}
                          showFollowersSubmitLoadingButton={this.state.showFollowersSubmitLoadingButton}
                          selectedFollowers={this.state.selectedFollowers}
                          toggledClearRows={this.state.toggledClearRows}
                          />
                      
                      <h6 style={showMessageForm} className="messageForm">Message</h6>
                      
                      <MessageForm
                          message={this.state.message}
                          showMessageForm={this.state.showMessageForm}
                          handleMessageChange={this.handleMessageChange}
                          handleMessageSubmit={this.handleMessageSubmit}
                          enableMessageInput={this.state.enableMessageInput}
                          enableMessageSubmitButton={this.state.enableMessageSubmitButton}
                          showMessageSubmitButton = {this.state.showMessageSubmitButton}
                          showMessageSubmitLoadingButton = {this.state.showMessageSubmitLoadingButton}
                          />*/}
                          
                          
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
               
           </Col>
          </Row>
        </Container>
      )
  }
  

  
  handleFollowersSearchChange = event => {
    
    console.log(event);
     
     const { name, value } = event.target
  
      this.setState({[name]: value, followersSearchUrl: value}, () => {   
          if (this.state.followersSearchUrl.length > 10 && this.state.followersSearchUrl.includes("http")) {
            this.setState({enableFollowersSearchSubmitButton: true}, () => {   
              //console.log(this.state);
            })
          } else {
            this.setState({enableFollowersSearchSubmitButton: false}, () => {   
              //console.log(this.state);
            })
          }
      })
        
  }
    
    
  handleFollowersSearchSubmit = () => {
  
    this.setState({ showFollowersTable: false })
    this.setState({ showFollowersSearchSubmitButton: false })
    this.setState({ showFollowersSearchSubmitLoadingButton: true })
    this.setState({ enableFollowersSearchInput: false })
    this.setState({ showErrorAlert: false })
    this.setState({ showSuccessAlert: false })
    this.setState({ showInfoAlert: false })
    
      var myHeaders = new Headers();
        myHeaders.set('Accept', 'application/json');
        myHeaders.set('Content-Type', 'application/json');
        //myHeaders.set('Authorization', 'Token token=' + String(token));
        myHeaders.set('Cache-Control', 'no-cache');
        myHeaders.set('Pragma', 'no-cache');
        myHeaders.set('Expires', '0');
    
    fetch('https://scbm.amfdev.co.uk/api/followers/?followersSearchUrl='+encodeURI((this.state.followersSearchUrl)), {
            method: 'GET',
            headers: myHeaders
        })
    .then(async response => {
      
            if (!response.ok) {
               //throw Error(response.statusText);
                this.setState({errorAlertText: "Something went wrong. Please try again later."});
                this.setState({showErrorAlert: true});
                
                this.setState({ showFollowersSearchSubmitButton: true })
                this.setState({ showFollowersSearchSubmitLoadingButton: false })
            }
            //console.log(response);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
                
            if (jsonResponse.success) {
                  
                this.setState({ followerData: jsonResponse.followerData })
                this.setState({ showFollowersTable: true })
                document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
  
                this.setState({successAlertText: "Found " + jsonResponse.followerData.length + ' followers.'});
                
                  this.setState({showSuccessAlert: true},()=>{
                  window.setTimeout(()=>{
                    this.setState({showSuccessAlert: false})
                  },4000)
                  
              });
                
                  this.setState({ enableFollowersSearchInput: true })
                  this.setState({ showFollowersSearchSubmitButton: true })
                  this.setState({ showFollowersSearchSubmitLoadingButton: false })
                  
            
            } else if (!jsonResponse.success) {
              
                  if (jsonResponse.followerData === "no followers") {
                    
                        this.setState({ showFollowersTable: true })
                        document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
          
                        this.setState({successAlertText: "But there were no followers found for this track."});
                        
                          this.setState({showSuccessAlert: true},()=>{
                          window.setTimeout(()=>{
                            this.setState({showSuccessAlert: false})
                          },4000)
                          
                      });
                      
                          this.setState({ enableFollowersSearchInput: true })
                          this.setState({ showFollowersSearchSubmitButton: true })
                          this.setState({ showFollowersSearchSubmitLoadingButton: false })
                          
                  } else {
                    
                        // get error message from body or default to response status
                         //const error = (followerData && followerData.message) || response.status;
                         //console.log(jsonResponse.errorMessage);
                         //return Promise.reject(jsonResponse.errorMessage);
                         this.setState({errorAlertText: "Something went wrong. Please try again later."});
                         this.setState({showErrorAlert: true});
                         
                         this.setState({ showFollowersSearchSubmitButton: true })
                         this.setState({ showFollowersSearchSubmitLoadingButton: false })
                         this.setState({ enableFollowersSearchInput: true })
  
                  }
           
                  
            }
            
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            
             this.setState({ enableFollowersSearchInput: true })
            this.setState({ showFollowersSearchSubmitButton: true })
            this.setState({ showFollowersSearchSubmitLoadingButton: false })
            
              this.setState({showErrorAlert: true},()=>{
              window.setTimeout(()=>{
                this.setState({showErrorAlert: false})
              },4000)
            });
              
        });
      
    
      /*
        const followerData = [
            {profileUrl: "https://soundcloud.com/cloaked-music", messagedBefore: "No"},
            {profileUrl: "https://srewrewr.com", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/patrickxtaylor", messagedBefore: "Yes"},
            {profileUrl: "https://soundcloud.com/alvonmars", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/upukrecords", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/user-355158966-477119345", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/deftsoulmusique1995", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/ocmoon", messagedBefore: "Yes"}
            ];
        
        
            this.setState({ followerData: followerData })
            this.setState({ showFollowersTable: true })
            
            this.setState({ showSearchSubmitButton: true })
            this.setState({ showSearchSubmitLoadingButton: false })*/
            
 
  }
  
  
  dismissErrorAlert = () => {
        this.setState({showErrorAlert: false});
  }
    
  dismissSuccessAlert = () => {
        this.setState({showSuccessAlert: false});
  }
  
  dismissInfoAlert = () => {
        this.setState({showInfoAlert: false});
  }
  
  
  doReset = () => {
      //console.log('do reset');
      this.setState(this.initialState);
      this.componentDidMount(); 
  }
  

}

//export default App

function mapStateToProps(state) {
 
 //console.log(state)
    return {
      
      //main UI
      showMainAccordion: state.showMainAccordion,
      
      //logged in info
      showLoggedInInfo: state.showLoggedInInfo,
      showLogoutSubmitButton: state.showLogoutSubmitButton,
      loggedInInfoText: state.loggedInInfoText,
      
      //commenters
      showCommentersTable: state.showCommentersTable,
      commenterData : state.commenterData,
      selectedCommenters : state.selectedCommenters,
      toggledClearRows: state.toggledClearRows,
      
      //commenters search form
      showCommentersSearchSubmitButton: state.showCommentersSearchSubmitButton,
      enableCommentersSearchSubmitButton: state.enableCommentersSearchSubmitButton,
      showCommentersSearchSubmitLoadingButton: state.showCommentersSearchSubmitLoadingButton,
      enableCommentersSearchInput: state.enableCommentersSearchInput,

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
      showSignupSubmitLoadingButton: state.showSignupSubmitLoadingButton,
      
      //alerts
      showInfoAlert: state.showInfoAlert,
      infoAlertText: state.infoAlertText,
      infoAlertTextHeading: state.infoAlertTextHeading,
      errorAlertText: state.errorAlertText,
      errorAlertLinkText: state.errorAlertLinkText,
      showErrorAlert: state.showErrorAlert,
      showSuccessAlert: state.showSuccessAlert,
      successAlertText: state.successAlertText,
      
      //messages
      showCommentersMessageForm: state.showCommentersMessageForm,
      commentersMessage: state.commentersMessage,
      showCommentersMessageSubmitButton: state.showCommentersMessageSubmitButton,
      showCommentersMessageSubmitLoadingButton: state.showCommentersMessageSubmitLoadingButton,
      enableCommentersMessageSubmitButton : state.enableCommentersMessageSubmitButton,
      enableCommentersMessageInput: state.enableCommentersMessageInput
      }
      
}



//basically, functions...
const mapDispatchToProps = {
      fetchAuth,
      handleLoginChange,
      handleLoginSubmit,
      handleLogoutSubmit,
      handleLoginSwitchToSignup,
      handleSignupChange,
      handleSignupSubmit,
      handleCommentersSearchChange,
      handleCommentersSearchSubmit,
      handleCommentersSelectedRowsChange,
      handleCommentersMessageChange,
      handleCommentersMessageSubmit
}

export default connect(mapStateToProps, mapDispatchToProps) (App);