import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SearchForm from './SearchForm';
import CommentersTable from './CommentersTable';
import MessageForm from './MessageForm';

import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

class App extends Component {
  
  constructor(props) {
    
      super(props);
      
      this.initialState = {
        /*commenterData: [ { songUrl: "https://soundcloud.com/fogcapture/to-my-roots", profileUrl: 'https://soundcloud.com/deceivingsounds', messaged: "message" },
                            { songUrl: "https://soundcloud.com/fogcapture/to-my-roots", profileUrl: "https://soundcloud.com/alvonmars", messaged: "message" },
                            { songUrl: "https://soundcloud.com/fogcapture/to-my-roots", profileUrl: "https://soundcloud.com/patrickxtaylor", messaged: "message" }],*/
        //forms data
        scUsername: '',
        scPassword: '',
        searchUrl : '',
        commenterData : [],
        selectedCommenters : [],
        toggledClearRows: false,
        message : 'Hi <<profileName>>,',
        
        //headings
        loginHeaderText: 'Login',
        loggedInInfoText: '',
        showLoggedInInfo: false,
        
        //forms
        showLoginForm: false,
        showSearchForm: false,
        showCommentersTable: false,
        showMessageForm: false,
        
        //signup form
        showSignupSubmitButton: true,
        enableSignupSubmitButton: true,
        showSignupSubmitLoadingButton: false,
        enableSignupFormInputs: true,
        
        //login form buttons
        showLoginSubmitButton: true,
        showLogoutSubmitButton: false,
        enableLoginSubmitButton: true,
        showLoginSubmitLoadingButton: false,
        
        //search form buttons and input
        showSearchSubmitButton: true,
        enableSearchSubmitButton: false,
        showSearchSubmitLoadingButton: false,
        enableSearchInput: true,
        
        //message form buttons and input
        enableMessageSubmitButton: false,
        showMessageSubmitButton: true,
        showMessageSubmitLoadingButton: false,
        enableMessageInput: true,
    
        //alerts
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        errorAlertText: '',
        successAlertText: '',
        infoAlertText: '',
        infoAlertTextHeading: '',
        errorAlertLink: '',
        errorAlertLinkText: ''
      }
      
      this.state = this.initialState;
      
  }
  
      
  checkAutofill = () => {
    
    let checkUsernameAutofill = setInterval(() => {
         
         //document.getElementById("login-sc-username").click();
         
        var autofilledUsername = document.getElementById('login-sc-username').value;
        console.log(autofilledUsername)
        if (autofilledUsername.length > 0) {
              this.setState({ scUsername: autofilledUsername }, () => {
                    console.log(this.state);
            })
              clearInterval(checkUsernameAutofill);
        }
      }, 1000)
    
    
      let checkPasswordAutofill = setInterval(() => {
    
        var autofilledPassword = document.getElementById('login-sc-password').value;
        console.log(autofilledPassword)
        if (autofilledPassword.length > 0) {
              this.setState({ scPassword: autofilledPassword }, () => {
                    console.log(this.state);
            })
              clearInterval(checkPasswordAutofill);
        }
      }, 1000)
      
  }
  
  
  componentDidMount = () => {
    
      this.doAuth(); 
      //document.getElementById("login-sc-username").click();
      //document.getElementById("root").click();
      //this.checkAutofill();
  }

  
  doAuth = () => {
    
    //console.log('do auth');
    fetch('https://scbm.amfdev.co.uk/api/auth/', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    })
    .then(async response => {
    
            if (!response.ok) {
                 //throw Error(response.statusText);
                  this.setState({errorAlertText: "Something went wrong. Please try again later."});
                  this.setState({showErrorAlert: true}); 
             }
        
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            // check for error response
            if (jsonResponse.errorMessage) {
                // get error message from body or default to response status
                //const error = (commenterData && commenterData.message) || response.status;
                console.log(jsonResponse.errorMessage);
                return Promise.reject(jsonResponse.errorMessage);
                
            } else {
              
                if (jsonResponse.authResult === true) {
                    
                    this.setState({showSearchForm: true});
                    
                    this.setState({showLoggedInInfo: true});
                    this.setState({showLogoutSubmitButton: true});
                    this.setState({loggedInInfoText: jsonResponse.userData.scUsername});
                         
                    this.setState({successAlertText: "We logged you in!" });
                    
                        this.setState({showSuccessAlert: true},()=>{
                          window.setTimeout(()=>{
                            this.setState({showSuccessAlert: false})
                          },2000)
                        });
                                     
                } else {
                       
                        if (jsonResponse.scCookiesValid === false) {
                          
                              this.setState({showLoginForm: false});
                              this.setState({errorAlertText: "Credentials invalid. Please contact support." });
                              this.setState({showErrorAlert: true});
                              
                        } else {
                          
                              this.setState({showLoginForm: true});
                        
                              this.setState({infoAlertTextHeading: "Welcome" });
                              this.setState({infoAlertText: "Please log in." });
                        
                              this.setState({showInfoAlert: true});
                      
                        }                  
                  
                          
                }
    
            }
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);

        });
        
  }
  
  render() {
         
    const showErrorAlert = this.state.showErrorAlert ? {display: 'block'} : {display: 'none'};
    const showSuccessAlert = this.state.showSuccessAlert ? {display: 'block'} : {display: 'none'};
    const showInfoAlert = this.state.showInfoAlert ? {display: 'block'} : {display: 'none'};
     
    const showLoginForm = this.state.showLoginForm ? {display: 'block'} : {display: 'none'};
    const showLoggedInInfo = this.state.showLoggedInInfo ? {display: 'block'} : {display: 'none'};
    const showLogoutSubmitButton = this.state.showLogoutSubmitButton ? {display: 'block'} : {display: 'none'};
    
    const showSignupForm = this.state.showSignupForm ? {display: 'block'} : {display: 'none'};
    
    const showSearchForm = this.state.showSearchForm ? {display: 'block'} : {display: 'none'};
    //const showCommentersTable = this.state.showCommentersTable ? {display: 'block'} : {display: 'none'};
    const showMessageForm = this.state.showMessageForm ? {display: 'block'} : {display: 'none'};

    
      return (
        <Container>
           <Row>
           <Col>
          <Alert className="error-alert alert-fixed" style={showErrorAlert} variant='danger' onClose={() => this.dismissErrorAlert()} dismissible>
          <Alert.Heading>Uh oh!</Alert.Heading>
            {this.state.errorAlertText}
            <Alert.Link href="#" onClick={this.switchToSignup}>{this.state.errorAlertLinkText}</Alert.Link>
          </Alert>
          
          <Alert className="success-alert alert-fixed" style={showSuccessAlert} variant='success' onClose={() => this.dismissSuccessAlert()} dismissible>
          <Alert.Heading>Success!</Alert.Heading>
             {this.state.successAlertText}
          </Alert>
          
          <Alert className="info-alert alert-fixed" style={showInfoAlert} variant='info' onClose={() => this.dismissInfoAlert()} dismissible>
            <Alert.Heading>{this.state.infoAlertTextHeading}</Alert.Heading>
             {this.state.infoAlertText}
          </Alert>
            
            <h6 className="logged-in-info" style={showLoggedInInfo}><div className="hide-sm">{this.state.loggedInInfoText}</div></h6>
            
            <Button
              className="logged-in-info logout-button"
              size="sm"
                type="submit"
                value="Submit"
                onClick={() => { this.doLogout() }}
                style={showLogoutSubmitButton}>
                Logout
            </Button>


            <h3 className="main" style={showSignupForm}>Sign Up</h3>
            <SignupForm className="main"
              showSignupForm={this.state.showSignupForm}
              scUsername={this.state.scUsername}
              scPassword={this.state.scPassword}
              signupButtonText = {this.state.signupHeaderText}
              enableSignupFormInputs={this.state.enableSignupFormInputs}
              handleSignupChange={this.handleSignupChange}
              handleSignupSubmit={this.handleSignupSubmit}
              enableSignupSubmitButton={this.state.enableSignupSubmitButton}
              showSignupSubmitButton={this.state.showSignupSubmitButton}
              showSignupSubmitLoadingButton={this.state.showSignupSubmitLoadingButton} />
              
            <h3 className="main" style={showLoginForm}>Login</h3>
            <LoginForm className="main"
              checkAutofill={this.checkAutofill}
              showLoginForm={this.state.showLoginForm}
              scUsername={this.state.scUsername}
              scPassword={this.state.scPassword}
              loginButtonText = {this.state.loginHeaderText}
              handleLoginChange={this.handleLoginChange}
              handleLoginSubmit={this.handleLoginSubmit}
              enableLoginSubmitButton={this.state.enableLoginSubmitButton}
              showLoginSubmitButton={this.state.showLoginSubmitButton}
              showLoginSubmitLoadingButton={this.state.showLoginSubmitLoadingButton} />
                    
            <Accordion className="search-accordion" style={showSearchForm}>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Commenters
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                      <h6 className="main">Song URL</h6>
                        <SearchForm
                          className="main"
                          searchUrl={this.state.searchUrl}
                          handleSearchChange={this.handleSearchChange}
                          handleSearchSubmit={this.handleSearchSubmit}
                          enableSearchInput={this.state.enableSearchInput}
                          enableSearchSubmitButton={this.state.enableSearchSubmitButton}
                          showSearchSubmitButton={this.state.showSearchSubmitButton}
                          showSearchSubmitLoadingButton={this.state.showSearchSubmitLoadingButton} />
                  
                       {/*<h6 style={showCommentersTable} className="commenterDataTable">Results</h6>*/}
            
                      <CommentersTable
                          commenterData={this.state.commenterData}
                          showCommentersTable={this.state.showCommentersTable}
                          handleCommentersChange={this.handleCommentersChange}
                          handleCommentersSubmit={this.handleCommentersSubmit}
                          showCommentersSubmitButton={this.state.showCommentersSubmitButton}
                          showCommentersSubmitLoadingButton={this.state.showCommentersSubmitLoadingButton}
                          selectedCommenters={this.state.selectedCommenters}
                          toggledClearRows={this.state.toggledClearRows}
                          />
                      
                      <h6 style={showMessageForm} className="messageForm">Message</h6>
                      
                      <MessageForm
                          message={this.state.message}
                          showMessageForm={this.state.showMessageForm}
                          handleMessageChange={this.handleMessageChange}
                          handleMessageSubmit={this.handleMessageSubmit}
                          enableMessageInput={this.state.enableMessageInput}
                          enableMessageSubmitButton={this.state.enableMessageSubmitButton}
                          showMessageSubmitButton = {this.state.showMessageSubmitButton}
                          showMessageSubmitLoadingButton = {this.state.showMessageSubmitLoadingButton}
                          />
                  
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Followers
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                  nothing
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            
       
               
           </Col>
              </Row>
        </Container>
      )
  }
  
  
    
    handleLoginChange = (event) => {

      this.setState({showErrorAlert: false});
      
      const { name, value } = event.target
  
      this.setState({[name]: value},()=> {
        //console.log(this.state);
        
          if (this.state.scUsername.length > 0 && this.state.scPassword.length > 0) {
            this.setState({enableLoginSubmitButton: true}, () => {   
              //console.log(this.state);
            })
          } else {
             this.setState({enableLoginSubmitButton: false}, () => {   
              //console.log(this.state);
            })
          }
          
      });
                  
  }
  
  
    handleLoginSubmit = () => {

        this.setState({ showLoginSubmitButton: false })
        this.setState({ showLoginSubmitButton: false })
        this.setState({ showLoginSubmitLoadingButton: true })
        
        this.setState({showInfoAlert: false});
        this.setState({showErrorAlert: false});
                       
              
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({scUsername: this.state.scUsername,
                                 scPassword: this.state.scPassword,
                                 })
        };
        fetch('https://scbm.amfdev.co.uk/api/login/', requestOptions)
              .then(async response => {
                
                if (!response.ok) {
                   //throw Error(response.statusText);
                    this.setState({errorAlertText: "Something went wrong. Please try again later."});
                    this.setState({showErrorAlert: true}); 
                }
                
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                // check for error response
                if (!jsonResponse.userFound) {
                  
                      this.setState({errorAlertText: 'User not found. Please try again, or '});
                      this.setState({errorAlertLinkText: 'sign up instead?'});
                      this.setState({showInfoAlert: false});
                      this.setState({showSuccessAlert: false});
                      this.setState({showErrorAlert: true});
                      this.setState({showLoginSubmitButton: true});
                      this.setState({showLoginSubmitLoadingButton: false});
                      
                } else if (!jsonResponse.scCookiesValid) {
                  
                      this.setState({showLoginForm: false});
                      this.setState({errorAlertText: "Credentials invalid. Please contact support." });
                      this.setState({showErrorAlert: true});
                      this.setState({errorAlertLinkText: ''});
                      this.setState({showInfoAlert: false});
                          
                } else {
                  
                      this.setState({showErrorAlert: false});
                      this.setState({showLoginForm: false});
                      this.setState({showSearchForm: true});
                      this.setState({showLogoutSubmitButton: true});
  
                      this.setState({showLoggedInInfo: true});
                      this.setState({loggedInInfoText: "Logged in as " + jsonResponse.userData.scUsername});
                      this.setState({showLogoutSubmitButton: true});
                      
                      this.setState({showInfoAlert: false});
                      this.setState({showErrorAlert: false});
                       
                      this.setState({successAlertText: "You're now logged in!" });
                  
                        this.setState({showSuccessAlert: true},()=>{
                        window.setTimeout(()=>{
                          this.setState({showSuccessAlert: false})
                        },2000)
                      });
                          
                }
            
        
            })
            .catch(error => {
                //this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
                        
            });
              
                
  }
  
  
   handleSignupChange = (event) => {

      this.setState({showErrorAlert: false});
      
      const { name, value } = event.target
  
      this.setState({[name]: value},()=> {
        //console.log(this.state);
        
          if (this.state.scUsername.length > 0 && this.state.scPassword.length > 0) {
            this.setState({enableSignupSubmitButton: true}, () => {   
              //console.log(this.state);
            })
          } else {
             this.setState({enableSignupSubmitButton: false}, () => {   
              //console.log(this.state);
            })
          }
          
      });
                  
  }
  
  
    handleSignupSubmit = () => {

        this.setState({ showErrorAlert: false })
        this.setState({ showSuccessAlert: false })
        this.setState({ showInfoAlert: false })
        this.setState({ showSignupSubmitButton: false })
        this.setState({ showSignupSubmitLoadingButton: true })
        this.setState({ enableSignupFormInputs: false })
              
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({scUsername: this.state.scUsername,
                                 scPassword: this.state.scPassword})
        };
        fetch('https://scbm.amfdev.co.uk/api/signup/', requestOptions)
              .then(async response => {
                
                if (!response.ok) {
                   //throw Error(response.statusText);
                    this.setState({errorAlertText: "Something went wrong. Please try again later."});
                    this.setState({errorAlertLink: ''});
                     this.setState({errorAlertLinkText: ''});
                    this.setState({showErrorAlert: true}); 
                    this.setState({showErrorAlert: true});
            
                }
                
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                // check for error response
                    
                if (jsonResponse.signupSuccess) {
                  
                        this.setState({showErrorAlert: false});
                        this.setState({showSignupForm: false});
                        this.setState({showSearchForm: true});
                        this.setState({showLogoutSubmitButton: true});
    
                        this.setState({showLoggedInInfo: true});
                        this.setState({loggedInInfoText: "Logged in as " + jsonResponse.userData.scUsername});
                        this.setState({showLogoutSubmitButton: true});
                        
                        this.setState({showInfoAlert: false});
                        this.setState({showErrorAlert: false});
                         
                        this.setState({successAlertText: "You're now logged in!" });
                    
                          this.setState({showSuccessAlert: true}, () => {
                          window.setTimeout(()=>{
                            this.setState({showSuccessAlert: false})
                          },4000)
                        });
                          
                } else if (!jsonResponse.signupSuccess ) {
                  
                        if (jsonResponse.scCookiesValid === false) {
                          
                              this.setState({showLoginForm: false});
                              this.setState({errorAlertText: "Credentials invalid. Please contact support." });
                              this.setState({errorAlertLinkText: ''})
                              this.setState({showErrorAlert: true});
                              
                        } else {
                            
                            this.setState({errorAlertText: 'Something went wrong. Are you sure those details are correct?'});
                            this.setState({errorAlertLinkText: ''})
                            this.setState({showInfoAlert: false});
                            this.setState({showSuccessAlert: false});
                            this.setState({showErrorAlert: true});
                            
                            this.setState({ showSignupSubmitButton: true });
                            this.setState({ showSignupSubmitLoadingButton: false });
                            
                            this.setState({ enableSignupFormInputs: true })
                      
                        }

                }
            
        
            })
            .catch(error => {
                //this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
                this.setState({ showSignupSubmitButton: true })
                this.setState({ showSignupSubmitLoadingButton: false })
                        
            });
            
                
  }
  
  
  switchToSignup = () => {
    
    this.setState({showLoginForm: false});
    this.setState({showSignupForm: true});
    //console.log('dwitch to signup');
      
        //this.setState({loginHeaderText: "Sign Up"})
        
        this.setState({showErrorAlert: false});
        
        this.setState({infoAlertTextHeading: "OK then!" });
        this.setState({infoAlertText: "Please sign up below." });
        this.setState({showInfoAlert: true});
  
  }
  
  handleSearchChange = event => {
     
     const { name, value } = event.target
  
      this.setState({[name]: value, searchUrl: value}, () => {   
          if (this.state.searchUrl.length > 10 && this.state.searchUrl.includes("http")) {
            this.setState({enableSearchSubmitButton: true}, () => {   
              //console.log(this.state);
            })
          } else {
            this.setState({enableSearchSubmitButton: false}, () => {   
              //console.log(this.state);
            })
          }
      })
        
  }
    
    
  handleSearchSubmit = () => {
  
    this.setState({ showCommentersTable: false })
    this.setState({ showSearchSubmitButton: false })
    this.setState({ showSearchSubmitLoadingButton: true })
    this.setState({ enableSearchInput: false })
    this.setState({ showErrorAlert: false })
    this.setState({ showSuccessAlert: false })
    this.setState({ showInfoAlert: false })
    
      var myHeaders = new Headers();
        myHeaders.set('Accept', 'application/json');
        myHeaders.set('Content-Type', 'application/json');
        //myHeaders.set('Authorization', 'Token token=' + String(token));
        myHeaders.set('Cache-Control', 'no-cache');
        myHeaders.set('Pragma', 'no-cache');
        myHeaders.set('Expires', '0');
    
    fetch('https://scbm.amfdev.co.uk/api/commenters/?searchUrl='+encodeURI((this.state.searchUrl)), {
            method: 'GET',
            headers: myHeaders
        })
    .then(async response => {
      
            if (!response.ok) {
               //throw Error(response.statusText);
                this.setState({errorAlertText: "Something went wrong. Please try again later."});
                this.setState({showErrorAlert: true});
                
                this.setState({ showSearchSubmitButton: true })
                this.setState({ showSearchSubmitLoadingButton: false })
            }
            //console.log(response);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
                
            if (jsonResponse.success) {
                  
                this.setState({ commenterData: jsonResponse.commenterData })
                this.setState({ showCommentersTable: true })
                document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
  
                this.setState({successAlertText: "Found " + jsonResponse.commenterData.length + ' commenters.'});
                
                  this.setState({showSuccessAlert: true},()=>{
                  window.setTimeout(()=>{
                    this.setState({showSuccessAlert: false})
                  },4000)
                  
              });
                
                  this.setState({ enableSearchInput: true })
                  this.setState({ showSearchSubmitButton: true })
                  this.setState({ showSearchSubmitLoadingButton: false })
                  
            
            } else if (!jsonResponse.success) {
              
                  if (jsonResponse.commenterData === "no commenters") {
                    
                        this.setState({ showCommentersTable: true })
                        document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
          
                        this.setState({successAlertText: "But there were no commenters found for this track."});
                        
                          this.setState({showSuccessAlert: true},()=>{
                          window.setTimeout(()=>{
                            this.setState({showSuccessAlert: false})
                          },4000)
                          
                      });
                      
                          this.setState({ enableSearchInput: true })
                          this.setState({ showSearchSubmitButton: true })
                          this.setState({ showSearchSubmitLoadingButton: false })
                          
                  } else {
                    
                        // get error message from body or default to response status
                         //const error = (commenterData && commenterData.message) || response.status;
                         //console.log(jsonResponse.errorMessage);
                         //return Promise.reject(jsonResponse.errorMessage);
                         this.setState({errorAlertText: "Something went wrong. Please try again later."});
                         this.setState({showErrorAlert: true});
                         
                         this.setState({ showSearchSubmitButton: true })
                         this.setState({ showSearchSubmitLoadingButton: false })
                         this.setState({ enableSearchInput: true })
  
                  }
           
                  
            }
            
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            
             this.setState({ enableSearchInput: true })
            this.setState({ showSearchSubmitButton: true })
            this.setState({ showSearchSubmitLoadingButton: false })
            
              this.setState({showErrorAlert: true},()=>{
              window.setTimeout(()=>{
                this.setState({showErrorAlert: false})
              },4000)
            });
              
        });
      
    
      /*
        const commenterData = [
            {profileUrl: "https://soundcloud.com/cloaked-music", messagedBefore: "No"},
            {profileUrl: "https://srewrewr.com", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/patrickxtaylor", messagedBefore: "Yes"},
            {profileUrl: "https://soundcloud.com/alvonmars", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/upukrecords", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/user-355158966-477119345", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/deftsoulmusique1995", messagedBefore: "No"},
            {profileUrl: "https://soundcloud.com/ocmoon", messagedBefore: "Yes"}
            ];
        
        
            this.setState({ commenterData: commenterData })
            this.setState({ showCommentersTable: true })
            
            this.setState({ showSearchSubmitButton: true })
            this.setState({ showSearchSubmitLoadingButton: false })*/
            
 
  }
  
  
  handleCommentersChange = selectedRows => {
          //console.log('Selected Rows: ', state.selectedRows);
        //this.setState({selectedCommenters: event.selectedRows});

        this.setState({selectedCommenters: selectedRows}, () => {
          
            if (this.state.selectedCommenters.length > 0) {
              document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'block';
              this.setState({showMessageForm: true}, () => {   
                //console.log(this.state);
              })
            } else {
              document.getElementsByClassName('rdt_TableHeader')[0].style.display = 'none';
              this.setState({showMessageForm: false}, () => {   
                //console.log(this.state);
              })
            }
            
        })
        
        
  }

  
  handleMessageChange = (changeEvent) => {
      
      //console.log(changeEvent.target.value);
    
        this.setState({message: changeEvent.target.value}, () => {
        
          if (this.state.message.length > 10) {
            this.setState({enableMessageSubmitButton: true}, () => {   
              //console.log(this.state);
            })
          } else {
             this.setState({enableMessageSubmitButton: false}, () => {   
              //console.log(this.state);
            })
          }
          
        })
                  
  }
  
  
  handleMessageSubmit = async () => {
    
    this.setState({ showMessageSubmitButton: false })
    this.setState({ enableMessageInput: false })
    this.setState({ showMessageSubmitLoadingButton: true })
    
    this.setState({ enableSearchSubmitButton: false})
    this.setState({ enableSearchInput: false})

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({selectedCommenters: this.state.selectedCommenters,
                             message: this.state.message,
                             searchUrl: this.state.searchUrl})
    };
    fetch('https://scbm.amfdev.co.uk/api/message/', requestOptions)
          .then(async response => {
            
            if (!response.ok) {
               //throw Error(response.statusText);
                this.setState({errorAlertText: "Something went wrong. Please try again later."});
                this.setState({showErrorAlert: true}); 
            }
                
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            // check for error response
            if (jsonResponse.errorMessage) {
                // get error message from body or default to response status
                //const error = (commenterData && commenterData.message) || response.status;
                await console.log(jsonResponse.errorMessage);
                return Promise.reject(jsonResponse.errorMessage);
                
            } else {
                          
              let successArray = [];
              
              for (let sendResult of jsonResponse) {
                //console.log(sendResult)
      
                const elementsIndex = await this.state.commenterData.findIndex(element => element.profileUrl === sendResult.profileUrl );
                 
                 let newArray = await [...this.state.commenterData]
                 
                  newArray[elementsIndex] = await {...newArray[elementsIndex], messaged: sendResult.messageResult}
                
                      //await console.log(newArray);
                      
                      await this.setState({
                      commenterData: newArray,
                      });
                      
                        if (sendResult.messageResult === 'Success') {
                           await successArray.push(sendResult.profileUrl);
                        }
                 
              }
          
              
              this.setState({successAlertText: "Message sent to " + successArray.length + " users." });
              
                this.setState({showSuccessAlert: true},()=>{
                    window.setTimeout(()=>{
                      this.setState({showSuccessAlert: false})
                    },4000)
                  });
               
               
              this.setState({ toggledClearRows: true })
              this.setState({ showMessageSubmitButton: true })
              this.setState({ showMessageSubmitLoadingButton: false })
               this.setState({ enableMessageInput: true })
    
              this.setState({ enableSearchSubmitButton: true})
              this.setState({ enableSearchInput: true})
                      
            }
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            this.setState({ showMessageSubmitButton: true })
            this.setState({ showMessageSubmitLoadingButton: false })
            this.setState({ enableMessageInput: true })
             
            this.setState({ enableSearchSubmitButton: true})
            this.setState({ enableSearchInput: true})
              
            this.setState({errorAlertText: "Something went wrong."});
              
              
              this.setState({showErrorAlert: true},()=>{
                window.setTimeout(()=>{
                  this.setState({showErrorAlert: false})
                },4000)
              });
                    
        });
                
        
  }
  

    
  doLogout = () => {
    
    //console.log('do logout');

    fetch('https://scbm.amfdev.co.uk/api/logout/', {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    })
    .then(async response => {
    
            if (!response.ok) {
                 //throw Error(response.statusText);
                  this.setState({errorAlertText: "Something went wrong. Please try again later."});
                  this.setState({showErrorAlert: true}); 
             }
        
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            // check for error response
            if (jsonResponse.errorMessage) {
                // get error message from body or default to response status
                //const error = (commenterData && commenterData.message) || response.status;
                console.log(jsonResponse.errorMessage);
                return Promise.reject(jsonResponse.errorMessage);
                
            } else {
              
                if (jsonResponse.logoutResult === 'success') {
                  
                      this.setState({showSearchForm: false});
                      this.setState({showCommentersTable: false});
                      this.setState({showMessageForm: false});
                      
                      this.setState({showLoggedInInfo: false});
                      this.setState({showLogoutSubmitButton: false});
                      
                      this.setState({loggedInInfoText: ''});
                           
                      this.setState({successAlertText: "We logged you out!" });
                      
                        this.setState({showSuccessAlert: true},()=>{
                        window.setTimeout(()=>{
                          this.setState({showSuccessAlert: false})
                          this.doReset();
                        },1500)
                      });
                          
                    //this.setState({showLoginForm: true});
                        
                } 
    
            }
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);

        });
    
  }
  
    
  dismissErrorAlert = () => {
        this.setState({showErrorAlert: false});
  }
    
  dismissSuccessAlert = () => {
        this.setState({showSuccessAlert: false});
  }
  
  dismissInfoAlert = () => {
        this.setState({showInfoAlert: false});
  }
  
  
  doReset = () => {
      //console.log('do reset');
      this.setState(this.initialState);
      this.componentDidMount(); 
  }
  

}

export default App