import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  connect: null,
  connectionOk: null,
  connectionFailed: null,
  send: ['message'],
  receive: ['message']
})

export const ApiTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  message: null,
  connected: undefined
})

/* ------------- Selectors ------------- */

export const ApiSelectors = {
}

/* ------------- Reducers ------------- */

// request the avatar for a user
export const connect = (state) =>
  state.merge({ fetching: true, error: null })

// successful avatar lookup
export const success = (state) => {
  return state.merge({ fetching: false, error: null, connected: true })
}

// failed to get the avatar
export const failure = (state) =>
  state.merge({ fetching: false, error: true, connected: false })

export const send = (state) => state.merge({ fetching: true, error: null })
export const receive = (state, { message }) => state.merge({ fetching: true, error: null, message })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONNECT]: connect,
  [Types.CONNECTION_OK]: success,
  [Types.CONNECTION_FAILED]: failure,
  [Types.SEND]: send,
  [Types.RECEIVE]: receive
})
