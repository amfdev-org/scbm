import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

class SearchForm extends Component {
    
  
    handleChange = changeEvent => {
          
        ReactTooltip.hide();
        this.props.handleSearchChange(changeEvent)
        
    }
    
    handleSubmit = () => {

        this.props.handleSearchSubmit()

    }
    
    render() {
        
        const showSearchSubmitButton = this.props.showSearchSubmitButton ? {display: 'block'} : {display: 'none'};
        const showSearchSubmitLoadingButton = this.props.showSearchSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        const searchUrl = this.props.searchUrl;
        const enableSearchSubmitButton = this.props.enableSearchSubmitButton;
        
        return (
          <Form inline onSubmit={this.handleSubmit}>
            <Form.Group>
                <Form.Label>Soundcloud Song URL</Form.Label>
                <Form.Control
                    data-tip="Must include http or https"
                    type="text"
                    name="searchUrl"
                    value={searchUrl}
                    onChange={this.handleChange} />
                    <ReactTooltip delayShow={250}/>
            </Form.Group>
    
            <Button
                type="submit"
                value="Submit"
                disabled={!enableSearchSubmitButton}
                onClick={e => {e.preventDefault(); this.handleSubmit()}}
                style={showSearchSubmitButton}>
                Submit
            </Button>
            
              <Button variant="primary" disabled style={showSearchSubmitLoadingButton}>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
          </Form>
          
          
        );
    }

}

export default SearchForm;