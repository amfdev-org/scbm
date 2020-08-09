import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

function FollowersMessageForm(props) {


    const handleChange = (event) => {
        ReactTooltip.hide();
        props.handleFollowersMessageChange(event)
    }
    
    const handleSubmit = () => {
        props.handleFollowersMessageSubmit()
    }
    

        const showFollowersMessageForm = props.showFollowersMessageForm ? {display: 'block'} : {display: 'none'}
        const showFollowersMessageSubmitButton = props.showFollowersMessageSubmitButton ? {display: 'block'} : {display: 'none'};
        const showFollowersMessageSubmitLoadingButton = props.showFollowersMessageSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        return (
          
        <Form className="messageForm" style={showFollowersMessageForm}>

        <Form.Control as="textarea"
data-tip="Must be at least 10 characters long. You can include a full song URL. <<profileName>> will be automatically converted."
          rows="8"
          name="followersMessage"
          value={props.followersMessage}
          disabled={!props.enableFollowersMessageInput}
          onChange={handleChange} />
        <ReactTooltip delayShow={400}/>
          
            <Button
                type="submit"
                value="Send Message!"
                disabled={!props.enableFollowersMessageSubmitButton}
                onClick={e => {e.preventDefault(); handleSubmit()}}
                style={showFollowersMessageSubmitButton}>
                Submit
            </Button>
            
              <Button variant="primary" disabled style={showFollowersMessageSubmitLoadingButton}>
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

export default FollowersMessageForm