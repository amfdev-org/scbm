import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";
//import { connect } from 'react-redux';
//import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Switch from "react-switch";

function ConfigModal(props) {
    
    const context = useContext(ContextConsumer);
    
    const handleDownloadLogs = (event) => {

        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation()
        event.stopPropagation()
        
        props.handleDownloadLogs(event, context)

    }
    
    const handleChange = (checked) => {
        //console.log('configmodal handlechange "checked" variable is: '+checked);
        props.handleTestModeChange(checked, context);
    }
    
    const handleCloseConfigModal = () => {
        props.handleCloseConfigModal(context)
    }
    
                     
        return (
         <>                      
        <Modal show={props.showConfigModal} onHide={handleCloseConfigModal}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
 
          
            <h6>Test Mode (do not actually send messages)</h6>
            <Switch onChange={handleChange} checked={props.isTestMode} />
            
                {process.env.NODE_ENV === "development" ? (
                            <div className="download-logs">
                            <br/>
                            <h6>Download Server Logs</h6>
                            <Button variant="secondary"
                            size="sm"
                            type="submit"
                              value="download-logs"
                              onClick={ handleDownloadLogs }
                              >
                              Go
                            </Button>
                        </div>
                  ) : (
                    <div className="download-logs"></div>
                  )}
    
               
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseConfigModal}>
              Save & Close
            </Button>
          </Modal.Footer>
        </Modal>

            </>
        );


}

export default ConfigModal;
