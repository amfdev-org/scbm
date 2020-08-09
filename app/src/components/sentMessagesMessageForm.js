import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

function SentMessagesMessageForm(props) {


    const handleChange = (event) => {
        ReactTooltip.hide();
        props.handleSentMessagesMessageChange(event)
    }
    
    const handleSubmit = () => {
        props.handleSentMessagesMessageSubmit()
    }
    

        const showSentMessagesMessageForm = props.showSentMessagesMessageForm ? {display: 'block'} : {display: 'none'}
        const showSentMessagesMessageSubmitButton = props.showSentMessagesMessageSubmitButton ? {display: 'block'} : {display: 'none'};
        const showSentMessagesMessageSubmitLoadingButton = props.showSentMessagesMessageSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        return (
          
        <Form className="messageForm" style={showSentMessagesMessageForm}>

        <Form.Control as="textarea"
          data-tip="Must be at least 10 characters long. You can include a full song URL. <<profileName>> will be automatically converted."
          rows="8"
          name="sentMessagesMessage"
          value={props.sentMessagesMessage}
          disabled={!props.enableSentMessagesMessageInput}
          onChange={handleChange} />
        <ReactTooltip delayShow={400}/>
          
            <Button
                type="submit"
                value="Send Message!"
                disabled={!props.enableSentMessagesMessageSubmitButton}
                onClick={e => {e.preventDefault(); handleSubmit()}}
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

export default SentMessagesMessageForm