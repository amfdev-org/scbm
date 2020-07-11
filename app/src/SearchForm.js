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
        
        //const showSearchForm = this.props.showSearchForm ? {display: 'block'} : {display: 'none'}
         
        const showSearchSubmitButton = this.props.showSearchSubmitButton ? {display: 'block'} : {display: 'none'};
        const showSearchSubmitLoadingButton = this.props.showSearchSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
    
        
        return (
          <Form inline onSubmit={this.handleSubmit}>
            <Form.Group>
                <Form.Control
                    data-tip="Must include http or https"
                    type="text"
                    name="searchUrl"
                    value={this.props.searchUrl}
                    disabled={!this.props.enableSearchInput}
                    onChange={this.handleChange} />
                    <ReactTooltip delayShow={250}/>
    
            <Button
                type="submit"
                value="Submit"
                disabled={!this.props.enableSearchSubmitButton}
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
              </Button>
              
            </Form.Group>
            
          </Form>
          
          
        );
    }

}

export default SearchForm;