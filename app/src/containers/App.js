import React, { useEffect, Suspense } from 'react';
import connect from "../provider/connect";

//ACTION CREATORS
import {
  fetchAuth
  } from '../actions/authActions'

//BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Spinner from 'react-bootstrap/Spinner'

//CONTAINERS
import AlertContainer from './alertContainer';
import HeaderContainer from './headerContainer';
import LoginContainer from './loginContainer';
import ReceivedMessagesContainer from './receivedMessagesContainer';
import SentMessagesContainer from './sentMessagesContainer';
import MyFollowersContainer from './myFollowersContainer';
import CommentersContainer from './commentersContainer';
import FollowersContainer from './followersContainer';

//COMPONENTS
const Footer = React.lazy(() => import('../components/footer'));

function App(props) {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
    // Create an scoped async function in the hook
       //function anyNameFunction() {      
      props.fetchAuth();
      // eslint-disable-next-line 
    }, []);

    const showMainAccordion = props.showMainAccordion ? {display: 'block'} : {display: 'none'};
  
    return (
      
      <>
      
        <HeaderContainer />
        
            <Container className="main-container">
              <Row>        
                <Col>
                
                <AlertContainer />
                <LoginContainer />
                
                    <Accordion className="main-accordion" defaultActiveKey="0" style={showMainAccordion}>
                        <ReceivedMessagesContainer />
                        <SentMessagesContainer />
                        <MyFollowersContainer />
                        <CommentersContainer />
                        <FollowersContainer />
                    </Accordion>
                    
                   </Col>
                  </Row>
                </Container>
                
              <Suspense fallback={<div className="suspense-loader">Loading... <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner></div>}>
                <Footer />
              </Suspense>
         </>                  
      )
  
}


const mapStateToProps = state => ({
      showMainAccordion: state.showMainAccordion     
});
      

const mapDispatchToProps = dispatch => ({
      fetchAuth: () => fetchAuth(dispatch)

});


export default connect(mapStateToProps, mapDispatchToProps) (App);