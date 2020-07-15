import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

class SignupForm extends Component {
    
  
    handleChange = changeEvent => {
          
        //ReactTooltip.hide();
        this.props.handleSignupChange(changeEvent)
        
    }
    
    handleSubmit = () => {

        this.props.handleSignupSubmit()

    }
    
    render() {
      
        const showSignupForm = this.props.showSignupForm ? {display: 'block'} : {display: 'none'}
                
        const showSignupSubmitButton = this.props.showSignupSubmitButton ? {display: 'block'} : {display: 'none'};
        const showSignupSubmitLoadingButton = this.props.showSignupSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        

        return (
          <Form style={showSignupForm}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    data-tip="SC Username"
                    type="text"
                    name="scUsername"
                    disabled={!this.props.enableSignupFormInputs}
                    value={this.props.scUsername}
                    onChange={this.handleChange} />
                    <ReactTooltip delayShow={250}/>
                    
            <Form.Label>Password</Form.Label>
                <Form.Control
                    data-tip="SC Password"
                    type="password"
                    name="scPassword"
                    disabled={!this.props.enableSignupFormInputs}
                    value={this.props.scPassword}
                    onChange={this.handleChange} />
                    <ReactTooltip delayShow={250}/>
              
             </Form.Group>
             
            <Button
                type="submit"
                value="Submit"
                disabled={!this.props.enableSignupSubmitButton}
                onClick={e => {e.preventDefault(); this.handleSubmit()}}
                style={showSignupSubmitButton}>
                Go
            </Button>
         
             
            <Button variant="primary" disabled style={showSignupSubmitLoadingButton}>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Validating...
            </Button>
            
          </Form>
          
          
        );
    }

}

export default SignupForm;