//import { combineReducers } from "redux";
import reduceReducers from 'reduce-reducers';
import authReducer from "./authReducer";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import commentersSearchReducer from "./commentersSearchReducer";
import commentersMessageReducer from "./commentersMessageReducer";
import followersSearchReducer from "./followersSearchReducer";
import followersMessageReducer from "./followersMessageReducer";
import myFollowersSearchReducer from "./myFollowersSearchReducer";
import myFollowersMessageReducer from "./myFollowersMessageReducer";
import sentMessagesSearchReducer from "./sentMessagesSearchReducer";
import sentMessagesMessageReducer from "./sentMessagesMessageReducer";
import receivedMessagesSearchReducer from "./receivedMessagesSearchReducer";
import receivedMessagesMessageReducer from "./receivedMessagesMessageReducer";
import uiReducer from "./uiReducer";
//export default combineReducers({
//  authReducer: authReducer
//});

        
export default reduceReducers(
                              authReducer,
                              loginReducer,
                              signupReducer,
                              commentersSearchReducer,
                              commentersMessageReducer,
                              followersSearchReducer,
                              followersMessageReducer,
                              myFollowersSearchReducer,
                              myFollowersMessageReducer,
                              sentMessagesSearchReducer,
                              sentMessagesMessageReducer,
                              receivedMessagesSearchReducer,
                              receivedMessagesMessageReducer,
                              uiReducer);