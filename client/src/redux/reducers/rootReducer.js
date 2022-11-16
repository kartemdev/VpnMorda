import { combineReducers } from 'redux';
import accBlockCheckReducer from './accBlockCheckReducer';
import allAccsReducer from './allAccsReducer';
import allUsersReducer from './allUsersReducer';

import googleAuthReducer from './googleAuthReducer';
import loaderReducer from './loaderReducer';
import userblockCheckReducer from './userBlockCheckReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer,
  userBlkCheck: userblockCheckReducer,
  allAccs: allAccsReducer,
  accBlkCheck: accBlockCheckReducer,
  loader: loaderReducer,
  googleAuth: googleAuthReducer,
});

export default rootReducer;
