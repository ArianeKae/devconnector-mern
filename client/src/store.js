import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const initialState = {};

const middleware = [thunk];

const store = configureStore(
    rootReducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware))
    );

export default store;