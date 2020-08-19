import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

function MyFollowersMessageForm(props) {

    const context = useContext(ContextConsumer);

    const handleChange = (event) => {
        ReactTooltip.hide();
        props.handleMyFollowersMessageChange(event, context)
    }
    
    const handleSubmit = (event) => {
        props.handleMyFollowersMessageSubmit(event, context)
    }
    

        const showMyFollowersMessageForm = props.showMyFollowersMessageForm ? {display: 'block'} : {display: 'none'}
        const showMyFollowersMessageSubmitButton = props.showMyFollowersMessageSubmitButton ? {display: 'block'} : {display: 'none'};
        const showMyFollowersMessageSubmitLoadingButton = props.showMyFollowersMessageSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        return (
          
        <Form className="messageForm" style={showMyFollowersMessageForm}>

        <Form.Control as="textarea"
          data-tip="Must be at least 10 characters long. You can include a full song URL. <<profileName>> will be automatically converted."
          rows="8"
          name="myFollowersMessage"
          value={props.myFollowersMessage}
          disabled={!props.enableMyFollowersMessageInput}
          onChange={handleChange} />
        <ReactTooltip delayShow={400}/>
          
            <Button
                type="submit"
                value="Send Message!"
                disabled={!props.enableMyFollowersMessageSubmitButton}
                onClick={e => {e.preventDefault(); handleSubmit()}}
                style={showMyFollowersMessageSubmitButton}>
                Submit
            </Button>
            
              <Button variant="primary" disabled style={showMyFollowersMessageSubmitLoadingButton}>
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

export default MyFollowersMessageForm