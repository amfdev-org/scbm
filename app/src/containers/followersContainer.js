import React, { Suspense } from 'react';
import connect from "../provider/connect";

//ACTION CREATOS
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
  

//BOOTSTRAP
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Spinner from 'react-bootstrap/Spinner'

//COMPONENTS
const FollowersSearchForm = React.lazy(() => import('../components/followersSearchForm'));
const FollowersTable = React.lazy(() => import('../components/followersTable'));
const FollowersMessageForm = React.lazy(() => import('../components/followersMessageForm'));

function FollowersContainer(props) {
  
    const showFollowersMessageForm = props.showFollowersMessageForm ? {display: 'block'} : {display: 'none'};

    return (
      
        <>              
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4">
                  Find Followers
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                  
                    <Suspense fallback={<div className="suspense-loader">Loading... <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>}>
     
                    <h6 className="main">Profile URL</h6>
                                   
                        <FollowersSearchForm
                            className="main"
                            followersSearchUrl={props.followersSearchUrl}
                            handleFollowersSearchChange={props.handleFollowersSearchChange}
                            handleFollowersSearchSubmit={props.handleFollowersSearchSubmit}
                            enableFollowersSearchInput={props.enableFollowersSearchInput}
                            enableFollowersSearchSubmitButton={props.enableFollowersSearchSubmitButton}
                            showFollowersSearchSubmitButton={props.showFollowersSearchSubmitButton}
                            showFollowersSearchSubmitLoadingButton={props.showFollowersSearchSubmitLoadingButton}
                          />
            
                          <FollowersTable className="followersDataTable"
                            followerData={props.followerData}
                            showFollowersTable={props.showFollowersTable}
                            handleFollowersSelectedRowsChange={props.handleFollowersSelectedRowsChange}
                            selectedFollowers={props.selectedFollowers}
                            toggledFollowersClearRows={props.toggledFollowersClearRows}
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
                          
                        </Suspense>
                          
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
         
         </>          
               
      )
  
}


const mapStateToProps = state => ({
      
      //followers search
      followersSearchUrl: state.followersSearchUrl,
      showFollowersSearchSubmitButton: state.showFollowersSearchSubmitButton,
      enableFollowersSearchSubmitButton: state.enableFollowersSearchSubmitButton,
      showFollowersSearchSubmitLoadingButton: state.showFollowersSearchSubmitLoadingButton,
      enableFollowersSearchInput: state.enableFollowersSearchInput,
      showFollowersTable: state.showFollowersTable,
      followerData : state.followerData,
      selectedFollowers : state.selectedFollowers,
      toggledFollowersClearRows: state.toggledFollowersClearRows,
      
      //followers messages
      showFollowersMessageForm: state.showFollowersMessageForm,
      followersMessage: state.followersMessage,
      showFollowersMessageSubmitButton: state.showFollowersMessageSubmitButton,
      showFollowersMessageSubmitLoadingButton: state.showFollowersMessageSubmitLoadingButton,
      enableFollowersMessageSubmitButton : state.enableFollowersMessageSubmitButton,
      enableFollowersMessageInput: state.enableFollowersMessageInput,
      recentFollowersSearches: state.recentFollowersSearches,
      showFollowersRecentSearchContainer: state.showFollowersRecentSearchContainer
      
      })
      

const mapDispatchToProps = dispatch => ({
      handleFollowersSearchChange,
      handleFollowersSearchSubmit,
      handleFollowersSelectedRowsChange,
      handleFollowersMessageChange,
      handleFollowersMessageSubmit,
      handleFollowersRecentSearchSubmit
});


export default connect(mapStateToProps, mapDispatchToProps) (FollowersContainer);