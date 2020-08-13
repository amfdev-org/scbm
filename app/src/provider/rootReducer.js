import reduceReducers from 'reduce-reducers';

import {authReducer, initialState as authInitialState} from '../reducers/authReducer'
import {commentersMessageReducer, initialState as commentersMessageInitialState} from '../reducers/commentersMessageReducer'
import {commentersSearchReducer, initialState as commentersSearchInitialState} from '../reducers/commentersSearchReducer'
import {followersMessageReducer, initialState as followersMessageInitialState} from '../reducers/followersMessageReducer'
import {followersSearchReducer, initialState as followersSearchInitialState} from '../reducers/followersSearchReducer'
import {myFollowersMessageReducer, initialState as myFollowersMessageInitialState} from '../reducers/myFollowersMessageReducer'
import {myFollowersSearchReducer, initialState as myFollowersSearchInitialState} from '../reducers/myFollowersSearchReducer'
import {receivedMessagesMessageReducer, initialState as receivedMessagesMessageInitialState} from '../reducers/receivedMessagesMessageReducer'
import {receivedMessagesSearchReducer, initialState as receivedMessagesSearchInitialState} from '../reducers/receivedMessagesSearchReducer'
import {sentMessagesMessageReducer, initialState as sentMessagesMessageInitialState} from '../reducers/sentMessagesMessageReducer'
import {sentMessagesSearchReducer, initialState as sentMessagesSearchInitialState} from '../reducers/sentMessagesSearchReducer'
import {loginReducer, initialState as loginInitialState} from '../reducers/loginReducer'
import {signupReducer, initialState as signupInitialState} from '../reducers/signupReducer'
import {uiReducer, initialState as uiInitialState} from '../reducers/uiReducer'

export const allInitialStates = {authInitialState,
                                commentersMessageInitialState,
                                commentersSearchInitialState,
                                followersMessageInitialState,
                                followersSearchInitialState,
                                myFollowersMessageInitialState,
                                myFollowersSearchInitialState,
                                receivedMessagesMessageInitialState,
                                receivedMessagesSearchInitialState,
                                sentMessagesMessageInitialState,
                                sentMessagesSearchInitialState,
                                loginInitialState,
                                signupInitialState,
                                uiInitialState
};
        
export const reducedReducers = reduceReducers(
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
