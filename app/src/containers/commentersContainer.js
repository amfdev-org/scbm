import React, { Suspense } from 'react';
import connect from "../provider/connect";

//ACTION CREATORS
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
  

//BOOTSTRAP
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Spinner from 'react-bootstrap/Spinner'

//COMPONENTS
const CommentersSearchForm = React.lazy(() => import('../components/commentersSearchForm'));
const CommentersTable = React.lazy(() => import('../components/commentersTable'));
const CommentersMessageForm = React.lazy(() => import('../components/commentersMessageForm'));

function CommentersContainer(props) {
    
    const showCommentersMessageForm = props.showCommentersMessageForm ? {display: 'block'} : {display: 'none'};

    return (
      
      <>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="3">
                  Find Commenters
                </Accordion.Toggle>
                
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                  
                      <h6 className="main">Song URL</h6>
                      
                       <Suspense fallback={<div className="suspense-loader">Loading... <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>}>
        
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
                             selectedCommenters={props.selectedCommenters}
                             toggledCommentersClearRows={props.toggledCommentersClearRows}
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
                             
                     </Suspense>
                  
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
         
         </>          
               
      )
  
}


const mapStateToProps = state => ({
    
      //commenters search
      commentersSearchUrl: state.commentersSearchUrl,
      showCommentersSearchSubmitButton: state.showCommentersSearchSubmitButton,
      enableCommentersSearchSubmitButton: state.enableCommentersSearchSubmitButton,
      showCommentersSearchSubmitLoadingButton: state.showCommentersSearchSubmitLoadingButton,
      enableCommentersSearchInput: state.enableCommentersSearchInput,
      showCommentersTable: state.showCommentersTable,
      commenterData : state.commenterData,
      selectedCommenters : state.selectedCommenters,
      toggledCommentersClearRows: state.toggledCommentersClearRows,

      //commenters messages
      showCommentersMessageForm: state.showCommentersMessageForm,
      commentersMessage: state.commentersMessage,
      showCommentersMessageSubmitButton: state.showCommentersMessageSubmitButton,
      showCommentersMessageSubmitLoadingButton: state.showCommentersMessageSubmitLoadingButton,
      enableCommentersMessageSubmitButton : state.enableCommentersMessageSubmitButton,
      enableCommentersMessageInput: state.enableCommentersMessageInput,
      recentCommentersSearches: state.recentCommentersSearches,
      showCommentersRecentSearchContainer: state.showCommentersRecentSearchContainer,
});
      

const mapDispatchToProps = dispatch => ({
      handleCommentersSearchChange,
      handleCommentersSearchSubmit,
      handleCommentersSelectedRowsChange,
      handleCommentersMessageChange,
      handleCommentersMessageSubmit,
      handleCommentersRecentSearchSubmit,

});


export default connect(mapStateToProps, mapDispatchToProps) (CommentersContainer);