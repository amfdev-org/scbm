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
  handleSignupSubmit,
  handleSignupSwitchToLogin
  } from '../actions/signupActions'
  
import {
  handleCommentersSearchChange,
  handleCommentersSearchSubmit,
  handleCommentersSelectedRowsChange,
  handleCommentersRecentSearchSubmit
  } from '../actions/commentersSearchActions'
 
import {
  handleCommentersMessageChange,
  handleCommentersMessageSubmit
  } from '../actions/commentersMessageActions' 
  
import {
  handleFollowersSearchChange,
  handleFollowersSearchSubmit,
  handleFollowersSelectedRowsChange,
  handleFollowersRecentSearchSubmit
  } from '../actions/followersSearchActions'
  
import {
  handleFollowersMessageChange,
  handleFollowersMessageSubmit
  } from '../actions/followersMessageActions' 
  
import {
  fetchMyFollowers,
  handleMyFollowersSelectedRowsChange
  } from '../actions/myFollowersSearchActions'
 
import {
  handleMyFollowersMessageChange,
  handleMyFollowersMessageSubmit
  } from '../actions/myFollowersMessageActions' 
  
import {
  fetchSentMessages,
  handleSentMessagesSelectedRowsChange
  } from '../actions/sentMessagesSearchActions'
 
import {
  handleSentMessagesMessageChange,
  handleSentMessagesMessageSubmit
  } from '../actions/sentMessagesMessageActions' 
  
import {
  fetchReceivedMessages,
  handleReceivedMessagesSelectedRowsChange,
  handleReceivedMessagesRefresh
  } from '../actions/receivedMessagesSearchActions'
 
import {
  handleReceivedMessagesMessageChange,
  handleReceivedMessagesMessageSubmit
  } from '../actions/receivedMessagesMessageActions' 
  
  
import {
  handleAlertChange,
  handleToggleConfigModal,
  handleCloseConfigModal,
  handleTestModeChange,
  handleDownloadLogs
  } from '../actions/uiActions' 
  
  
//BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import ReactTooltip from "react-tooltip";
//COMPONENTS
//forms
import Header from '../components/header';
import Footer from '../components/footer';
import ConfigModal from '../components/configModal';
import LoginForm from '../components/loginForm';
import SignupForm from '../components/signupForm';

//tables/grids
import CommentersTable from '../components/commentersTable';
import FollowersTable from '../components/followersTable';
import MyFollowersTable from '../components/myFollowersTable';
import SentMessagesTable from '../components/sentMessagesTable';
import ReceivedMessagesTable from '../components/receivedMessagesTable';

//message forms
import CommentersSearchForm from '../components/commentersSearchForm';
import FollowersSearchForm from '../components/followersSearchForm';
import CommentersMessageForm from '../components/commentersMessageForm';
import FollowersMessageForm from '../components/followersMessageForm';
import MyFollowersMessageForm from '../components/myFollowersMessageForm';
import SentMessagesMessageForm from '../components/sentMessagesMessageForm';
import ReceivedMessagesMessageForm from '../components/receivedMessagesMessageForm';

//alerts
import ErrorAlert from '../components/errorAlert';
import SuccessAlert from '../components/successAlert';
import InfoAlert from '../components/infoAlert';

class App extends Component {
  
  componentDidMount = () => {

    this.props.fetchAuth()

  }

    handleRefresh = (event) => {
     
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        ReactTooltip.hide();
        
        this.props.handleReceivedMessagesRefresh(event)

    }
    
  
  render() {
         
    const showLoginForm = this.props.showLoginForm ? {display: 'block'} : {display: 'none'};
    const showMainAccordion = this.props.showMainAccordion ? {display: 'block'} : {display: 'none'};
    const showSignupForm = this.props.showSignupForm ? {display: 'block'} : {display: 'none'};
    
    const showReceivedMessagesMessageForm = this.props.showReceivedMessagesMessageForm ? {display: 'block'} : {display: 'none'};
    const showSentMessagesMessageForm = this.props.showSentMessagesMessageForm ? {display: 'block'} : {display: 'none'};
    const showMyFollowersMessageForm = this.props.showMyFollowersMessageForm ? {display: 'block'} : {display: 'none'};
    const showCommentersMessageForm = this.props.showCommentersMessageForm ? {display: 'block'} : {display: 'none'};
    const showFollowersMessageForm = this.props.showFollowersMessageForm ? {display: 'block'} : {display: 'none'};

  
    return (
      
      <>
   
      <Header
        showLoggedInInfo={this.props.showLoggedInInfo}
        loggedInInfoText={this.props.loggedInInfoText}
        showLogoutSubmitButton={this.props.showLogoutSubmitButton}
        handleLogoutSubmit={this.props.handleLogoutSubmit}
        showConfigModal={this.props.showConfigModal}
        handleToggleConfigModal={this.props.handleToggleConfigModal}
        handleCloseConfigModal={this.props.handleCloseConfigModal}
        />
        
        <ConfigModal
        showConfigModal={this.props.showConfigModal}
        handleCloseConfigModal={this.props.handleCloseConfigModal}
        isTestMode={this.props.isTestMode}
        handleTestModeChange={this.props.handleTestModeChange}
        handleDownloadLogs={this.props.handleDownloadLogs}
        />
                
      <Container className="main-container">
          <Row>
          <Col>

           <ErrorAlert
            handleAlertChange={this.props.handleAlertChange}
            showErrorAlert={this.props.showErrorAlert}
            errorAlertText={this.props.errorAlertText}
            errorAlertLinkText={this.props.errorAlertLinkText}
            showErrorAlertSwitchToSignup={this.props.showErrorAlertSwitchToSignup}
            showErrorAlertSwitchToLogin={this.props.showErrorAlertSwitchToLogin}
            handleLoginSwitchToSignup={this.props.handleLoginSwitchToSignup}
            handleSignupSwitchToLogin={this.props.handleSignupSwitchToLogin}
            dismissErrorAlert={this.dismissErrorAlert}
           />
           
           <SuccessAlert
            handleAlertChange={this.props.handleAlertChange}
            showSuccessAlert={this.props.showSuccessAlert}
            successAlertText={this.props.successAlertText}
            dismissSuccessAlert={this.dismissSuccessAlert}
           />
           
           <InfoAlert
            handleAlertChange={this.props.handleAlertChange}
           showInfoAlert={this.props.showInfoAlert}
            infoAlertText={this.props.infoAlertText}
            infoAlertTextHeading={this.props.infoAlertTextHeading}
            dismissInfoAlert={this.dismissInfoAlert}
           />
               
        <Container className="login-container">
        
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
         
         </Container>
         
            <Accordion className="main-accordion" defaultActiveKey="0" style={showMainAccordion}>
            
                <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Recent Messages
                  
                    <Button
                      className="data-refresh-button"
                       data-tip="Get latest message threads"
                      name="receivedMessages"
                        type="submit"
                        value="Submit"
                        size="sm"
                        onClick={this.handleRefresh}
                        disabled={!this.props.enableReceivedMessagesRefresh}
                        >
                        Refresh
                    </Button>
            
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>

                       <ReceivedMessagesTable className="receivedMessagesDataTable"
                       receivedMessageData={this.props.receivedMessageData}
                       showReceivedMessagesTable={this.props.showReceivedMessagesTable}
                       handleReceivedMessagesSelectedRowsChange={this.props.handleReceivedMessagesSelectedRowsChange}
                       showReceivedMessagesLoadingIcon={this.props.showReceivedMessagesLoadingIcon}
                       selectedReceivedMessages={this.props.selectedReceivedMessages}
                       toggledClearRows={this.props.toggledClearRows}
                       />
                   
                       <h6 style={showReceivedMessagesMessageForm} className="messageForm">Message</h6>
                   
                        <ReceivedMessagesMessageForm
                         receivedMessagesMessage={this.props.receivedMessagesMessage}
                         showReceivedMessagesMessageForm={this.props.showReceivedMessagesMessageForm}
                         handleReceivedMessagesMessageChange={this.props.handleReceivedMessagesMessageChange}
                         handleReceivedMessagesMessageSubmit={this.props.handleReceivedMessagesMessageSubmit}
                         enableReceivedMessagesMessageInput={this.props.enableReceivedMessagesMessageInput}
                         enableReceivedMessagesMessageSubmitButton={this.props.enableReceivedMessagesMessageSubmitButton}
                         showReceivedMessagesMessageSubmitButton = {this.props.showReceivedMessagesMessageSubmitButton}
                         showReceivedMessagesMessageSubmitLoadingButton = {this.props.showReceivedMessagesMessageSubmitLoadingButton}
                       />
                          
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Sent Messages
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>

                       <SentMessagesTable className="sentMessagesDataTable"
                       sentMessageData={this.props.sentMessageData}
                       showSentMessagesTable={this.props.showSentMessagesTable}
                       handleSentMessagesSelectedRowsChange={this.props.handleSentMessagesSelectedRowsChange}
                       showSentMessagesLoadingIcon={this.props.showSentMessagesLoadingIcon}
                       selectedSentMessages={this.props.selectedSentMessages}
                       toggledClearRows={this.props.toggledClearRows}
                       />
                   
                       <h6 style={showSentMessagesMessageForm} className="messageForm">Message</h6>
                   
                        <SentMessagesMessageForm
                         sentMessagesMessage={this.props.sentMessagesMessage}
                         showSentMessagesMessageForm={this.props.showSentMessagesMessageForm}
                         handleSentMessagesMessageChange={this.props.handleSentMessagesMessageChange}
                         handleSentMessagesMessageSubmit={this.props.handleSentMessagesMessageSubmit}
                         enableSentMessagesMessageInput={this.props.enableSentMessagesMessageInput}
                         enableSentMessagesMessageSubmitButton={this.props.enableSentMessagesMessageSubmitButton}
                         showSentMessagesMessageSubmitButton = {this.props.showSentMessagesMessageSubmitButton}
                         showSentMessagesMessageSubmitLoadingButton = {this.props.showSentMessagesMessageSubmitLoadingButton}
                       />
                          
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              
                <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  My Followers
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>

                       <MyFollowersTable className="myFollowersDataTable"
                       myFollowerData={this.props.myFollowerData}
                       showMyFollowersTable={this.props.showMyFollowersTable}
                       handleMyFollowersSelectedRowsChange={this.props.handleMyFollowersSelectedRowsChange}
                       showMyFollowersLoadingIcon={this.props.showMyFollowersLoadingIcon}
                       selectedMyFollowers={this.props.selectedMyFollowers}
                       toggledClearRows={this.props.toggledClearRows}
                       />
                   
                       <h6 style={showMyFollowersMessageForm} className="messageForm">Message</h6>
                   
                       <MyFollowersMessageForm
                         myFollowersMessage={this.props.myFollowersMessage}
                         showMyFollowersMessageForm={this.props.showMyFollowersMessageForm}
                         handleMyFollowersMessageChange={this.props.handleMyFollowersMessageChange}
                         handleMyFollowersMessageSubmit={this.props.handleMyFollowersMessageSubmit}
                         enableMyFollowersMessageInput={this.props.enableMyFollowersMessageInput}
                         enableMyFollowersMessageSubmitButton={this.props.enableMyFollowersMessageSubmitButton}
                         showMyFollowersMessageSubmitButton = {this.props.showMyFollowersMessageSubmitButton}
                         showMyFollowersMessageSubmitLoadingButton = {this.props.showMyFollowersMessageSubmitLoadingButton}
                       />
                          
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
                                   
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="3">
                  Find Commenters
                </Accordion.Toggle>
                
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                  
                      <h6 className="main">Song URL</h6>
                      
                        <CommentersSearchForm
                          className="main"
                          commentersSearchUrl={this.props.commentersSearchUrl}
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
                          recentCommentersSearches={this.props.recentCommentersSearches}
                          handleCommentersRecentSearchSubmit={this.props.handleCommentersRecentSearchSubmit}
                          showCommentersRecentSearchContainer={this.props.showCommentersRecentSearchContainer}
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
                <Accordion.Toggle as={Card.Header} eventKey="4">
                  Find Followers
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                  
                    <h6 className="main">Profile URL</h6>
                        
                        <FollowersSearchForm
                          className="main"
                          followersSearchUrl={this.props.followersSearchUrl}
                          handleFollowersSearchChange={this.props.handleFollowersSearchChange}
                          handleFollowersSearchSubmit={this.props.handleFollowersSearchSubmit}
                          enableFollowersSearchInput={this.props.enableFollowersSearchInput}
                          enableFollowersSearchSubmitButton={this.props.enableFollowersSearchSubmitButton}
                          showFollowersSearchSubmitButton={this.props.showFollowersSearchSubmitButton}
                          showFollowersSearchSubmitLoadingButton={this.props.showFollowersSearchSubmitLoadingButton} />
            
                          <FollowersTable className="followersDataTable"
                          followerData={this.props.followerData}
                          showFollowersTable={this.props.showFollowersTable}
                          handleFollowersSelectedRowsChange={this.props.handleFollowersSelectedRowsChange}
                          showFollowersSubmitButton={this.props.showFollowersSubmitButton}
                          showFollowersSubmitLoadingButton={this.props.showFollowersSubmitLoadingButton}
                          selectedFollowers={this.props.selectedFollowers}
                          toggledClearRows={this.props.toggledClearRows}
                          recentFollowersSearches={this.props.recentFollowersSearches}
                          handleFollowersRecentSearchSubmit={this.props.handleFollowersRecentSearchSubmit}
                          showFollowersRecentSearchContainer={this.props.showFollowersRecentSearchContainer}
                          />
                      
                          <h6 style={showFollowersMessageForm} className="messageForm">Message</h6>
                      
                          <FollowersMessageForm
                            followersMessage={this.props.followersMessage}
                            showFollowersMessageForm={this.props.showFollowersMessageForm}
                            handleFollowersMessageChange={this.props.handleFollowersMessageChange}
                            handleFollowersMessageSubmit={this.props.handleFollowersMessageSubmit}
                            enableFollowersMessageInput={this.props.enableFollowersMessageInput}
                            enableFollowersMessageSubmitButton={this.props.enableFollowersMessageSubmitButton}
                            showFollowersMessageSubmitButton = {this.props.showFollowersMessageSubmitButton}
                            showFollowersMessageSubmitLoadingButton = {this.props.showFollowersMessageSubmitLoadingButton}
                          />
                          
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
               
           </Col>
          </Row>
        </Container>
   
         <Footer />
         
         </>          
               
      )
  }
  
  
}

function mapStateToProps(state) {
 
    return {
      
      //main UI
      showMainAccordion: state.showMainAccordion,
      
      //logged in info
      showLoggedInInfo: state.showLoggedInInfo,
      showLogoutSubmitButton: state.showLogoutSubmitButton,
      loggedInInfoText: state.loggedInInfoText,
      
      //commenters search
      commentersSearchUrl: state.commentersSearchUrl,
      showCommentersSearchSubmitButton: state.showCommentersSearchSubmitButton,
      enableCommentersSearchSubmitButton: state.enableCommentersSearchSubmitButton,
      showCommentersSearchSubmitLoadingButton: state.showCommentersSearchSubmitLoadingButton,
      enableCommentersSearchInput: state.enableCommentersSearchInput,
      showCommentersTable: state.showCommentersTable,
      commenterData : state.commenterData,
      selectedCommenters : state.selectedCommenters,
      toggledClearRows: state.toggledClearRows,
      
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
      showErrorAlertSwitchToSignup: state.showErrorAlertSwitchToSignup,
      showErrorAlertSwitchToLogin: state.showErrorAlertSwitchToLogin,
      
      //commenters messages
      showCommentersMessageForm: state.showCommentersMessageForm,
      commentersMessage: state.commentersMessage,
      showCommentersMessageSubmitButton: state.showCommentersMessageSubmitButton,
      showCommentersMessageSubmitLoadingButton: state.showCommentersMessageSubmitLoadingButton,
      enableCommentersMessageSubmitButton : state.enableCommentersMessageSubmitButton,
      enableCommentersMessageInput: state.enableCommentersMessageInput,
      
      //followers search
      followersSearchUrl: state.followersSearchUrl,
      showFollowersSearchSubmitButton: state.showFollowersSearchSubmitButton,
      enableFollowersSearchSubmitButton: state.enableFollowersSearchSubmitButton,
      showFollowersSearchSubmitLoadingButton: state.showFollowersSearchSubmitLoadingButton,
      enableFollowersSearchInput: state.enableFollowersSearchInput,
      showFollowersTable: state.showFollowersTable,
      followerData : state.followerData,
      selectedFollowers : state.selectedFollowers,
      //toggledClearRows: state.toggledClearRows,
      
      //followers messages
      showFollowersMessageForm: state.showFollowersMessageForm,
      followersMessage: state.followersMessage,
      showFollowersMessageSubmitButton: state.showFollowersMessageSubmitButton,
      showFollowersMessageSubmitLoadingButton: state.showFollowersMessageSubmitLoadingButton,
      enableFollowersMessageSubmitButton : state.enableFollowersMessageSubmitButton,
      enableFollowersMessageInput: state.enableFollowersMessageInput,
      
      //my followers
      myFollowerData: state.myFollowerData,
      showMyFollowersTable: state.showMyFollowersTable,
      showMyFollowersLoadingIcon: state.showMyFollowersLoadingIcon,
      selectedMyFollowers: state.selectedMyFollowers,
      
      //my followers messages
      myFollowersMessage: state.myFollowersMessage,
      showMyFollowersMessageForm: state.showMyFollowersMessageForm,
      enableMyFollowersMessageInput: state.enableMyFollowersMessageInput,
      enableMyFollowersMessageSubmitButton: state.enableMyFollowersMessageSubmitButton,
      showMyFollowersMessageSubmitButton: state.showMyFollowersMessageSubmitButton,
      showMyFollowersMessageSubmitLoadingButton: state.showMyFollowersMessageSubmitLoadingButton,
      
      //sent messages
      sentMessageData: state.sentMessageData,
      showSentMessagesTable: state.showSentMessagesTable,
      showSentMessagesSubmitButton: state.showSentMessagesSubmitButton,
      showSentMessagesSubmitLoadingButton: state.showSentMessagesSubmitLoadingButton,
      selectedSentMessages: state.selectedSentMessages,   
      showSentMessagesLoadingIcon: state.showSentMessagesLoadingIcon,
      
      //sent messages message
      sentMessagesMessage: state.sentMessagesMessage,
      showSentMessagesMessageForm: state.showSentMessagesMessageForm,
      enableSentMessagesMessageInput: state.enableSentMessagesMessageInput,
      enableSentMessagesMessageSubmitButton: state.enableSentMessagesMessageSubmitButton,
      showSentMessagesMessageSubmitButton: state.showSentMessagesMessageSubmitButton,
      showSentMessagesMessageSubmitLoadingButton: state.showSentMessagesMessageSubmitLoadingButton,
      
      //received messages
      receivedMessageData: state.receivedMessageData,
      showReceivedMessagesTable: state.showReceivedMessagesTable,
      showReceivedMessagesSubmitButton: state.showReceivedMessagesSubmitButton,
      showReceivedMessagesSubmitLoadingButton: state.showReceivedMessagesSubmitLoadingButton,
      selectedReceivedMessages: state.selectedReceivedMessages,   
      showReceivedMessagesLoadingIcon: state.showReceivedMessagesLoadingIcon,
      enableReceivedMessagesRefresh: state.enableReceivedMessagesRefresh,
      
      //received messages message
      receivedMessagesMessage: state.receivedMessagesMessage,
      showReceivedMessagesMessageForm: state.showReceivedMessagesMessageForm,
      enableReceivedMessagesMessageInput: state.enableReceivedMessagesMessageInput,
      enableReceivedMessagesMessageSubmitButton: state.enableReceivedMessagesMessageSubmitButton,
      showReceivedMessagesMessageSubmitButton: state.showReceivedMessagesMessageSubmitButton,
      showReceivedMessagesMessageSubmitLoadingButton: state.showReceivedMessagesMessageSubmitLoadingButton,
      showConfigModal: state.showConfigModal,
      isTestMode: state.isTestMode,
      recentCommentersSearches: state.recentCommentersSearches,
      recentFollowersSearches: state.recentFollowersSearches,
      showCommentersRecentSearchContainer: state.showCommentersRecentSearchContainer,
      showFollowersRecentSearchContainer: state.showFollowersRecentSearchContainer
      }
      
}


//basically, functions...
const mapDispatchToProps = {
      fetchAuth,
      handleLoginChange,
      handleLoginSubmit,
      handleLogoutSubmit,
      handleLoginSwitchToSignup,
      handleSignupSwitchToLogin,
      handleSignupChange,
      handleSignupSubmit,
      handleCommentersSearchChange,
      handleCommentersSearchSubmit,
      handleCommentersSelectedRowsChange,
      handleCommentersMessageChange,
      handleCommentersMessageSubmit,
      handleFollowersSearchChange,
      handleFollowersSearchSubmit,
      handleFollowersSelectedRowsChange,
      handleFollowersMessageChange,
      handleFollowersMessageSubmit,
      handleAlertChange,
      fetchMyFollowers,
      handleMyFollowersSelectedRowsChange,
      handleMyFollowersMessageChange,
      handleMyFollowersMessageSubmit,
      fetchSentMessages,
      handleSentMessagesSelectedRowsChange,
      handleSentMessagesMessageChange,
      handleSentMessagesMessageSubmit,
      fetchReceivedMessages,
      handleReceivedMessagesSelectedRowsChange,
      handleReceivedMessagesMessageChange,
      handleReceivedMessagesMessageSubmit,
      handleReceivedMessagesRefresh,
      handleToggleConfigModal,
      handleCloseConfigModal,
      handleTestModeChange,
      handleDownloadLogs,
      handleCommentersRecentSearchSubmit,
      handleFollowersRecentSearchSubmit
}

export default connect(mapStateToProps, mapDispatchToProps) (App);