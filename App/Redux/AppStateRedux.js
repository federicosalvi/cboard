import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setIsConnected: ['isConnected'],
  setAppState: ['appState']
})

export const AppStateTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  connected: false,
  appState: 'active'
})

export const setIsConnected = (state, { isConnected }) => state.merge({ connected: isConnected })
export const setAppState = (state, { appState }) => state.merge({ appState })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_IS_CONNECTED]: setIsConnected,
  [Types.SET_APP_STATE]: setAppState
})

/* -------------- Selectors -------------- */
export const isConnected = state => state.appState.connected
