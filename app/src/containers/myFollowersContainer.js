import React, { Suspense } from 'react';
import connect from "../provider/connect";

//IMPORT ACTION CREATORS

import {
  fetchMyFollowers,
  handleMyFollowersSelectedRowsChange
  } from '../actions/myFollowersSearchActions'
 
import {
  handleMyFollowersMessageChange,
  handleMyFollowersMessageSubmit
  } from '../actions/myFollowersMessageActions' 
  

//BOOTSTRAP
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Spinner from 'react-bootstrap/Spinner'

//COMPONENTS
const MyFollowersTable = React.lazy(() => import('../components/myFollowersTable'));
const MyFollowersMessageForm = React.lazy(() => import('../components/myFollowersMessageForm'));

function MyFollowersContainer(props) {
        
    const showMyFollowersMessageForm = props.showMyFollowersMessageForm ? {display: 'block'} : {display: 'none'};

    return (
      
      <>
   
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
                  My Followers
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                  
                    <Suspense fallback={<div className="suspense-loader">Loading... <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>}>
   
                       <MyFollowersTable className="myFollowersDataTable"
                       myFollowerData={props.myFollowerData}
                       showMyFollowersTable={props.showMyFollowersTable}
                       handleMyFollowersSelectedRowsChange={props.handleMyFollowersSelectedRowsChange}
                       showMyFollowersLoadingIcon={props.showMyFollowersLoadingIcon}
                       selectedMyFollowers={props.selectedMyFollowers}
                       toggledMyFollowersClearRows={props.toggledMyFollowersClearRows}
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
                         
                     </Suspense>
                     
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
         </>          
               
      )
  
}


const mapStateToProps = state => ({
      
      //my followers
      myFollowerData: state.myFollowerData,
      showMyFollowersTable: state.showMyFollowersTable,
      showMyFollowersLoadingIcon: state.showMyFollowersLoadingIcon,
      selectedMyFollowers: state.selectedMyFollowers,
      toggledMyFollowersClearRows: state.toggledMyFollowersClearRows,
      
      //my followers messages
      myFollowersMessage: state.myFollowersMessage,
      showMyFollowersMessageForm: state.showMyFollowersMessageForm,
      enableMyFollowersMessageInput: state.enableMyFollowersMessageInput,
      enableMyFollowersMessageSubmitButton: state.enableMyFollowersMessageSubmitButton,
      showMyFollowersMessageSubmitButton: state.showMyFollowersMessageSubmitButton,
      showMyFollowersMessageSubmitLoadingButton: state.showMyFollowersMessageSubmitLoadingButton
      
      })
      

const mapDispatchToProps = dispatch => ({
      fetchMyFollowers,
      handleMyFollowersSelectedRowsChange,
      handleMyFollowersMessageChange,
      handleMyFollowersMessageSubmit

});


export default connect(mapStateToProps, mapDispatchToProps) (MyFollowersContainer);