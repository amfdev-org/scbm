import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

class MyFollowersMessageForm extends Component {


    handleChange = (event) => {
        //ReactTooltip.hide();
        this.props.handleMyFollowersMessageChange(event)
    }
    
    handleSubmit = () => {
        this.props.handleMyFollowersMessageSubmit()
    }
    
    
    render() {
        
        const showMyFollowersMessageForm = this.props.showMyFollowersMessageForm ? {display: 'block'} : {display: 'none'}
        const showMyFollowersMessageSubmitButton = this.props.showMyFollowersMessageSubmitButton ? {display: 'block'} : {display: 'none'};
        const showMyFollowersMessageSubmitLoadingButton = this.props.showMyFollowersMessageSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        return (
          
        <Form className="messageForm" style={showMyFollowersMessageForm}>

        <Form.Control as="textarea"
          data-tip="Must be at least 10 characters long. Include a full song URL too if you like!"
          rows="8"
          name="myFollowersMessage"
          value={this.props.myFollowersMessage}
          disabled={!this.props.enableMyFollowersMessageInput}
          onChange={this.handleChange} />
        <ReactTooltip delayShow={400}/>
          
            <Button
                type="submit"
                value="Send Message!"
                disabled={!this.props.enableMyFollowersMessageSubmitButton}
                onClick={e => {e.preventDefault(); this.handleSubmit()}}
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

}

export default MyFollowersMessageForm