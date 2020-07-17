import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/rootReducer';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

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
        
        //commenter smessages
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
        
        //followers smessages
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
        errorAlertLinkText: ''};


export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunkMiddleware))
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