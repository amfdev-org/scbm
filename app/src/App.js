import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import CommentersTable from './CommentersTable';
import SearchForm from './SearchForm';

class App extends Component {
  
  state = {
    commenters: [
              ],
    showCommentersTable: false,
    showSubmitButton: true,
    showSubmitLoadingButton: false
    
  }
  
  /*removeCharacter = index => {
      const { commenters } = this.state
    
      this.setState({
        formData: commenters.filter((commenters, i) => {
          return i !== index
        }),
      })
  } */
  
  render() {
    
    const { commenters } = this.state
    const { showCommentersTable } = this.state
    const { showSubmitButton } = this.state
    const { showSubmitLoadingButton } = this.state
    
      return (
        <Container>
            <h3>Search</h3>
            <SearchForm handleSubmit={this.handleSubmit} showSubmitButton={showSubmitButton} showSubmitLoadingButton={showSubmitLoadingButton} />
            <CommentersTable commenters={commenters} showCommentersTable={showCommentersTable} />
        </Container>
      )
  }
  
  handleSubmit = formData => {
    
    this.setState({ showSubmitButton: false })
    this.setState({ showSubmitLoadingButton: true })
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };
    fetch('https://scbm.amfdev.co.uk/api/', requestOptions)
        .then(async response => {
            const data = await response.json();
            console.log(data);
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            this.setState({ commenters: data })
            this.setState({ showCommentersTable: true })
            
            this.setState({ showSubmitButton: true })
            this.setState({ showSubmitLoadingButton: false })
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
            this.setState({ showSubmitButton: true })
            this.setState({ showSubmitLoadingButton: false })
        });
        
        
      //this.setState({ commenters: [...this.state.commenters] })
  }

}

export default App