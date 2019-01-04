import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}

export const configureStore = createStore(rootReducer, initialState)