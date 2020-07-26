import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

class SentMessagesMessageForm extends Component {


    handleChange = (event) => {
        ReactTooltip.hide();
        this.props.handleSentMessagesMessageChange(event)
    }
    
    handleSubmit = () => {
        this.props.handleSentMessagesMessageSubmit()
    }
    
    
    render() {
        
        const showSentMessagesMessageForm = this.props.showSentMessagesMessageForm ? {display: 'block'} : {display: 'none'}
        const showSentMessagesMessageSubmitButton = this.props.showSentMessagesMessageSubmitButton ? {display: 'block'} : {display: 'none'};
        const showSentMessagesMessageSubmitLoadingButton = this.props.showSentMessagesMessageSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        return (
          
        <Form className="messageForm" style={showSentMessagesMessageForm}>

        <Form.Control as="textarea"
          data-tip="Must be at least 10 characters long. You can include a full song URL. <<profileName>> will be automatically converted."
          rows="8"
          name="sentMessagesMessage"
          value={this.props.sentMessagesMessage}
          disabled={!this.props.enableSentMessagesMessageInput}
          onChange={this.handleChange} />
        <ReactTooltip delayShow={400}/>
          
            <Button
                type="submit"
                value="Send Message!"
                disabled={!this.props.enableSentMessagesMessageSubmitButton}
                onClick={e => {e.preventDefault(); this.handleSubmit()}}
                style={showSentMessagesMessageSubmitButton}>
                Submit
            </Button>
            
              <Button variant="primary" disabled style={showSentMessagesMessageSubmitLoadingButton}>
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

export default SentMessagesMessageForm