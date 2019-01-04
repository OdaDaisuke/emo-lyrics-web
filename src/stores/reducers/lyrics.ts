import { Action } from 'redux'
import { LyricDefault } from '../state'

const lyrics = (state: LyricDefault = {}, action: Action) => {
    switch (action.type) {
        default:
            return state
    }
}

export default lyrics