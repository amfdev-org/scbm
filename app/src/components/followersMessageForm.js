import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

class FollowersMessageForm extends Component {


    handleChange = (event) => {
        ReactTooltip.hide();
        this.props.handleFollowersMessageChange(event)
    }
    
    handleSubmit = () => {
        this.props.handleFollowersMessageSubmit()
    }
    
    
    render() {
        
        const showFollowersMessageForm = this.props.showFollowersMessageForm ? {display: 'block'} : {display: 'none'}
        const showFollowersMessageSubmitButton = this.props.showFollowersMessageSubmitButton ? {display: 'block'} : {display: 'none'};
        const showFollowersMessageSubmitLoadingButton = this.props.showFollowersMessageSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        return (
          
        <Form className="messageForm" style={showFollowersMessageForm}>

        <Form.Control as="textarea"
          data-tip="Must be at least 10 characters long. Include a full song URL too if you like!"
          rows="8"
          name="followersMessage"
          value={this.props.followersMessage}
          disabled={!this.props.enableFollowersMessageInput}
          onChange={this.handleChange} />
        <ReactTooltip delayShow={400}/>
          
            <Button
                type="submit"
                value="Send Message!"
                disabled={!this.props.enableFollowersMessageSubmitButton}
                onClick={e => {e.preventDefault(); this.handleSubmit()}}
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

}

export default FollowersMessageForm