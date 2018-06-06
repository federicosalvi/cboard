import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setIsConnected: ['isConnected']
})

export const ConnectivityTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  connected: false
})

export const setIsConnected = (state, { isConnected }) => state.merge({ connected: isConnected })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_IS_CONNECTED]: setIsConnected
})

/* -------------- Selectors -------------- */
export const isConnected = state => state.connectivity.connected
