import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUsername: ['username'],
  setPcmToken: ['token']
})

export const UsernameTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: '',
  token: ''
})

/* ------------- Selectors ------------- */

export const getUsername = state => state.user.username
export const getToken = state => state.user.token

/* ------------- Reducers ------------- */

export const setUsername = (state, { username }) => state.merge({ username })
export const setPcmToken = (state, { token }) => state.merge({ token })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USERNAME]: setUsername,
  [Types.SET_PCM_TOKEN]: setPcmToken
})
