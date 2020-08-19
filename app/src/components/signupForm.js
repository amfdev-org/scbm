import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

function SignupForm(props) {
    
    const context = useContext(ContextConsumer);
  
    const handleChange = (event) => {
          
        ReactTooltip.hide();
        props.handleSignupChange(event, context)
        
    }
    
    const handleSubmit = (event) => {

        props.handleSignupSubmit(event, context)

    }
    
        const showSignupForm = props.showSignupForm ? {display: 'block'} : {display: 'none'}
                
        const showSignupSubmitButton = props.showSignupSubmitButton ? {display: 'block'} : {display: 'none'};
        const showSignupSubmitLoadingButton = props.showSignupSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
        

        return (
          <Form style={showSignupForm}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    data-tip="Service Username"
                    type="text"
                    name="scUsername"
                    disabled={!props.enableSignupFormInputs}
                    value={props.scUsername || ""}
                    onChange={handleChange} />
                    <ReactTooltip delayShow={250}/>
                    
            <Form.Label>Password</Form.Label>
                <Form.Control
                    data-tip="Service Password"
                    type="password"
                    name="scPassword"
                    disabled={!props.enableSignupFormInputs}
                    value={props.scPassword || ""}
                    onChange={handleChange} />
                    <ReactTooltip delayShow={250}/>
              
             </Form.Group>
             
            <Button
                type="submit"
                value="Submit"
                disabled={!props.enableSignupSubmitButton}
                onClick={e => {e.preventDefault(); handleSubmit()}}
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

export default SignupForm;