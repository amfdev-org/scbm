import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/rootReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const initialState = {
        //main UI
        showMainAccordion: false,
        //signup
        showSignupSubmitButton: true,
        enableSignupSubmitButton: true,
        showSignupSubmitLoadingButton: false,
        enableSignupFormInputs: true,
        
        //login
        scUsername: '',
        scPassword: '',
        showLoginForm: false,
        showLoginSubmitButton: true,
        showLogoutSubmitButton: false,
        enableLoginSubmitButton: true,
        showLoginSubmitLoadingButton: false,
        loginHeaderText: 'Login',
        loggedInInfoText: '',
        showLoggedInInfo: false,
        
        //commenters search
        commentersSearchUrl : '',
        commenterData : [],
        selectedCommenters : [],
        toggledClearRows: false,
        showCommentersSearchSubmitButton: true,
        enableCommentersSearchSubmitButton: false,
        showCommentersSearchSubmitLoadingButton: false,
        enableCommentersSearchInput: true,
        showCommentersSearchForm: false,
        showCommentersTable: false,
        
        //commenters messages
        showCommentersMessageForm: false,
        commentersMessage : 'Hi <<profileName>>,',
        enableCommentersMessageSubmitButton: false,
        showCommentersMessageSubmitButton: true,
        showCommentersMessageSubmitLoadingButton: false,
        enableCommentersMessageInput: true,
     
        //followers search
        followersSearchUrl : '',
        followerData : [],
        selectedFollowers : [],
        //toggledClearRows: false,
        showFollowersSearchSubmitButton: true,
        enableFollowersSearchSubmitButton: false,
        showFollowersSearchSubmitLoadingButton: false,
        enableFollowersSearchInput: true,
        showFollowersSearchForm: false,
        showFollowersTable: false,
        
        //followers messages
        showFollowersMessageForm: false,
        followersMessage : 'Hi <<profileName>>,',
        enableFollowersMessageSubmitButton: false,
        showFollowersMessageSubmitButton: true,
        showFollowersMessageSubmitLoadingButton: false,
        enableFollowersMessageInput: true,
        
        //alerts
        showErrorAlert: false,
        showSuccessAlert: false,
        showInfoAlert: false,
        errorAlertText: '',
        successAlertText: '',
        infoAlertText: '',
        infoAlertTextHeading: '',
        errorAlertLink: '',
        errorAlertLinkText: '',
         
        //my followers
        myFollowerData: [],
        showMyFollowersTable: false,
        showMyFollowersSubmitButton: true,
        showMyFollowersSubmitLoadingButton: false,
        selectedMyFollowers: [],   
        showMyFollowersLoadingIcon: true,
        scProfile: '',
        
        //my followers messages
        myFollowersMessage : 'Hi <<profileName>>,',
        showMyFollowersMessageForm: false,
        enableMyFollowersMessageInput: true,
        enableMyFollowersMessageSubmitButton: false,
        showMyFollowersMessageSubmitButton: true,
        showMyFollowersMessageSubmitLoadingButton: false,
        
        //sent messages
        sentMessageData: [],
        showSentMessagesTable: false,
        showSentMessagesSubmitButton: true,
        showSentMessagesSubmitLoadingButton: false,
        selectedSentMessages: [],   
        showSentMessagesLoadingIcon: true,
        
        //sent messages message
        sentMessagesMessage : 'Hi <<profileName>>,',
        showSentMessagesMessageForm: false,
        enableSentMessagesMessageInput: true,
        enableSentMessagesMessageSubmitButton: false,
        showSentMessagesMessageSubmitButton: true,
        showSentMessagesMessageSubmitLoadingButton: false,
        
        //received messages
        receivedMessageData: [],
        showReceivedMessagesTable: false,
        showReceivedMessagesSubmitButton: true,
        showReceivedMessagesSubmitLoadingButton: false,
        selectedReceivedMessages: [],   
        showReceivedMessagesLoadingIcon: true,
        
        //received messages message
        receivedMessagesMessage : 'Hi <<profileName>>,',
        showReceivedMessagesMessageForm: false,
        enableReceivedMessagesMessageInput: true,
        enableReceivedMessagesMessageSubmitButton: false,
        showReceivedMessagesMessageSubmitButton: true,
        showReceivedMessagesMessageSubmitLoadingButton: false,


};


export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );

  /*if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }*/

  return store;
}