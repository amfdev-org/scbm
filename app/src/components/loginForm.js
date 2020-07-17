import React, { Component } from 'react'
//import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

class LoginForm extends Component {
    
      
    handleChange = (event) => {
          
        ReactTooltip.hide();
        this.props.handleLoginChange(event)
        
    }
    
    handleSubmit = (event) => {

        this.props.handleLoginSubmit(event)

    }
    
    render() {
        
        const showLoginForm = this.props.showLoginForm ? {display: 'block'} : {display: 'none'}
        const showLoginSubmitButton = this.props.showLoginSubmitButton ? {display: 'block'} : {display: 'none'};
        const showLoginSubmitLoadingButton = this.props.showLoginSubmitLoadingButton ? {display: 'block'} : {display: 'none'};

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
                    value={this.props.scUsername || ""}
                    onChange={this.handleChange} />
                    <ReactTooltip delayShow={250}/>
                    
            <Form.Label>Password</Form.Label>
                <Form.Control
                    data-tip="Service Password"
                    type="password"
                    name="scPassword"
                    id="login-sc-password"
                    value={this.props.scPassword || ""}
                    onChange={this.handleChange} />
                    <ReactTooltip delayShow={250}/>         
             </Form.Group>
             
            <Button
                type="submit"
                value="Submit"
                disabled={!this.props.enableLoginSubmitButton}
                onClick={e => {e.preventDefault(); this.handleSubmit()}}
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

}

export default LoginForm;


/*function mapStateToProps(state) {
 
    return {
        showLoginForm: state.showLoginForm,
        showLoginSubmitButton: state.showLoginSubmitButton,
        showLoginSubmitLoadingButton: state.showLoginSubmitLoadingButton
       
        
    }
      
      
}

export default connect(mapStateToProps)(LoginForm);*/