import React, { Suspense } from 'react';
import connect from "../provider/connect";
import Spinner from 'react-bootstrap/Spinner'

//IMPORT ACTION CREATORS

import {
  handleLogoutSubmit
  } from '../actions/loginActions'

import {
  handleToggleConfigModal,
  handleCloseConfigModal,
  handleTestModeChange,
  handleDownloadLogs
  } from '../actions/uiActions' 
  
  
//COMPONENTS
const Header = React.lazy(() => import('../components/header'));
const ConfigModal = React.lazy(() => import('../components/configModal'));

function HeaderContainer(props) {
  
    return (
      
      <>
   
      <Suspense fallback={<div className="suspense-loader">Loading... <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>}>
     
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
            
        </Suspense>
        
        </>          
               
      )
  
}


const mapStateToProps = state => ({

      //logged in info
      showLoggedInInfo: state.showLoggedInInfo,
      showLogoutSubmitButton: state.showLogoutSubmitButton,
      loggedInInfoText: state.loggedInInfoText,
      showConfigModal: state.showConfigModal,
      isTestMode: state.isTestMode     
      })
      

const mapDispatchToProps = dispatch => ({
      handleLogoutSubmit,
      handleToggleConfigModal,
      handleCloseConfigModal,
      handleTestModeChange,
      handleDownloadLogs
});


export default connect(mapStateToProps, mapDispatchToProps) (HeaderContainer);