import React, { Component } from 'react'
//import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


class ConfigModal extends Component {
    
    handleDownloadLogs = (event) => {

        event.preventDefault();
        event.nativeEvent.stopImmediatePropagation()
        event.stopPropagation()
        
        this.props.handleDownloadLogs()

    }
    
    
    render() {
                     
        return (
                               
        <Modal show={this.props.showConfigModal} onHide={this.props.handleCloseConfigModal}>
          <Modal.Header closeButton>
            <Modal.Title>Options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicCheckbox">
            <Form.Check
            type="checkbox"
            label="Test Mode (do not actually send messages)"
            defaultChecked={this.props.isTestMode}
            onChange={ e => this.props.handleTestModeChange(e) }
            />
          </Form.Group>
          
            <a href="!#"
              value="download-logs"
              onClick={ this.handleDownloadLogs }
              >
              Download Server Logs
            </a>
                  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.props.handleCloseConfigModal}>
              Save & Close
            </Button>
          </Modal.Footer>
        </Modal>

            
        );
    }

}

export default ConfigModal;
