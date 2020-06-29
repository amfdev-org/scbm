import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

class SearchForm extends Component {
    
    initialState = {
        url: '',
        enableSubmitButton: false
    }

    state = this.initialState
  
    handleChange = event => {
        const { name, value } = event.target
  
        this.setState({
          [name]: value,
            url: value
        })
        
    }
    
    submitForm = () => {
        this.props.handleSubmit(this.state)
        //this.setState(this.initialState)
    }
    
    render() {
        const { url } = this.state;

        const showSubmitButton = this.props.showSubmitButton ? {display: 'block'} : {display: 'none'};
        const showSubmitLoadingButton = this.props.showSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        
        const enableSubmitButton = url.length > 0;
        
        return (
          <Form onSubmit={this.onFormSubmit} >
            <Form.Group>
                <Form.Label>Soundcloud Song URL</Form.Label>
                <Form.Control
                    type="url"
                    name="url"
                    id="url"
                    value={url}
                    onChange={this.handleChange} />
            </Form.Group>
    
            <Button type="submit" value="Submit" disabled={!enableSubmitButton} onClick={e => {e.preventDefault(); this.submitForm()}} style={showSubmitButton}>Submit</Button>
            
              <Button variant="primary" disabled style={showSubmitLoadingButton}>
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