import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

class FollowersSearchForm extends Component {
    
  
    handleChange = (event) => {
          
        ReactTooltip.hide();
        this.props.handleFollowersSearchChange(event)
        
    }
    
    handleSubmit = () => {

        this.props.handleFollowersSearchSubmit()

    }
    
    render() {
        
        //const showSearchForm = this.props.showSearchForm ? {display: 'block'} : {display: 'none'}
         
        const showFollowersSearchSubmitButton = this.props.showFollowersSearchSubmitButton ? {display: 'block'} : {display: 'none'};
        const showFollowersSearchSubmitLoadingButton = this.props.showFollowersSearchSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
    
        
        return (
          <Form inline onSubmit={this.handleSubmit}>
            <Form.Group>
                <Form.Control
                    data-tip="Must include http or https"
                    type="text"
                    name="searchUrl"
                    value={this.props.followersSearchUrl}
                    disabled={!this.props.enableFollowersSearchInput}
                    onChange={this.handleChange} />
                    <ReactTooltip delayShow={250}/>
    
            <Button
                type="submit"
                value="Submit"
                disabled={!this.props.enableFollowersSearchSubmitButton}
                onClick={e => {e.preventDefault(); this.handleSubmit()}}
                style={showFollowersSearchSubmitButton}>
                Submit
            </Button>
            
              <Button variant="primary" disabled style={showFollowersSearchSubmitLoadingButton}>
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

export default FollowersSearchForm;