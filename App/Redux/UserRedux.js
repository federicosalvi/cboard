import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUsername: ['username']
})

export const UsernameTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: ''
})

/* ------------- Selectors ------------- */

export const UsernameSelectors = {
}

/* ------------- Reducers ------------- */

export const setUsername = (state, { username }) => state.merge({ username })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USERNAME]: setUsername
})
