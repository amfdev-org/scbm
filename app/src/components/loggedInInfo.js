import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

class LoggedInInfo extends Component {
    

    render() {
        
        const showLoggedInInfo = this.props.showLoggedInInfo ? {display: 'block'} : {display: 'none'};
        const showLogoutSubmitButton = this.props.showLogoutSubmitButton ? {display: 'block'} : {display: 'none'};
        
        return (
            
        <div id="logged-in-info-container">
        
        <h6 className="logged-in-info" style={showLoggedInInfo}>
            <div className="hide-sm">{this.props.loggedInInfoText}</div>
        </h6>
            
            <Button
              className="logged-in-info logout-button"
              size="sm"
                type="submit"
                value="Submit"
                onClick={() => { this.props.handleLogoutSubmit() }}
                style={showLogoutSubmitButton}>
                Logout
            </Button>
        </div>
          
          
        );
    }

}

export default LoggedInInfo;