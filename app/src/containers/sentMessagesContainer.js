import React, { Suspense } from 'react';
import connect from "../provider/connect";

//ACTION CREATORS
import {
  fetchSentMessages,
  handleSentMessagesSelectedRowsChange
  } from '../actions/sentMessagesSearchActions'
 
import {
  handleSentMessagesMessageChange,
  handleSentMessagesMessageSubmit
  } from '../actions/sentMessagesMessageActions' 
  
  
//BOOTSTRAP
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Spinner from 'react-bootstrap/Spinner'

//COMPONENTS
const SentMessagesTable = React.lazy(() => import('../components/sentMessagesTable'));
const SentMessagesMessageForm = React.lazy(() => import('../components/sentMessagesMessageForm'));

function SentMessagesContainer(props) {

    const showSentMessagesMessageForm = props.showSentMessagesMessageForm ? {display: 'block'} : {display: 'none'};

    return (
      
        <>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Sent Messages
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>

                   <Suspense fallback={<div className="suspense-loader">Loading... <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>}>
   
                       <SentMessagesTable className="sentMessagesDataTable"
                       sentMessageData={props.sentMessageData}
                       showSentMessagesTable={props.showSentMessagesTable}
                       handleSentMessagesSelectedRowsChange={props.handleSentMessagesSelectedRowsChange}
                       showSentMessagesLoadingIcon={props.showSentMessagesLoadingIcon}
                       selectedSentMessages={props.selectedSentMessages}
                       toggledSentMessagesClearRows={props.toggledSentMessagesClearRows}
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
                       
                    </Suspense>
                          
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            
         </>          
               
      )
  
}


const mapStateToProps = state => ({

      //sent messages
      sentMessageData: state.sentMessageData,
      showSentMessagesTable: state.showSentMessagesTable,
      showSentMessagesSubmitButton: state.showSentMessagesSubmitButton,
      showSentMessagesSubmitLoadingButton: state.showSentMessagesSubmitLoadingButton,
      selectedSentMessages: state.selectedSentMessages,   
      showSentMessagesLoadingIcon: state.showSentMessagesLoadingIcon,
      toggledSentMessagesClearRows: state.toggledSentMessagesClearRows,
      
      //sent messages message
      sentMessagesMessage: state.sentMessagesMessage,
      showSentMessagesMessageForm: state.showSentMessagesMessageForm,
      enableSentMessagesMessageInput: state.enableSentMessagesMessageInput,
      enableSentMessagesMessageSubmitButton: state.enableSentMessagesMessageSubmitButton,
      showSentMessagesMessageSubmitButton: state.showSentMessagesMessageSubmitButton,
      showSentMessagesMessageSubmitLoadingButton: state.showSentMessagesMessageSubmitLoadingButton,
      isTestMode: state.isTestMode   
      })
      

const mapDispatchToProps = dispatch => ({
      fetchSentMessages,
      handleSentMessagesSelectedRowsChange,
      handleSentMessagesMessageChange,
      handleSentMessagesMessageSubmit
});


export default connect(mapStateToProps, mapDispatchToProps) (SentMessagesContainer);