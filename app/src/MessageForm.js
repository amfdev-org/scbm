import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

class MessageForm extends Component {


    handleChange = changeEvent => {
        ReactTooltip.hide();
        this.props.handleMessageChange(changeEvent)
    }
    
    handleSubmit = () => {
        this.props.handleMessageSubmit()
    }
    
    
    render() {
        
        const showMessageForm = this.props.showMessageForm ? {display: 'block'} : {display: 'none'}
        const showMessageSubmitButton = this.props.showMessageSubmitButton ? {display: 'block'} : {display: 'none'};
        const showMessageSubmitLoadingButton = this.props.showMessageSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        const enableMessageSubmitButton = this.props.enableMessageSubmitButton;
        
        return (
          
        <Form className="messageForm" style={showMessageForm}>

        <Form.Control as="textarea"
          data-tip="Must be at least 10 characters long. Include a full song URL too if you like!"
          rows="8"
          name="message"
          value={this.props.message}
          disabled={!this.props.enableMessageInput}
          onChange={this.handleChange} />
        <ReactTooltip delayShow={400}/>
          
            <Button
                type="submit"
                value="Send Message!"
                disabled={!enableMessageSubmitButton}
                onClick={e => {e.preventDefault(); this.handleSubmit()}}
                style={showMessageSubmitButton}>
                Submit
            </Button>
            
              <Button variant="primary" disabled style={showMessageSubmitLoadingButton}>
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

export default MessageForm