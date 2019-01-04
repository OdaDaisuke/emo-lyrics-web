import { combineReducers, Action } from 'redux'
import lyrics from './lyrics'
import { LyricDefault } from '../state'

const rootReducer = combineReducers<LyricDefault, Action>({
    lyrics,
})

export default rootReducer