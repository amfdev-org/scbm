import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

class CommentersMessageForm extends Component {


    handleChange = (event) => {
        ReactTooltip.hide();
        this.props.handleCommentersMessageChange(event)
    }
    
    handleSubmit = () => {
        this.props.handleCommentersMessageSubmit()
    }
    
    
    render() {
        
        const showCommentersMessageForm = this.props.showCommentersMessageForm ? {display: 'block'} : {display: 'none'}
        const showCommentersMessageSubmitButton = this.props.showCommentersMessageSubmitButton ? {display: 'block'} : {display: 'none'};
        const showCommentersMessageSubmitLoadingButton = this.props.showCommentersMessageSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        return (
          
        <Form className="messageForm" style={showCommentersMessageForm}>

        <Form.Control as="textarea"
          data-tip="Must be at least 10 characters long. Include a full song URL too if you like!"
          rows="8"
          name="commentersMessage"
          value={this.props.commentersMessage}
          disabled={!this.props.enableCommentersMessageInput}
          onChange={this.handleChange} />
        <ReactTooltip delayShow={400}/>
          
            <Button
                type="submit"
                value="Send Message!"
                disabled={!this.props.enableCommentersMessageSubmitButton}
                onClick={e => {e.preventDefault(); this.handleSubmit()}}
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

}

export default CommentersMessageForm