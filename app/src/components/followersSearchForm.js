import React, { useContext } from "react";
import { ContextConsumer } from "../provider/provider";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import ReactTooltip from "react-tooltip";

function FollowersSearchForm(props) {
    
    const context = useContext(ContextConsumer);
    
    const handleChange = (event) => {
          
        ReactTooltip.hide();
        props.handleFollowersSearchChange(event, context)
        
    }
    
    const handleSubmit = (event) => {

        props.handleFollowersSearchSubmit(event, context)

    }
    
        //const showSearchForm = props.showSearchForm ? {display: 'block'} : {display: 'none'}
         
        const showFollowersSearchSubmitButton = props.showFollowersSearchSubmitButton ? {display: 'block'} : {display: 'none'};
        const showFollowersSearchSubmitLoadingButton = props.showFollowersSearchSubmitLoadingButton ? {display: 'block'} : {display: 'none'};
    
        
        return (
          <Form inline onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    data-tip="Must include http or https"
                    type="text"
                    name="followerSearchUrl"
                    placeholder="e.g. https://soundloud.com/artist"
                    value={props.followersSearchUrl}
                    disabled={!props.enableFollowersSearchInput}
                    onChange={handleChange} />
                    <ReactTooltip delayShow={250}/>
    
            <Button
                type="submit"
                value="Submit"
                disabled={!props.enableFollowersSearchSubmitButton}
                onClick={e => {e.preventDefault(); handleSubmit()}}
                style={showFollowersSearchSubmitButton}>
                Submit
            </Button>
            
              <Button variant="primary" disabled style={showFollowersSearchSubmitLoadingButton}>
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

export default FollowersSearchForm;