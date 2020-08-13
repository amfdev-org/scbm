import React, { useEffect, useContext } from 'react';
import connect from "../provider/connect";
import { ContextConsumer } from "../provider/provider";

//IMPORT ACTION CREATORS
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

function App(props) {
  
    const context = useContext(ContextConsumer);
  
    useEffect(() => {
    // Create an scoped async function in the hook
       //function anyNameFunction() {      
      props.fetchAuth();

    }, []);
    
    const handleRefresh = (event) => {
     
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        ReactTooltip.hide();
        
        props.handleReceivedMessagesRefresh();

    }
    
         
    const showLoginForm = props.showLoginForm ? {display: 'block'} : {display: 'none'};
    const showMainAccordion = props.showMainAccordion ? {display: 'block'} : {display: 'none'};
    const showSignupForm = props.showSignupForm ? {display: 'block'} : {display: 'none'};
    
    const showReceivedMessagesMessageForm = props.showReceivedMessagesMessageForm ? {display: 'block'} : {display: 'none'};
    const showSentMessagesMessageForm = props.showSentMessagesMessageForm ? {display: 'block'} : {display: 'none'};
    const showMyFollowersMessageForm = props.showMyFollowersMessageForm ? {display: 'block'} : {display: 'none'};
    const showCommentersMessageForm = props.showCommentersMessageForm ? {display: 'block'} : {display: 'none'};
    const showFollowersMessageForm = props.showFollowersMessageForm ? {display: 'block'} : {display: 'none'};

  
    return (
      
      <>
   
      <Header
        showLoggedInInfo={props.showLoggedInInfo}
        loggedInInfoText={props.loggedInInfoText}
        showLogoutSubmitButton={props.showLogoutSubmitButton}
        handleLogoutSubmit={props.handleLogoutSubmit}
        showConfigModal={props.showConfigModal}
        handleToggleConfigModal={props.handleToggleConfigModal}
        handleCloseConfigModal={props.handleCloseConfigModal}
        />
        
        <ConfigModal
        showConfigModal={props.showConfigModal}
        handleCloseConfigModal={props.handleCloseConfigModal}
        isTestMode={props.isTestMode}
        handleTestModeChange={props.handleTestModeChange}
        handleDownloadLogs={props.handleDownloadLogs}
        />
                
      <Container className="main-container">
          <Row>
          <Col>

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
               
        <Container className="login-container">
        
          <h3 className="main" style={showLoginForm}>Login</h3>
            
            <LoginForm className="main"
              showLoginForm={props.showLoginForm}
              enableLoginSubmitButton={props.enableLoginSubmitButton}
              showLoginSubmitButton={props.showLoginSubmitButton}
              showLoginSubmitLoadingButton={props.showLoginSubmitLoadingButton} 
              scUsername={props.scUsername}
              scPassword={props.scPassword}
              loginButtonText = {props.loginHeaderText}
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
                        onClick={handleRefresh}
                        disabled={!props.enableReceivedMessagesRefresh}
                        >
                        Refresh
                    </Button>
            
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>

                       <ReceivedMessagesTable className="receivedMessagesDataTable"
                       receivedMessageData={props.receivedMessageData}
                       showReceivedMessagesTable={props.showReceivedMessagesTable}
                       handleReceivedMessagesSelectedRowsChange={props.handleReceivedMessagesSelectedRowsChange}
                       showReceivedMessagesLoadingIcon={props.showReceivedMessagesLoadingIcon}
                       selectedReceivedMessages={props.selectedReceivedMessages}
                       toggledClearRows={props.toggledClearRows}
                       />
                   
                       <h6 style={showReceivedMessagesMessageForm} className="messageForm">Message</h6>
                   
                        <ReceivedMessagesMessageForm
                         receivedMessagesMessage={props.receivedMessagesMessage}
                         showReceivedMessagesMessageForm={props.showReceivedMessagesMessageForm}
                         handleReceivedMessagesMessageChange={props.handleReceivedMessagesMessageChange}
                         handleReceivedMessagesMessageSubmit={props.handleReceivedMessagesMessageSubmit}
                         enableReceivedMessagesMessageInput={props.enableReceivedMessagesMessageInput}
                         enableReceivedMessagesMessageSubmitButton={props.enableReceivedMessagesMessageSubmitButton}
                         showReceivedMessagesMessageSubmitButton = {props.showReceivedMessagesMessageSubmitButton}
                         showReceivedMessagesMessageSubmitLoadingButton = {props.showReceivedMessagesMessageSubmitLoadingButton}
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
                       sentMessageData={props.sentMessageData}
                       showSentMessagesTable={props.showSentMessagesTable}
                       handleSentMessagesSelectedRowsChange={props.handleSentMessagesSelectedRowsChange}
                       showSentMessagesLoadingIcon={props.showSentMessagesLoadingIcon}
                       selectedSentMessages={props.selectedSentMessages}
                       toggledClearRows={props.toggledClearRows}
                       isTestMode={props.isTestMode}
                       />
                   
                       <h6 style={showSentMessagesMessageForm} className="messageForm">Message</h6>
                   
                        <SentMessagesMessageForm
                         sentMessagesMessage={props.sentMessagesMessage}
                         showSentMessagesMessageForm={props.showSentMessagesMessageForm}
                         handleSentMessagesMessageChange={props.handleSentMessagesMessageChange}
                         handleSentMessagesMessageSubmit={props.handleSentMessagesMessageSubmit}
                         enableSentMessagesMessageInput={props.enableSentMessagesMessageInput}
                         enableSentMessagesMessageSubmitButton={props.enableSentMessagesMessageSubmitButton}
                         showSentMessagesMessageSubmitButton = {props.showSentMessagesMessageSubmitButton}
                         showSentMessagesMessageSubmitLoadingButton = {props.showSentMessagesMessageSubmitLoadingButton}
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
                       myFollowerData={props.myFollowerData}
                       showMyFollowersTable={props.showMyFollowersTable}
                       handleMyFollowersSelectedRowsChange={props.handleMyFollowersSelectedRowsChange}
                       showMyFollowersLoadingIcon={props.showMyFollowersLoadingIcon}
                       selectedMyFollowers={props.selectedMyFollowers}
                       toggledClearRows={props.toggledClearRows}
                       />
                   
                       <h6 style={showMyFollowersMessageForm} className="messageForm">Message</h6>
                   
                       <MyFollowersMessageForm
                         myFollowersMessage={props.myFollowersMessage}
                         showMyFollowersMessageForm={props.showMyFollowersMessageForm}
                         handleMyFollowersMessageChange={props.handleMyFollowersMessageChange}
                         handleMyFollowersMessageSubmit={props.handleMyFollowersMessageSubmit}
                         enableMyFollowersMessageInput={props.enableMyFollowersMessageInput}
                         enableMyFollowersMessageSubmitButton={props.enableMyFollowersMessageSubmitButton}
                         showMyFollowersMessageSubmitButton = {props.showMyFollowersMessageSubmitButton}
                         showMyFollowersMessageSubmitLoadingButton = {props.showMyFollowersMessageSubmitLoadingButton}
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
                          commentersSearchUrl={props.commentersSearchUrl}
                          handleCommentersSearchChange={props.handleCommentersSearchChange}
                          handleCommentersSearchSubmit={props.handleCommentersSearchSubmit}
                          enableCommentersSearchInput={props.enableCommentersSearchInput}
                          enableCommentersSearchSubmitButton={props.enableCommentersSearchSubmitButton}
                          showCommentersSearchSubmitButton={props.showCommentersSearchSubmitButton}
                          showCommentersSearchSubmitLoadingButton={props.showCommentersSearchSubmitLoadingButton} />                
        
                      <CommentersTable className="commentersDataTable"
                          commenterData={props.commenterData}
                          showCommentersTable={props.showCommentersTable}
                          handleCommentersSelectedRowsChange={props.handleCommentersSelectedRowsChange}
                          //handleCommentersSelecSubmit={props.handleCommentersSubmit}
                          showCommentersSubmitButton={props.showCommentersSubmitButton}
                          showCommentersSubmitLoadingButton={props.showCommentersSubmitLoadingButton}
                          selectedCommenters={props.selectedCommenters}
                          toggledClearRows={props.toggledClearRows}
                          recentCommentersSearches={props.recentCommentersSearches}
                          handleCommentersRecentSearchSubmit={props.handleCommentersRecentSearchSubmit}
                          showCommentersRecentSearchContainer={props.showCommentersRecentSearchContainer}
                          />
                      
                      <h6 style={showCommentersMessageForm} className="messageForm">Message</h6>
                      
                      <CommentersMessageForm
                          commentersMessage={props.commentersMessage}
                          showCommentersMessageForm={props.showCommentersMessageForm}
                          handleCommentersMessageChange={props.handleCommentersMessageChange}
                          handleCommentersMessageSubmit={props.handleCommentersMessageSubmit}
                          enableCommentersMessageInput={props.enableCommentersMessageInput}
                          enableCommentersMessageSubmitButton={props.enableCommentersMessageSubmitButton}
                          showCommentersMessageSubmitButton = {props.showCommentersMessageSubmitButton}
                          showCommentersMessageSubmitLoadingButton = {props.showCommentersMessageSubmitLoadingButton}
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
                          followersSearchUrl={props.followersSearchUrl}
                          handleFollowersSearchChange={props.handleFollowersSearchChange}
                          handleFollowersSearchSubmit={props.handleFollowersSearchSubmit}
                          enableFollowersSearchInput={props.enableFollowersSearchInput}
                          enableFollowersSearchSubmitButton={props.enableFollowersSearchSubmitButton}
                          showFollowersSearchSubmitButton={props.showFollowersSearchSubmitButton}
                          showFollowersSearchSubmitLoadingButton={props.showFollowersSearchSubmitLoadingButton} />
            
                          <FollowersTable className="followersDataTable"
                          followerData={props.followerData}
                          showFollowersTable={props.showFollowersTable}
                          handleFollowersSelectedRowsChange={props.handleFollowersSelectedRowsChange}
                          showFollowersSubmitButton={props.showFollowersSubmitButton}
                          showFollowersSubmitLoadingButton={props.showFollowersSubmitLoadingButton}
                          selectedFollowers={props.selectedFollowers}
                          toggledClearRows={props.toggledClearRows}
                          recentFollowersSearches={props.recentFollowersSearches}
                          handleFollowersRecentSearchSubmit={props.handleFollowersRecentSearchSubmit}
                          showFollowersRecentSearchContainer={props.showFollowersRecentSearchContainer}
                          />
                      
                          <h6 style={showFollowersMessageForm} className="messageForm">Message</h6>
                      
                          <FollowersMessageForm
                            followersMessage={props.followersMessage}
                            showFollowersMessageForm={props.showFollowersMessageForm}
                            handleFollowersMessageChange={props.handleFollowersMessageChange}
                            handleFollowersMessageSubmit={props.handleFollowersMessageSubmit}
                            enableFollowersMessageInput={props.enableFollowersMessageInput}
                            enableFollowersMessageSubmitButton={props.enableFollowersMessageSubmitButton}
                            showFollowersMessageSubmitButton = {props.showFollowersMessageSubmitButton}
                            showFollowersMessageSubmitLoadingButton = {props.showFollowersMessageSubmitLoadingButton}
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


const mapStateToProps = state => ({

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
      
      })
      

const mapDispatchToProps = dispatch => ({
      fetchAuth: () => fetchAuth(dispatch),
      handleLoginChange,
      handleLoginSubmit,
      handleLogoutSubmit,
      handleLoginSwitchToSignup: () => handleLoginSwitchToSignup(dispatch),
      handleSignupSwitchToLogin: () => handleSignupSwitchToLogin(dispatch),
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
      handleReceivedMessagesRefresh: () => handleReceivedMessagesRefresh(dispatch),
      handleToggleConfigModal,
      handleCloseConfigModal,
      handleTestModeChange,
      handleDownloadLogs,
      handleCommentersRecentSearchSubmit,
      handleFollowersRecentSearchSubmit

});


export default connect(mapStateToProps, mapDispatchToProps) (App);