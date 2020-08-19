import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

function ReceivedMessagesMessageForm(props) {

    const context = useContext(ContextConsumer);

    const handleChange = (event) => {
        ReactTooltip.hide();
        props.handleReceivedMessagesMessageChange(event, context)
    }
    
    const handleSubmit = (event) => {
        props.handleReceivedMessagesMessageSubmit(event, context)
    }

        const showReceivedMessagesMessageForm = props.showReceivedMessagesMessageForm ? {display: 'block'} : {display: 'none'}
        const showReceivedMessagesMessageSubmitButton = props.showReceivedMessagesMessageSubmitButton ? {display: 'block'} : {display: 'none'};
        const showReceivedMessagesMessageSubmitLoadingButton = props.showReceivedMessagesMessageSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        return (
          
        <Form className="messageForm" style={showReceivedMessagesMessageForm}>

        <Form.Control as="textarea"
          data-tip="Must be at least 10 characters long. You can include a full song URL. <<profileName>> will be automatically converted."
          rows="8"
          name="receivedMessagesMessage"
          value={props.receivedMessagesMessage}
          disabled={!props.enableReceivedMessagesMessageInput}
          onChange={handleChange} />
        <ReactTooltip delayShow={400}/>
          
            <Button
                type="submit"
                value="Send Message!"
                disabled={!props.enableReceivedMessagesMessageSubmitButton}
                onClick={e => {e.preventDefault(); handleSubmit()}}
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

export default ReceivedMessagesMessageForm