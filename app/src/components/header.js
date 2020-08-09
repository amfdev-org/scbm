import React from 'react'
import Button from 'react-bootstrap/Button'
import ReactTooltip from "react-tooltip";
import { Nav, Navbar } from "react-bootstrap";
import { GiSettingsKnobs } from 'react-icons/gi';


function Header(props) {
    
    const handleLogoutSubmit = () => {
        
        ReactTooltip.hide();
        props.handleLogoutSubmit()

    }
    
        const showLoggedInInfo = props.showLoggedInInfo ? {display: 'block'} : {display: 'none'};
        const showLogoutSubmitButton = props.showLogoutSubmitButton ? {display: 'block'} : {display: 'none'};
                 
        return (
                               
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="/#" className="logo">
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
                  {props.loggedInInfoText}
                 
                  </Nav.Link>
                  
                   <GiSettingsKnobs
                    className="header-config-link"
                    data-tip="Settings"
                   style={showLoggedInInfo}
                   onClick={props.handleToggleConfigModal}
                    />
                    <ReactTooltip delayShow={250}/>
                   
                  <Nav.Link eventKey="1">
                    <Button
                    className="logout-button"
                    data-tip="Logout"
                    size="sm"
                      type="submit"
                      value="Submit"
                      style={showLogoutSubmitButton}
                      onClick={() => { handleLogoutSubmit() }}
                      >
                      Logout
                  </Button>
                  <ReactTooltip delayShow={250}/>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            
        );

}

export default Header;
