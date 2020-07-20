import React, { Component } from 'react'
//import { connect } from 'react-redux';
//import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import Spinner from 'react-bootstrap/Spinner'
//import ReactTooltip from "react-tooltip";

class Header extends Component {
    
    render() {
        
        const showLoggedInInfo = this.props.showLoggedInInfo ? {display: 'block'} : {display: 'none'};
        const showLogoutSubmitButton = this.props.showLogoutSubmitButton ? {display: 'block'} : {display: 'none'};
                 
        return (
                    
            <header>
                  {/* Fixed navbar */}
                  <nav className='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
                    <a className='navbar-brand' href='/'>
                      SCBM
                    </a>
                     {/*<button
                      className='navbar-toggler'
                      type='button'
                      data-toggle='collapse'
                      data-target='#navbarCollapse'
                      aria-controls='navbarCollapse'
                      aria-expanded='false'
                      aria-label='Toggle navigation'>
                      <span className='navbar-toggler-icon' />
                    </button>*/}
                    <div className='collapse navbar-collapse' id='navbarCollapse'>
                    
                      <ul className='navbar-nav mr-auto'>
   
                      </ul>
                      {/*<form className='form-inline mt-2 mt-md-0'>
                        <input className='form-control mr-sm-2' type='text' placeholder='Search' aria-label='Search' />
                        <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>
                          Search
                        </button>
                      </form>*/}
                      
                        <div id="logged-in-info-container">
                        
                            <ul className='navbar-nav mr-auto'>     
                                <li className='nav-item active' style={showLoggedInInfo}>
                                  <a className='nav-link' href='/'>
                                      <span className="hide-sm">{this.props.loggedInInfoText}</span>
                                  </a>
                                </li>
                            
                                <li className='nav-item active'>
                                  <a className='nav-link' href='/'>
                                    <div className="hide-sm">
                                    <Button
                                      className="logged-in-info logout-button"
                                      size="sm"
                                        type="submit"
                                        value="Submit"
                                        style={showLogoutSubmitButton}>
                                        onClick={() => { this.props.handleLogoutSubmit() }}
                                        >
                                        Logout
                                    </Button>
                                    </div>
                                  </a>
                                </li>
                            </ul>
                              
                           
                            </div>
                        </div>
                  </nav>
                </header>
            
        );
    }

}

export default Header;
