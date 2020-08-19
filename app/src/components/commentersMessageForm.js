import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

const CommentersMessageForm = (props)  => {

    const context = useContext(ContextConsumer);
    
    const handleChange = (event) => {
        ReactTooltip.hide();
        props.handleCommentersMessageChange(event, context)
    }
    
   const handleSubmit = (event) => {
        props.handleCommentersMessageSubmit(event, context)
    }
    
    
        const showCommentersMessageForm = props.showCommentersMessageForm ? {display: 'block'} : {display: 'none'}
        const showCommentersMessageSubmitButton = props.showCommentersMessageSubmitButton ? {display: 'block'} : {display: 'none'};
        const showCommentersMessageSubmitLoadingButton = props.showCommentersMessageSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        return (
          
        <Form className="messageForm" style={showCommentersMessageForm}>

        <Form.Control as="textarea"
          data-tip="Must be at least 10 characters long. You can include a full song URL. <<profileName>> will be automatically converted."
          rows="8"
          name="commentersMessage"
          value={props.commentersMessage}
          disabled={!props.enableCommentersMessageInput}
          onChange={handleChange} />
        <ReactTooltip delayShow={400}/>
          
            <Button
                type="submit"
                value="Send Message!"
                disabled={!props.enableCommentersMessageSubmitButton}
                onClick={e => {e.preventDefault(); handleSubmit()}}
                style={showCommentersMessageSubmitButton}>
                Submit
            </Button>
            
              <Button variant="primary" disabled style={showCommentersMessageSubmitLoadingButton}>
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

export default CommentersMessageForm