import React, { Component } from 'react'
//import { connect } from 'react-redux';
//import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import Spinner from 'react-bootstrap/Spinner'
//import ReactTooltip from "react-tooltip";
import { Nav, Navbar } from "react-bootstrap";

class Header extends Component {
    
    render() {
        
        console.log(this.props)
        const showLoggedInInfo = this.props.showLoggedInInfo ? {display: 'block'} : {display: 'none'};
        const showLogoutSubmitButton = this.props.showLogoutSubmitButton ? {display: 'block'} : {display: 'none'};
                 
        return (
                               
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="#">
                SCBM
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#"></Nav.Link>
                  <Nav.Link href="#">
                  
                </Nav.Link>      
                </Nav>
                <Nav className="nav-logged-in-info">
                  <Nav.Link className="logged-in-info" style={showLoggedInInfo}>
                  {this.props.loggedInInfoText}
                  </Nav.Link>
                  <Nav.Link eventKey="1">
                <Button
                    className="logged-in-info logout-button"
                    size="sm"
                      type="submit"
                      value="Submit"
                      style={showLogoutSubmitButton}
                      onClick={() => { this.props.handleLogoutSubmit() }}
                      >
                      Logout
                  </Button>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            
        );
    }

}

export default Header;
