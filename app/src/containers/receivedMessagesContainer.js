import React, { Suspense } from 'react';
import connect from "../provider/connect";

//ACTION CREATORS
import {
  fetchReceivedMessages,
  handleReceivedMessagesSelectedRowsChange,
  handleReceivedMessagesRefresh
  } from '../actions/receivedMessagesSearchActions'
 
import {
  handleReceivedMessagesMessageChange,
  handleReceivedMessagesMessageSubmit
  } from '../actions/receivedMessagesMessageActions' 
  
//BOOTSTRAP
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

//COMPONENTS
const ReceivedMessagesTable = React.lazy(() => import('../components/receivedMessagesTable'));
const ReceivedMessagesMessageForm = React.lazy(() => import('../components/receivedMessagesMessageForm'));


function ReceivedMessagesContainer(props) {
     
    const handleRefresh = (event) => {
     
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        ReactTooltip.hide();
        props.handleReceivedMessagesRefresh();
    }
    
    const showReceivedMessagesMessageForm = props.showReceivedMessagesMessageForm ? {display: 'block'} : {display: 'none'};
    

    return (
      
      <>

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
                  
                <Suspense fallback={<div className="suspense-loader">Loading... <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>}>
   
                       <ReceivedMessagesTable className="receivedMessagesDataTable"
                       receivedMessageData={props.receivedMessageData}
                       showReceivedMessagesTable={props.showReceivedMessagesTable}
                       handleReceivedMessagesSelectedRowsChange={props.handleReceivedMessagesSelectedRowsChange}
                       showReceivedMessagesLoadingIcon={props.showReceivedMessagesLoadingIcon}
                       selectedReceivedMessages={props.selectedReceivedMessages}
                       toggledReceivedMessagesClearRows={props.toggledReceivedMessagesClearRows}
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
                       
                </Suspense>
                
              </Card.Body>
            </Accordion.Collapse>
          </Card>
            
           
         </>          
               
      )
  
}


const mapStateToProps = state => ({
      
      //received messages
      receivedMessageData: state.receivedMessageData,
      showReceivedMessagesTable: state.showReceivedMessagesTable,
      showReceivedMessagesSubmitButton: state.showReceivedMessagesSubmitButton,
      showReceivedMessagesSubmitLoadingButton: state.showReceivedMessagesSubmitLoadingButton,
      selectedReceivedMessages: state.selectedReceivedMessages,   
      showReceivedMessagesLoadingIcon: state.showReceivedMessagesLoadingIcon,
      enableReceivedMessagesRefresh: state.enableReceivedMessagesRefresh,
      toggledReceivedMessagesClearRows: state.toggledReceivedMessagesClearRows,
      
      //received messages message
      receivedMessagesMessage: state.receivedMessagesMessage,
      showReceivedMessagesMessageForm: state.showReceivedMessagesMessageForm,
      enableReceivedMessagesMessageInput: state.enableReceivedMessagesMessageInput,
      enableReceivedMessagesMessageSubmitButton: state.enableReceivedMessagesMessageSubmitButton,
      showReceivedMessagesMessageSubmitButton: state.showReceivedMessagesMessageSubmitButton,
      showReceivedMessagesMessageSubmitLoadingButton: state.showReceivedMessagesMessageSubmitLoadingButton,
      recentCommentersSearches: state.recentCommentersSearches,
      recentFollowersSearches: state.recentFollowersSearches,
      showCommentersRecentSearchContainer: state.showCommentersRecentSearchContainer,
      showFollowersRecentSearchContainer: state.showFollowersRecentSearchContainer
      
      })
      

const mapDispatchToProps = dispatch => ({
      fetchReceivedMessages,
      handleReceivedMessagesSelectedRowsChange,
      handleReceivedMessagesMessageChange,
      handleReceivedMessagesMessageSubmit,
      handleReceivedMessagesRefresh: () => handleReceivedMessagesRefresh(dispatch)

});


export default connect(mapStateToProps, mapDispatchToProps) (ReceivedMessagesContainer);