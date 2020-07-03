import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'

import SearchForm from './SearchForm';
import CommentersTable from './CommentersTable';
import MessageForm from './MessageForm';


class App extends Component {
  
  state = {
    commenterData: [],
    showCommentersTable: false,
    
    searchUrl : '',
    enableSearchSubmitButton: false,
    showSearchSubmitButton: true,
    showSearchSubmitLoadingButton: false,
    
    selectedCommenters : [],
    message : '',
    showMessageForm: false,
    showMessageSubmitButton: true,
    showMessageSubmitLoadingButton: false,
    enableMessageSubmitButton: false
  }
  
  render() {
    
    const showCommentersTable = this.state.showCommentersTable ? {display: 'block'} : {display: 'none'};
    const showMessageForm = this.state.showMessageForm ? {display: 'block'} : {display: 'none'};
    
      return (
        <Container>
        
            <h3>Search</h3>
            <SearchForm
              searchUrl={this.state.searchUrl}
              handleSearchChange={this.handleSearchChange}
              handleSearchSubmit={this.handleSearchSubmit}
              enableSearchSubmitButton={this.state.enableSearchSubmitButton}
              showSearchSubmitButton={this.state.showSearchSubmitButton}
              showSearchSubmitLoadingButton={this.state.showSearchSubmitLoadingButton} />
            
            <h3 style={showCommentersTable} className="commenterDataTable">Commenters</h3>
            
            <CommentersTable
                commenterData={this.state.commenterData}
                showCommentersTable={this.state.showCommentersTable}
                handleCommentersChange={this.handleCommentersChange}
                handleCommentersSubmit={this.handleCommentersSubmit}
                showCommentersSubmitButton={this.state.showCommentersSubmitButton}
                showCommentersSubmitLoadingButton={this.state.showCommentersSubmitLoadingButton}
                selectedCommenters={this.state.selectedCommenters}
                />
            
            <h3 style={showMessageForm} className="messageForm">Message</h3>
            
            <MessageForm
                message={this.state.message}
                showMessageForm={this.state.showMessageForm}
                handleMessageChange={this.handleMessageChange}
                handleMessageSubmit={this.handleMessageSubmit}
                enableMessageSubmitButton={this.state.enableMessageSubmitButton}
                showMessageSubmitButton = {this.state.showMessageSubmitButton}
                showMessageSubmitLoadingButton = {this.state.showMessageSubmitLoadingButton}
                />
                
        </Container>
      )
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
    
    fetch('https://scbm.amfdev.co.uk/api/commenters/?searchUrl='+encodeURI((this.state.searchUrl)))
    .then(async response => {
            const jsonResponse = await response.json();
            // check for error response
            if (jsonResponse.errorMessage) {
                // get error message from body or default to response status
                //const error = (commenterData && commenterData.message) || response.status;
                console.log(jsonResponse.errorMessage);
                return Promise.reject(jsonResponse.errorMessage);
                
            } else {
              
              this.setState({ commenterData: jsonResponse })
              this.setState({ showCommentersTable: true })
              
              this.setState({ showSearchSubmitButton: true })
              this.setState({ showSearchSubmitLoadingButton: false })
            }
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            this.setState({ showSearchSubmitButton: true })
            this.setState({ showSearchSubmitLoadingButton: false })
        });
      
        
        /*const commenterData = [
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
            
      //this.setState({ commenters: [...this.state.commenters] })
  }
  
  
  handleCommentersChange = selectedRows => {
          //console.log('Selected Rows: ', state.selectedRows);
        //this.setState({selectedCommenters: event.selectedRows});
        
        this.setState({selectedCommenters: selectedRows}, () => {
          
            if (this.state.selectedCommenters.length > 0) {
              this.setState({showMessageForm: true}, () => {   
                //console.log(this.state);
              })
            } else {
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
  
  
  handleMessageSubmit = () => {
    
    console.log(this.state);
    
    /*     
    this.setState({ showMessageSubmitButton: false })
    this.setState({ showMessageSubmitLoadingButton: true })

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({state: this.state})
    };
    fetch('https://scbm.amfdev.co.uk/api/message/', requestOptions)
        .then(async response => {
            const commenterData = await response.json();
            console.log(commenterData);
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (commenterData && commenterData.message) || response.status;
                return Promise.reject(error);
            }


            this.setState({ showMessageSubmitButton: true })
            this.setState({ showMessageSubmitLoadingButton: false })
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            this.setState({ showMessageSubmitButton: true })
            this.setState({ showMessageSubmitLoadingButton: false })
        });
        
        */
    
  }
    

}

export default App