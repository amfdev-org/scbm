//import { combineReducers } from "redux";
import reduceReducers from 'reduce-reducers';
import authReducer from "./authReducer";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import commentersSearchReducer from "./commentersSearchReducer";
import commentersMessageReducer from "./commentersMessageReducer";
//export default combineReducers({
//  authReducer: authReducer
//});

        
export default reduceReducers(authReducer, loginReducer, signupReducer, commentersSearchReducer, commentersMessageReducer);