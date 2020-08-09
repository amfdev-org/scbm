import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

function LoginForm(props) {
    
      
    const handleChange = (event) => {
          
        ReactTooltip.hide();
        props.handleLoginChange(event)
        
    }
    
    const handleSubmit = (event) => {

        props.handleLoginSubmit(event)

    }
    
        const showLoginForm = props.showLoginForm ? {display: 'block'} : {display: 'none'}
        const showLoginSubmitButton = props.showLoginSubmitButton ? {display: 'block'} : {display: 'none'};
        const showLoginSubmitLoadingButton = props.showLoginSubmitLoadingButton ? {display: 'block'} : {display: 'none'};

        return (
          <Form style={showLoginForm}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    data-tip="Service Username"
                    type="text"
                    id="login-sc-username"
                    name="scUsername"
                    autoComplete="off"
                    value={props.scUsername || ""}
                    onChange={handleChange} />
                    <ReactTooltip delayShow={250}/>
                    
            <Form.Label>Password</Form.Label>
                <Form.Control
                    data-tip="Service Password"
                    type="password"
                    name="scPassword"
                    id="login-sc-password"
                    value={props.scPassword || ""}
                    onChange={handleChange} />
                    <ReactTooltip delayShow={250}/>         
             </Form.Group>
             
            <Button
                type="submit"
                value="Submit"
                disabled={!props.enableLoginSubmitButton}
                onClick={e => {e.preventDefault(); handleSubmit()}}
                style={showLoginSubmitButton}>
                Go
            </Button>
         
             
              <Button variant="primary" disabled style={showLoginSubmitLoadingButton}>
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

export default LoginForm;