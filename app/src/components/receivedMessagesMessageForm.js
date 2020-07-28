import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

class ReceivedMessagesMessageForm extends Component {


    handleChange = (event) => {
        ReactTooltip.hide();
        this.props.handleReceivedMessagesMessageChange(event)
    }
    
    handleSubmit = () => {
        this.props.handleReceivedMessagesMessageSubmit()
    }
    
    
    render() {
        
        const showReceivedMessagesMessageForm = this.props.showReceivedMessagesMessageForm ? {display: 'block'} : {display: 'none'}
        const showReceivedMessagesMessageSubmitButton = this.props.showReceivedMessagesMessageSubmitButton ? {display: 'block'} : {display: 'none'};
        const showReceivedMessagesMessageSubmitLoadingButton = this.props.showReceivedMessagesMessageSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        return (
          
        <Form className="messageForm" style={showReceivedMessagesMessageForm}>

        <Form.Control as="textarea"
          data-tip="Must be at least 10 characters long. You can include a full song URL. <<profileName>> will be automatically converted."
          rows="8"
          name="receivedMessagesMessage"
          value={this.props.receivedMessagesMessage}
          disabled={!this.props.enableReceivedMessagesMessageInput}
          onChange={this.handleChange} />
        <ReactTooltip delayShow={400}/>
          
            <Button
                type="submit"
                value="Send Message!"
                disabled={!this.props.enableReceivedMessagesMessageSubmitButton}
                onClick={e => {e.preventDefault(); this.handleSubmit()}}
                style={showReceivedMessagesMessageSubmitButton}>
                Submit
            </Button>
            
              <Button variant="primary" disabled style={showReceivedMessagesMessageSubmitLoadingButton}>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                
              </Button>
          </Form>
        )
    }

}

export default ReceivedMessagesMessageForm