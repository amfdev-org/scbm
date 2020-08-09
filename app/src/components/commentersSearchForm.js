import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

function CommentersSearchForm(props) {
    
  
    const handleChange = changeEvent => {
          
        ReactTooltip.hide();
        props.handleCommentersSearchChange(changeEvent)
        //forceUpdate()
        
    }
    
    const handleSubmit = () => {

        props.handleCommentersSearchSubmit()

    }
    
        //const showSearchForm = props.showSearchForm ? {display: 'block'} : {display: 'none'}
    
        const showCommentersSearchSubmitButton = props.showCommentersSearchSubmitButton ? {display: 'block'} : {display: 'none'};
        const showCommentersSearchSubmitLoadingButton = props.showCommentersSearchSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
    
        
        return (
          <Form inline onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    data-tip="Must include http or https"
                    type="text"
                    name="commentersSearchUrl"
                    placeholder="e.g. https://soundloud.com/artist/track"
                    value={props.commentersSearchUrl}
                    disabled={!props.enableCommentersSearchInput}
                    onChange={handleChange} />
                    <ReactTooltip delayShow={250}/>
    
            <Button
                type="submit"
                value="Submit"
                disabled={!props.enableCommentersSearchSubmitButton}
                onClick={e => {e.preventDefault(); handleSubmit()}}
                style={showCommentersSearchSubmitButton}>
                Submit
            </Button>
            
              <Button variant="primary" disabled style={showCommentersSearchSubmitLoadingButton}>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
              
            </Form.Group>
            
          </Form>
          
          
        );

}

export default CommentersSearchForm;