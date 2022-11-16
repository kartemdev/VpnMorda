import { configureStore } from '@reduxjs/toolkit';
import initState from './initState';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  initState,
});

export default store;
