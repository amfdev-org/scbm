import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

class CommentersSearchForm extends Component {
    
  
    handleChange = changeEvent => {
          
        ReactTooltip.hide();
        this.props.handleCommentersSearchChange(changeEvent)
        //this.forceUpdate()
        
    }
    
    handleSubmit = () => {

        this.props.handleCommentersSearchSubmit()

    }
    
    render() {
        //const showSearchForm = this.props.showSearchForm ? {display: 'block'} : {display: 'none'}
    
        const showCommentersSearchSubmitButton = this.props.showCommentersSearchSubmitButton ? {display: 'block'} : {display: 'none'};
        const showCommentersSearchSubmitLoadingButton = this.props.showCommentersSearchSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
    
        
        return (
          <Form inline onSubmit={this.handleSubmit}>
            <Form.Group>
                <Form.Control
                    data-tip="Must include http or https"
                    type="text"
                    name="commentersSearchUrl"
                    placeholder="e.g. https://soundloud.com/artist/track"
                    value={this.props.commentersSearchUrl}
                    disabled={!this.props.enableCommentersSearchInput}
                    onChange={this.handleChange} />
                    <ReactTooltip delayShow={250}/>
    
            <Button
                type="submit"
                value="Submit"
                disabled={!this.props.enableCommentersSearchSubmitButton}
                onClick={e => {e.preventDefault(); this.handleSubmit()}}
                style={showCommentersSearchSubmitButton}>
                Submit
            </Button>
            
              <Button variant="primary" disabled style={showCommentersSearchSubmitLoadingButton}>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
              
            </Form.Group>
            
          </Form>
          
          
        );
    }

}

export default CommentersSearchForm;